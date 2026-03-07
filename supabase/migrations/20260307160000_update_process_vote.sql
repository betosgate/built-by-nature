-- Update process_vote for new token model:
-- 1 token = 5 votes, max 20 tokens (100 votes) per day per contestant
-- Each token costs $5, so earnings are based on token spend amount

create or replace function public.process_vote(
  p_voter_id uuid,
  p_entry_id uuid,
  p_contest_id uuid,
  p_round_number integer,
  p_tokens_spent integer default 1
)
returns uuid
language plpgsql
security definer
as $$
declare
  v_vote_id uuid;
  v_contestant_id uuid;
  v_recruiter_id uuid;
  v_voter_balance integer;
  v_contestant_earnings decimal(10, 2);
  v_recruiter_earnings decimal(10, 2);
  v_entry_status entry_status;
  v_contest_status contest_status;
  v_daily_tokens_spent integer;
  v_votes_to_add integer;
  v_token_revenue decimal(10, 2);
begin
  -- Validate tokens_spent
  if p_tokens_spent < 1 then
    raise exception 'Must spend at least 1 token';
  end if;

  if p_tokens_spent > 20 then
    raise exception 'Cannot spend more than 20 tokens at once';
  end if;

  -- Verify contest is in_progress
  select status into v_contest_status
  from public.contests
  where id = p_contest_id;

  if v_contest_status is null then
    raise exception 'Contest not found';
  end if;

  if v_contest_status != 'in_progress' then
    raise exception 'Contest is not currently active';
  end if;

  -- Get entry info and verify it is active
  select user_id, status into v_contestant_id, v_entry_status
  from public.contest_entries
  where id = p_entry_id and contest_id = p_contest_id;

  if v_contestant_id is null then
    raise exception 'Contest entry not found';
  end if;

  if v_entry_status != 'active' then
    raise exception 'Contest entry is not active';
  end if;

  -- Prevent self-voting
  if p_voter_id = v_contestant_id then
    raise exception 'Cannot vote for your own entry';
  end if;

  -- Check daily token limit (max 20 tokens per day per contestant)
  select coalesce(sum(tokens_spent), 0) into v_daily_tokens_spent
  from public.votes
  where voter_id = p_voter_id
    and entry_id = p_entry_id
    and created_at >= (now() at time zone 'utc')::date;

  if v_daily_tokens_spent + p_tokens_spent > 20 then
    raise exception 'Daily vote limit reached. You can spend % more tokens on this contestant today.',
      20 - v_daily_tokens_spent;
  end if;

  -- Check voter balance
  select tokens_balance into v_voter_balance
  from public.profiles
  where id = p_voter_id
  for update;

  if v_voter_balance is null then
    raise exception 'Voter profile not found';
  end if;

  if v_voter_balance < p_tokens_spent then
    raise exception 'Insufficient token balance. Have: %, need: %', v_voter_balance, p_tokens_spent;
  end if;

  -- Deduct tokens from voter
  update public.profiles
  set tokens_balance = tokens_balance - p_tokens_spent
  where id = p_voter_id;

  -- Create vote record
  insert into public.votes (voter_id, entry_id, contest_id, round_number, tokens_spent)
  values (p_voter_id, p_entry_id, p_contest_id, p_round_number, p_tokens_spent)
  returning id into v_vote_id;

  -- 1 token = 5 votes
  v_votes_to_add := p_tokens_spent * 5;

  -- Increment vote count on entry (by actual votes, not tokens)
  update public.contest_entries
  set vote_count = vote_count + v_votes_to_add
  where id = p_entry_id;

  -- Calculate revenue: each token = $5
  v_token_revenue := p_tokens_spent * 5.00;

  -- Contestant earns 20% of token revenue
  v_contestant_earnings := (v_token_revenue * 0.20)::decimal(10, 2);

  if v_contestant_earnings > 0 then
    insert into public.earnings (user_id, source_type, source_vote_id, amount, contest_id)
    values (v_contestant_id, 'vote_share', v_vote_id, v_contestant_earnings, p_contest_id);

    update public.profiles
    set total_earnings = total_earnings + v_contestant_earnings
    where id = v_contestant_id;
  end if;

  -- Recruiter earns 10% of token revenue if exists
  select recruited_by into v_recruiter_id
  from public.profiles
  where id = v_contestant_id;

  if v_recruiter_id is not null then
    v_recruiter_earnings := (v_token_revenue * 0.10)::decimal(10, 2);

    if v_recruiter_earnings > 0 then
      insert into public.earnings (user_id, source_type, source_vote_id, amount, contest_id)
      values (v_recruiter_id, 'recruitment_bonus', v_vote_id, v_recruiter_earnings, p_contest_id);

      update public.profiles
      set total_earnings = total_earnings + v_recruiter_earnings
      where id = v_recruiter_id;
    end if;
  end if;

  return v_vote_id;
end;
$$;

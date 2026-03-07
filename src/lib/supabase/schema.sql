-- ============================================================================
-- Built by Nature - Complete Database Schema
-- ============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

create type user_role as enum ('fan', 'contestant', 'admin', 'recruiter');
create type contest_status as enum ('draft', 'open', 'in_progress', 'completed');
create type round_status as enum ('pending', 'active', 'completed');
create type entry_status as enum ('pending', 'active', 'eliminated', 'winner');
create type content_type as enum ('photo', 'video');
create type purchase_status as enum ('pending', 'completed', 'failed');
create type payout_status as enum ('pending', 'processing', 'completed', 'failed');
create type earnings_source_type as enum ('vote_share', 'recruitment_bonus');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role user_role not null default 'fan',
  display_name text,
  bio text,
  avatar_url text,
  age_verified boolean not null default false,
  date_of_birth date,
  tokens_balance integer not null default 0 check (tokens_balance >= 0),
  recruited_by uuid references public.profiles(id) on delete set null,
  referral_code text unique not null,
  total_earnings decimal(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contests
create table public.contests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  rules_text text,
  status contest_status not null default 'draft',
  current_round integer not null default 0,
  total_rounds integer not null default 1,
  entry_deadline timestamptz,
  prizes_description text,
  cover_image_url text,
  created_at timestamptz not null default now()
);

-- Contest Rounds
create table public.contest_rounds (
  id uuid primary key default uuid_generate_v4(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  round_number integer not null,
  name text,
  advancement_count integer not null default 10,
  start_date timestamptz,
  end_date timestamptz,
  status round_status not null default 'pending',
  unique (contest_id, round_number)
);

-- Contest Entries
create table public.contest_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  contest_id uuid not null references public.contests(id) on delete cascade,
  status entry_status not null default 'pending',
  current_round integer not null default 1,
  vote_count integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, contest_id)
);

-- Content
create table public.content (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  contest_entry_id uuid references public.contest_entries(id) on delete set null,
  type content_type not null,
  storage_path text not null,
  public_url text,
  is_private boolean not null default false,
  is_18_plus boolean not null default false,
  caption text,
  created_at timestamptz not null default now()
);

-- Votes
create table public.votes (
  id uuid primary key default uuid_generate_v4(),
  voter_id uuid not null references public.profiles(id) on delete cascade,
  entry_id uuid not null references public.contest_entries(id) on delete cascade,
  contest_id uuid not null references public.contests(id) on delete cascade,
  round_number integer not null,
  tokens_spent integer not null default 1 check (tokens_spent > 0),
  created_at timestamptz not null default now()
);

-- Token Purchases
create table public.token_purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null check (amount > 0),
  price_paid decimal(10, 2) not null check (price_paid >= 0),
  stripe_session_id text,
  status purchase_status not null default 'pending',
  created_at timestamptz not null default now()
);

-- Messages
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Comments
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content_id uuid not null references public.content(id) on delete cascade,
  text text not null,
  approved boolean not null default false,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- Earnings
create table public.earnings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_type earnings_source_type not null,
  source_vote_id uuid references public.votes(id) on delete set null,
  amount decimal(10, 2) not null check (amount > 0),
  contest_id uuid references public.contests(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Payouts
create table public.payouts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount decimal(10, 2) not null check (amount > 0),
  status payout_status not null default 'pending',
  payout_method text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Profiles
create index idx_profiles_role on public.profiles(role);
create index idx_profiles_referral_code on public.profiles(referral_code);
create index idx_profiles_recruited_by on public.profiles(recruited_by);

-- Contests
create index idx_contests_status on public.contests(status);

-- Contest Rounds
create index idx_contest_rounds_contest_id on public.contest_rounds(contest_id);
create index idx_contest_rounds_status on public.contest_rounds(status);

-- Contest Entries
create index idx_contest_entries_user_id on public.contest_entries(user_id);
create index idx_contest_entries_contest_id on public.contest_entries(contest_id);
create index idx_contest_entries_status on public.contest_entries(status);
create index idx_contest_entries_vote_count on public.contest_entries(vote_count desc);

-- Content
create index idx_content_user_id on public.content(user_id);
create index idx_content_contest_entry_id on public.content(contest_entry_id);
create index idx_content_type on public.content(type);
create index idx_content_created_at on public.content(created_at desc);

-- Votes
create index idx_votes_voter_id on public.votes(voter_id);
create index idx_votes_entry_id on public.votes(entry_id);
create index idx_votes_contest_id on public.votes(contest_id);
create index idx_votes_contest_round on public.votes(contest_id, round_number);

-- Token Purchases
create index idx_token_purchases_user_id on public.token_purchases(user_id);
create index idx_token_purchases_status on public.token_purchases(status);
create index idx_token_purchases_stripe_session on public.token_purchases(stripe_session_id);

-- Messages
create index idx_messages_sender_id on public.messages(sender_id);
create index idx_messages_recipient_id on public.messages(recipient_id);
create index idx_messages_recipient_read on public.messages(recipient_id, read) where read = false;

-- Comments
create index idx_comments_content_id on public.comments(content_id);
create index idx_comments_user_id on public.comments(user_id);

-- Earnings
create index idx_earnings_user_id on public.earnings(user_id);
create index idx_earnings_source_vote_id on public.earnings(source_vote_id);
create index idx_earnings_contest_id on public.earnings(contest_id);

-- Payouts
create index idx_payouts_user_id on public.payouts(user_id);
create index idx_payouts_status on public.payouts(status);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profiles_updated
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, referral_code)
  values (
    new.id,
    new.email,
    encode(extensions.gen_random_bytes(6), 'hex')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Process vote: deducts tokens, increments vote_count, creates earnings
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
begin
  -- Validate tokens_spent
  if p_tokens_spent < 1 then
    raise exception 'Must spend at least 1 token';
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

  -- Increment vote count on entry
  update public.contest_entries
  set vote_count = vote_count + p_tokens_spent
  where id = p_entry_id;

  -- Calculate earnings: 20% to contestant
  v_contestant_earnings := (p_tokens_spent * 0.20)::decimal(10, 2);

  if v_contestant_earnings > 0 then
    insert into public.earnings (user_id, source_type, source_vote_id, amount, contest_id)
    values (v_contestant_id, 'vote_share', v_vote_id, v_contestant_earnings, p_contest_id);

    update public.profiles
    set total_earnings = total_earnings + v_contestant_earnings
    where id = v_contestant_id;
  end if;

  -- Calculate earnings: 10% to recruiter if exists
  select recruited_by into v_recruiter_id
  from public.profiles
  where id = v_contestant_id;

  if v_recruiter_id is not null then
    v_recruiter_earnings := (p_tokens_spent * 0.10)::decimal(10, 2);

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

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.contests enable row level security;
alter table public.contest_rounds enable row level security;
alter table public.contest_entries enable row level security;
alter table public.content enable row level security;
alter table public.votes enable row level security;
alter table public.token_purchases enable row level security;
alter table public.messages enable row level security;
alter table public.comments enable row level security;
alter table public.earnings enable row level security;
alter table public.payouts enable row level security;

-- ---- PROFILES ----

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Prevent users from changing their own role (admin-only via service key)
create policy "Users cannot change role via client"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and (role = (select role from public.profiles where id = auth.uid()))
  );

-- ---- CONTESTS ----

create policy "Contests are viewable by everyone"
  on public.contests for select
  using (true);

create policy "Only admins can insert contests"
  on public.contests for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can update contests"
  on public.contests for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can delete contests"
  on public.contests for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- CONTEST ROUNDS ----

create policy "Contest rounds are viewable by everyone"
  on public.contest_rounds for select
  using (true);

create policy "Only admins can manage contest rounds"
  on public.contest_rounds for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- CONTEST ENTRIES ----

create policy "Contest entries are viewable by everyone"
  on public.contest_entries for select
  using (true);

create policy "Users can create own contest entries"
  on public.contest_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on public.contest_entries for update
  using (auth.uid() = user_id);

create policy "Admins can update any entry"
  on public.contest_entries for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- CONTENT ----

create policy "Public content is viewable by everyone"
  on public.content for select
  using (
    is_private = false
    or user_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "18+ content requires age verification"
  on public.content for select
  using (
    is_18_plus = false
    or user_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and age_verified = true
    )
  );

create policy "Users can insert own content"
  on public.content for insert
  with check (auth.uid() = user_id);

create policy "Users can update own content"
  on public.content for update
  using (auth.uid() = user_id);

create policy "Users can delete own content"
  on public.content for delete
  using (auth.uid() = user_id);

-- ---- VOTES ----

create policy "Users can view own votes"
  on public.votes for select
  using (voter_id = auth.uid());

create policy "Admins can view all votes"
  on public.votes for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Votes are created via process_vote function"
  on public.votes for insert
  with check (false);
  -- Votes should only be created via the process_vote function (security definer)

-- ---- TOKEN PURCHASES ----

create policy "Users can view own purchases"
  on public.token_purchases for select
  using (user_id = auth.uid());

create policy "Users can create own purchases"
  on public.token_purchases for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all purchases"
  on public.token_purchases for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---- MESSAGES ----

create policy "Users can view own messages"
  on public.messages for select
  using (sender_id = auth.uid() or recipient_id = auth.uid());

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Recipients can mark messages as read"
  on public.messages for update
  using (recipient_id = auth.uid())
  with check (recipient_id = auth.uid());

-- ---- COMMENTS ----

create policy "Approved visible comments are viewable by everyone"
  on public.comments for select
  using (
    (approved = true and visible = true)
    or user_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Authenticated users can create comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own comments"
  on public.comments for update
  using (auth.uid() = user_id);

create policy "Admins can update any comment"
  on public.comments for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- ---- EARNINGS ----

create policy "Users can view own earnings"
  on public.earnings for select
  using (user_id = auth.uid());

create policy "Admins can view all earnings"
  on public.earnings for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Earnings are created via functions only"
  on public.earnings for insert
  with check (false);
  -- Earnings should only be created via the process_vote function (security definer)

-- ---- PAYOUTS ----

create policy "Users can view own payouts"
  on public.payouts for select
  using (user_id = auth.uid());

create policy "Users can request payouts"
  on public.payouts for insert
  with check (auth.uid() = user_id and status = 'pending');

create policy "Admins can view and manage all payouts"
  on public.payouts for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  Trophy,
  Heart,
  Shield,
  Calendar,
  Star,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Plane,
  Crown,
  Camera,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface Contest {
  id: string;
  name: string;
  description: string | null;
  rules_text: string | null;
  status: string;
  current_round: number;
  total_rounds: number;
  entry_deadline: string | null;
  prizes_description: string | null;
  cover_image_url: string | null;
  created_at: string;
}

interface ContestRound {
  id: string;
  contest_id: string;
  round_number: number;
  name: string | null;
  advancement_count: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
}

interface ContestEntry {
  id: string;
  user_id: string;
  contest_id: string;
  status: string;
  current_round: number;
  vote_count: number;
  created_at: string;
  profiles: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "TBD";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "draft":
      return "Coming Soon";
    case "open":
      return "Open for Entry";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "draft":
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    case "open":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "in_progress":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "completed":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
  }
}

function getRoundStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "bg-amber-500";
    case "completed":
      return "bg-green-500";
    default:
      return "bg-zinc-600";
  }
}

export default function ContestDetailPage() {
  const params = useParams();
  const contestId = params.id as string;

  const [contest, setContest] = useState<Contest | null>(null);
  const [rounds, setRounds] = useState<ContestRound[]>([]);
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingEntryId, setVotingEntryId] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch contest data
        const contestRes = await fetch("/api/contests");
        if (!contestRes.ok) throw new Error("Failed to fetch contests");
        const contestData = await contestRes.json();
        const found = (contestData.contests || []).find(
          (c: Contest) => c.id === contestId
        );
        if (!found) {
          setError("Contest not found");
          setLoading(false);
          return;
        }
        setContest(found);

        // Fetch contest rounds
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
          // Fetch rounds
          const roundsRes = await fetch(
            `${supabaseUrl}/rest/v1/contest_rounds?contest_id=eq.${contestId}&order=round_number.asc`,
            {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
              },
            }
          );
          if (roundsRes.ok) {
            const roundsData = await roundsRes.json();
            setRounds(roundsData || []);
          }

          // Fetch contest entries with profiles
          const entriesRes = await fetch(
            `${supabaseUrl}/rest/v1/contest_entries?contest_id=eq.${contestId}&select=id,user_id,contest_id,status,current_round,vote_count,created_at,profiles(id,display_name,avatar_url)&order=vote_count.desc`,
            {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
              },
            }
          );
          if (entriesRes.ok) {
            const entriesData = await entriesRes.json();
            setEntries(entriesData || []);
          }
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    if (contestId) {
      fetchData();
    }
  }, [contestId]);

  async function handleVote(entryId: string) {
    setVotingEntryId(entryId);
    setVoteMessage(null);

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId,
          contestId,
          roundNumber: contest?.current_round || 1,
          tokensSpent: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setVoteMessage("Please log in to vote.");
          return;
        }
        if (data.needsTokens) {
          setVoteMessage("You need tokens to vote. Purchase tokens first.");
          return;
        }
        setVoteMessage(data.error || "Failed to vote.");
        return;
      }

      setVoteMessage("Vote recorded!");
      // Update the local entry vote count
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId ? { ...e, vote_count: e.vote_count + 5 } : e
        )
      );
    } catch {
      setVoteMessage("An error occurred while voting.");
    } finally {
      setVotingEntryId(null);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 size-10 animate-spin text-amber-500" />
            <p className="text-zinc-400">Loading contest...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error / not found state
  if (error || !contest) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Trophy className="mx-auto mb-4 size-12 text-zinc-600" />
            <h1 className="mb-2 text-2xl font-bold">
              {error === "Contest not found" ? "Contest Not Found" : "Error"}
            </h1>
            <p className="mb-6 text-zinc-400">
              {error === "Contest not found"
                ? "The contest you are looking for does not exist or has been removed."
                : error || "Something went wrong."}
            </p>
            <Link href="/contests">
              <Button className="bg-amber-500 text-black hover:bg-amber-400">
                <ArrowLeft className="size-4" />
                Back to Contests
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalVotes = entries.reduce((sum, e) => sum + (e.vote_count || 0), 0);
  const activeRound = rounds.find((r) => r.status === "active");
  const defaultCover =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={contest.cover_image_url || defaultCover}
          alt={contest.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Badge className={getStatusColor(contest.status)}>
            {getStatusLabel(contest.status)}
            {contest.entry_deadline && contest.status === "open" && (
              <> &mdash; Entry Deadline: {formatDate(contest.entry_deadline)}</>
            )}
          </Badge>
          <h1 className="mb-2 mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {contest.name}
          </h1>
          <p className="max-w-2xl text-zinc-300">{contest.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-amber-500" />
              {entries.length} Entrant{entries.length !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="size-4 text-amber-500" />
              {totalVotes.toLocaleString()} Total Votes
            </span>
            {activeRound && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-amber-500" />
                Round {activeRound.round_number}: {activeRound.name}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Trophy className="size-4 text-amber-500" />
              {contest.total_rounds} Round{contest.total_rounds !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Earnings Banner */}
        <div className="mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="mt-1 size-8 shrink-0 text-green-400" />
            <div>
              <h3 className="mb-1 text-lg font-bold text-green-400">
                Contestants Earn 20% of All Token Revenue
              </h3>
              <p className="text-sm text-zinc-400">
                Every vote you receive puts money in your pocket. Fans spend $5
                per token to vote &mdash; you earn 20% of every dollar spent on
                your votes. The more fans you attract, the more you earn, win or
                lose.
              </p>
            </div>
          </div>
        </div>

        {/* Vote feedback message */}
        {voteMessage && (
          <div
            className={`mb-6 rounded-xl border p-4 text-center text-sm ${
              voteMessage.includes("recorded")
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-400"
            }`}
          >
            {voteMessage}
            {voteMessage.includes("log in") && (
              <Link href="/login" className="ml-2 underline hover:text-amber-300">
                Log in
              </Link>
            )}
            {voteMessage.includes("tokens") && (
              <Link href="/tokens" className="ml-2 underline hover:text-amber-300">
                Buy Tokens
              </Link>
            )}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Prizes from DB */}
            {contest.prizes_description && (
              <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <div className="mb-1 text-sm font-medium text-amber-500">Prizes</div>
                <p className="text-zinc-300">{contest.prizes_description}</p>
              </div>
            )}

            {/* Leaderboard */}
            <h2 className="mb-6 text-xl font-bold">
              Leaderboard ({entries.length} Contestant{entries.length !== 1 ? "s" : ""})
            </h2>

            {entries.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
                <Users className="mx-auto mb-3 size-10 text-zinc-600" />
                <h3 className="mb-2 text-lg font-semibold text-zinc-400">
                  No contestants yet
                </h3>
                <p className="mb-4 text-sm text-zinc-500">
                  Be the first to enter this contest!
                </p>
                <Link href="/signup?role=contestant">
                  <Button className="bg-amber-500 text-black hover:bg-amber-400">
                    Enter This Contest
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry, index) => {
                  const rank = index + 1;
                  const displayName =
                    entry.profiles?.display_name || "Anonymous";
                  const avatarUrl = entry.profiles?.avatar_url;

                  return (
                    <div
                      key={entry.id}
                      className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-amber-500/50"
                    >
                      {/* Rank */}
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          rank === 1
                            ? "bg-yellow-500 text-black"
                            : rank === 2
                            ? "bg-zinc-300 text-black"
                            : rank === 3
                            ? "bg-amber-700 text-white"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        #{rank}
                      </div>

                      {/* Avatar */}
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-zinc-700">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={displayName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center bg-zinc-800 text-lg font-bold text-zinc-500">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Name & info */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/contestant/${entry.user_id}`}
                          className="text-base font-semibold text-white transition-colors hover:text-amber-400"
                        >
                          {displayName}
                        </Link>
                        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Heart className="size-3 text-amber-500" />
                            {entry.vote_count.toLocaleString()} votes
                          </span>
                          <Badge
                            className={`text-[10px] px-1.5 py-0 ${
                              entry.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : entry.status === "eliminated"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : entry.status === "winner"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                            }`}
                          >
                            {entry.status}
                          </Badge>
                          {entry.current_round > 0 && (
                            <span>Round {entry.current_round}</span>
                          )}
                        </div>
                      </div>

                      {/* Vote button */}
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Button
                          size="sm"
                          className="bg-amber-500 text-black hover:bg-amber-400"
                          onClick={() => handleVote(entry.id)}
                          disabled={votingEntryId === entry.id}
                        >
                          {votingEntryId === entry.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Heart className="size-4" />
                          )}
                          Vote
                        </Button>
                        <Link
                          href={`/contestant/${entry.user_id}`}
                          className="text-xs text-zinc-500 hover:text-amber-400"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enter CTA */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
              <Star className="mx-auto mb-3 size-10 text-amber-500" />
              <h3 className="mb-2 text-lg font-bold">Want to Compete?</h3>
              <p className="mb-2 text-sm text-zinc-400">
                Join {entries.length} other contestant{entries.length !== 1 ? "s" : ""}{" "}
                and compete for the grand prize.
              </p>
              <p className="mb-4 text-xs text-green-400">
                Earn 20% of all voting token revenue on your votes!
              </p>
              <Link href="/signup?role=contestant">
                <Button className="w-full bg-amber-500 text-black hover:bg-amber-400">
                  Enter This Contest
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>

            {/* Prizes - Top 3 */}
            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Plane className="size-5 text-amber-500" />
                Top 3 Finalists &mdash; Vegas Experience
              </h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>
                  The <strong className="text-white">top 3 finalists</strong>{" "}
                  will each receive:
                </p>
                <ul className="ml-1 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Flown to{" "}
                    <strong className="text-amber-400">Las Vegas</strong> with
                    one person of their choice
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    <strong className="text-white">3 nights</strong> &mdash;
                    travel, hotel, and full meals paid
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Professional{" "}
                    <strong className="text-white">
                      photo and video shoot
                    </strong>{" "}
                    in Vegas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                    Pro content goes into the{" "}
                    <strong className="text-white">final round</strong> for the
                    Grand Prize
                  </li>
                </ul>
              </div>
            </div>

            {/* Grand Prize */}
            <div className="rounded-xl border border-yellow-500/40 bg-gradient-to-b from-yellow-500/15 to-transparent p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Crown className="size-5 text-yellow-400" />
                Grand Prize &mdash; Built by Nature Queen
              </h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <p>
                  The{" "}
                  <strong className="text-yellow-400">
                    Grand Prize Winner
                  </strong>{" "}
                  receives:
                </p>
                <ul className="ml-1 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    <strong className="text-lg text-yellow-400">
                      $10,000 cash
                    </strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    Crowned the{" "}
                    <strong className="text-yellow-400">
                      Built by Nature Queen
                    </strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-400" />
                    <strong className="text-white">
                      One-week vacation to Italy
                    </strong>{" "}
                    for two &mdash; flight and hotel paid
                  </li>
                </ul>
              </div>
            </div>

            {/* Contest Rounds */}
            {rounds.length > 0 && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                  <Calendar className="size-5 text-amber-500" />
                  Contest Rounds
                </h3>
                <div className="space-y-4">
                  {rounds.map((round, i) => (
                    <div key={round.id} className="relative flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`size-3 rounded-full ${getRoundStatusColor(round.status)}`}
                        />
                        {i < rounds.length - 1 && (
                          <div className="h-full w-px bg-zinc-700" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="text-sm font-medium text-white">
                          Round {round.round_number}: {round.name || `Round ${round.round_number}`}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {formatDate(round.start_date)} &mdash;{" "}
                          {formatDate(round.end_date)}
                        </div>
                        <div className="text-xs text-zinc-600">
                          Top {round.advancement_count} advance
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <Shield className="size-5 text-amber-500" />
                Contest Rules
              </h3>
              {contest.rules_text ? (
                <p className="text-sm text-zinc-400">{contest.rules_text}</p>
              ) : (
                <ul className="space-y-2">
                  {[
                    "Must be 18+ with age verification",
                    "Natural beauty only -- no cosmetic surgery or fillers",
                    "Tattoos and piercings welcome",
                    "Voting: $5 per token (5 votes each), max 20 tokens/day/contestant",
                    "Contestants earn 20% of token revenue",
                    "Cheating = instant disqualification",
                  ].map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-zinc-400"
                    >
                      <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                      {rule}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/rules"
                className="mt-4 block text-sm text-amber-500 hover:text-amber-400"
              >
                Read full rules &rarr;
              </Link>
            </div>

            {/* Recruiter CTA */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
              <Camera className="mx-auto mb-3 size-8 text-amber-500" />
              <h3 className="mb-2 text-base font-bold">
                Know Someone Who Should Compete?
              </h3>
              <p className="mb-4 text-sm text-zinc-400">
                Become a recruiter and earn{" "}
                <strong className="text-amber-400">
                  10% of all token revenue
                </strong>{" "}
                from contestants you bring in.
              </p>
              <Link href="/recruit">
                <Button
                  variant="outline"
                  className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  Become a Recruiter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trophy,
  Star,
  Share2,
  Lock,
  DollarSign,
  Crown,
  Plane,
  Loader2,
  ArrowLeft,
  Users,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  total_earnings: number;
  created_at: string;
}

interface ContestEntry {
  id: string;
  status: string;
  vote_count: number;
  current_round: number;
  contest_id: string;
  created_at: string;
  contests: {
    id: string;
    name: string;
    status: string;
    cover_image_url: string | null;
  } | null;
}

interface ContentItem {
  id: string;
  type: string;
  public_url: string | null;
  caption: string | null;
  is_private: boolean;
  is_18_plus: boolean;
  created_at: string;
}

interface ContestantData {
  profile: Profile;
  contestEntries: ContestEntry[];
  publicContent: ContentItem[];
  privateContentCount: number;
  totalVotes: number;
}

export default function ContestantProfilePage() {
  const params = useParams();
  const contestantId = params.id as string;

  const [data, setData] = useState<ContestantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingEntryId, setVotingEntryId] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchContestant() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/contestants/${contestantId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Contestant not found");
          } else {
            setError("Failed to load contestant profile");
          }
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError("An error occurred while loading the profile.");
      } finally {
        setLoading(false);
      }
    }

    if (contestantId) {
      fetchContestant();
    }
  }, [contestantId]);

  async function handleVote(entry: ContestEntry) {
    setVotingEntryId(entry.id);
    setVoteMessage(null);

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: entry.id,
          contestId: entry.contest_id,
          roundNumber: entry.current_round || 1,
          tokensSpent: 1,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setVoteMessage("Please log in to vote.");
          return;
        }
        if (result.needsTokens) {
          setVoteMessage("You need tokens to vote. Purchase tokens first.");
          return;
        }
        setVoteMessage(result.error || "Failed to vote.");
        return;
      }

      setVoteMessage("Vote recorded!");
      // Update local data
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          totalVotes: prev.totalVotes + 5,
          contestEntries: prev.contestEntries.map((e) =>
            e.id === entry.id ? { ...e, vote_count: e.vote_count + 5 } : e
          ),
        };
      });
    } catch {
      setVoteMessage("An error occurred while voting.");
    } finally {
      setVotingEntryId(null);
    }
  }

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: data?.profile.display_name || "Contestant",
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  }

  function handleCopyLink() {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <p className="text-zinc-400">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error / not found state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Users className="mx-auto mb-4 size-12 text-zinc-600" />
            <h1 className="mb-2 text-2xl font-bold">
              {error === "Contestant not found"
                ? "Contestant Not Found"
                : "Error"}
            </h1>
            <p className="mb-6 text-zinc-400">
              {error === "Contestant not found"
                ? "This contestant profile does not exist or has been removed."
                : error || "Something went wrong."}
            </p>
            <Link href="/contests">
              <Button className="bg-amber-500 text-black hover:bg-amber-400">
                <ArrowLeft className="size-4" />
                Browse Contests
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { profile, contestEntries, publicContent, privateContentCount, totalVotes } = data;
  const displayName = profile.display_name || "Anonymous";
  const contestsEntered = contestEntries.length;
  const activeEntry = contestEntries.find((e) => e.status === "active");

  // Derive a "rank" label from the active entry (we don't have a global rank, so show vote count instead)
  const estimatedEarnings = totalVotes * 0.2; // $1 per token = 5 votes, so $0.20 per vote

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero / Cover */}
      <div className="relative h-56 w-full sm:h-72">
        {activeEntry?.contests?.cover_image_url ? (
          <Image
            src={activeEntry.contests.cover_image_url}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="-mt-20 mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="relative size-36 shrink-0 overflow-hidden rounded-full border-4 border-black sm:size-40">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-zinc-800 text-4xl font-bold text-zinc-500">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold sm:text-4xl">{displayName}</h1>
            {profile.bio && (
              <p className="mt-2 max-w-xl text-zinc-400">{profile.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {activeEntry && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Competing
                  {activeEntry.contests?.name
                    ? ` in ${activeEntry.contests.name}`
                    : ""}
                </Badge>
              )}
              {contestsEntered > 0 && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  {contestsEntered} Contest{contestsEntered !== 1 ? "s" : ""}{" "}
                  Entered
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-500"
              onClick={handleShare}
            >
              <Share2 className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-500"
              onClick={handleCopyLink}
            >
              {copied ? (
                <span className="text-xs text-green-400">Copied!</span>
              ) : (
                <span className="text-xs">Copy Link</span>
              )}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Total Votes",
              value: totalVotes.toLocaleString(),
              icon: Heart,
            },
            {
              label: "Contests Entered",
              value: contestsEntered.toString(),
              icon: Trophy,
            },
            {
              label: "Public Content",
              value: publicContent.length.toString(),
              icon: ImageIcon,
            },
            {
              label: "Earning 20%",
              value: `$${estimatedEarnings.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
              icon: DollarSign,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center"
            >
              <stat.icon className="mx-auto mb-2 size-5 text-amber-500" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Earnings Info Banner */}
        <div className="mb-12 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="size-8 shrink-0 text-green-400" />
            <div>
              <h3 className="mb-1 text-base font-bold text-green-400">
                Contestants Earn 20% of Token Revenue
              </h3>
              <p className="text-sm text-zinc-400">
                Each $5 token gives 5 votes.{" "}
                <strong className="text-white">{displayName}</strong> earns 20%
                of every token spent voting for her &mdash; that&apos;s{" "}
                <strong className="text-green-400">$1 per token</strong>. Want
                to be a contestant?{" "}
                <Link
                  href="/signup?role=contestant"
                  className="text-amber-400 hover:underline"
                >
                  Sign up here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Vote feedback message */}
        {voteMessage && (
          <div
            className={`mb-8 rounded-xl border p-4 text-center text-sm ${
              voteMessage.includes("recorded")
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-400"
            }`}
          >
            {voteMessage}
            {voteMessage.includes("log in") && (
              <Link
                href="/login"
                className="ml-2 underline hover:text-amber-300"
              >
                Log in
              </Link>
            )}
            {voteMessage.includes("tokens") && (
              <Link
                href="/tokens"
                className="ml-2 underline hover:text-amber-300"
              >
                Buy Tokens
              </Link>
            )}
          </div>
        )}

        {/* Prize Info */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Plane className="size-5 text-amber-500" />
              <h4 className="font-semibold text-amber-400">
                Top 3 &mdash; Vegas Trip
              </h4>
            </div>
            <p className="text-sm text-zinc-400">
              Top 3 finalists get flown to Vegas with +1 for 3 nights. Travel,
              hotel, meals paid. Professional photo &amp; video shoot for the
              final round.
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="size-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">
                Grand Prize &mdash; $10,000
              </h4>
            </div>
            <p className="text-sm text-zinc-400">
              Winner is crowned Built by Nature Queen and wins a one-week Italy
              vacation for two &mdash; flight and hotel paid.
            </p>
          </div>
        </div>

        {/* Contest Entries */}
        {contestEntries.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold">Contest Entries</h2>
            <div className="space-y-4">
              {contestEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {entry.contests ? (
                        <Link
                          href={`/contests/${entry.contests.id}`}
                          className="font-semibold text-white hover:text-amber-400"
                        >
                          {entry.contests.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-white">
                          Contest
                        </span>
                      )}
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
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Heart className="size-3 text-amber-500" />
                        {entry.vote_count.toLocaleString()} votes
                      </span>
                      {entry.current_round > 0 && (
                        <span>Round {entry.current_round}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-500 text-black hover:bg-amber-400"
                    onClick={() => handleVote(entry)}
                    disabled={votingEntryId === entry.id}
                  >
                    {votingEntryId === entry.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Heart className="size-4" />
                    )}
                    Vote
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Public Gallery */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">
            Public Gallery
            {publicContent.length > 0 && (
              <span className="ml-2 text-base font-normal text-zinc-500">
                ({publicContent.length})
              </span>
            )}
          </h2>
          {publicContent.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <ImageIcon className="mx-auto mb-3 size-10 text-zinc-600" />
              <p className="text-zinc-500">
                No public content uploaded yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {publicContent.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800"
                >
                  {item.public_url ? (
                    <Image
                      src={item.public_url}
                      alt={item.caption || "Content"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-zinc-900">
                      <ImageIcon className="size-8 text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                  {item.caption && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                      {item.caption}
                    </div>
                  )}
                  {item.type === "video" && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      VIDEO
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Private / 18+ Content Section */}
        {privateContentCount > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold">
              Exclusive Content (18+)
              <span className="ml-2 text-base font-normal text-zinc-500">
                ({privateContentCount})
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: Math.min(privateContentCount, 6) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                      <Lock className="mb-3 size-8 text-amber-500" />
                      <span className="text-sm font-semibold text-white">
                        18+ Content
                      </span>
                      <span className="mt-1 text-xs text-zinc-400">
                        Verify Age to View
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 text-center">
              <Link href="/signup">
                <Button className="bg-amber-500 text-black hover:bg-amber-400">
                  <Lock className="size-4" />
                  Sign Up &amp; Verify Age to Unlock
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Vote CTA */}
        {activeEntry && (
          <section className="mb-12">
            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-8 text-center">
              <Heart className="mx-auto mb-4 size-12 text-amber-500" />
              <h2 className="mb-2 text-2xl font-bold">
                Vote for {displayName}
              </h2>
              <p className="mb-2 text-zinc-400">
                Support your favorite contestant with tokens. Each $5 token
                gives you 5 votes.
              </p>
              <p className="mb-6 text-sm text-green-400">
                {displayName} earns $1 from every token spent. Help her win!
              </p>
              <p className="mb-4 text-xs text-zinc-600">
                Max 20 tokens (100 votes) per day per contestant
              </p>
              <Button
                className="bg-amber-500 px-8 text-lg font-bold text-black hover:bg-amber-400 h-12"
                onClick={() => handleVote(activeEntry)}
                disabled={votingEntryId === activeEntry.id}
              >
                {votingEntryId === activeEntry.id ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Heart className="size-5" />
                )}
                Vote Now
              </Button>
            </div>
          </section>
        )}

        {/* No active contest CTA */}
        {!activeEntry && (
          <section className="mb-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
              <Star className="mx-auto mb-4 size-12 text-zinc-600" />
              <h2 className="mb-2 text-xl font-bold text-zinc-400">
                Not currently competing
              </h2>
              <p className="mb-4 text-sm text-zinc-500">
                {displayName} is not actively competing in a contest right now.
                Check back later or browse other contestants.
              </p>
              <Link href="/contests">
                <Button
                  variant="outline"
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                >
                  Browse Contests
                </Button>
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trophy,
  Lock,
  DollarSign,
  Crown,
  Plane,
  Loader2,
  Users,
  ImageIcon,
  Minus,
  Plus,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SocialShare } from "@/components/social-share";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string;
  slug: string;
  total_earnings: number;
  created_at: string;
}

interface ContestEntry {
  id: string;
  status: string;
  vote_count: number;
  current_round: number;
  contests: {
    id: string;
    name: string;
    status: string;
    current_round: number;
    total_rounds: number;
  } | null;
}

interface ContentItem {
  id: string;
  type: string;
  public_url: string | null;
  caption: string | null;
  is_private: boolean;
  created_at: string;
  contest_entry_id: string | null;
}

interface ProfileData {
  profile: Profile;
  publicContent: ContentItem[];
  privateContentCount: number;
  entries: ContestEntry[];
  totalVotes: number;
}

export default function VanityProfilePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Voting state
  const [tokenCount, setTokenCount] = useState(1);
  const [voting, setVoting] = useState(false);
  const [voteMessage, setVoteMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profile/${slug}`);
        if (res.status === 404) {
          setError("not_found");
          return;
        }
        if (!res.ok) {
          setError("Failed to load profile");
          return;
        }
        setData(await res.json());
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProfile();
  }, [slug]);

  async function handleVote(entry: ContestEntry) {
    setVoting(true);
    setVoteMessage(null);

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: entry.id,
          contestId: entry.contests?.id,
          roundNumber: entry.current_round || 1,
          tokensSpent: tokenCount,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setVoteMessage({ text: "Please log in to vote.", type: "error" });
          return;
        }
        if (result.needsTokens) {
          setVoteMessage({ text: "You need tokens to vote. Purchase tokens first.", type: "error" });
          return;
        }
        setVoteMessage({ text: result.error || "Failed to vote.", type: "error" });
        return;
      }

      const votesAdded = tokenCount * 5;
      setVoteMessage({ text: `${votesAdded} votes cast! Thank you for your support.`, type: "success" });
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          totalVotes: prev.totalVotes + votesAdded,
          entries: prev.entries.map((e) =>
            e.id === entry.id ? { ...e, vote_count: e.vote_count + votesAdded } : e
          ),
        };
      });
      setTokenCount(1);
    } catch {
      setVoteMessage({ text: "An error occurred while voting.", type: "error" });
    } finally {
      setVoting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-10 animate-spin text-amber-500" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error === "not_found" || !data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Users className="mx-auto mb-4 size-12 text-zinc-600" />
            <h1 className="mb-2 text-2xl font-bold">Profile Not Found</h1>
            <p className="mb-6 text-zinc-400">
              {error === "not_found"
                ? "This profile doesn't exist or hasn't been claimed yet."
                : error || "Something went wrong."}
            </p>
            <Link href="/contestants">
              <Button className="bg-amber-500 text-black hover:bg-amber-400">
                Browse Contestants
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { profile, publicContent, privateContentCount, entries, totalVotes } = data;
  const displayName = profile.display_name || "Anonymous";
  const activeEntry = entries.find((e) => e.status === "active");
  const profileUrl = `/${profile.slug}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero banner */}
      <div className="relative h-48 w-full sm:h-64">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {/* Profile header */}
        <div className="-mt-20 mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="relative size-36 shrink-0 overflow-hidden rounded-full border-4 border-black ring-2 ring-amber-500/50 sm:size-40">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-zinc-800 text-5xl font-bold text-amber-500">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold sm:text-4xl">{displayName}</h1>
            <p className="mt-1 text-sm text-zinc-500">builtbynature.com/{profile.slug}</p>
            {profile.bio && (
              <p className="mt-2 max-w-xl text-zinc-400">{profile.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              {activeEntry && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Competing{activeEntry.contests?.name ? ` in ${activeEntry.contests.name}` : ""}
                </Badge>
              )}
              {entries.length > 0 && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  {totalVotes.toLocaleString()} Total Votes
                </Badge>
              )}
            </div>
          </div>

          <div className="shrink-0">
            <SocialShare
              url={profileUrl}
              title={`Vote for ${displayName} in Built by Nature!`}
              contestantName={displayName}
              contestName={activeEntry?.contests?.name}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-10 grid grid-cols-3 gap-3 sm:grid-cols-3">
          {[
            { label: "Votes", value: totalVotes.toLocaleString(), icon: Heart },
            { label: "Content", value: (publicContent.length + privateContentCount).toString(), icon: ImageIcon },
            { label: "Competitions", value: entries.length.toString(), icon: Trophy },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <stat.icon className="mx-auto mb-1.5 size-4 text-amber-500" />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-[11px] text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* VOTE FOR ME — the main CTA */}
        {activeEntry && (
          <section className="mb-12">
            <div className="overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-900/5 to-black">
              <div className="p-8 text-center sm:p-10">
                <Heart className="mx-auto mb-4 size-14 text-amber-500" />
                <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
                  Vote for {displayName}
                </h2>
                <p className="mb-1 text-zinc-400">
                  Each $5 token = 5 votes. {displayName} earns $1 from every token you spend.
                </p>
                <p className="mb-8 text-sm text-zinc-500">
                  Max 20 tokens (100 votes) per day per contestant
                </p>

                {/* Token selector */}
                <div className="mx-auto mb-6 flex max-w-xs items-center justify-center gap-4">
                  <button
                    onClick={() => setTokenCount(Math.max(1, tokenCount - 1))}
                    className="flex size-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-amber-500 hover:text-amber-500"
                  >
                    <Minus className="size-4" />
                  </button>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-500">{tokenCount}</div>
                    <div className="text-xs text-zinc-500">
                      {tokenCount === 1 ? "token" : "tokens"} = {tokenCount * 5} votes
                    </div>
                    <div className="text-xs text-zinc-600">${tokenCount * 5}</div>
                  </div>
                  <button
                    onClick={() => setTokenCount(Math.min(20, tokenCount + 1))}
                    className="flex size-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors hover:border-amber-500 hover:text-amber-500"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                {/* Quick-select buttons */}
                <div className="mx-auto mb-6 flex max-w-sm flex-wrap justify-center gap-2">
                  {[1, 5, 10, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTokenCount(n)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                        tokenCount === n
                          ? "bg-amber-500 text-black"
                          : "border border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400"
                      }`}
                    >
                      {n} {n === 1 ? "token" : "tokens"}
                    </button>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="h-14 bg-amber-500 px-12 text-lg font-bold text-black hover:bg-amber-400"
                  onClick={() => handleVote(activeEntry)}
                  disabled={voting}
                >
                  {voting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Heart className="size-5" />
                  )}
                  Vote Now — {tokenCount * 5} Votes
                </Button>

                {voteMessage && (
                  <div
                    className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                      voteMessage.type === "success"
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    {voteMessage.text}
                    {voteMessage.text.includes("log in") && (
                      <Link href="/login" className="ml-2 underline">Log in</Link>
                    )}
                    {voteMessage.text.includes("tokens") && (
                      <Link href="/dashboard/tokens" className="ml-2 underline">Buy Tokens</Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Prize info */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Plane className="size-5 text-amber-500" />
              <h4 className="font-semibold text-amber-400">Top 3 — Vegas Trip</h4>
            </div>
            <p className="text-sm text-zinc-400">
              All 3 finalists fly to Vegas with a +1 for 3 nights. Travel, hotel, and meals paid. Professional photo &amp; video shoot for the final round.
            </p>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Crown className="size-5 text-yellow-400" />
              <h4 className="font-semibold text-yellow-400">Grand Prize — $10,000 + Italy</h4>
            </div>
            <p className="text-sm text-zinc-400">
              The winner gets a 7-day Italy vacation for two (flight + hotel paid) plus $10,000 cash.
            </p>
          </div>
        </div>

        {/* Contest entries list */}
        {entries.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold">Competition History</h2>
            <div className="space-y-3">
              {entries.map((entry) => (
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
                        <span className="font-semibold">Contest</span>
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
                      {entry.current_round > 0 && entry.contests && (
                        <span>Round {entry.current_round} of {entry.contests.total_rounds}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Public gallery with social share on each item */}
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-bold">
            Gallery
            {publicContent.length > 0 && (
              <span className="ml-2 text-base font-normal text-zinc-500">
                ({publicContent.length})
              </span>
            )}
          </h2>
          {publicContent.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <ImageIcon className="mx-auto mb-3 size-10 text-zinc-600" />
              <p className="text-zinc-500">No public content yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {publicContent.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800"
                >
                  {item.type === "video" && item.public_url ? (
                    <video
                      src={item.public_url}
                      className="size-full object-cover"
                      muted
                      playsInline
                      onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                  ) : item.public_url ? (
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

                  {/* Hover overlay with share */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex w-full items-center justify-between p-3">
                      <span className="truncate text-xs text-white/80">
                        {item.caption || ""}
                      </span>
                      <SocialShare
                        url={profileUrl}
                        title={item.caption || `Check out ${displayName} on Built by Nature!`}
                        contestantName={displayName}
                        contestName={activeEntry?.contests?.name}
                      />
                    </div>
                  </div>

                  {item.type === "video" && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      <Play className="size-2.5" /> VIDEO
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Private content teaser */}
        {privateContentCount > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold">
              Exclusive Content (18+)
              <span className="ml-2 text-base font-normal text-zinc-500">
                ({privateContentCount})
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: Math.min(privateContentCount, 6) }).map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Lock className="mb-3 size-8 text-amber-500" />
                    <span className="text-sm font-semibold">18+ Content</span>
                    <span className="mt-1 text-xs text-zinc-400">Verify Age to View</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/signup/fan">
                <Button className="bg-amber-500 text-black hover:bg-amber-400">
                  <Lock className="size-4" />
                  Sign Up to Unlock
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Earnings transparency */}
        <div className="mb-12 rounded-xl border border-green-500/20 bg-green-500/5 p-6">
          <div className="flex items-start gap-4">
            <DollarSign className="size-7 shrink-0 text-green-400" />
            <div>
              <h3 className="mb-1 font-bold text-green-400">
                Contestants Earn 20% of Every Vote
              </h3>
              <p className="text-sm text-zinc-400">
                Each $5 token gives 5 votes. <strong className="text-white">{displayName}</strong> earns{" "}
                <strong className="text-green-400">$1 per token</strong> you spend. Want to compete?{" "}
                <Link href="/signup/contestant" className="text-amber-400 hover:underline">
                  Sign up as a contestant
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Not competing CTA */}
        {!activeEntry && (
          <section className="mb-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
              <Trophy className="mx-auto mb-4 size-12 text-zinc-600" />
              <h2 className="mb-2 text-xl font-bold text-zinc-400">
                Not currently competing
              </h2>
              <p className="mb-4 text-sm text-zinc-500">
                {displayName} is not in an active competition right now. Check back for the next season.
              </p>
              <Link href="/contests">
                <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                  Browse Competitions
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

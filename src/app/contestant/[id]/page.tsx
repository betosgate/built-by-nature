"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trophy,
  Lock,
  Crown,
  Plane,
  Loader2,
  Users,
  ImageIcon,
  Minus,
  Plus,
  Play,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { SocialShare } from "@/components/social-share";

interface ContestEntry {
  id: string;
  status: string;
  vote_count: number;
  current_round: number;
  contest_id: string;
  contests: { id: string; name: string; status: string; total_rounds: number } | null;
}

interface ContentItem {
  id: string;
  type: string;
  public_url: string | null;
  caption: string | null;
  is_private: boolean;
  is_18_plus: boolean;
}

interface ContestantData {
  profile: { id: string; display_name: string | null; avatar_url: string | null; bio: string | null };
  contestEntries: ContestEntry[];
  publicContent: ContentItem[];
  privateContentCount: number;
  totalVotes: number;
  rank: number | null;
  totalContestants: number | null;
}

export default function ContestantProfilePage() {
  const params = useParams();
  const contestantId = params.id as string;

  const [data, setData] = useState<ContestantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Voting
  const [tokenCount, setTokenCount] = useState(1);
  const [voting, setVoting] = useState(false);
  const [voteMsg, setVoteMsg] = useState<{ text: string; type: "ok" | "err" } | null>(null);

  // Lightbox
  const [lightboxItem, setLightboxItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/contestants/${contestantId}`);
        if (res.status === 404) { setError("not_found"); return; }
        if (!res.ok) { setError("Failed to load profile"); return; }
        setData(await res.json());
      } catch { setError("Failed to load profile"); }
      finally { setLoading(false); }
    }
    if (contestantId) load();
  }, [contestantId]);

  async function handleVote(entry: ContestEntry) {
    setVoting(true);
    setVoteMsg(null);
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: entry.id,
          contestId: entry.contest_id,
          roundNumber: entry.current_round || 1,
          tokensSpent: tokenCount,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        if (res.status === 401) { setVoteMsg({ text: "Please log in to vote.", type: "err" }); return; }
        if (result.needsTokens) { setVoteMsg({ text: "You need tokens to vote first.", type: "err" }); return; }
        setVoteMsg({ text: result.error || "Vote failed.", type: "err" });
        return;
      }
      const added = tokenCount * 5;
      setVoteMsg({ text: `${added} votes cast!`, type: "ok" });
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          totalVotes: prev.totalVotes + added,
          contestEntries: prev.contestEntries.map((e) =>
            e.id === entry.id ? { ...e, vote_count: e.vote_count + added } : e
          ),
        };
      });
      setTokenCount(1);
    } catch { setVoteMsg({ text: "Something went wrong.", type: "err" }); }
    finally { setVoting(false); }
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

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Users className="mx-auto mb-4 size-12 text-zinc-600" />
            <h1 className="mb-2 text-2xl font-bold">
              {error === "not_found" ? "Contestant Not Found" : "Error"}
            </h1>
            <p className="mb-6 text-zinc-400">
              {error === "not_found" ? "This profile doesn't exist." : error || "Something went wrong."}
            </p>
            <Link href="/contestants">
              <Button className="bg-amber-500 text-black hover:bg-amber-400">Browse Contestants</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { profile, contestEntries, publicContent, privateContentCount, totalVotes, rank, totalContestants } = data;
  const name = profile.display_name || "Anonymous";
  const activeEntry = contestEntries.find((e) => e.status === "active");
  const profileUrl = `/contestant/${profile.id}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-6">

        {/* ============ HERO: Big photo + name + vote button ============ */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Large profile image */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border border-zinc-800 sm:mx-0 sm:w-64">
            {profile.avatar_url ? (
              <Image src={profile.avatar_url} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="flex size-full items-center justify-center bg-zinc-900 text-6xl font-bold text-amber-500">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name, contest info, vote CTA */}
          <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:pt-2 sm:text-left">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{name}</h1>
            {profile.bio && (
              <p className="mt-2 max-w-md text-sm text-zinc-400">{profile.bio}</p>
            )}

            {/* Contest + rank stats row */}
            {activeEntry && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contests/${activeEntry.contests?.id}`}
                  className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
                >
                  {activeEntry.contests?.name || "Active Competition"}
                </Link>
                <span className="flex items-center gap-1 text-sm text-zinc-400">
                  <Heart className="size-3.5 text-amber-500" />
                  <strong className="text-white">{totalVotes.toLocaleString()}</strong> votes
                </span>
                {rank && totalContestants && (
                  <span className="flex items-center gap-1 text-sm text-zinc-400">
                    <Trophy className="size-3.5 text-amber-500" />
                    <strong className="text-white">#{rank}</strong> of {totalContestants}
                  </span>
                )}
              </div>
            )}

            {/* ===== VOTE FOR ME NOW — big CTA ===== */}
            {activeEntry && (
              <div className="mt-6 w-full max-w-sm">
                {/* Token selector */}
                <div className="mb-3 flex items-center justify-center gap-3 sm:justify-start">
                  <button
                    onClick={() => setTokenCount(Math.max(1, tokenCount - 1))}
                    className="flex size-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-400"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-amber-500">{tokenCount}</span>
                    <span className="ml-1.5 text-xs text-zinc-500">{tokenCount === 1 ? "token" : "tokens"} = {tokenCount * 5} votes</span>
                  </div>
                  <button
                    onClick={() => setTokenCount(Math.min(20, tokenCount + 1))}
                    className="flex size-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:border-amber-500 hover:text-amber-400"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                {/* Quick picks */}
                <div className="mb-3 flex justify-center gap-1.5 sm:justify-start">
                  {[1, 5, 10, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTokenCount(n)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        tokenCount === n
                          ? "bg-amber-500 text-black"
                          : "border border-zinc-700 text-zinc-500 hover:border-amber-500/50 hover:text-amber-400"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <Button
                  className="h-14 w-full bg-amber-500 text-lg font-bold text-black hover:bg-amber-400"
                  onClick={() => handleVote(activeEntry)}
                  disabled={voting}
                >
                  {voting ? <Loader2 className="size-5 animate-spin" /> : <Heart className="size-5" />}
                  Vote for Me Now
                </Button>

                {voteMsg && (
                  <div className={`mt-3 rounded-lg px-3 py-2 text-center text-sm ${
                    voteMsg.type === "ok"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {voteMsg.text}
                    {voteMsg.text.includes("log in") && (
                      <Link href="/login" className="ml-2 underline">Log in</Link>
                    )}
                    {voteMsg.text.includes("tokens") && (
                      <Link href="/account/tokens" className="ml-2 underline">Buy Tokens</Link>
                    )}
                  </div>
                )}

                <div className="mt-2 flex justify-center sm:justify-start">
                  <SocialShare
                    url={profileUrl}
                    title={`Vote for ${name} in Built by Nature!`}
                    contestantName={name}
                    contestName={activeEntry.contests?.name}
                  />
                </div>
              </div>
            )}

            {!activeEntry && (
              <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-500">
                Not currently competing. <Link href="/contests" className="text-amber-400 hover:underline">Browse competitions</Link>
              </div>
            )}
          </div>
        </div>

        {/* ============ PHOTO GALLERY — click to open + share ============ */}
        {publicContent.length > 0 && (
          <section className="mb-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {publicContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {item.type === "video" && item.public_url ? (
                    <video src={item.public_url} className="size-full object-cover" muted playsInline />
                  ) : item.public_url ? (
                    <Image
                      src={item.public_url}
                      alt={item.caption || "Photo"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-zinc-900">
                      <ImageIcon className="size-6 text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  {item.type === "video" && (
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
                      <Play className="size-2" /> VIDEO
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Private content teaser */}
        {privateContentCount > 0 && (
          <section className="mb-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {Array.from({ length: Math.min(privateContentCount, 3) }).map((_, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Lock className="mb-2 size-6 text-amber-500" />
                    <span className="text-xs font-semibold">18+</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Link href="/signup/fan">
                <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-400">
                  <Lock className="size-3.5" /> Sign Up to Unlock
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* ============ WHAT ARE YOU HELPING ME WIN? ============ */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold">What Are You Helping Me Win?</h2>

          {/* Earnings */}
          <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-zinc-300">
              <strong className="text-amber-400">{name}</strong> earns{" "}
              <strong className="text-green-400">20% of every vote</strong> received.
              Your support directly funds her journey to the crown.
            </p>
          </div>

          {/* Prizes */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-500/20 bg-zinc-900/50 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Plane className="size-4 text-amber-500" />
                <h4 className="text-sm font-semibold text-amber-400">Top 3 — Vegas Trip</h4>
              </div>
              <p className="text-xs text-zinc-400">
                All 3 finalists fly to Vegas with a +1 for 3 nights. Travel, hotel, meals paid. Pro photo &amp; video shoot.
              </p>
            </div>
            <div className="rounded-xl border border-yellow-500/20 bg-zinc-900/50 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Crown className="size-4 text-yellow-400" />
                <h4 className="text-sm font-semibold text-yellow-400">Winner — $10K + Italy</h4>
              </div>
              <p className="text-xs text-zinc-400">
                7-day Italy vacation for two (flight + hotel) plus $10,000 cash prize.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ============ LIGHTBOX / IMAGE MODAL ============ */}
      {lightboxItem && lightboxItem.public_url && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
            onClick={() => setLightboxItem(null)}
          >
            <X className="size-5" />
          </button>

          <div
            className="relative flex max-h-[85vh] max-w-lg flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.type === "video" ? (
              <video
                src={lightboxItem.public_url}
                className="max-h-[75vh] rounded-xl"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <div className="relative aspect-[3/4] w-full max-w-lg overflow-hidden rounded-xl">
                <Image
                  src={lightboxItem.public_url}
                  alt={lightboxItem.caption || "Photo"}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Caption + share row */}
            <div className="mt-3 flex w-full items-center justify-between gap-3">
              <span className="truncate text-sm text-zinc-400">
                {lightboxItem.caption || ""}
              </span>
              <SocialShare
                url={profileUrl}
                title={lightboxItem.caption || `Check out ${name} on Built by Nature!`}
                contestantName={name}
                contestName={activeEntry?.contests?.name}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

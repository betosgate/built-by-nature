"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Clock, ArrowRight, Users, Crown, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface Contest {
  id: string;
  name: string;
  description: string;
  status: "open" | "in_progress" | "completed" | "draft";
  current_round: number;
  total_rounds: number;
  entry_deadline: string;
  prizes_description: string;
  cover_image_url: string;
  rules_text: string;
}

function getStatusBadge(status: Contest["status"]) {
  switch (status) {
    case "open":
      return { label: "Enrollment Open", className: "bg-green-500/20 text-green-400 border-green-500/30" };
    case "in_progress":
      return { label: "In Progress", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    case "completed":
      return { label: "Completed", className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" };
    case "draft":
      return { label: "Coming Soon", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
    default:
      return { label: "Unknown", className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" };
  }
}

function getCtaButton(status: Contest["status"], contestId: string) {
  switch (status) {
    case "open":
      return { label: "Enter Now", href: `/contests/${contestId}` };
    case "in_progress":
      return { label: "Vote Now", href: `/contests/${contestId}` };
    case "completed":
      return { label: "View Results", href: `/contests/${contestId}` };
    case "draft":
      return { label: "Coming Soon", href: "#" };
    default:
      return { label: "View", href: `/contests/${contestId}` };
  }
}

function useCountdown(deadline: string) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const target = new Date(deadline).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Deadline passed");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return timeLeft;
}

function RoundProgress({ totalRounds, currentRound }: { totalRounds: number; currentRound: number }) {
  const roundNames = ["Round 1", "Round 2", "Round 3"];

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalRounds }, (_, i) => {
        const roundNum = i + 1;
        const isActive = roundNum === currentRound;
        const isCompleted = roundNum < currentRound;

        return (
          <div key={roundNum} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  isActive
                    ? "bg-amber-500 border-amber-400 text-black"
                    : isCompleted
                    ? "bg-amber-500/30 border-amber-500/50 text-amber-400"
                    : "bg-zinc-800 border-zinc-700 text-zinc-500"
                }`}
              >
                {roundNum}
              </div>
              <span className={`text-[10px] ${isActive ? "text-amber-400 font-semibold" : "text-zinc-500"}`}>
                {roundNames[i] || `Round ${roundNum}`}
              </span>
            </div>
            {i < totalRounds - 1 && (
              <div
                className={`w-8 h-0.5 mb-4 ${
                  isCompleted ? "bg-amber-500/50" : "bg-zinc-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContestCard({ contest }: { contest: Contest }) {
  const statusBadge = getStatusBadge(contest.status);
  const cta = getCtaButton(contest.status, contest.id);
  const countdown = useCountdown(contest.entry_deadline);
  const isDraft = contest.status === "draft";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5">
      {/* Cover Image */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <Image
          src={contest.cover_image_url}
          alt={contest.name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isDraft ? "grayscale-[50%]" : ""}`}
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Status Badge */}
        <Badge className={`absolute right-4 top-4 ${statusBadge.className}`}>
          {statusBadge.label}
        </Badge>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            {contest.name}
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mb-4 leading-relaxed">
            {contest.description}
          </p>

          {/* Countdown for open contests */}
          {contest.status === "open" && (
            <div className="flex items-center gap-2 mb-4">
              <Clock className="size-5 text-amber-500" />
              <span className="text-amber-400 font-semibold text-sm sm:text-base">
                Enrollment closes in: {countdown}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Round Progress */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
            Competition Rounds
          </h3>
          <RoundProgress totalRounds={contest.total_rounds} currentRound={contest.current_round} />
        </div>

        {/* Prizes */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="size-5 text-amber-500" />
            <h3 className="font-semibold text-amber-400 text-sm uppercase tracking-wider">
              Prizes
            </h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {contest.prizes_description}
          </p>
        </div>

        {/* CTA */}
        {isDraft ? (
          <Button
            variant="outline"
            className="w-full sm:w-auto border-zinc-700 text-zinc-400 h-12 px-8 cursor-not-allowed"
            disabled
          >
            Coming Soon
          </Button>
        ) : (
          <Link href={cta.href}>
            <Button className="w-full sm:w-auto bg-amber-500 text-black hover:bg-amber-400 font-bold h-12 px-8 text-base">
              {cta.label}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContests() {
      try {
        const res = await fetch("/api/contests");
        if (!res.ok) throw new Error("Failed to fetch competitions");
        const data = await res.json();
        setContests(data.contests || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load competitions");
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown className="size-6 text-amber-500" />
            <span className="text-amber-500 font-semibold uppercase tracking-widest text-sm">
              Built by Nature
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Competitions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Enter the arena. Real beauty, real stakes, real prizes. Browse active
            competitions or get ready for what&apos;s next.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Flame className="size-10 text-amber-500 animate-pulse" />
            <p className="text-zinc-500 text-sm">Loading competitions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-red-400">{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && contests.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="size-12 text-zinc-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-zinc-400 mb-2">No competitions yet</h2>
            <p className="text-zinc-500">Check back soon for upcoming competitions.</p>
          </div>
        )}

        {/* Contest Cards */}
        {!loading && !error && contests.length > 0 && (
          <div className="space-y-10">
            {contests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Heart, Clock, ArrowRight, Users, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContestEntry {
  id: string;
  status: string;
  current_round: number;
  vote_count: number;
  created_at: string;
  contests: {
    id: string;
    name: string;
    status: string;
    current_round: number;
    total_rounds: number;
    entry_deadline: string | null;
  };
}

function timeUntil(dateStr: string | null): string {
  if (!dateStr) return "No deadline";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${days}d ${hours}h`;
}

export default function MyContestsPage() {
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries || []);
        }
      } catch {
        console.error("Failed to load contests");
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  const activeEntries = entries.filter((e) => e.status === "active");
  const pastEntries = entries.filter(
    (e) => e.status === "eliminated" || e.status === "winner"
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">
            My <span className="text-amber-500">Contests</span>
          </h1>
          <p className="mt-1 text-zinc-400">
            Track all contests you&apos;re participating in.
          </p>
        </div>
        <Link href="/contests">
          <Button className="gap-2 bg-amber-500 text-black hover:bg-amber-400">
            <Trophy className="size-4" />
            Browse Contests
          </Button>
        </Link>
      </div>

      {/* Active Contests */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Active Contests</h2>
        {activeEntries.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
            <Trophy className="mx-auto mb-3 size-10 text-zinc-600" />
            <p className="text-zinc-400">No active contest entries.</p>
            <Link href="/contests">
              <Button className="mt-4 bg-amber-500 text-black hover:bg-amber-400">
                Enter a Contest
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        href={`/contests/${entry.contests.id}`}
                        className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                      >
                        {entry.contests.name}
                      </Link>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                      <span>
                        Round {entry.contests.current_round} of{" "}
                        {entry.contests.total_rounds}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        Ends {timeUntil(entry.contests.entry_deadline)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl font-bold text-white">
                        <Heart className="size-4 text-amber-500" />
                        {entry.vote_count.toLocaleString()}
                      </div>
                      <span className="text-xs text-zinc-500">total votes</span>
                    </div>
                    <Link href={`/contests/${entry.contests.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-400"
                      >
                        View <ArrowRight className="ml-1 size-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Contests */}
      {pastEntries.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Past Contests</h2>
          <div className="space-y-4">
            {pastEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 opacity-75"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold text-zinc-300">
                        {entry.contests.name}
                      </span>
                      <Badge
                        className={
                          entry.status === "winner"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : "bg-zinc-700/50 text-zinc-400 border-zinc-600/30"
                        }
                      >
                        {entry.status === "winner" ? "Winner!" : "Completed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-zinc-400">
                      <Heart className="size-4" />
                      {entry.vote_count.toLocaleString()}
                    </div>
                    <span className="text-xs text-zinc-500">final votes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

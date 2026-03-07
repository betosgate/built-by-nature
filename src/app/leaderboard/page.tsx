"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Search, Loader2, Crown, Heart, Medal, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface LeaderboardEntry {
  rank: number;
  id: string;
  entryId: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  votes: number;
  totalVotes?: number;
  contestName: string;
  contestId: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const periods = [
  { value: "all", label: "All Time", icon: Trophy },
  { value: "weekly", label: "This Week", icon: Calendar },
  { value: "daily", label: "Today", icon: Clock },
];

function getRankStyle(rank: number) {
  if (rank === 1) return { bg: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/40", icon: <Crown className="size-5 text-yellow-400" /> };
  if (rank === 2) return { bg: "bg-gradient-to-r from-zinc-400/10 to-zinc-300/10 border-zinc-400/30", icon: <Medal className="size-5 text-zinc-300" /> };
  if (rank === 3) return { bg: "bg-gradient-to-r from-amber-700/10 to-amber-600/10 border-amber-700/30", icon: <Medal className="size-5 text-amber-600" /> };
  return { bg: "bg-zinc-900/50 border-zinc-800", icon: null };
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setEntries([]);
  }, [debouncedSearch, period]);

  const fetchLeaderboard = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          period,
          page: pageNum.toString(),
          limit: "20",
        });
        if (debouncedSearch) params.set("search", debouncedSearch);
        const res = await fetch(`/api/leaderboard?${params}`);
        const data = await res.json();
        if (res.ok) {
          setEntries(data.leaderboard || []);
          setPagination(data.pagination || null);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    },
    [period, debouncedSearch]
  );

  useEffect(() => {
    fetchLeaderboard(page);
  }, [page, fetchLeaderboard]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <TrendingUp className="size-6 text-amber-500" />
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-500">
              Rankings
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Leaderboard
          </h1>
          <p className="mx-auto max-w-xl text-zinc-400">
            See who&apos;s leading the competition. Vote for your favorites to help them climb the ranks.
          </p>
        </div>

        {/* Period Tabs */}
        <div className="mb-6 flex justify-center gap-2">
          {periods.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  period === p.value
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search contestants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-amber-500"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-amber-500 mb-3" />
            <p className="text-sm text-zinc-500">Loading rankings...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && entries.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="mx-auto mb-4 size-12 text-zinc-700" />
            <h3 className="mb-2 text-lg font-bold text-zinc-400">No rankings yet</h3>
            <p className="text-sm text-zinc-500 mb-6">
              {period !== "all"
                ? `No votes recorded ${period === "daily" ? "today" : "this week"} yet.`
                : "Be the first to enter the competition!"}
            </p>
            <Link href="/signup/contestant">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                Enter the Competition
              </Button>
            </Link>
          </div>
        )}

        {/* Leaderboard List */}
        {!loading && entries.length > 0 && (
          <div className="space-y-3">
            {entries.map((entry) => {
              const style = getRankStyle(entry.rank);
              return (
                <Link
                  key={entry.entryId}
                  href={`/contestant/${entry.id}`}
                  className={`group flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 ${style.bg}`}
                >
                  {/* Rank */}
                  <div className="flex size-10 shrink-0 items-center justify-center">
                    {style.icon || (
                      <span className="text-lg font-bold text-zinc-500">
                        {entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-zinc-700 group-hover:border-amber-500/50">
                    {entry.avatar_url ? (
                      <Image
                        src={entry.avatar_url}
                        alt={entry.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-zinc-800 text-lg font-bold text-amber-500">
                        {entry.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold group-hover:text-amber-400 transition-colors">
                      {entry.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {entry.contestName}
                    </p>
                  </div>

                  {/* Votes */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Heart className="size-4 text-amber-500 fill-amber-500" />
                      <span className="text-lg font-bold text-amber-400">
                        {entry.votes.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {period === "all" ? "total votes" : period === "weekly" ? "this week" : "today"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-zinc-700 text-zinc-400 hover:text-white"
            >
              Previous
            </Button>
            <span className="text-sm text-zinc-500">
              Page {page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border-zinc-700 text-zinc-400 hover:text-white"
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

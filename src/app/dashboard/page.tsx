"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Trophy,
  DollarSign,
  Coins,
  ArrowUpRight,
  ArrowRight,
  Camera,
  User,
  BarChart3,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardData {
  profile: {
    displayName: string;
    role: string;
    tokensBalance: number;
    totalEarnings: number;
    avatarUrl: string | null;
    referralCode: string;
  };
  stats: {
    totalVotes: number;
    activeContests: number;
    totalEarnings: number;
    tokensBalance: number;
    contentCount: number;
  };
  entries: Array<{
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
  }>;
  recentVotes: Array<{
    id: string;
    tokens_spent: number;
    created_at: string;
    voter_id: string;
  }>;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function timeUntil(dateStr: string | null): string {
  if (!dateStr) return "No deadline";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  return `${days}d ${hours}h`;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        console.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const profile = data?.profile;
  const stats = data?.stats;
  const entries = data?.entries || [];
  const recentVotes = data?.recentVotes || [];

  const statCards = [
    {
      label: "Total Votes",
      value: (stats?.totalVotes || 0).toLocaleString(),
      change: `${entries.length} contest entries`,
      icon: Heart,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Active Contests",
      value: String(stats?.activeContests || 0),
      change: `of ${entries.length} total entries`,
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Earnings",
      value: `$${Number(stats?.totalEarnings || 0).toFixed(2)}`,
      change: "20% of vote revenue",
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Token Balance",
      value: (stats?.tokensBalance || 0).toLocaleString(),
      change: "Available to use",
      icon: Coins,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">
          Welcome back,{" "}
          <span className="text-amber-500">
            {profile?.displayName || "there"}
          </span>
        </h1>
        <p className="mt-1 text-zinc-400">
          Here&apos;s what&apos;s happening with your contests today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-zinc-400">{stat.label}</span>
              <div
                className={`flex size-9 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
              <ArrowUpRight className="size-3 text-green-400" />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Contests */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h2 className="text-base font-bold">Your Contest Entries</h2>
              <Link
                href="/dashboard/contests"
                className="text-sm text-amber-500 hover:text-amber-400"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {entries.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Trophy className="mx-auto mb-3 size-8 text-zinc-600" />
                  <p className="text-sm text-zinc-400">
                    You haven&apos;t entered any contests yet.
                  </p>
                  <Link href="/contests">
                    <Button className="mt-3 bg-amber-500 text-black hover:bg-amber-400">
                      Browse Contests
                    </Button>
                  </Link>
                </div>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <Link
                        href={`/contests/${entry.contests.id}`}
                        className="font-medium text-white hover:text-amber-400 transition-colors"
                      >
                        {entry.contests.name}
                      </Link>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span>
                          Round {entry.contests.current_round} of{" "}
                          {entry.contests.total_rounds}
                        </span>
                        <span>
                          Ends {timeUntil(entry.contests.entry_deadline)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-semibold text-white">
                          <Heart className="size-3.5 text-amber-500" />
                          {entry.vote_count.toLocaleString()}
                        </div>
                        <span className="text-xs text-zinc-500">votes</span>
                      </div>
                      <Badge
                        className={
                          entry.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : entry.status === "winner"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Vote Activity Placeholder */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">Vote Activity</h2>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <TrendingUp className="size-3 text-green-400" />
                {stats?.contentCount || 0} uploads
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 size-8 text-zinc-600" />
                <span className="text-sm text-zinc-500">
                  Vote activity chart
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="mb-4 text-base font-bold">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/upload">
                <Button className="w-full justify-start gap-2 bg-amber-500 text-black hover:bg-amber-400">
                  <Camera className="size-4" />
                  Upload Content
                  <ArrowRight className="ml-auto size-4" />
                </Button>
              </Link>
              <Link href="/contests">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-400"
                >
                  <Trophy className="size-4" />
                  Enter Contest
                  <ArrowRight className="ml-auto size-4" />
                </Button>
              </Link>
              <Link href="/dashboard/earnings">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-400"
                >
                  <DollarSign className="size-4" />
                  View Earnings
                  <ArrowRight className="ml-auto size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Votes */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="mb-4 text-base font-bold">Recent Votes</h2>
            <div className="space-y-3">
              {recentVotes.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No votes yet. Share your profile to get started!
                </p>
              ) : (
                recentVotes.map((vote) => (
                  <div
                    key={vote.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
                        <User className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          Fan
                        </div>
                        <div className="text-xs text-zinc-500">
                          {timeAgo(vote.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                      +{vote.tokens_spent * 5}
                      <Heart className="size-3" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Referral Code */}
          {profile?.referralCode && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h2 className="mb-2 text-sm font-bold text-amber-400">
                Your Referral Code
              </h2>
              <div className="rounded-lg bg-zinc-900 px-4 py-2 text-center font-mono text-lg text-white">
                {profile.referralCode}
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Share this code to recruit contestants and earn 10% of their
                vote revenue.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

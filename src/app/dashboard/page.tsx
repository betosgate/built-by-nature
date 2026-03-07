"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    label: "Total Votes",
    value: "12,847",
    change: "+342 this week",
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    label: "Active Contests",
    value: "3",
    change: "2 in progress",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Earnings",
    value: "$1,284.50",
    change: "+$186 this month",
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Token Balance",
    value: "4,520",
    change: "Available to use",
    icon: Coins,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

const activeContests = [
  {
    id: "summer-glow-2026",
    name: "Summer Glow 2026",
    votes: 3842,
    round: "Round 1: Open Entry",
    status: "Active",
    rank: 1,
    totalEntrants: 342,
    endsIn: "4d 12h",
  },
  {
    id: "natural-beauty-classic",
    name: "Natural Beauty Classic",
    votes: 2156,
    round: "Round 2: Top 20",
    status: "Active",
    rank: 5,
    totalEntrants: 518,
    endsIn: "1d 6h",
  },
  {
    id: "fitness-physique-open",
    name: "Fitness Physique Open",
    votes: 1204,
    round: "Round 1: Open Entry",
    status: "Active",
    rank: 12,
    totalEntrants: 276,
    endsIn: "6d 3h",
  },
];

const recentVotes = [
  { voter: "VoteKing99", amount: 50, time: "2 min ago" },
  { voter: "BeachVibes", amount: 25, time: "15 min ago" },
  { voter: "FitnessFan23", amount: 100, time: "1 hr ago" },
  { voter: "StarGazer", amount: 10, time: "2 hrs ago" },
  { voter: "NightOwl_X", amount: 75, time: "3 hrs ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">
          Welcome back, <span className="text-amber-500">Aria</span>
        </h1>
        <p className="mt-1 text-zinc-400">
          Here&apos;s what&apos;s happening with your contests today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
              <h2 className="text-base font-bold">Active Contests</h2>
              <Link
                href="/dashboard/contests"
                className="text-sm text-amber-500 hover:text-amber-400"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {activeContests.map((contest) => (
                <div
                  key={contest.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <Link
                      href={`/contests/${contest.id}`}
                      className="font-medium text-white hover:text-amber-400 transition-colors"
                    >
                      {contest.name}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      <span>{contest.round}</span>
                      <span>
                        Rank #{contest.rank} of {contest.totalEntrants}
                      </span>
                      <span>Ends in {contest.endsIn}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-semibold text-white">
                        <Heart className="size-3.5 text-amber-500" />
                        {contest.votes.toLocaleString()}
                      </div>
                      <span className="text-xs text-zinc-500">votes</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {contest.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Votes Chart Placeholder */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">Vote Activity</h2>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <TrendingUp className="size-3 text-green-400" />
                +18% this week
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
              <Link href="/contestant/aria-summers">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-400"
                >
                  <User className="size-4" />
                  View Profile
                  <ArrowRight className="ml-auto size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Votes */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="mb-4 text-base font-bold">Recent Votes</h2>
            <div className="space-y-3">
              {recentVotes.map((vote, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
                      {vote.voter.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {vote.voter}
                      </div>
                      <div className="text-xs text-zinc-500">{vote.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                    +{vote.amount}
                    <Coins className="size-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

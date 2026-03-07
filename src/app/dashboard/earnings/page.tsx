"use client";

import Image from "next/image";
import {
  DollarSign,
  Clock,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Download,
  Users,
  Heart,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const earningsBreakdown = [
  {
    date: "Mar 7, 2026",
    source: "Votes",
    contest: "Summer Glow 2026",
    amount: "$38.40",
  },
  {
    date: "Mar 6, 2026",
    source: "Votes",
    contest: "Natural Beauty Classic",
    amount: "$24.60",
  },
  {
    date: "Mar 6, 2026",
    source: "Prize",
    contest: "Fitness Physique Open",
    amount: "$150.00",
  },
  {
    date: "Mar 5, 2026",
    source: "Votes",
    contest: "Summer Glow 2026",
    amount: "$52.80",
  },
  {
    date: "Mar 4, 2026",
    source: "Votes",
    contest: "Natural Beauty Classic",
    amount: "$18.20",
  },
  {
    date: "Mar 3, 2026",
    source: "Votes",
    contest: "Summer Glow 2026",
    amount: "$44.00",
  },
  {
    date: "Mar 2, 2026",
    source: "Votes",
    contest: "Couple Goals",
    amount: "$31.60",
  },
  {
    date: "Mar 1, 2026",
    source: "Prize",
    contest: "Tattoo Showcase",
    amount: "$750.00",
  },
  {
    date: "Feb 28, 2026",
    source: "Votes",
    contest: "Summer Glow 2026",
    amount: "$27.40",
  },
  {
    date: "Feb 27, 2026",
    source: "Votes",
    contest: "Natural Beauty Classic",
    amount: "$16.80",
  },
];

const voterInsights = [
  {
    name: "VoteKing99",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    totalVotes: 842,
    totalSpent: "$168.40",
    lastVote: "2 min ago",
  },
  {
    name: "BeachVibes",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    totalVotes: 625,
    totalSpent: "$125.00",
    lastVote: "15 min ago",
  },
  {
    name: "FitnessFan23",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    totalVotes: 510,
    totalSpent: "$102.00",
    lastVote: "1 hr ago",
  },
  {
    name: "StarGazer",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
    totalVotes: 384,
    totalSpent: "$76.80",
    lastVote: "3 hrs ago",
  },
  {
    name: "NightOwl_X",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
    totalVotes: 290,
    totalSpent: "$58.00",
    lastVote: "1d ago",
  },
];

export default function EarningsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">
          Your <span className="text-amber-500">Earnings</span>
        </h1>
        <p className="mt-1 text-zinc-400">
          You earn 20% of all token votes cast on your content. Track your
          income and request payouts.
        </p>
      </div>

      {/* Top Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {/* Total Earnings */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total Earnings</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
              <DollarSign className="size-5 text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">$1,284.50</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
            <ArrowUpRight className="size-3" />
            +$186.20 this month
          </div>
        </div>

        {/* Pending Payout */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Pending Payout</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="size-5 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">$342.80</div>
          <div className="mt-3">
            <Button className="bg-amber-500 text-black hover:bg-amber-400">
              <Download className="size-4" />
              Request Payout
            </Button>
          </div>
        </div>

        {/* This Month */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Monthly Average</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <TrendingUp className="size-5 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">$214.08</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            Based on last 6 months
          </div>
        </div>
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">Earnings Over Time</h2>
          <div className="flex gap-2">
            {["7D", "30D", "90D", "All"].map((period) => (
              <button
                key={period}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  period === "30D"
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-52 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30">
          <div className="text-center">
            <BarChart3 className="mx-auto mb-2 size-10 text-zinc-600" />
            <span className="text-sm text-zinc-500">
              Earnings chart visualization
            </span>
            <p className="mt-1 text-xs text-zinc-600">
              Shows daily earnings from vote revenue (20% share)
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Earnings Breakdown Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
              <h2 className="text-base font-bold">Earnings Breakdown</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Source</TableHead>
                  <TableHead className="text-zinc-400">Contest</TableHead>
                  <TableHead className="text-right text-zinc-400">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningsBreakdown.map((row, i) => (
                  <TableRow key={i} className="border-zinc-800">
                    <TableCell className="text-zinc-300">{row.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.source === "Prize"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {row.source === "Votes" && (
                          <Heart className="size-3" />
                        )}
                        {row.source === "Prize" && (
                          <DollarSign className="size-3" />
                        )}
                        {row.source}
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {row.contest}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-400">
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Voter Insights */}
        <div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-4">
              <Users className="size-4 text-amber-500" />
              <h2 className="text-base font-bold">Top Voters</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {voterInsights.map((voter, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={voter.avatar}
                        alt={voter.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white">
                        {voter.name}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Heart className="size-3 text-amber-500" />
                          {voter.totalVotes.toLocaleString()} votes
                        </span>
                        <span className="text-green-400">
                          {voter.totalSpent}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Calendar className="size-3" />
                      {voter.lastVote}
                    </div>
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

"use client";

import Link from "next/link";
import { Trophy, Heart, Clock, ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const myContests = [
  {
    id: "summer-glow-2026",
    name: "Summer Glow 2026",
    status: "Active",
    votes: 3842,
    rank: 1,
    round: "Round 1: Open Entry",
    totalEntrants: 342,
    endsIn: "4d 12h",
  },
  {
    id: "natural-beauty-classic",
    name: "Natural Beauty Classic",
    status: "Active",
    votes: 2156,
    rank: 5,
    round: "Round 2: Top 20",
    totalEntrants: 518,
    endsIn: "1d 6h",
  },
  {
    id: "fitness-physique-open",
    name: "Fitness Physique Open",
    status: "Active",
    votes: 1204,
    rank: 12,
    round: "Round 1: Open Entry",
    totalEntrants: 276,
    endsIn: "6d 3h",
  },
];

const pastContests = [
  {
    id: "tattoo-showcase",
    name: "Tattoo Showcase",
    status: "Completed",
    votes: 5420,
    rank: 3,
    round: "Finished",
    totalEntrants: 210,
    prize: "$750",
  },
  {
    id: "couple-goals",
    name: "Couple Goals",
    status: "Completed",
    votes: 1890,
    rank: 8,
    round: "Finished",
    totalEntrants: 145,
    prize: null,
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-zinc-700/50 text-zinc-400 border-zinc-600/30",
};

export default function MyContestsPage() {
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
        <div className="space-y-4">
          {myContests.map((contest) => (
            <div
              key={contest.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link
                      href={`/contests/${contest.id}`}
                      className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      {contest.name}
                    </Link>
                    <Badge className={statusColors[contest.status]}>
                      {contest.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                    <span>{contest.round}</span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      Rank #{contest.rank} of {contest.totalEntrants}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      Ends in {contest.endsIn}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xl font-bold text-white">
                      <Heart className="size-4 text-amber-500" />
                      {contest.votes.toLocaleString()}
                    </div>
                    <span className="text-xs text-zinc-500">total votes</span>
                  </div>
                  <Link href={`/contests/${contest.id}`}>
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
      </div>

      {/* Past Contests */}
      <div>
        <h2 className="text-lg font-bold mb-4">Past Contests</h2>
        <div className="space-y-4">
          {pastContests.map((contest) => (
            <div
              key={contest.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 opacity-75"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-semibold text-zinc-300">
                      {contest.name}
                    </span>
                    <Badge className={statusColors[contest.status]}>
                      {contest.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                    <span>Final Rank: #{contest.rank} of {contest.totalEntrants}</span>
                    {contest.prize && (
                      <span className="text-amber-400 font-semibold">
                        Won {contest.prize}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold text-zinc-400">
                    <Heart className="size-4" />
                    {contest.votes.toLocaleString()}
                  </div>
                  <span className="text-xs text-zinc-500">final votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

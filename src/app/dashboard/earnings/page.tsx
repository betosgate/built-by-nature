"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  Heart,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EarningRecord {
  id: string;
  source_type: string;
  amount: number;
  created_at: string;
  contest_id: string | null;
  contests: { name: string } | null;
}

interface EarningsData {
  totalEarnings: number;
  voteEarnings: number;
  recruitEarnings: number;
  recentEarnings: EarningRecord[];
}

export default function EarningsPage() {
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEarnings() {
      try {
        const res = await fetch("/api/dashboard/earnings");
        if (!res.ok) {
          throw new Error("Failed to fetch earnings");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load earnings");
      } finally {
        setLoading(false);
      }
    }
    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const { totalEarnings, voteEarnings, recruitEarnings, recentEarnings } =
    data || { totalEarnings: 0, voteEarnings: 0, recruitEarnings: 0, recentEarnings: [] };

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatSourceType(type: string) {
    switch (type) {
      case "vote_share":
        return "Votes";
      case "recruitment_bonus":
        return "Recruitment";
      case "prize":
        return "Prize";
      default:
        return type;
    }
  }

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
          <div className="text-3xl font-bold text-white">
            ${Number(totalEarnings).toFixed(2)}
          </div>
        </div>

        {/* Vote Earnings */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Vote Earnings</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Heart className="size-5 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            ${Number(voteEarnings).toFixed(2)}
          </div>
        </div>

        {/* Recruitment Earnings */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Recruitment Earnings</span>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="size-5 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            ${Number(recruitEarnings).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-amber-500" />
            <h2 className="text-base font-bold">Recent Earnings</h2>
          </div>
        </div>

        {recentEarnings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <DollarSign className="mb-3 size-10 text-zinc-700" />
            <p className="text-sm text-zinc-500">No earnings yet</p>
            <p className="mt-1 text-xs text-zinc-600">
              Enter contests and earn from votes on your content
            </p>
          </div>
        ) : (
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
              {recentEarnings.map((record) => (
                <TableRow key={record.id} className="border-zinc-800">
                  <TableCell className="text-zinc-300">
                    {formatDate(record.created_at)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        record.source_type === "prize"
                          ? "bg-amber-500/10 text-amber-400"
                          : record.source_type === "recruitment_bonus"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {record.source_type === "vote_share" && (
                        <Heart className="size-3" />
                      )}
                      {record.source_type === "recruitment_bonus" && (
                        <Users className="size-3" />
                      )}
                      {record.source_type === "prize" && (
                        <DollarSign className="size-3" />
                      )}
                      {formatSourceType(record.source_type)}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {record.contests?.name || "--"}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-400">
                    ${Number(record.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

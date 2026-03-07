"use client";

import { useState } from "react";
import { Copy, Check, Users, UserCheck, DollarSign, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const referralCode = "REC-MK2847";
const referralLink = `https://builtbynature.com/signup?ref=${referralCode}`;

const stats = [
  { label: "Total Recruited", value: "24", icon: Users },
  { label: "Active Contestants", value: "18", icon: UserCheck },
  { label: "Total Earnings", value: "$1,842.30", icon: DollarSign },
  { label: "Pending Payout", value: "$425.00", icon: Clock },
];

interface VoterBreakdown {
  voterName: string;
  votesGiven: number;
  amountEarned: string;
}

interface RecruitedContestant {
  id: number;
  name: string;
  avatar: string;
  status: "Active" | "Eliminated" | "Winner";
  totalVotes: number;
  yourEarnings: string;
  voters: VoterBreakdown[];
}

const recruitedContestants: RecruitedContestant[] = [
  {
    id: 1, name: "Sarah Johnson", avatar: "SJ", status: "Active", totalVotes: 1240, yourEarnings: "$620.00",
    voters: [
      { voterName: "Emily Chen", votesGiven: 45, amountEarned: "$22.50" },
      { voterName: "James Wilson", votesGiven: 32, amountEarned: "$16.00" },
      { voterName: "Chris Lee", votesGiven: 28, amountEarned: "$14.00" },
      { voterName: "Ryan Garcia", votesGiven: 19, amountEarned: "$9.50" },
    ],
  },
  {
    id: 2, name: "Olivia Brown", avatar: "OB", status: "Active", totalVotes: 890, yourEarnings: "$445.00",
    voters: [
      { voterName: "James Wilson", votesGiven: 38, amountEarned: "$19.00" },
      { voterName: "Mia Rodriguez", votesGiven: 25, amountEarned: "$12.50" },
      { voterName: "Chris Lee", votesGiven: 20, amountEarned: "$10.00" },
    ],
  },
  {
    id: 3, name: "Aisha Patel", avatar: "AP", status: "Winner", totalVotes: 2150, yourEarnings: "$1,075.00",
    voters: [
      { voterName: "Emily Chen", votesGiven: 60, amountEarned: "$30.00" },
      { voterName: "Ryan Garcia", votesGiven: 55, amountEarned: "$27.50" },
      { voterName: "Chris Lee", votesGiven: 42, amountEarned: "$21.00" },
      { voterName: "Mia Rodriguez", votesGiven: 35, amountEarned: "$17.50" },
      { voterName: "James Wilson", votesGiven: 28, amountEarned: "$14.00" },
    ],
  },
  {
    id: 4, name: "Tanya Moore", avatar: "TM", status: "Eliminated", totalVotes: 320, yourEarnings: "$160.00",
    voters: [
      { voterName: "Emily Chen", votesGiven: 15, amountEarned: "$7.50" },
      { voterName: "Ryan Garcia", votesGiven: 10, amountEarned: "$5.00" },
    ],
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400",
  Eliminated: "bg-red-500/20 text-red-400",
  Winner: "bg-amber-500/20 text-amber-400",
};

export default function RecruiterDashboard() {
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Track your referrals and earnings
          </p>
        </div>

        {/* Referral Link */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
          <h3 className="mb-3 text-sm font-medium text-zinc-400">
            Your Referral Link
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-300">
              {referralLink}
            </div>
            <Button
              onClick={handleCopy}
              className="gap-2 bg-amber-500 text-black hover:bg-amber-400"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-zinc-900 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{stat.label}</span>
                  <Icon className="h-5 w-5 text-amber-500" />
                </div>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Request Payout */}
        <div className="flex justify-end">
          <Button className="gap-2 bg-amber-500 text-black hover:bg-amber-400">
            <DollarSign className="h-4 w-4" />
            Request Payout
          </Button>
        </div>

        {/* Recruited Contestants Table */}
        <div className="rounded-xl border border-white/10 bg-zinc-900">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-lg font-semibold">Recruited Contestants</h3>
            <p className="text-sm text-zinc-400">
              You earn 10% from every vote your recruited contestants receive
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-zinc-400">
                  <th className="px-6 py-3 font-medium">Contestant</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Total Votes</th>
                  <th className="px-6 py-3 font-medium">Your Earnings</th>
                  <th className="px-6 py-3 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {recruitedContestants.map((contestant) => (
                  <>
                    <tr
                      key={contestant.id}
                      className="border-b border-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold">
                            {contestant.avatar}
                          </div>
                          <span className="font-medium">{contestant.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[contestant.status]}`}
                        >
                          {contestant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {contestant.totalVotes.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-amber-400">
                        {contestant.yourEarnings}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleExpand(contestant.id)}
                          className="flex items-center gap-1 text-zinc-400 transition-colors hover:text-white"
                        >
                          {expandedId === contestant.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          Voters
                        </button>
                      </td>
                    </tr>
                    {expandedId === contestant.id && (
                      <tr key={`${contestant.id}-voters`}>
                        <td colSpan={5} className="bg-zinc-950 px-6 py-4">
                          <div className="ml-11">
                            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              Voter Breakdown
                            </h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="text-left text-zinc-500">
                                  <th className="pb-2 pr-4 text-xs font-medium">Voter</th>
                                  <th className="pb-2 pr-4 text-xs font-medium">Votes Given</th>
                                  <th className="pb-2 text-xs font-medium">Your Earnings</th>
                                </tr>
                              </thead>
                              <tbody>
                                {contestant.voters.map((voter, idx) => (
                                  <tr key={idx} className="border-t border-white/5">
                                    <td className="py-2 pr-4 text-zinc-300">{voter.voterName}</td>
                                    <td className="py-2 pr-4 text-zinc-400">{voter.votesGiven}</td>
                                    <td className="py-2 text-amber-400">{voter.amountEarned}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Earnings Over Time */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">Earnings Over Time</h3>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-white/10 bg-zinc-950">
            <p className="text-sm text-zinc-500">Earnings chart will appear once you start earning from recruited contestants.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

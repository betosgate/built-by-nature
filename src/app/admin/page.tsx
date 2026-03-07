import { Users, Trophy, DollarSign, Clock, Plus, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "12,847", change: "+342 this week", icon: Users },
  { label: "Active Contests", value: "8", change: "3 in voting phase", icon: Trophy },
  { label: "Total Revenue", value: "$184,230", change: "+$12,400 this month", icon: DollarSign },
  { label: "Pending Payouts", value: "$4,820", change: "14 requests", icon: Clock },
];

const recentActivity = [
  { id: 1, text: "New user registered: Sarah Johnson", time: "2 minutes ago", type: "user" },
  { id: 2, text: "Contest 'Summer Glow 2026' received 45 new entries", time: "15 minutes ago", type: "contest" },
  { id: 3, text: "Payout of $240 approved for recruiter Mike Davis", time: "1 hour ago", type: "payout" },
  { id: 4, text: "Content flagged for review in 'Urban Style' contest", time: "2 hours ago", type: "moderation" },
  { id: 5, text: "Token purchase: 25 tokens by user #4821", time: "3 hours ago", type: "purchase" },
  { id: 6, text: "Contest 'Natural Beauty Q1' advanced to Round 3", time: "4 hours ago", type: "contest" },
  { id: 7, text: "New recruiter application from Lisa Chen", time: "5 hours ago", type: "user" },
  { id: 8, text: "Email blast sent to 8,420 users", time: "6 hours ago", type: "email" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-1 text-sm text-zinc-400">Overview of platform activity</p>
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
              <p className="mt-1 text-xs text-zinc-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0"
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                <div className="flex-1">
                  <p className="text-sm text-zinc-300">{item.text}</p>
                  <p className="text-xs text-zinc-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start gap-2 bg-amber-500 text-black hover:bg-amber-400">
              <Plus className="h-4 w-4" />
              Create Contest
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 border-white/10 text-white hover:bg-white/5">
              <Mail className="h-4 w-4" />
              Send Email Blast
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 border-white/10 text-white hover:bg-white/5">
              <Shield className="h-4 w-4" />
              Review Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

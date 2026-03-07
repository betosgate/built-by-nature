import { DollarSign, Users, Trophy, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const revenueStats = [
  { label: "Total Token Sales", value: "$184,230", icon: DollarSign, color: "text-amber-500" },
  { label: "Contestant Payouts (20%)", value: "$36,846", icon: Trophy, color: "text-purple-400" },
  { label: "Recruiter Payouts (10%)", value: "$18,423", icon: Users, color: "text-blue-400" },
  { label: "Platform Revenue (70%)", value: "$128,961", icon: Building, color: "text-green-400" },
];

const pendingPayouts = [
  { id: 1, user: "Sarah Johnson", role: "Contestant", amount: "$480.00", status: "Pending" },
  { id: 2, user: "Mike Davis", role: "Recruiter", amount: "$240.00", status: "Pending" },
  { id: 3, user: "Olivia Brown", role: "Contestant", amount: "$320.00", status: "Pending" },
  { id: 4, user: "Lisa Thompson", role: "Recruiter", amount: "$185.00", status: "Pending" },
  { id: 5, user: "Aisha Patel", role: "Contestant", amount: "$560.00", status: "Pending" },
];

const completedPayouts = [
  { id: 1, user: "Sarah Johnson", role: "Contestant", amount: "$1,200.00", date: "2026-03-01", method: "Bank Transfer" },
  { id: 2, user: "Mike Davis", role: "Recruiter", amount: "$640.00", date: "2026-02-28", method: "PayPal" },
  { id: 3, user: "Aisha Patel", role: "Contestant", amount: "$890.00", date: "2026-02-25", method: "Bank Transfer" },
  { id: 4, user: "Lisa Thompson", role: "Recruiter", amount: "$310.00", date: "2026-02-20", method: "PayPal" },
  { id: 5, user: "Olivia Brown", role: "Contestant", amount: "$750.00", date: "2026-02-15", method: "Bank Transfer" },
  { id: 6, user: "Chris Nguyen", role: "Recruiter", amount: "$420.00", date: "2026-02-10", method: "PayPal" },
];

const roleColors: Record<string, string> = {
  Contestant: "bg-purple-500/20 text-purple-400",
  Recruiter: "bg-amber-500/20 text-amber-400",
};

export default function EarningsAdmin() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Earnings & Payouts</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Revenue overview and payout management
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {revenueStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">{stat.label}</span>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Pending Payouts */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Pending Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{payout.user}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[payout.role]}`}
                    >
                      {payout.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{payout.amount}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-500"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Payouts */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Completed Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {completedPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{payout.user}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[payout.role]}`}
                    >
                      {payout.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">{payout.amount}</td>
                  <td className="px-4 py-3 text-zinc-400">{payout.date}</td>
                  <td className="px-4 py-3 text-zinc-400">{payout.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, Eye, Ban, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "Fan" | "Contestant" | "Recruiter" | "Admin";

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  tokens: number;
  verified: boolean;
  joined: string;
  avatar: string;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Contestant", tokens: 0, verified: true, joined: "2025-11-12", avatar: "SJ" },
  { id: 2, name: "Mike Davis", email: "mike@example.com", role: "Recruiter", tokens: 0, verified: true, joined: "2025-10-03", avatar: "MD" },
  { id: 3, name: "Emily Chen", email: "emily@example.com", role: "Fan", tokens: 42, verified: true, joined: "2026-01-08", avatar: "EC" },
  { id: 4, name: "James Wilson", email: "james@example.com", role: "Fan", tokens: 15, verified: false, joined: "2026-02-14", avatar: "JW" },
  { id: 5, name: "Olivia Brown", email: "olivia@example.com", role: "Contestant", tokens: 0, verified: true, joined: "2025-12-20", avatar: "OB" },
  { id: 6, name: "Daniel Martinez", email: "daniel@example.com", role: "Admin", tokens: 0, verified: true, joined: "2025-08-01", avatar: "DM" },
  { id: 7, name: "Aisha Patel", email: "aisha@example.com", role: "Contestant", tokens: 0, verified: true, joined: "2026-01-22", avatar: "AP" },
  { id: 8, name: "Chris Lee", email: "chris@example.com", role: "Fan", tokens: 8, verified: true, joined: "2026-02-28", avatar: "CL" },
  { id: 9, name: "Lisa Thompson", email: "lisa@example.com", role: "Recruiter", tokens: 0, verified: true, joined: "2025-09-15", avatar: "LT" },
  { id: 10, name: "Ryan Garcia", email: "ryan@example.com", role: "Fan", tokens: 3, verified: false, joined: "2026-03-01", avatar: "RG" },
];

const roleColors: Record<Role, string> = {
  Fan: "bg-blue-500/20 text-blue-400",
  Contestant: "bg-purple-500/20 text-purple-400",
  Recruiter: "bg-amber-500/20 text-amber-400",
  Admin: "bg-red-500/20 text-red-400",
};

const roles: ("All" | Role)[] = ["All", "Fan", "Contestant", "Recruiter", "Admin"];

export default function UsersAdmin() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | Role>("All");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Manage all registered users
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                roleFilter === role
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-zinc-400">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Tokens</th>
              <th className="px-6 py-4 font-medium">Verified</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold">
                      {user.avatar}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[user.role]}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">{user.tokens}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      user.verified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-700 text-zinc-500"
                    }`}
                  >
                    {user.verified ? "\u2713" : "\u2715"}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-400">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      title="View Profile"
                      className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      title="Ban User"
                      className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Ban className="h-4 w-4" />
                    </button>
                    <button
                      title="Make Admin"
                      className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

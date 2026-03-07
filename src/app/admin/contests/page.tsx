"use client";

import { useState } from "react";
import { Plus, Pencil, Eye, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Contest {
  id: number;
  name: string;
  status: "Draft" | "Active" | "Voting" | "Completed";
  entries: number;
  currentRound: number;
  totalRounds: number;
}

const mockContests: Contest[] = [
  { id: 1, name: "Summer Glow 2026", status: "Active", entries: 234, currentRound: 2, totalRounds: 5 },
  { id: 2, name: "Natural Beauty Q1", status: "Voting", entries: 189, currentRound: 3, totalRounds: 4 },
  { id: 3, name: "Urban Style Challenge", status: "Active", entries: 312, currentRound: 1, totalRounds: 6 },
  { id: 4, name: "Fitness Transformation", status: "Completed", entries: 156, currentRound: 4, totalRounds: 4 },
  { id: 5, name: "Spring Collection 2026", status: "Draft", entries: 0, currentRound: 0, totalRounds: 5 },
  { id: 6, name: "Best Hair Awards", status: "Active", entries: 421, currentRound: 3, totalRounds: 5 },
];

const statusColors: Record<string, string> = {
  Draft: "bg-zinc-700 text-zinc-300",
  Active: "bg-green-500/20 text-green-400",
  Voting: "bg-amber-500/20 text-amber-400",
  Completed: "bg-blue-500/20 text-blue-400",
};

const emptyForm = {
  name: "",
  description: "",
  rules: "",
  prizes: "",
  coverImageUrl: "",
  totalRounds: 5,
  entryDeadline: "",
};

export default function ContestsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    setShowModal(false);
    setFormData(emptyForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contests</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Manage all contests on the platform
          </p>
        </div>
        <Button
          className="gap-2 bg-amber-500 text-black hover:bg-amber-400"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Create New Contest
        </Button>
      </div>

      {/* Contests Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-zinc-400">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Entries</th>
              <th className="px-6 py-4 font-medium">Current Round</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockContests.map((contest) => (
              <tr
                key={contest.id}
                className="border-b border-white/5 last:border-0"
              >
                <td className="px-6 py-4 font-medium">{contest.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[contest.status]}`}
                  >
                    {contest.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">{contest.entries}</td>
                <td className="px-6 py-4 text-zinc-300">
                  {contest.status === "Draft"
                    ? "--"
                    : `${contest.currentRound} / ${contest.totalRounds}`}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Contest Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-zinc-900 p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-6 text-xl font-bold">Create New Contest</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Contest name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Describe the contest"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Rules</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Contest rules"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Prizes</label>
                <input
                  name="prizes"
                  value={formData.prizes}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. 1st: $5000, 2nd: $2000, 3rd: $1000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Cover Image URL</label>
                <input
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">Total Rounds</label>
                  <input
                    name="totalRounds"
                    type="number"
                    min={1}
                    max={10}
                    value={formData.totalRounds}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">Entry Deadline</label>
                  <input
                    name="entryDeadline"
                    type="date"
                    value={formData.entryDeadline}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 text-black hover:bg-amber-400"
                >
                  Create Contest
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

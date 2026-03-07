"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const emailHistory = [
  { id: 1, date: "2026-03-06", to: "All Users", subject: "Spring Contest Launch - Enter Now!", status: "Delivered" },
  { id: 2, date: "2026-03-04", to: "All Contestants", subject: "Round 2 Voting Opens Tomorrow", status: "Delivered" },
  { id: 3, date: "2026-03-01", to: "All Users", subject: "March Token Sale - 20% Bonus", status: "Delivered" },
  { id: 4, date: "2026-02-25", to: "sarah@example.com", subject: "Your Contest Entry Has Been Approved", status: "Delivered" },
  { id: 5, date: "2026-02-20", to: "All Contestants", subject: "Important: Updated Contest Rules", status: "Failed" },
  { id: 6, date: "2026-02-15", to: "All Users", subject: "Welcome to Built by Nature!", status: "Delivered" },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-500/20 text-green-400",
  Failed: "bg-red-500/20 text-red-400",
  Pending: "bg-amber-500/20 text-amber-400",
};

export default function EmailAdmin() {
  const [recipient, setRecipient] = useState("all-users");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send email via API
    setSubject("");
    setBody("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Email</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Send emails and view history
        </p>
      </div>

      {/* Compose Email */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Compose Email</h3>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">To</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="all-users">All Users</option>
              <option value="all-contestants">All Contestants</option>
              <option value="specific">Specific User</option>
            </select>
          </div>

          {recipient === "specific" && (
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Email Address</label>
              <input
                type="email"
                placeholder="user@example.com"
                className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-zinc-400">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Email subject"
              className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-400">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="Write your email..."
              className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="gap-2 bg-amber-500 text-black hover:bg-amber-400"
            >
              <Send className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </form>
      </div>

      {/* Email History */}
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Email History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">To</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {emailHistory.map((email) => (
                <tr
                  key={email.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-4 py-3 text-zinc-400">{email.date}</td>
                  <td className="px-4 py-3 text-zinc-300">{email.to}</td>
                  <td className="px-4 py-3 font-medium">{email.subject}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[email.status]}`}
                    >
                      {email.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

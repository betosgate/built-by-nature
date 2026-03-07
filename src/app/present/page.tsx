"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Trophy,
  Users,
  DollarSign,
  Heart,
  Camera,
  Vote,
  Shield,
  BarChart3,
  Coins,
  Star,
  ArrowUpRight,
  UserPlus,
  Briefcase,
  Lock,
  Globe,
  Mail,
  Send,
  Eye,
  Plus,
  Download,
  TrendingUp,
  Clock,
  Copy,
  Search,
} from "lucide-react";
import { MOCK_CONTESTANTS, MOCK_CONTEST } from "@/lib/mock-data";

// ─── Slide data ────────────────────────────────────────────────────────────────

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  content: React.ReactNode;
}

// ─── Reusable mini-components for slides ───────────────────────────────────────

function StatCard({ label, value, change, icon: Icon, color, bg }: {
  label: string; value: string; change: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-zinc-400">{label}</span>
        <div className={`flex size-9 items-center justify-center rounded-lg ${bg}`}>
          <Icon className={`size-5 ${color}`} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
        <ArrowUpRight className="size-3 text-green-400" />
        {change}
      </div>
    </div>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-zinc-400">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-800/50 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === row.length - 1 ? "font-medium text-amber-400" : "text-zinc-300"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Slides ────────────────────────────────────────────────────────────────────

function buildSlides(): Slide[] {
  return [
    // 1. Title Slide
    {
      id: "title",
      title: "Built by Nature",
      category: "Overview",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="mb-8">
            <Flame className="h-20 w-20 text-amber-500 mx-auto mb-6" />
            <h1 className="text-6xl sm:text-7xl font-bold mb-4">
              Built by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Nature
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              The contest platform celebrating authentic, natural beauty. No filters. No fakes. Just real women competing, fans voting, and everyone earning.
            </p>
          </div>
          <div className="flex items-center gap-10 text-sm text-zinc-500 mt-4">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-amber-500" /> 18+ Verified</div>
            <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Real Prizes</div>
            <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-amber-500" /> Everyone Earns</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-amber-500" /> Safe & Moderated</div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md text-center">
            <div>
              <div className="text-3xl font-bold text-amber-400">20%</div>
              <div className="text-xs text-zinc-500 mt-1">Contestant Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">10%</div>
              <div className="text-xs text-zinc-500 mt-1">Recruiter Earnings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400">$5</div>
              <div className="text-xs text-zinc-500 mt-1">Per Vote Token</div>
            </div>
          </div>
        </div>
      ),
    },

    // 2. Homepage
    {
      id: "homepage",
      title: "Marketing Homepage",
      subtitle: "The landing page visitors see first",
      category: "Public Pages",
      content: (
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Hero mock */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&h=1080&fit=crop"
              alt="Hero"
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-amber-500" />
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-widest">No filters. No fakes.</span>
              </div>
              <h2 className="text-4xl font-bold mb-3">
                Celebrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Natural</span> Beauty
              </h2>
              <p className="text-sm text-zinc-300 mb-6 max-w-md">
                The contest platform where real women compete, fans vote, and authenticity wins.
              </p>
              <div className="flex gap-3">
                <div className="bg-amber-500 text-black px-5 py-2 rounded-lg text-sm font-bold">Enter a Contest</div>
                <div className="border border-white/30 px-5 py-2 rounded-lg text-sm">Browse Contestants</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-zinc-300">Key Features</h3>
            {[
              { icon: Camera, title: "Showcase Your Beauty", desc: "Upload photos and videos celebrating your natural body" },
              { icon: Vote, title: "Fan Voting", desc: "Fans buy tokens to vote for favorites" },
              { icon: Trophy, title: "Win Prizes", desc: "Compete through rounds to the final crown" },
              { icon: DollarSign, title: "Earn Money", desc: "Contestants earn 20% of all token revenue" },
              { icon: Globe, title: "Social Sharing", desc: "Shareable links for every profile and photo" },
              { icon: Shield, title: "Safe & Moderated", desc: "Age-verified, admin-overseen community" },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{f.title}</div>
                  <div className="text-xs text-zinc-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 3. Contestant Gallery
    {
      id: "contestants",
      title: "Contestant Gallery",
      subtitle: "8 seeded contestants with real photos",
      category: "Public Pages",
      content: (
        <div className="h-full">
          <div className="grid grid-cols-4 gap-4 h-full">
            {MOCK_CONTESTANTS.map((c) => (
              <div key={c.id} className="relative group rounded-xl overflow-hidden border border-zinc-800">
                <div className="relative aspect-[3/4]">
                  <Image src={c.avatar_url} alt={c.display_name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-sm font-bold text-white">{c.display_name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Heart className="size-3" /> {c.vote_count.toLocaleString()}
                    </div>
                    <div className="text-xs text-zinc-500">Rank #{c.rank}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 4. Contest Detail
    {
      id: "contest-detail",
      title: "Contest Detail Page",
      subtitle: MOCK_CONTEST.name,
      category: "Public Pages",
      content: (
        <div className="grid grid-cols-3 gap-6 h-full">
          <div className="col-span-2 space-y-5 overflow-y-auto">
            {/* Contest header */}
            <div className="relative h-40 rounded-2xl overflow-hidden border border-zinc-800">
              <Image src={MOCK_CONTEST.cover_image_url} alt="Contest" fill className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="inline-flex bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-medium mb-2">Pre-Registration Open</div>
                <h3 className="text-xl font-bold">{MOCK_CONTEST.name}</h3>
              </div>
            </div>

            {/* Rounds */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h4 className="text-sm font-bold mb-3">Contest Rounds</h4>
              <div className="space-y-2">
                {MOCK_CONTEST.rounds.map((r) => (
                  <div key={r.number} className="flex items-center justify-between bg-zinc-800/50 rounded-lg px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">{r.number}</div>
                      <span className="text-sm text-zinc-300">{r.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "active" ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                      {r.status === "active" ? "Active" : "Upcoming"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top contestants */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h4 className="text-sm font-bold mb-3">Top Contestants</h4>
              <div className="grid grid-cols-4 gap-3">
                {MOCK_CONTESTANTS.slice(0, 4).map((c) => (
                  <div key={c.id} className="text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-amber-500/30">
                      <Image src={c.avatar_url} alt={c.display_name} fill className="object-cover" />
                    </div>
                    <div className="text-xs font-medium">{c.display_name}</div>
                    <div className="text-xs text-amber-400">{c.vote_count.toLocaleString()} votes</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 overflow-y-auto">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <Trophy className="h-6 w-6 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold mb-2">Top 3 Prize</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{MOCK_CONTEST.prizes.top3.description}</p>
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <Star className="h-6 w-6 text-amber-500 mb-2" />
              <h4 className="text-sm font-bold mb-2">Grand Prize</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{MOCK_CONTEST.prizes.grand_prize.description}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h4 className="text-sm font-bold mb-2">Earnings Info</h4>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between"><span>Contestant Share</span><span className="text-amber-400 font-bold">20%</span></div>
                <div className="flex justify-between"><span>Recruiter Share</span><span className="text-amber-400 font-bold">10%</span></div>
                <div className="flex justify-between"><span>Token Price</span><span className="text-white font-bold">$5</span></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 5. Signup Flow
    {
      id: "auth",
      title: "Authentication Pages",
      subtitle: "Sign Up, Login, and Forgot Password — wired to Supabase",
      category: "Auth",
      content: (
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Sign Up */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-center">Create Your Account</h3>
            <p className="text-xs text-zinc-500 text-center">Join the natural beauty community</p>
            <div className="space-y-2">
              {[
                { icon: Trophy, label: "I want to Compete", active: true },
                { icon: Vote, label: "I want to Vote", active: false },
                { icon: Briefcase, label: "I want to Recruit", active: false },
              ].map((r) => (
                <div key={r.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm ${r.active ? "bg-amber-500/10 border-amber-500 text-amber-500" : "border-zinc-700 text-zinc-400"}`}>
                  <r.icon className="size-4" /> {r.label}
                </div>
              ))}
            </div>
            {["Display Name", "Email", "Password", "Date of Birth"].map((f) => (
              <div key={f}>
                <div className="text-xs text-zinc-400 mb-1">{f}</div>
                <div className="w-full h-9 bg-zinc-800/50 border border-zinc-700 rounded-lg" />
              </div>
            ))}
            <div className="bg-amber-500 text-black text-center py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              <UserPlus className="size-4" /> Sign Up
            </div>
          </div>

          {/* Login */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-center">Welcome Back</h3>
            <p className="text-xs text-zinc-500 text-center">Log in to your account</p>
            {["Email", "Password"].map((f) => (
              <div key={f}>
                <div className="text-xs text-zinc-400 mb-1">{f}</div>
                <div className="w-full h-9 bg-zinc-800/50 border border-zinc-700 rounded-lg" />
              </div>
            ))}
            <div className="bg-amber-500 text-black text-center py-2.5 rounded-lg text-sm font-bold">Log In</div>
            <div className="text-center text-xs text-amber-500">Forgot password?</div>
          </div>

          {/* Forgot Password */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-center">Forgot Password</h3>
            <p className="text-xs text-zinc-500 text-center">Enter your email for a reset link</p>
            <div>
              <div className="text-xs text-zinc-400 mb-1">Email</div>
              <div className="w-full h-9 bg-zinc-800/50 border border-zinc-700 rounded-lg" />
            </div>
            <div className="bg-amber-500 text-black text-center py-2.5 rounded-lg text-sm font-bold">Send Reset Link</div>
            <div className="text-center text-xs text-zinc-500">All auth wired to Supabase Auth</div>
          </div>
        </div>
      ),
    },

    // 6. Contestant Dashboard
    {
      id: "contestant-dashboard",
      title: "Contestant Dashboard",
      subtitle: "The contestant's home base for managing their contest presence",
      category: "Contestant Backoffice",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Welcome back, <span className="text-amber-500">Aria</span></h3>
              <p className="text-sm text-zinc-400">Here&apos;s what&apos;s happening with your contests today.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Votes" value="12,847" change="+342 this week" icon={Heart} color="text-rose-400" bg="bg-rose-500/10" />
            <StatCard label="Active Contests" value="3" change="2 in progress" icon={Trophy} color="text-amber-400" bg="bg-amber-500/10" />
            <StatCard label="Earnings" value="$1,284.50" change="+$186 this month" icon={DollarSign} color="text-green-400" bg="bg-green-500/10" />
            <StatCard label="Token Balance" value="4,520" change="Available to use" icon={Coins} color="text-blue-400" bg="bg-blue-500/10" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
                <h4 className="text-sm font-bold">Active Contests</h4>
              </div>
              {[
                { name: "Summer Glow 2026", votes: 3842, rank: 1, round: "Round 1: Open Entry", ends: "4d 12h" },
                { name: "Natural Beauty Classic", votes: 2156, rank: 5, round: "Round 2: Top 20", ends: "1d 6h" },
                { name: "Fitness Physique Open", votes: 1204, rank: 12, round: "Round 1: Open Entry", ends: "6d 3h" },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-zinc-500">{c.round} - Rank #{c.rank} - Ends in {c.ends}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                    <Heart className="size-3" /> {c.votes.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <h4 className="text-sm font-bold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <div className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Camera className="size-4" /> Upload Content</div>
                  <div className="border border-zinc-700 px-4 py-2 rounded-lg text-sm text-zinc-300 flex items-center gap-2"><Trophy className="size-4" /> Enter Contest</div>
                  <div className="border border-zinc-700 px-4 py-2 rounded-lg text-sm text-zinc-300 flex items-center gap-2"><Eye className="size-4" /> View Profile</div>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <h4 className="text-sm font-bold mb-3">Recent Votes</h4>
                {["VoteKing99", "BeachVibes", "FitnessFan23"].map((v, i) => (
                  <div key={v} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-zinc-400">{v}</span>
                    <span className="text-xs text-amber-400 font-semibold">+{[50, 25, 100][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 7. Content Upload
    {
      id: "upload",
      title: "Content Upload",
      subtitle: "Drag-and-drop photo/video upload with privacy controls",
      category: "Contestant Backoffice",
      content: (
        <div className="max-w-2xl mx-auto h-full space-y-5 overflow-y-auto">
          <div>
            <h3 className="text-xl font-bold">Upload <span className="text-amber-500">Content</span></h3>
            <p className="text-sm text-zinc-400">Share photos or videos with your audience and enter contests.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-amber-500 bg-amber-500/10 text-amber-400 p-3 text-sm font-medium">
              <Camera className="size-5" /> Photo
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 text-zinc-400 p-3 text-sm font-medium">
              <Vote className="size-5" /> Video
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/30 p-12">
            <Camera className="size-10 text-zinc-500 mb-3" />
            <p className="text-sm text-zinc-400"><span className="text-amber-500 font-medium">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-zinc-600 mt-1">PNG, JPG, WEBP up to 10MB</p>
          </div>
          <div>
            <div className="text-xs text-zinc-400 mb-1">Caption</div>
            <div className="w-full h-20 bg-zinc-900/50 border border-zinc-700 rounded-xl" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-green-400" />
              <div>
                <div className="text-sm font-medium">Public</div>
                <div className="text-xs text-zinc-500">Visible to everyone</div>
              </div>
            </div>
            <div className="w-10 h-5 bg-zinc-700 rounded-full relative"><div className="w-4 h-4 bg-zinc-400 rounded-full absolute left-0.5 top-0.5" /></div>
          </div>
          <div className="bg-amber-500 text-black text-center py-3 rounded-lg font-bold flex items-center justify-center gap-2">
            <Camera className="size-5" /> Upload Content
          </div>
        </div>
      ),
    },

    // 8. Contestant Earnings
    {
      id: "contestant-earnings",
      title: "Contestant Earnings",
      subtitle: "Track income from votes with detailed voter insights",
      category: "Contestant Backoffice",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <div>
            <h3 className="text-xl font-bold">Your <span className="text-amber-500">Earnings</span></h3>
            <p className="text-sm text-zinc-400">You earn 20% of all token votes cast on your content.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Total Earnings" value="$1,284.50" change="+$186 this month" icon={DollarSign} color="text-green-400" bg="bg-green-500/10" />
            <StatCard label="Pending Payout" value="$342.80" change="Request anytime" icon={Clock} color="text-amber-400" bg="bg-amber-500/10" />
            <StatCard label="Monthly Average" value="$214.08" change="Last 6 months" icon={TrendingUp} color="text-blue-400" bg="bg-blue-500/10" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <MiniTable
                headers={["Date", "Source", "Contest", "Amount"]}
                rows={[
                  ["Mar 7", "Votes", "Summer Glow 2026", "$38.40"],
                  ["Mar 6", "Votes", "Natural Beauty Classic", "$24.60"],
                  ["Mar 6", "Prize", "Fitness Physique Open", "$150.00"],
                  ["Mar 5", "Votes", "Summer Glow 2026", "$52.80"],
                  ["Mar 4", "Votes", "Natural Beauty Classic", "$18.20"],
                  ["Mar 3", "Votes", "Summer Glow 2026", "$44.00"],
                ]}
              />
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center gap-2 mb-3"><Users className="size-4 text-amber-500" /><h4 className="text-sm font-bold">Top Voters</h4></div>
              {[
                { name: "VoteKing99", votes: 842, spent: "$168.40" },
                { name: "BeachVibes", votes: 625, spent: "$125.00" },
                { name: "FitnessFan23", votes: 510, spent: "$102.00" },
                { name: "StarGazer", votes: 384, spent: "$76.80" },
                { name: "NightOwl_X", votes: 290, spent: "$58.00" },
              ].map((v) => (
                <div key={v.name} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                  <div>
                    <div className="text-xs font-medium">{v.name}</div>
                    <div className="text-[10px] text-zinc-500">{v.votes} votes</div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">{v.spent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // 9. Messages
    {
      id: "messages",
      title: "Messages",
      subtitle: "In-app messaging between contestants, fans, and support",
      category: "Contestant Backoffice",
      content: (
        <div className="grid grid-cols-3 gap-0 h-full rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Sidebar */}
          <div className="border-r border-zinc-800 bg-zinc-950/50 overflow-y-auto">
            <div className="p-4 border-b border-zinc-800">
              <h4 className="text-sm font-bold mb-2">Messages</h4>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5">
                <Search className="size-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">Search...</span>
              </div>
            </div>
            {[
              { name: "Marcus Chen", msg: "Good luck in Summer Glow!", time: "2m", unread: true },
              { name: "Contest Support", msg: "Your entry has been approved", time: "1h", unread: true },
              { name: "Jade Williams", msg: "Thanks for the collab idea!", time: "3h", unread: false },
              { name: "Tyler Brooks", msg: "That photo shoot was amazing!", time: "1d", unread: false },
              { name: "Luna Martinez", msg: "See you at the next event!", time: "2d", unread: false },
            ].map((c) => (
              <div key={c.name} className={`px-4 py-3 border-b border-zinc-800/50 ${c.name === "Marcus Chen" ? "bg-amber-500/5 border-l-2 border-l-amber-500" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${c.unread ? "text-white" : "text-zinc-400"}`}>{c.name}</span>
                  <span className="text-[10px] text-zinc-500">{c.time}</span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate">{c.msg}</p>
              </div>
            ))}
          </div>

          {/* Chat area */}
          <div className="col-span-2 flex flex-col bg-black">
            <div className="px-5 py-3 border-b border-zinc-800">
              <div className="text-sm font-semibold">Marcus Chen</div>
              <div className="text-[10px] text-zinc-500">Online</div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="flex justify-start"><div className="bg-zinc-800 rounded-2xl px-3 py-2 text-xs max-w-[70%]">Hey Aria! Your entry in Summer Glow is amazing!</div></div>
              <div className="flex justify-end"><div className="bg-amber-500 text-black rounded-2xl px-3 py-2 text-xs max-w-[70%]">Thanks Marcus! Spent hours on the lighting.</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 rounded-2xl px-3 py-2 text-xs max-w-[70%]">It really shows. Composition is perfect.</div></div>
              <div className="flex justify-end"><div className="bg-amber-500 text-black rounded-2xl px-3 py-2 text-xs max-w-[70%]">That means a lot! Your fitness shots are insane.</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 rounded-2xl px-3 py-2 text-xs max-w-[70%]">Good luck in the contest!</div></div>
            </div>
            <div className="p-3 border-t border-zinc-800 flex items-center gap-2">
              <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-500">Type a message...</div>
              <div className="bg-amber-500 p-2 rounded-lg"><Send className="size-3 text-black" /></div>
            </div>
          </div>
        </div>
      ),
    },

    // 10. Buy Tokens
    {
      id: "tokens",
      title: "Buy Tokens",
      subtitle: "Token bundles for voting — powered by CCBill",
      category: "Voter Experience",
      content: (
        <div className="max-w-3xl mx-auto h-full space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xl font-bold">Buy Tokens</h3>
            <p className="text-sm text-zinc-400">Tokens are used to vote for your favorite contestants. Each vote costs 1 token.</p>
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
              <Coins className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <div className="text-sm text-amber-400">Current Balance</div>
              <div className="text-2xl font-bold">12 Tokens</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { amount: 1, price: "$5", savings: null },
              { amount: 5, price: "$20", savings: "Save $5" },
              { amount: 10, price: "$35", savings: "Save $15" },
              { amount: 25, price: "$75", savings: "Save $50" },
            ].map((b, i) => (
              <div key={i} className={`relative p-5 rounded-2xl border-2 ${i === 1 ? "border-amber-500 bg-amber-500/10" : "border-zinc-700 bg-zinc-900/50"}`}>
                {b.savings && <div className="absolute -top-2.5 right-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{b.savings}</div>}
                <div className="text-2xl font-bold">{b.amount}</div>
                <div className="text-xs text-zinc-400 mb-2">{b.amount === 1 ? "Token" : "Tokens"}</div>
                <div className="text-lg font-semibold text-amber-400">{b.price}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="bg-amber-500 text-black py-3 px-12 rounded-lg font-bold inline-flex items-center gap-2 text-lg">
              <Coins className="size-5" /> Buy 5 Tokens for $20
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-3">
              <Lock className="size-3" /> Secure payment powered by CCBill
            </div>
          </div>
        </div>
      ),
    },

    // 11. Recruiter Dashboard
    {
      id: "recruiter",
      title: "Recruiter Dashboard",
      subtitle: "Track referrals, earnings, and voter breakdown per contestant",
      category: "Recruiter Portal",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <div>
            <h3 className="text-xl font-bold">Recruiter Dashboard</h3>
            <p className="text-sm text-zinc-400">Track your referrals and earnings (10% of votes on your recruits)</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-xs text-zinc-400 mb-2">Your Referral Link</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 font-mono">
                https://builtbynature.com/signup?ref=REC-MK2847
              </div>
              <div className="bg-amber-500 text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1"><Copy className="size-3" /> Copy</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Recruited" value="24" change="Active referrals" icon={Users} color="text-blue-400" bg="bg-blue-500/10" />
            <StatCard label="Active Contestants" value="18" change="In contests now" icon={Trophy} color="text-purple-400" bg="bg-purple-500/10" />
            <StatCard label="Total Earnings" value="$1,842.30" change="+$310 this month" icon={DollarSign} color="text-green-400" bg="bg-green-500/10" />
            <StatCard label="Pending Payout" value="$425.00" change="Request anytime" icon={Clock} color="text-amber-400" bg="bg-amber-500/10" />
          </div>
          <MiniTable
            headers={["Contestant", "Status", "Total Votes", "Your Earnings"]}
            rows={[
              ["Sarah Johnson", "Active", "1,240", "$620.00"],
              ["Olivia Brown", "Active", "890", "$445.00"],
              ["Aisha Patel", "Winner", "2,150", "$1,075.00"],
              ["Tanya Moore", "Eliminated", "320", "$160.00"],
            ]}
          />
        </div>
      ),
    },

    // 12. Admin Dashboard
    {
      id: "admin-dashboard",
      title: "Admin Dashboard",
      subtitle: "Platform-wide overview with stats, activity feed, and quick actions",
      category: "Admin Panel",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Admin Dashboard</h3>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xs">A</div>
              admin@builtbynature.com
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Users" value="12,847" change="+342 this week" icon={Users} color="text-blue-400" bg="bg-blue-500/10" />
            <StatCard label="Active Contests" value="8" change="3 in voting phase" icon={Trophy} color="text-amber-400" bg="bg-amber-500/10" />
            <StatCard label="Total Revenue" value="$184,230" change="+$12,400 this month" icon={DollarSign} color="text-green-400" bg="bg-green-500/10" />
            <StatCard label="Pending Payouts" value="$4,820" change="14 requests" icon={Clock} color="text-amber-400" bg="bg-amber-500/10" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h4 className="text-sm font-bold mb-3">Recent Activity</h4>
              {[
                "New user registered: Sarah Johnson",
                "Contest 'Summer Glow 2026' received 45 new entries",
                "Payout of $240 approved for recruiter Mike Davis",
                "Content flagged for review in 'Urban Style'",
                "Token purchase: 25 tokens by user #4821",
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2 py-2 border-b border-zinc-800/50 last:border-0">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-xs text-zinc-400">{a}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <h4 className="text-sm font-bold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <div className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Plus className="size-4" /> Create Contest</div>
                <div className="border border-zinc-700 px-4 py-2 rounded-lg text-sm text-zinc-300 flex items-center gap-2"><Mail className="size-4" /> Send Email Blast</div>
                <div className="border border-zinc-700 px-4 py-2 rounded-lg text-sm text-zinc-300 flex items-center gap-2"><Shield className="size-4" /> Review Content</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // 13. Admin Contests
    {
      id: "admin-contests",
      title: "Contest Management",
      subtitle: "Create, edit, and manage contests with round controls",
      category: "Admin Panel",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Contests</h3>
            <div className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Plus className="size-4" /> Create New Contest</div>
          </div>
          <MiniTable
            headers={["Name", "Status", "Entries", "Round"]}
            rows={[
              ["Summer Glow 2026", "Active", "234", "2 / 5"],
              ["Natural Beauty Q1", "Voting", "189", "3 / 4"],
              ["Urban Style Challenge", "Active", "312", "1 / 6"],
              ["Fitness Transformation", "Completed", "156", "4 / 4"],
              ["Spring Collection 2026", "Draft", "0", "--"],
              ["Best Hair Awards", "Active", "421", "3 / 5"],
            ]}
          />
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h4 className="text-sm font-bold mb-3">Create Contest Modal</h4>
            <div className="grid grid-cols-2 gap-4">
              {["Contest Name", "Description", "Rules", "Prizes", "Cover Image URL", "Entry Deadline"].map((f) => (
                <div key={f}>
                  <div className="text-xs text-zinc-400 mb-1">{f}</div>
                  <div className="w-full h-8 bg-zinc-800/50 border border-zinc-700 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // 14. Admin Users
    {
      id: "admin-users",
      title: "User Management",
      subtitle: "Search, filter, and manage all users with role-based views",
      category: "Admin Panel",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <h3 className="text-xl font-bold">Users</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2">
              <Search className="size-4 text-zinc-500" />
              <span className="text-xs text-zinc-500">Search by name or email...</span>
            </div>
            {["All", "Fan", "Contestant", "Recruiter", "Admin"].map((r) => (
              <div key={r} className={`px-3 py-2 rounded-lg text-xs font-medium ${r === "All" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"}`}>
                {r}
              </div>
            ))}
          </div>
          <MiniTable
            headers={["User", "Email", "Role", "Tokens", "Joined"]}
            rows={[
              ["Sarah Johnson", "sarah@example.com", "Contestant", "0", "2025-11-12"],
              ["Mike Davis", "mike@example.com", "Recruiter", "0", "2025-10-03"],
              ["Emily Chen", "emily@example.com", "Fan", "42", "2026-01-08"],
              ["James Wilson", "james@example.com", "Fan", "15", "2026-02-14"],
              ["Olivia Brown", "olivia@example.com", "Contestant", "0", "2025-12-20"],
              ["Daniel Martinez", "daniel@example.com", "Admin", "0", "2025-08-01"],
            ]}
          />
        </div>
      ),
    },

    // 15. Admin Earnings
    {
      id: "admin-earnings",
      title: "Revenue & Payouts",
      subtitle: "Platform revenue split and payout management",
      category: "Admin Panel",
      content: (
        <div className="h-full space-y-5 overflow-y-auto">
          <h3 className="text-xl font-bold">Earnings & Payouts</h3>
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total Token Sales" value="$184,230" change="All time" icon={DollarSign} color="text-amber-400" bg="bg-amber-500/10" />
            <StatCard label="Contestant Payouts (20%)" value="$36,846" change="Paid to contestants" icon={Trophy} color="text-purple-400" bg="bg-purple-500/10" />
            <StatCard label="Recruiter Payouts (10%)" value="$18,423" change="Paid to recruiters" icon={Users} color="text-blue-400" bg="bg-blue-500/10" />
            <StatCard label="Platform Revenue (70%)" value="$128,961" change="Net revenue" icon={BarChart3} color="text-green-400" bg="bg-green-500/10" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h4 className="text-sm font-bold mb-3">Pending Payouts</h4>
              <MiniTable
                headers={["User", "Role", "Amount", "Action"]}
                rows={[
                  ["Sarah Johnson", "Contestant", "$480.00", "Approve"],
                  ["Mike Davis", "Recruiter", "$240.00", "Approve"],
                  ["Olivia Brown", "Contestant", "$320.00", "Approve"],
                  ["Lisa Thompson", "Recruiter", "$185.00", "Approve"],
                  ["Aisha Patel", "Contestant", "$560.00", "Approve"],
                ]}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">Completed Payouts</h4>
              <MiniTable
                headers={["User", "Amount", "Date", "Method"]}
                rows={[
                  ["Sarah Johnson", "$1,200.00", "Mar 1", "Bank Transfer"],
                  ["Mike Davis", "$640.00", "Feb 28", "PayPal"],
                  ["Aisha Patel", "$890.00", "Feb 25", "Bank Transfer"],
                  ["Lisa Thompson", "$310.00", "Feb 20", "PayPal"],
                ]}
              />
            </div>
          </div>
        </div>
      ),
    },

    // 16. Tech Stack
    {
      id: "tech-stack",
      title: "Technical Architecture",
      category: "Tech",
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-2xl font-bold mb-8">Tech Stack & Infrastructure</h3>
          <div className="grid grid-cols-4 gap-6 max-w-4xl">
            {[
              { label: "Frontend", items: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS v4", "Shadcn/ui Components"], color: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
              { label: "Backend", items: ["Next.js API Routes", "Supabase Auth (SSR)", "PostgreSQL RPC Functions", "CCBill Webhooks"], color: "from-green-500/20 to-green-600/20", border: "border-green-500/30" },
              { label: "Database", items: ["Supabase PostgreSQL", "12 Tables, 8 Enums", "Row-Level Security", "Atomic Vote Processing"], color: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
              { label: "Infrastructure", items: ["Vercel (Auto-Deploy)", "GitHub (CI/CD)", "Supabase Storage", "CCBill Payments"], color: "from-amber-500/20 to-amber-600/20", border: "border-amber-500/30" },
            ].map((stack) => (
              <div key={stack.label} className={`rounded-2xl border ${stack.border} bg-gradient-to-b ${stack.color} p-6`}>
                <h4 className="text-lg font-bold mb-4">{stack.label}</h4>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="text-sm text-zinc-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-8 text-sm text-zinc-500">
            <span>30+ Routes</span>
            <span>63+ Files</span>
            <span>11,000+ Lines</span>
            <span>26 Compiled Pages</span>
          </div>
        </div>
      ),
    },
  ];
}

// ─── Presentation Component ────────────────────────────────────────────────────

export default function PresentationPage() {
  const slides = buildSlides();
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const slide = slides[currentSlide];
  const categories = [...new Set(slides.map((s) => s.category))];

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800 bg-zinc-950 shrink-0">
        <div className="flex items-center gap-3">
          <Flame className="h-5 w-5 text-amber-500" />
          <span className="font-bold text-sm">Built by Nature</span>
          <span className="text-zinc-600 text-xs">|</span>
          <span className="text-xs text-amber-500 font-medium">{slide.category}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500">
            {currentSlide + 1} / {slides.length}
          </span>
          {/* Progress dots */}
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? "w-6 bg-amber-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide content area */}
      <div className="flex-1 flex flex-col px-8 py-6 overflow-hidden">
        {/* Slide header */}
        <div className="mb-5 shrink-0">
          <h2 className="text-2xl font-bold">{slide.title}</h2>
          {slide.subtitle && <p className="text-sm text-zinc-400 mt-1">{slide.subtitle}</p>}
        </div>

        {/* Slide body */}
        <div className="flex-1 overflow-hidden">
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-800 bg-zinc-950 shrink-0">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {/* Category nav */}
        <div className="flex items-center gap-3">
          {categories.map((cat) => {
            const catIndex = slides.findIndex((s) => s.category === cat);
            const isActive = slide.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCurrentSlide(catIndex)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

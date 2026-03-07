"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Share2,
  DollarSign,
  Users,
  ArrowRight,
  TrendingUp,
  Link2,
  UserPlus,
  BarChart3,
  Infinity,
  Zap,
  Clock,
  ChevronRight,
  Mail,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up as a Recruiter",
    description:
      "Create your free recruiter account. No fees, no commitment — just an opportunity to earn.",
  },
  {
    icon: Link2,
    number: "02",
    title: "Get Your Referral Link",
    description:
      "Receive a unique referral link and sharing tools. Every contestant who signs up through your link is tracked to your account.",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share with Women You Know",
    description:
      "Share your link on social media, in DMs, or in person. Know a woman who deserves the spotlight? Send her your link.",
  },
  {
    icon: DollarSign,
    number: "04",
    title: "Earn 10% Forever",
    description:
      "When your recruited contestants receive votes, you earn 10% of all token revenue they generate. Not just once — forever.",
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: "Passive Income",
    description:
      "Once your recruited contestants are on the platform, you earn from their votes automatically. No ongoing work required.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description:
      "See exactly how your recruits are performing, how many votes they get, and how much you have earned — all in real time.",
  },
  {
    icon: Infinity,
    title: "No Cap on Earnings",
    description:
      "There is no limit to how many contestants you can recruit or how much you can earn. The more you recruit, the more you make.",
  },
  {
    icon: Clock,
    title: "Lifetime Revenue",
    description:
      "Your 10% is not a one-time bonus. You earn for as long as your recruited contestants are active on the platform.",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description:
      "Withdraw your earnings whenever you want. No waiting periods, no minimum thresholds to hit.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Our recruiter success team helps you with sharing strategies, optimized referral links, and promotional assets.",
  },
];

// Mock data for the dashboard preview
const mockRecruits = [
  { name: "Jessica M.", votes: 1247, earned: "$623.50", status: "Active" },
  { name: "Aaliyah K.", votes: 892, earned: "$446.00", status: "Active" },
  { name: "Sofia R.", votes: 634, earned: "$317.00", status: "Active" },
  { name: "Taylor W.", votes: 421, earned: "$210.50", status: "Active" },
  { name: "Priya S.", votes: 208, earned: "$104.00", status: "New" },
];

export default function RecruitPage() {
  const [formData, setFormData] = useState({ name: "", email: "", social: "", approach: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — in production this would call an API
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute top-40 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Share2 className="h-5 w-5 text-amber-500" />
              <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
                Recruiter Program
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Recruit Contestants.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Earn Forever.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Know beautiful women who should be on Built by Nature? Sign up as a recruiter,
              share your link, and earn <strong className="text-amber-400">10% of all voting
              token revenue</strong> from every contestant you bring to the platform — for life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#apply">
                <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-12">
                  Apply to Recruit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                  How It Works
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 mt-12 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-500" />
                <span>10% Lifetime Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <Infinity className="h-4 w-4 text-amber-500" />
                <span>No Earnings Cap</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span>Real-Time Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Four simple steps to start earning passive income from the Built by Nature platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="text-5xl font-bold text-amber-500/20 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Example */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">See the Potential</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here is what your recruiter earnings could look like as you build your
              network of contestants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8 text-center">
              <div className="text-sm text-gray-400 mb-2">5 Recruits</div>
              <div className="text-4xl font-bold text-amber-400 mb-1">$500</div>
              <div className="text-gray-400 text-sm">potential monthly earnings</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/40 rounded-2xl p-8 text-center">
              <div className="text-sm text-gray-400 mb-2">20 Recruits</div>
              <div className="text-4xl font-bold text-amber-400 mb-1">$2,000</div>
              <div className="text-gray-400 text-sm">potential monthly earnings</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-2xl p-8 text-center">
              <div className="text-sm text-gray-400 mb-2">50 Recruits</div>
              <div className="text-4xl font-bold text-amber-400 mb-1">$5,000+</div>
              <div className="text-gray-400 text-sm">potential monthly earnings</div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Earnings depend on contestant activity and fan engagement. These are illustrative examples.
          </p>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Recruiter Dashboard</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your recruited contestants, their votes, and your earnings — all in real time.
            </p>
          </div>

          {/* Mock Dashboard */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-300">Recruiter Overview</h3>
                <p className="text-gray-500 text-sm">Last 30 days</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-emerald-400 text-sm font-medium">Live Tracking</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Recruits</div>
                <div className="text-2xl font-bold text-white">5</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Votes</div>
                <div className="text-2xl font-bold text-white">3,402</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Earned</div>
                <div className="text-2xl font-bold text-amber-400">$1,701.00</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">This Month</div>
                <div className="text-2xl font-bold text-emerald-400">$438.50</div>
              </div>
            </div>

            {/* Recruits Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs uppercase tracking-wider text-gray-500 pb-3 font-medium">
                      Contestant
                    </th>
                    <th className="text-right text-xs uppercase tracking-wider text-gray-500 pb-3 font-medium">
                      Votes
                    </th>
                    <th className="text-right text-xs uppercase tracking-wider text-gray-500 pb-3 font-medium">
                      Your Earnings
                    </th>
                    <th className="text-right text-xs uppercase tracking-wider text-gray-500 pb-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecruits.map((recruit) => (
                    <tr
                      key={recruit.name}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                            <span className="text-amber-400 text-sm font-semibold">
                              {recruit.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-white">{recruit.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-gray-300">
                        {recruit.votes.toLocaleString()}
                      </td>
                      <td className="py-4 text-right text-amber-400 font-semibold">
                        {recruit.earned}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            recruit.status === "New"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {recruit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Referral Link Mock */}
            <div className="mt-8 bg-black/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Your Referral Link</div>
                <div className="text-white font-mono text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                  builtbynature.com/ref/your-unique-code
                </div>
              </div>
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold shrink-0">
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Recruiter Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed as a Built by Nature recruiter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Flame className="h-12 w-12 text-amber-500 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Apply to Become a Recruiter
              </h2>
              <p className="text-gray-400">
                Fill out the form below and our team will get you set up with your
                recruiter account and referral link.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-gray-400 mb-6">
                    Thanks, {formData.name}! We&apos;ll review your application and get back to you
                    at <strong className="text-white">{formData.email}</strong> within 24 hours.
                  </p>
                  <Link href="/signup?role=recruiter">
                    <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                      Create Your Account Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="rec-name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="rec-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="rec-email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <input
                        id="rec-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rec-social" className="block text-sm font-medium text-gray-300 mb-2">
                      Social Media Presence <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      id="rec-social"
                      type="text"
                      value={formData.social}
                      onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                      placeholder="Instagram, TikTok, X, or other"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="rec-approach" className="block text-sm font-medium text-gray-300 mb-2">
                      How will you recruit contestants?
                    </label>
                    <textarea
                      id="rec-approach"
                      required
                      rows={4}
                      value={formData.approach}
                      onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                      placeholder="Tell us about your network and approach..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg h-12 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Apply to Recruit
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-gray-500 text-xs">
                    By applying, you agree to our{" "}
                    <Link href="/terms" className="text-amber-500 hover:text-amber-400">terms of service</Link>.
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Questions About Recruiting?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Check out our rules page for the full details on how the platform works,
            or reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rules">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                Read the Rules
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-12">
                About Built by Nature
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

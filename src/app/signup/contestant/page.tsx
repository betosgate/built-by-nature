"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trophy,
  UserPlus,
  Crown,
  DollarSign,
  Plane,
  Heart,
  Camera,
  Sparkles,
  Check,
  ArrowRight,
  Flame,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn 20% of Every Vote",
    desc: "Each token your fans spend earns you real money. More fans = more income, even if you don't win.",
  },
  {
    icon: Plane,
    title: "Top 3 Fly to Vegas",
    desc: "All three finalists get an all-expenses-paid Vegas trip with VIP access and a professional photoshoot.",
  },
  {
    icon: Crown,
    title: "Winner Gets Italy + $10K",
    desc: "The grand prize winner receives a 7-day luxury Italy vacation for two plus $10,000 cash.",
  },
  {
    icon: Camera,
    title: "Build Your Fanbase",
    desc: "Get your own profile page, share photos, go viral. This is your platform to shine.",
  },
];

const socialProof = [
  "250+ contestants have already signed up",
  "Over $25,000 in prizes each season",
  "Contestants earned $48,500+ in votes last season",
];

export default function ContestantSignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()))
      age--;
    if (age < 18) {
      setError("You must be at least 18 years old");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName,
            role: "contestant",
            date_of_birth: dateOfBirth,
            referral_code: referralCode || undefined,
          },
        },
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Success state — full page
  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserPlus className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">You&apos;re Almost In!</h2>
        <p className="text-gray-400 mb-2 max-w-md text-lg">
          We sent a confirmation link to{" "}
          <strong className="text-white">{email}</strong>.
        </p>
        <p className="text-gray-500 mb-8 max-w-sm text-sm">
          Click the link in your email to verify your account, then log in to start building your profile and competing.
        </p>
        <Link href="/login">
          <Button className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-8 h-14">
            Go to Login
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold tracking-tight">Built by Nature</span>
          </Link>
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Already have an account? <span className="text-amber-400 font-medium">Log In</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ====== LEFT: Landing page content ====== */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Hero text */}
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5">
                <Flame className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-400">Summer 2026 Enrollment Open</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Your Beauty Is Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Superpower
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-lg leading-relaxed">
                Enter Built by Nature and compete for real prizes, earn real money from every single vote, and build a fanbase that supports you. No cosmetic surgery. No fillers. Just you &mdash; exactly as nature made you.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <Icon className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{b.title}</h3>
                      <p className="text-sm text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof */}
            <div className="space-y-2 mb-8">
              {socialProof.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400 shrink-0" />
                  <span className="text-sm text-gray-400">{item}</span>
                </div>
              ))}
            </div>

            {/* Inclusivity note */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h4 className="font-semibold text-white">Who Can Enter?</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Any woman 18+ who has not had cosmetic surgery &mdash; no lip fillers, no breast augmentation, no butt lifts.
                We celebrate beauty that&apos;s 100% natural. Tattoos, piercings, all body types, all ethnicities &mdash; absolutely welcome.
                If your beauty is real, this is your stage.
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-gray-400">
                <Shield className="h-3 w-3 text-amber-500" /> 18+ Verified
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-gray-400">
                <Trophy className="h-3 w-3 text-amber-500" /> Real Prizes
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-gray-400">
                <Heart className="h-3 w-3 text-amber-500" /> All Natural
              </span>
            </div>
          </div>

          {/* ====== RIGHT: Signup form ====== */}
          <div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Takes less than 2 minutes. Start competing today.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    placeholder="The name fans will see"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="8+ characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be 18+</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Referral Code{" "}
                      <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. REC-AB1234"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-amber-500"
                  />
                  <label className="text-sm text-gray-400">
                    I confirm I have had <strong className="text-white">no cosmetic surgery</strong>, I am 18+, and I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-amber-500 hover:text-amber-400"
                    >
                      Terms of Service
                    </Link>.
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={loading || !agreedToTerms}
                  className="w-full h-14 bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg disabled:opacity-50 shadow-lg shadow-amber-500/20"
                >
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Enter the Competition
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-500 text-xs">
                  Free to sign up. No credit card required. You start earning from your first vote.
                </p>
              </div>
            </div>

            {/* Quick stats below form */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
                <p className="text-xl font-bold text-amber-400">20%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Per Vote Earned</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
                <p className="text-xl font-bold text-amber-400">$10K</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Grand Prize Cash</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
                <p className="text-xl font-bold text-amber-400">90</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Day Competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

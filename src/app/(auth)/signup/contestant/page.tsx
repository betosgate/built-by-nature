"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500";

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

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
        <p className="text-gray-400 mb-6">
          We sent a confirmation link to{" "}
          <strong className="text-white">{email}</strong>.
        </p>
        <Link href="/login">
          <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
            Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/signup"
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h1 className="text-xl font-bold text-white">Enter the Competition</h1>
      </div>
      <p className="text-gray-400 text-sm mb-5">
        You&apos;ll earn{" "}
        <strong className="text-amber-400">20% of every vote</strong> you
        receive.
      </p>

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
            placeholder="Your public name"
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
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="At least 8 characters"
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
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>
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
          <p className="text-xs text-gray-500 mt-1">You must be 18 or older</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Referral Code{" "}
            <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 accent-amber-500"
          />
          <label className="text-sm text-gray-400">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-amber-500 hover:text-amber-400"
            >
              Terms of Service
            </Link>{" "}
            and confirm I am 18+.
          </label>
        </div>
        <Button
          type="submit"
          disabled={loading || !agreedToTerms}
          className="w-full h-12 bg-amber-500 text-black hover:bg-amber-400 font-semibold text-base disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Contestant Account"}
        </Button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-amber-500 hover:text-amber-400 font-medium"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}

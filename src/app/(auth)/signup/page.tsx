"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { UserPlus, Trophy, Vote, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500";

type Role = "contestant" | "voter" | "recruiter";

const roles: { value: Role; label: string; icon: React.ReactNode; description: string }[] = [
  {
    value: "contestant",
    label: "I want to Compete",
    icon: <Trophy className="h-5 w-5" />,
    description: "Enter contests and showcase yourself",
  },
  {
    value: "voter",
    label: "I want to Vote",
    icon: <Vote className="h-5 w-5" />,
    description: "Vote for your favorites and discover talent",
  },
  {
    value: "recruiter",
    label: "I want to Recruit",
    icon: <Briefcase className="h-5 w-5" />,
    description: "Scout and recruit talent for opportunities",
  },
];

function SignupForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as Role | null;

  const [selectedRole, setSelectedRole] = useState<Role>(
    roleParam && roles.some((r) => r.value === roleParam) ? roleParam : "contestant"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Age verification
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      setError("You must be at least 18 years old to sign up");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const roleMap: Record<string, string> = { contestant: "contestant", voter: "fan", recruiter: "recruiter" };
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            role: roleMap[selectedRole] || "fan",
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
          We sent a confirmation link to <strong className="text-white">{email}</strong>.
          Click the link to verify your account and get started.
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
      <h1 className="text-2xl font-bold text-white text-center mb-2">
        Create Your Account
      </h1>
      <p className="text-gray-400 text-center mb-6">
        Join the natural beauty community
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            I want to...
          </label>
          <div className="grid grid-cols-1 gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border text-left transition-all ${
                  selectedRole === role.value
                    ? "bg-amber-500/10 border-amber-500 text-amber-500"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                {role.icon}
                <div>
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-gray-500">{role.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1.5">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            placeholder="Your public display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className={inputClass}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1.5">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className={`${inputClass} [color-scheme:dark]`}
          />
          <p className="text-xs text-gray-500 mt-1">You must be 18 or older to sign up</p>
        </div>

        {/* Referral Code */}
        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-gray-300 mb-1.5">
            Referral Code <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="referral"
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500 accent-amber-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the{" "}
            <Link href="/terms" className="text-amber-500 hover:text-amber-400">
              Terms of Service
            </Link>{" "}
            and confirm that I am 18 years of age or older.
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !agreedToTerms}
          className="w-full h-12 bg-amber-500 text-black hover:bg-amber-400 font-semibold text-base rounded-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </span>
          )}
        </Button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 text-center py-8">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}

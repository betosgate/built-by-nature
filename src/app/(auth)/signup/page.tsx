"use client";

import Link from "next/link";
import { Trophy, Heart, DollarSign, ArrowRight, Flame } from "lucide-react";

const roles = [
  {
    href: "/signup/contestant",
    icon: Trophy,
    title: "Compete",
    subtitle: "Enter as a Contestant",
    description: "Enter the competition, earn 20% of every vote, win incredible prizes.",
    cta: "Sign Up to Compete",
    accent: "border-amber-500 bg-amber-500/10",
    ctaClass: "bg-amber-500 text-black hover:bg-amber-400",
  },
  {
    href: "/signup/fan",
    icon: Heart,
    title: "Vote",
    subtitle: "Join as a Fan",
    description: "Browse contestants, vote for your favorites, unlock exclusive content.",
    cta: "Sign Up to Vote",
    accent: "border-zinc-700 bg-zinc-800/50",
    ctaClass: "bg-zinc-700 text-white hover:bg-zinc-600",
  },
  {
    href: "/signup/recruiter",
    icon: DollarSign,
    title: "Recruit",
    subtitle: "Become a Recruiter",
    description: "Find talent, earn 10% lifetime from every contestant you bring in.",
    cta: "Sign Up to Recruit",
    accent: "border-zinc-700 bg-zinc-800/50",
    ctaClass: "bg-zinc-700 text-white hover:bg-zinc-600",
  },
];

export default function SignupPage() {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Flame className="h-6 w-6 text-amber-500" />
      </div>
      <h1 className="text-2xl font-bold text-white text-center mb-1">
        Join Built by Nature
      </h1>
      <p className="text-gray-400 text-center mb-6 text-sm">
        Choose how you want to participate
      </p>

      <div className="space-y-3">
        {roles.map((role) => (
          <Link key={role.href} href={role.href}>
            <div
              className={`p-4 rounded-xl border ${role.accent} hover:border-amber-500/50 transition-all cursor-pointer group`}
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 shrink-0">
                  <role.icon className="size-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">{role.subtitle}</div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {role.description}
                  </p>
                </div>
                <ArrowRight className="size-4 text-gray-600 group-hover:text-amber-500 transition-colors shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-6">
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

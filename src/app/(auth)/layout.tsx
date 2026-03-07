import Link from "next/link";
import { Flame } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Background gradient accent */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-10 w-10 text-amber-500" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Built by Nature
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          &copy; {new Date().getFullYear()} Built by Nature. All rights reserved.
        </p>
      </div>
    </div>
  );
}

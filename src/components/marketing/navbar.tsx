"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/contests", label: "Contests" },
  { href: "/rules", label: "Rules" },
  { href: "/recruit", label: "Become a Recruiter" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Flame className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold text-white tracking-tight">
              Built by Nature
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-white/10">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 text-white">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button className="w-full bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

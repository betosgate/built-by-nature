"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Shield,
  Mail,
  DollarSign,
  Settings,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contests", label: "Contests", icon: Trophy },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/moderation", label: "Content Moderation", icon: Shield },
  { href: "/admin/email", label: "Email", icon: Mail },
  { href: "/admin/earnings", label: "Earnings & Payouts", icon: DollarSign },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-zinc-950">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <Trophy className="h-6 w-6 text-amber-500" />
          <span className="text-lg font-bold tracking-tight">Admin</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/80 px-8 backdrop-blur-sm">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">admin@builtbynature.com</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

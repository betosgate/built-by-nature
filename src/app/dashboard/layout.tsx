"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Camera,
  Mail,
  DollarSign,
  User,
  Settings,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Contests", href: "/dashboard/contests", icon: Trophy },
  { label: "Upload Content", href: "/dashboard/upload", icon: Camera },
  { label: "Messages", href: "/dashboard/messages", icon: Mail },
  { label: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 md:block">
          <div className="sticky top-0 flex h-[calc(100vh-64px)] flex-col py-6">
            <nav className="flex-1 space-y-1 px-3">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/dashboard" &&
                    pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-amber-500/10 text-amber-500"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <link.icon className="size-5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-zinc-800 px-3 pt-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black">
                  A
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    Aria Summers
                  </div>
                  <div className="text-xs text-zinc-500">Contestant</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

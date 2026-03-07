"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import {
  LayoutDashboard,
  User,
  Coins,
  MessageSquare,
  DollarSign,
  Settings,
} from "lucide-react";

const sidebarLinks = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/profile", label: "My Profile", icon: User },
  { href: "/account/tokens", label: "Buy Tokens", icon: Coins },
  { href: "/account/messages", label: "Messages", icon: MessageSquare },
  { href: "/account/earnings", label: "Earnings", icon: DollarSign },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-4rem)] border-r border-white/10 bg-white/[0.02] px-3 py-6">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/10 text-amber-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex justify-around px-2 py-2">
            {sidebarLinks.slice(0, 5).map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center gap-1 px-2 py-1 text-[10px] transition-colors ${
                    isActive ? "text-amber-500" : "text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] pb-20 md:pb-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

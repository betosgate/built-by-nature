"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, TrendingUp, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrendingContestant {
  id: string;
  name: string;
  avatar_url: string | null;
  votes: number;
  trending: boolean;
}

export function TrendingContestants() {
  const [contestants, setContestants] = useState<TrendingContestant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contestants/trending")
      .then(res => res.json())
      .then(data => setContestants(data.contestants || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-10 bg-zinc-900/50 border-y border-white/5">
        <div className="flex items-center justify-center h-20">
          <Loader2 className="size-6 animate-spin text-amber-500" />
        </div>
      </section>
    );
  }

  if (contestants.length === 0) {
    return (
      <section className="py-10 bg-zinc-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Trending Now</h3>
          </div>
          <p className="text-zinc-500 text-sm">No contestants yet. Be the first to enter the competition!</p>
        </div>
      </section>
    );
  }

  // Show up to 6 contestants in a grid
  const displayed = contestants.slice(0, 6);

  return (
    <section className="py-10 bg-zinc-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Trending Now</h3>
          </div>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            View Leaderboard
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayed.map((c, i) => (
            <Link
              key={c.id}
              href={`/contestant/${c.id}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-all hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {c.avatar_url ? (
                  <Image
                    src={c.avatar_url}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-zinc-800 text-2xl font-bold text-amber-500">
                    {c.name.charAt(0)}
                  </div>
                )}
                {/* Rank badge */}
                <div className="absolute left-2 top-2 flex size-6 items-center justify-center rounded-full bg-black/70 text-xs font-bold text-amber-400">
                  {i + 1}
                </div>
                {/* Bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
                  <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Heart className="size-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] text-zinc-400">{c.votes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

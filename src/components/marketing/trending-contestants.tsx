"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, TrendingUp, Loader2 } from "lucide-react";

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
      <section className="py-8 bg-zinc-900/50 border-y border-white/5">
        <div className="flex items-center justify-center h-20">
          <Loader2 className="size-6 animate-spin text-amber-500" />
        </div>
      </section>
    );
  }

  if (contestants.length === 0) {
    return (
      <section className="py-8 bg-zinc-900/50 border-y border-white/5">
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

  return (
    <section className="py-8 bg-zinc-900/50 border-y border-white/5 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <TrendingUp className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-white">Trending Now</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
        <div className="flex gap-6 px-4 overflow-x-auto scrollbar-hide">
          {contestants.map((c) => (
            <Link
              key={c.id}
              href={`/contestant/${c.id}`}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-amber-500/40 transition-colors cursor-pointer group flex-shrink-0"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/50 bg-zinc-800">
                {c.avatar_url ? (
                  <Image src={c.avatar_url} alt={c.name} fill className="object-cover" sizes="48px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-amber-500 font-bold text-lg">
                    {c.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{c.name}</p>
                <p className="text-xs text-gray-500">{c.votes.toLocaleString()} votes</p>
              </div>
              <Heart className="h-4 w-4 text-gray-600 group-hover:text-amber-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

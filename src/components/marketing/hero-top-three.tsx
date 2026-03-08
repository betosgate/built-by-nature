"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown, Heart, Trophy, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopContestant {
  rank: number;
  id: string;
  name: string;
  avatar_url: string | null;
  votes: number;
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1727773563114-aedb6c33b7c7?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop",
];

const rankLabels = [
  { icon: Crown, label: "#1", color: "bg-yellow-500 text-black" },
  { icon: Medal, label: "#2", color: "bg-zinc-300 text-black" },
  { icon: Medal, label: "#3", color: "bg-amber-700 text-white" },
];

export function HeroTopThree() {
  const [top3, setTop3] = useState<TopContestant[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/leaderboard?period=all&limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.leaderboard && data.leaderboard.length > 0) {
          setTop3(data.leaderboard.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const hasReal = top3.length === 3 && top3.every((c) => c.avatar_url);

  return (
    <div className="hidden lg:block relative">
      <div className="grid grid-cols-2 gap-4">
        {/* Tall left image — #1 contestant */}
        <Link
          href={hasReal ? `/contestant/${top3[0].id}` : "/contestants"}
          className="group relative aspect-[3/5] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10"
        >
          <Image
            src={hasReal ? top3[0].avatar_url! : fallbackImages[0]}
            alt={hasReal ? top3[0].name : "Featured contestant"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="300px"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <Badge className="bg-yellow-500 text-black border-none mb-1.5 font-bold">
              <Crown className="h-3 w-3 mr-1" /> #1
            </Badge>
            {hasReal && (
              <>
                <p className="text-sm font-semibold text-white truncate">{top3[0].name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Heart className="size-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs text-zinc-400">{top3[0].votes.toLocaleString()} votes</span>
                </div>
              </>
            )}
          </div>
        </Link>

        {/* Right column — #2 and #3 */}
        <div className="flex flex-col gap-4">
          {[1, 2].map((idx) => {
            const c = hasReal ? top3[idx] : null;
            const rank = rankLabels[idx];
            const RankIcon = rank.icon;
            return (
              <Link
                key={idx}
                href={c ? `/contestant/${c.id}` : "/contestants"}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10"
              >
                <Image
                  src={c?.avatar_url || fallbackImages[idx]}
                  alt={c?.name || "Contestant"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 1}
                  sizes="300px"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <Badge className={`${rank.color} border-none mb-1 text-xs font-bold`}>
                    <RankIcon className="h-3 w-3 mr-1" /> {rank.label}
                  </Badge>
                  {c && (
                    <>
                      <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Heart className="size-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] text-zinc-400">{c.votes.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* "Our Current Top 3" label below the #1 image */}
      <div className="mt-5">
        <p className="text-2xl font-bold leading-tight text-white">
          Our Current
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Top Three
          </span>
          <br />
          <span className="text-lg font-medium text-zinc-400">Contestants</span>
        </p>
      </div>

      {/* Decorative glow */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
    </div>
  );
}

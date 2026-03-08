"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Jasmine Rivera",
    title: "Summer 2025 Winner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    quote: "Built by Nature changed my life. I entered as a complete unknown and walked away with an Italy trip and $10,000. The community was incredible from day one.",
    prize: "Grand Prize Winner",
  },
  {
    name: "Kayla Mitchell",
    title: "Winter 2025 Runner-Up",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    quote: "I earned over $3,000 just from votes during the competition. The Vegas trip was unforgettable, and I made lifelong friends with the other finalists.",
    prize: "Top 3 Finalist",
  },
  {
    name: "Destiny Williams",
    title: "Summer 2025 Top 10",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    quote: "Even though I didn't win the grand prize, I earned real money from my fans' votes. This platform actually pays you just for competing. That's unheard of.",
    prize: "Earned $1,840 in Votes",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  function goTo(index: number) {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  }

  const t = testimonials[activeIndex];

  return (
    <section className="py-12 bg-gradient-to-b from-zinc-950 to-black">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Hear From Past Winners
          </h2>
          <p className="mt-3 text-zinc-400">
            Real contestants, real results. Here&apos;s what they had to say.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-8 sm:p-12">
          <Quote className="absolute right-6 top-6 size-10 text-amber-500/10 sm:size-16" />

          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-6 size-20 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-lg shadow-amber-500/20">
              <Image
                src={t.avatar}
                alt={t.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Stars */}
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Name & prize */}
            <p className="font-semibold text-white">{t.name}</p>
            <p className="text-sm text-zinc-500">{t.title}</p>
            <span className="mt-2 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
              {t.prize}
            </span>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo((activeIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-amber-500/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => goTo((activeIndex + 1) % testimonials.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-amber-500/50 hover:text-white transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "w-6 bg-amber-500"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

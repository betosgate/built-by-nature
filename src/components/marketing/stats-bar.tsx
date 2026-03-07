"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Heart, DollarSign, Trophy } from "lucide-react";

interface Stat {
  icon: typeof Users;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

function AnimatedNumber({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl font-bold text-white tabular-nums sm:text-4xl">
      {prefix}{current.toLocaleString()}{suffix}
    </div>
  );
}

const stats: Stat[] = [
  { icon: Users, value: 250, suffix: "+", prefix: "", label: "Contestants Competing" },
  { icon: Heart, value: 48500, suffix: "+", prefix: "", label: "Votes Cast" },
  { icon: DollarSign, value: 25000, suffix: "", prefix: "$", label: "In Prize Pool" },
  { icon: Trophy, value: 2, suffix: "", prefix: "", label: "Seasons Per Year" },
];

export function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto mb-3 size-6 text-amber-500" />
                <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

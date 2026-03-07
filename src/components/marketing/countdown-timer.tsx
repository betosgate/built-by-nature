"use client";

import { useState, useEffect } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [units, setUnits] = useState<TimeUnit[]>([]);

  useEffect(() => {
    function calculate() {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setUnits([
        { value: days, label: "Days" },
        { value: hours, label: "Hours" },
        { value: minutes, label: "Min" },
        { value: seconds, label: "Sec" },
      ]);
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (units.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-amber-500/30 bg-zinc-900/80 shadow-lg shadow-amber-500/10 sm:h-20 sm:w-20">
              <span className="text-2xl font-bold text-amber-400 tabular-nums sm:text-3xl">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mb-5 text-xl font-bold text-amber-500/50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

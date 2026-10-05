"use client";

import { useEffect, useState } from "react";
import { WEDDING_COUNTDOWN_UTC } from "@/lib/wedding-calendar";

const WEDDING_DATE = WEDDING_COUNTDOWN_UTC;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getRemaining(): Remaining {
  const d = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d % 86_400_000) / 3_600_000),
    minutes: Math.floor((d % 3_600_000) / 60_000),
    seconds: Math.floor((d % 60_000) / 1000),
  };
}

export default function CountdownTimer() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const units = [
    { label: "DAYS", value: remaining ? String(remaining.days) : "--" },
    { label: "HOURS", value: remaining ? pad(remaining.hours) : "--" },
    { label: "MINUTES", value: remaining ? pad(remaining.minutes) : "--" },
    { label: "SECONDS", value: remaining ? pad(remaining.seconds) : "--" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div
            className="countdown-attention w-16 sm:w-24 rounded-xl bg-white/80 shadow-sm py-4 px-2 flex flex-col items-center"
            style={{ animationDelay: `${i * 140}ms` }}
          >
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              {value}
            </span>
            <span className="text-pink text-xs sm:text-sm font-light tracking-widest uppercase mt-1">
              {label}
            </span>
          </div>
          {i < 3 && <span className="text-text-muted/50 text-xl">·</span>}
        </div>
      ))}
    </div>
  );
}

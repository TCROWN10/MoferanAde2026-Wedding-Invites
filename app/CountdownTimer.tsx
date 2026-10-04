"use client";

import { useEffect, useState } from "react";
import { WEDDING_COUNTDOWN_UTC } from "@/lib/wedding-calendar";

const WEDDING_DATE = WEDDING_COUNTDOWN_UTC;
const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

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

function Ring({ value, max, label, display }: { value: number; max: number; label: string; display: string }) {
  const fraction = Math.min(1, value / max);
  return (
    <div className="countdown-unit">
      <div className="countdown-ring">
        <svg viewBox="0 0 100 100" aria-hidden>
          <circle className="countdown-ring-track" cx="50" cy="50" r={RING_RADIUS} />
          <circle
            className="countdown-ring-progress"
            cx="50"
            cy="50"
            r={RING_RADIUS}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - fraction)}
          />
        </svg>
        <span key={display} className="countdown-value">
          {display}
        </span>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
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
    { key: "days", label: "Days", max: 365 },
    { key: "hours", label: "Hours", max: 24 },
    { key: "minutes", label: "Minutes", max: 60 },
    { key: "seconds", label: "Seconds", max: 60 },
  ] as const;

  return (
    <div className="countdown-grid" role="timer" aria-live="off">
      {units.map(({ key, label, max }) => {
        const value = remaining ? remaining[key] : 0;
        const display = remaining ? (key === "days" ? String(value) : pad(value)) : "--";
        return <Ring key={key} value={value} max={max} label={label} display={display} />;
      })}
    </div>
  );
}

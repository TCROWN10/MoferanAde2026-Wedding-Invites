"use client";

import { buildWeddingCalendarIcs } from "@/lib/wedding-calendar";

export default function AddToCalendar() {
  const handleClick = () => {
    const ics = buildWeddingCalendarIcs(new Date());
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feranmi-ademola-wedding-2026.ics";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Download wedding calendar file (Traditional wedding and Reception)"
      className="countdown-calendar-button"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" strokeLinecap="round" />
      </svg>
      Add to Calendar
    </button>
  );
}

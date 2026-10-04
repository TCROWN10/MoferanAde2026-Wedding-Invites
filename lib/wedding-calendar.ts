/**
 * Wedding times in Nigeria (WAT, UTC+1). ICS uses UTC (Z).
 * Countdown targets the traditional wedding start — same instant as DTSTART of first block below.
 */

/** November 13, 2026, 10:00 WAT → 09:00 UTC */
export const WEDDING_COUNTDOWN_UTC = new Date(Date.UTC(2026, 10, 13, 9, 0, 0));

const VENUE =
  "Bola Memorial Anglican Church Hall, 29 Mobolaji Bank-Anthony Way, Ikeja, Lagos, Nigeria";

function formatIcsUtc(dt: Date): string {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  const h = String(dt.getUTCHours()).padStart(2, "0");
  const min = String(dt.getUTCMinutes()).padStart(2, "0");
  const s = String(dt.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}T${h}${min}${s}Z`;
}

/** Escape SUMMARY / DESCRIPTION / LOCATION per RFC 5545 TEXT */
function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Fold long lines to 75 octets (CRLF + space continuation). */
function foldIcsLine(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 0) {
    parts.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  return parts.join("\r\n");
}

type CalendarEvent = {
  uid: string;
  dtStartUtc: string;
  dtEndUtc: string;
  summary: string;
  location: string;
  description: string;
};

const EVENTS: CalendarEvent[] = [
  {
    uid: "traditional-wedding-feranmi-ademola-2026@moferanade26",
    dtStartUtc: "20261113T090000Z",
    dtEndUtc: "20261113T120000Z",
    summary: "Traditional Wedding — Feranmi & Ademola",
    location: VENUE,
    description:
      "Traditional wedding ceremony. #moFeranAde’26 — Feranmi & Ademola.",
  },
  {
    uid: "reception-feranmi-ademola-2026@moferanade26",
    dtStartUtc: "20261113T120000Z",
    dtEndUtc: "20261113T160000Z",
    summary: "Reception — Feranmi & Ademola",
    location: VENUE,
    description: "Wedding reception and celebration. #moFeranAde’26.",
  },
];

export function buildWeddingCalendarIcs(now: Date = new Date()): string {
  const dtstamp = formatIcsUtc(now);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//moFeranAde26//Feranmi & Ademola//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const ev of EVENTS) {
    const block = [
      "BEGIN:VEVENT",
      `UID:${ev.uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${ev.dtStartUtc}`,
      `DTEND:${ev.dtEndUtc}`,
      `SUMMARY:${escapeIcsText(ev.summary)}`,
      `LOCATION:${escapeIcsText(ev.location)}`,
      `DESCRIPTION:${escapeIcsText(ev.description)}`,
      "END:VEVENT",
    ];
    for (const raw of block) {
      lines.push(foldIcsLine(raw));
    }
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

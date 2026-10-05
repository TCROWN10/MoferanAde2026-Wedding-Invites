import type { ReactNode } from "react";
import { Great_Vibes } from "next/font/google";

const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

function Ornament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M4 60V20C4 11 11 4 20 4h40" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 60V26c0-8 6-14 14-14h34" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <circle cx="20" cy="20" r="2.2" fill="currentColor" />
    </svg>
  );
}

function RingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="11" cy="14" r="7.5" />
      <circle cx="21" cy="14" r="7.5" />
      <path d="M9 4.5l2-2.5 2 2.5" strokeLinejoin="round" />
    </svg>
  );
}

function GlassesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6 3h8l-1 7a3 3 0 01-6 0L6 3zM18 3h8l-1 7a3 3 0 01-6 0l-1-7z" strokeLinejoin="round" />
      <path d="M10 13v8M22 13v8M7 21h6M19 21h6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function TicketShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <article className="event-ticket" aria-label={label}>
      <div className="event-ticket-shine" aria-hidden />
      <Ornament className="event-ticket-ornament event-ticket-ornament--tl" />
      <Ornament className="event-ticket-ornament event-ticket-ornament--br" />
      {children}
    </article>
  );
}

export function EventDateCard() {
  return (
    <TicketShell label="Wedding date">
      <div className="event-ticket-section">
        <p className="event-ticket-eyebrow">Save the date</p>
        <p className={`${script.className} event-ticket-script`}>Feranmi &amp; Ademola</p>
      </div>
      <div className="event-ticket-tear" aria-hidden />
      <div className="event-ticket-section">
        <div className="event-ticket-date">
          <span className="event-ticket-date-side">Friday</span>
          <span className="event-ticket-date-rule" aria-hidden />
          <span className="event-ticket-date-day event-ticket-foil">13</span>
          <span className="event-ticket-date-rule" aria-hidden />
          <span className="event-ticket-date-side">
            Nov
            <br />
            2026
          </span>
        </div>
      </div>
    </TicketShell>
  );
}

const EVENTS = {
  traditional: {
    label: "Traditional Wedding",
    time: "12:00",
    meridiem: "PM",
    note: "A celebration of our rich cultural heritage and traditions.",
    Icon: RingsIcon,
  },
  reception: {
    label: "Reception",
    time: "2:00",
    meridiem: "PM",
    note: "Join us for food, music, and joyful celebration as we begin our forever.",
    Icon: GlassesIcon,
  },
} as const;

export function EventStubCard({ event }: { event: keyof typeof EVENTS }) {
  const { label, time, meridiem, note, Icon } = EVENTS[event];
  return (
    <TicketShell label={`${label} at ${time} ${meridiem}`}>
      <div className="event-ticket-section">
        <span className="event-ticket-icon">
          <Icon className="h-5 w-6" />
        </span>
        <h3 className="event-ticket-title">{label}</h3>
      </div>
      <div className="event-ticket-tear" aria-hidden />
      <div className="event-ticket-section">
        <p className="event-ticket-time">
          <span className="event-ticket-foil">{time}</span>
          <span className="event-ticket-meridiem">{meridiem}</span>
        </p>
        <p className="event-ticket-note">{note}</p>
      </div>
    </TicketShell>
  );
}

export function EventVenueCard({ directionsHref }: { directionsHref: string }) {
  return (
    <TicketShell label="Venue">
      <div className="event-ticket-section">
        <span className="event-ticket-icon">
          <PinIcon className="h-5 w-5" />
        </span>
        <p className="event-ticket-eyebrow mt-3">The venue</p>
      </div>
      <div className="event-ticket-tear" aria-hidden />
      <div className="event-ticket-section">
        <p className="event-ticket-venue-name">Bola Memorial Anglican Church Hall</p>
        <p className="event-ticket-venue-address">29, Mobolaji Bank-Anthony Way, Ikeja, Lagos</p>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="event-ticket-directions"
          aria-label="Open Google Maps directions to Bola Memorial Anglican Church Hall, Ikeja"
        >
          <PinIcon className="h-4 w-4" />
          Get directions
        </a>
      </div>
    </TicketShell>
  );
}

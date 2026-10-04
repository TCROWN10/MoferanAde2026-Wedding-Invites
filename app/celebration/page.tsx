"use client";

import CountdownTimer from "../CountdownTimer";
import AddToCalendar from "../AddToCalendar";
import PhotoGallery from "../PhotoGallery";
import HeroSection from "../HeroSection";
import FamilyInvitation from "../FamilyInvitation";
import AboutTheCouple from "../AboutTheCouple";
import ScrollReveal from "../ScrollReveal";
import BackToTopButton from "../BackToTopButton";
import EnvelopeOverlay from "@/src/components/EnvelopeOverlay";
import { EventDateCard, EventStubCard, EventVenueCard } from "../EventTicket";
import GiftCards from "../GiftCards";
import VerseCards from "../VerseCards";
import { useState, type ReactNode } from "react";

/** Full address for Maps — `encodeURIComponent` avoids broken `?q=` links */
const GOOGLE_MAPS_VENUE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Bola Memorial Anglican Church Hall, 29 Mobolaji Bank-Anthony Way, Ikeja, Lagos, Nigeria"
)}`;

function HeartOutline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 12v10H4V12" />
      <rect x="2" y="7" width="20" height="5" rx="1" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function OrnateDivider({
  className,
  center,
}: {
  className?: string;
  center?: ReactNode;
}) {
  return (
    <div className={`mx-auto flex w-full max-w-md items-center justify-center ${className ?? ""}`}>
      <svg
        className="h-6 w-full text-[#D4AF37]"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M2 12H66" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
        <path
          d="M66 12c12 0 13-8 25-8s13 8 29 8s17-8 29-8s13 8 25 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M134 12H198" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      </svg>
      {center ? (
        <span className="mx-3 inline-flex shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-background px-1.5 py-1">
          {center}
        </span>
      ) : null}
      <svg
        className="h-6 w-full -scale-x-100 text-[#D4AF37]"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M2 12H66"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M66 12c12 0 13-8 25-8s13 8 29 8s17-8 29-8s13 8 25 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M134 12H198"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

function ColourCodeDivider({ className }: { className?: string }) {
  return <OrnateDivider className={className} />;
}

export default function Home() {
  const [overlayActive, setOverlayActive] = useState(true);

  return (
    <>
    {overlayActive && <EnvelopeOverlay onOpenComplete={() => setOverlayActive(false)} />}
    <div className="relative min-h-screen flex flex-col" aria-hidden={overlayActive}>
      <HeroSection />

      <FamilyInvitation />

      <AboutTheCouple />

      {/* Events section */}
      <section
        id="events"
        className="relative z-10 scroll-mt-24 py-12 md:py-16 lg:py-24 px-5 sm:px-6 flex flex-col items-center"
      >
        {/* Section header hearts */}
        <div className="flex items-center justify-center gap-2 mb-12" aria-hidden>
          <HeartOutline className="w-4 h-4 text-accent-green" />
          <HeartOutline className="w-4 h-4 text-pink" />
          <HeartOutline className="w-4 h-4 text-pink" />
        </div>

        {/* Bible verse */}
        <blockquote className="mt-14 max-w-xl text-center">
          <p className="font-serif text-foreground text-xl md:text-2xl italic leading-relaxed">
            &ldquo;Two are better than one, because they have a good reward for their toil.&rdquo;
          </p>
          <cite className="not-italic block text-pink text-base font-light mt-3">
            — Ecclesiastes 4:9
          </cite>
        </blockquote>

      </section>

      {/* Join Us On Our Special Days - Schedule */}
      <section
        id="our-story"
        className="relative z-10 scroll-mt-24 py-12 md:py-16 lg:py-24 px-5 sm:px-6 flex flex-col items-center"
      >
        <p className="text-text-muted text-base font-light tracking-[0.2em] uppercase mb-3">
          Mark your calendar
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center mb-8">
          Join Us On Our Special Days
        </h2>
        {/* Decorative line with calendar icon */}
        <OrnateDivider
          className="mb-12 w-full max-w-sm"
          center={<CalendarIcon className="h-6 w-6 text-pink shrink-0" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <ScrollReveal className="h-full">
            <EventDateCard />
          </ScrollReveal>
          <ScrollReveal delayMs={70} className="h-full">
            <EventStubCard event="traditional" />
          </ScrollReveal>
          <ScrollReveal delayMs={120} className="h-full">
            <EventStubCard event="reception" />
          </ScrollReveal>
          <ScrollReveal delayMs={160} className="h-full">
            <EventVenueCard directionsHref={GOOGLE_MAPS_VENUE} />
          </ScrollReveal>
        </div>
      </section>

      {/* Psalm 118:24 verse cards */}
      <VerseCards />

      {/* What to Wear / Dress Code — colour code layout */}
      <section
        id="dress-code"
        className="relative z-10 bg-background py-10 md:py-14 px-5 sm:px-6 flex flex-col items-center"
      >
        <p className="font-serif text-3xl md:text-4xl text-foreground text-center font-semibold">
          #moFeranAde’26
        </p>
        <p className="text-text-muted text-base md:text-lg font-light text-center max-w-lg mt-2 mb-6">
          We&apos;d love for our guests to dress in our wedding colors to make the celebration even
          more beautiful.
        </p>

        <div className="w-full max-w-2xl border-b border-dashed border-[#D4AF37]/35 pb-8">
          <div className="mx-auto w-full max-w-xl px-1">
            <ColourCodeDivider className="mb-4" />
            <h2 className="text-center font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-xs font-bold uppercase tracking-[0.32em] text-foreground md:text-sm">
              Colour code
            </h2>

            {/* Thin horizontal colour rules + labels (reference layout) */}
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="flex min-w-0 flex-col items-center">
                <div
                  className="h-2 w-full rounded-[2px] sm:h-2.5"
                  style={{ backgroundColor: "#046c4e" }}
                  aria-hidden
                />
                <span className="mt-2 text-center font-[system-ui,-apple-system,sans-serif] text-sm font-medium capitalize text-foreground">
                  Emerald green
                </span>
              </div>
              <div className="flex min-w-0 flex-col items-center">
                <div
                  className="h-2 w-full rounded-[2px] sm:h-2.5"
                  style={{ backgroundColor: "#d8bc82" }}
                  aria-hidden
                />
                <span className="mt-2 text-center font-[system-ui,-apple-system,sans-serif] text-sm font-medium capitalize text-foreground">
                  Champagne gold
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-xl rounded-xl bg-foreground/4 py-2 px-3 text-center">
            <span className="text-foreground text-base font-medium">
              Dress code: Formal and traditional
            </span>
          </div>
          <p className="text-foreground mt-4 text-center text-base font-light leading-relaxed">
            Ladies: Elegant outfits in emerald green and champagne gold
            <br />
            <span className="mt-1.5 block">
              Gentlemen: Traditional attire in complementary colors
            </span>
          </p>
        </div>

        <p className="text-text-muted mt-6 flex items-center justify-center gap-1.5 text-center text-base font-light">
          <span aria-hidden>♥</span>
          Come dressed to celebrate love in style!
        </p>
      </section>

      {/* Photo Gallery */}
      <section
        id="gallery"
        className="relative z-10 py-12 md:py-16 lg:py-24 px-5 sm:px-6 flex flex-col items-center"
      >
        <p className="text-pink text-sm font-light tracking-[0.2em] uppercase mb-3">
          Our moments
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center font-semibold">
          Photo Gallery
        </h2>
        <OrnateDivider
          className="my-6 w-full max-w-sm"
          center={<CameraIcon className="h-6 w-6 text-pink shrink-0" />}
        />
        <p className="text-text-muted text-base font-light text-center max-w-lg mb-10">
          A glimpse into our journey of love.
        </p>
        <div className="w-full max-w-7xl mx-auto px-0 sm:px-2">
          <PhotoGallery />
        </div>
      </section>

      {/* Gift Registry */}
      <section
        id="gifts"
        className="relative z-10 py-12 md:py-16 lg:py-24 px-5 sm:px-6 flex flex-col items-center"
      >
        <p className="text-pink text-center text-xs sm:text-sm font-light tracking-[0.2em] uppercase mb-3">
          Your presence is our present
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center font-semibold">
          Gift Registry
        </h2>
        <GiftIcon className="w-8 h-8 text-pink mt-4 mb-8" aria-hidden />

        <ScrollReveal className="w-full max-w-5xl">
          <div className="gift-panel">
            <div className="gift-panel-intro">
              <div>
                <h3 className="font-serif text-foreground text-2xl md:text-3xl font-medium">
                  Cash Gifts &amp; Well Wishes
                </h3>
                <div className="gift-panel-divider" aria-hidden>
                  <span>♥</span>
                </div>
                <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
                  Your presence at our wedding is the greatest gift of all. However, if you wish to
                  bless us, we gratefully welcome cash gifts or any item you would love to give us as
                  we begin this new chapter together.
                </p>
              </div>
              <blockquote className="gift-panel-verse">
                <p className="text-text-muted text-base font-serif italic leading-relaxed">
                  &ldquo;Each of you should give what you have decided in your heart to give, not
                  reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                </p>
                <cite className="not-italic block text-pink text-sm tracking-[0.2em] uppercase mt-3">
                  2 Corinthians 9:7
                </cite>
              </blockquote>
            </div>

            <GiftCards />
            <p className="text-text-muted text-sm font-light text-center mt-4">
              Tap the copy icon beside any detail, or <span className="text-pink">Copy all</span> for everything at once.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Countdown + RSVP section */}
      <section
        id="rsvp"
        className="relative z-10 scroll-mt-24 py-12 md:py-16 lg:py-24 px-5 sm:px-6 flex flex-col items-center"
      >
        <ScrollReveal className="flex w-full justify-center">
          <div className="countdown-panel">
            <div className="countdown-panel-glow" aria-hidden />
            <p className="countdown-eyebrow">
              <span aria-hidden>♡</span>
              <span>Counting down</span>
              <span aria-hidden>♡</span>
            </p>
            <h2 className="countdown-title">
              Until We Say <span className="whitespace-nowrap">&ldquo;I Do&rdquo;</span>
            </h2>
            <div className="countdown-divider" aria-hidden>
              <span>✦</span>
            </div>

            <CountdownTimer />

            <p className="countdown-date">Friday · 13 November 2026 · Ikeja, Lagos</p>

            {/* Add to Calendar — downloads .ics (Apple, Google, Outlook, etc.) */}
            <AddToCalendar />
          </div>
        </ScrollReveal>

        {/* RSVP */}
        <h3 className="font-serif text-foreground text-2xl md:text-3xl uppercase tracking-wide mt-16 mb-3">
          RSVP
        </h3>
        <p className="text-text-muted text-base font-light text-center max-w-md mb-8">
          RSVP contact details coming soon.
        </p>

        {/* Quotes */}
        <div className="blessing-cards">
          <ScrollReveal className="flex">
            <blockquote className="blessing-card blessing-card--emerald">
              <span className="blessing-card-mark" aria-hidden>&ldquo;</span>
              <p className="blessing-card-text">
                Love is patient, love is kind. It does not envy, it does not boast, it is not proud.
              </p>
              <cite className="blessing-card-cite">1 Corinthians 13:4</cite>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delayMs={120} className="flex">
            <blockquote className="blessing-card blessing-card--gold">
              <span className="blessing-card-mark" aria-hidden>&ldquo;</span>
              <p className="blessing-card-text">
                The Lord bless thee, and keep thee: the Lord make his face shine upon thee, and be
                gracious unto thee.
              </p>
              <cite className="blessing-card-cite">Numbers 6:24–25</cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <BackToTopButton />
    </div>
    </>
  );
}

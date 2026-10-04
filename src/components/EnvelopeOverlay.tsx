"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Great_Vibes } from "next/font/google";
import { useWeddingAudio } from "@/app/WeddingAudioContext";

const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

/** Seal slideshow — each photo zoomed in on the couple's faces. */
const SEAL_PHOTOS = [
  { src: "/IMG_7010.jpeg", position: "52% 45%", zoom: 1.7 },
  { src: "/IMG_7011.jpeg", position: "56% 25%", zoom: 1.8 },
  { src: "/IMG_7009.jpeg", position: "58% 32%", zoom: 1.5 },
] as const;

const OPEN_ANGLE = 172;
const SEAL_BREAK_MS = 700;
const FLAP_MS = 1800;
const FLAP_EASING = "cubic-bezier(0.45, 0.05, 0.25, 1)";
const OPEN_HOLD_MS = 500;
const REVEAL_MS = 1000;
/** Upward drag distance (fraction of viewport height) that maps to a fully open flap. */
const DRAG_RANGE = 0.4;
/** Release past this progress, or flick faster than this (px/ms), to open. */
const OPEN_THRESHOLD = 0.3;
const FLICK_VELOCITY = 0.5;
const TAP_SLOP_PX = 8;

const FLORAL =
  "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.08) 0%, transparent 45%), radial-gradient(circle at 75% 80%, rgba(0,0,0,0.12) 0%, transparent 40%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23d8bc82' fill-opacity='0.06'%3E%3Cellipse cx='35' cy='40' rx='22' ry='16'/%3E%3Cellipse cx='50' cy='34' rx='12' ry='9'/%3E%3Cellipse cx='105' cy='100' rx='20' ry='14'/%3E%3Cellipse cx='70' cy='70' rx='14' ry='14'/%3E%3C/g%3E%3C/svg%3E\")";

type Phase = "closed" | "dragging" | "opening" | "done";

/** Cross-fading photo stack; `offset` shifts the cycle so neighbouring frames show different photos. */
function PhotoSlides({
  alt = "",
  priority = false,
  offset = "0s",
}: {
  alt?: string;
  priority?: boolean;
  offset?: string;
}) {
  return (
    <>
      {SEAL_PHOTOS.map((photo, i) => (
        <div
          key={photo.src}
          className="envelope-slide"
          style={{ "--slide-offset": offset } as CSSProperties}
        >
          <Image
            src={photo.src}
            alt={i === 0 ? alt : ""}
            fill
            priority={priority && i === 0}
            sizes="140px"
            className="envelope-slide-photo"
            style={{
              objectPosition: photo.position,
              transform: `scale(${photo.zoom})`,
              transformOrigin: photo.position,
            }}
          />
        </div>
      ))}
    </>
  );
}

/** Bouncing photo frame that sits in one of the envelope's four triangles. */
function PhotoBadge({
  position,
  offset,
}: {
  position: "top" | "left" | "right" | "bottom";
  offset: string;
}) {
  return (
    <div className={`envelope-badge envelope-badge--${position}`} aria-hidden>
      <div className="envelope-badge-bounce" style={{ animationDelay: offset }}>
        <div className="envelope-badge-frame">
          <PhotoSlides offset={offset} />
        </div>
      </div>
    </div>
  );
}

type Props = {
  onOpenComplete: () => void;
};

export default function EnvelopeOverlay({ onOpenComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("closed");
  const { tryPlay } = useWeddingAudio();
  const rootRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const finishedRef = useRef(false);
  const openingRef = useRef(false);
  const angleRef = useRef(0);
  const dragRef = useRef<{
    id: number;
    startY: number;
    lastY: number;
    lastT: number;
    velocity: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(
    () => () => {
      animationsRef.current.forEach((a) => a.cancel());
    },
    [],
  );

  function track(animation: Animation) {
    animationsRef.current.push(animation);
    return animation;
  }

  function setFlapAngle(angle: number) {
    angleRef.current = angle;
    if (flapRef.current) flapRef.current.style.transform = `rotateX(${-angle}deg)`;
  }

  function finishOpen() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (rootRef.current) rootRef.current.style.display = "none";
    document.body.style.overflow = "";
    onOpenComplete();
    setPhase("done");
  }

  function open() {
    if (openingRef.current) return;
    openingRef.current = true;
    setPhase("opening");
    tryPlay().catch(() => {});

    const root = rootRef.current;
    const flap = flapRef.current;
    const body = bodyRef.current;
    if (!root || !flap || typeof flap.animate !== "function") {
      finishOpen();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track(root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }))
        .finished.then(finishOpen, finishOpen);
      return;
    }

    const startAngle = angleRef.current;
    const remaining = (OPEN_ANGLE - startAngle) / OPEN_ANGLE;
    const flapMs = Math.max(900, FLAP_MS * remaining);

    const seal = sealRef.current;
    const breakMs = seal && startAngle < 20 ? SEAL_BREAK_MS : 0;
    if (seal && breakMs) {
      track(
        seal.animate(
          [
            { transform: "scale(1) rotate(0deg)", filter: "brightness(1)" },
            { transform: "scale(0.9) rotate(-6deg)", filter: "brightness(1.1)", offset: 0.25 },
            { transform: "scale(1.14) rotate(5deg)", filter: "brightness(1.35)", offset: 0.55 },
            { transform: "scale(0.97) rotate(-2deg)", filter: "brightness(1.15)", offset: 0.8 },
            { transform: "scale(1) rotate(0deg)", filter: "brightness(1)" },
          ],
          { duration: breakMs, easing: "ease-in-out" },
        ),
      );
    }

    track(
      flap.animate(
        [{ transform: `rotateX(${-startAngle}deg)` }, { transform: `rotateX(${-OPEN_ANGLE}deg)` }],
        { duration: flapMs, delay: breakMs, easing: FLAP_EASING, fill: "forwards" },
      ),
    ).finished.then(() => setFlapAngle(OPEN_ANGLE), () => {});

    const revealDelay = breakMs + flapMs + OPEN_HOLD_MS;
    if (body) {
      track(
        body.animate([{ transform: "translateY(0)" }, { transform: "translateY(100%)" }], {
          duration: REVEAL_MS,
          delay: revealDelay,
          easing: "cubic-bezier(0.55, 0, 0.1, 1)",
          fill: "forwards",
        }),
      );
    }
    track(
      root.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: REVEAL_MS,
        delay: revealDelay + REVEAL_MS * 0.35,
        easing: "ease-out",
        fill: "forwards",
      }),
    ).finished.then(finishOpen, finishOpen);
  }

  function springBack() {
    const flap = flapRef.current;
    const from = angleRef.current;
    setPhase("closed");
    if (!flap || typeof flap.animate !== "function" || from === 0) {
      setFlapAngle(0);
      return;
    }
    const anim = track(
      flap.animate([{ transform: `rotateX(${-from}deg)` }, { transform: "rotateX(0deg)" }], {
        duration: 450,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }),
    );
    setFlapAngle(0);
    anim.finished.catch(() => {});
  }

  function onPointerDown(e: ReactPointerEvent<HTMLButtonElement>) {
    if (openingRef.current || !e.isPrimary) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      id: e.pointerId,
      startY: e.clientY,
      lastY: e.clientY,
      lastT: e.timeStamp,
      velocity: 0,
      moved: false,
    };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId || openingRef.current) return;

    const lift = drag.startY - e.clientY;
    if (!drag.moved && Math.abs(lift) < TAP_SLOP_PX) return;
    if (!drag.moved) {
      drag.moved = true;
      setPhase("dragging");
    }

    const dt = Math.max(1, e.timeStamp - drag.lastT);
    drag.velocity = (drag.lastY - e.clientY) / dt;
    drag.lastY = e.clientY;
    drag.lastT = e.timeStamp;

    const progress = Math.min(1, Math.max(0, lift / (window.innerHeight * DRAG_RANGE)));
    setFlapAngle(progress * OPEN_ANGLE * 0.85);
  }

  function onPointerEnd(e: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (!drag.moved || openingRef.current) return;

    suppressClickRef.current = true;
    const progress = angleRef.current / OPEN_ANGLE;
    if (e.type !== "pointercancel" && (progress >= OPEN_THRESHOLD || drag.velocity >= FLICK_VELOCITY)) {
      open();
    } else {
      springBack();
    }
  }

  function onClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    open();
  }

  if (phase === "done") return null;

  const isClosed = phase === "closed";
  const isOpening = phase === "opening";

  return (
    <div
      ref={rootRef}
      className={`envelope-root${isOpening ? " envelope-root--opening" : ""}`}
    >
      <button
        type="button"
        className="envelope-tap-target"
        disabled={isOpening}
        aria-label="Open envelope"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      />

      <div ref={bodyRef} className="envelope-body">
        <div className="envelope-side envelope-side--left" style={{ backgroundImage: FLORAL }} />
        <div className="envelope-side envelope-side--right" style={{ backgroundImage: FLORAL }} />
        <div className="envelope-bottom-wrap">
          <div className="envelope-bottom" style={{ backgroundImage: FLORAL }} />
        </div>
        <div className={`envelope-flap-shadow${isClosed ? "" : " envelope-flap-shadow--hide"}`}>
          <div />
        </div>
        <PhotoBadge position="left" offset="-3s" />
        <PhotoBadge position="right" offset="-6s" />
        <PhotoBadge position="bottom" offset="-4.5s" />
        <div className="envelope-text">
          <p className={`${script.className} envelope-front-text`}>You are invited</p>
          <p className={`envelope-tap-hint${isClosed ? "" : " envelope-tap-hint--hidden"}`}>
            Tap or swipe up to open
          </p>
        </div>
      </div>

      <div className="envelope-flap-stage">
        <div ref={flapRef} className="envelope-flap-unit">
          <div
            className="envelope-flap-face envelope-flap-face--front"
            style={{ backgroundImage: FLORAL }}
          />
          <div className="envelope-flap-face envelope-flap-face--back" />
          <PhotoBadge position="top" offset="-7.5s" />
          <div className="envelope-seal">
            <div ref={sealRef} className="envelope-seal-inner">
              <div className="envelope-seal-body">
                <PhotoSlides alt="Feranmi and Ademola" priority />
              </div>
              <div className="envelope-seal-ring" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

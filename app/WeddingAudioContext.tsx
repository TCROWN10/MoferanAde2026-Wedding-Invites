"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const WEDDING_AUDIO_SRC = "/Moses_Bliss_-_For_Life_CeeNaija.com_.mp3";

/** Set from the landing page CTA so playback can start on `/celebration` (same user gesture chain). */
export const WEDDING_PLAY_AFTER_NAV_KEY = "weddingPlayAfterNav";

type WeddingAudioContextValue = {
  tryPlay: () => Promise<void>;
  /** True on `/celebration` whenever the music is not playing, so the play button can show. */
  needsUserPlay: boolean;
  /** False on the landing page, or when the audio file failed to load. */
  musicEnabled: boolean;
};

const WeddingAudioContext = createContext<WeddingAudioContextValue | null>(null);

export function useWeddingAudio() {
  const ctx = useContext(WeddingAudioContext);
  if (!ctx) {
    throw new Error("useWeddingAudio must be used within WeddingAudioProvider");
  }
  return ctx;
}

/** Shared audio for `/celebration` only — starts from the landing page "Open Invitation" tap. */
export function WeddingAudioProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const isLanding = pathname === "/";

  const startedRef = useRef(false);

  /** Must be called from a user gesture (the "Open Invitation" tap) so mobile browsers allow sound. */
  const tryPlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return Promise.resolve();
    startedRef.current = true;
    el.loop = true;
    return el.play().catch(() => {});
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.loop = true;
    el.volume = 0.75;

    const onEnded = () => {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = 0;
      a.play().catch(() => {});
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !isLanding) return;
    el.pause();
    startedRef.current = false;
  }, [isLanding]);

  /**
   * Browsers block sound on a fresh page load until the guest interacts, so if the
   * "Open Invitation" tap didn't start playback, start it on their first touch, click or key press.
   */
  useEffect(() => {
    if (isLanding) return;
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void tryPlay();

    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    const onInteract = () => {
      if (audioRef.current?.paused) void tryPlay();
    };
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, onInteract));
  }, [isLanding, tryPlay]);

  useEffect(() => {
    const onVis = () => {
      const el = audioRef.current;
      if (!el || !startedRef.current || document.hidden) return;
      el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const musicEnabled = audioAvailable && !isLanding;
  const value: WeddingAudioContextValue = {
    tryPlay,
    needsUserPlay: musicEnabled && !playing,
    musicEnabled,
  };

  return (
    <WeddingAudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={WEDDING_AUDIO_SRC}
        loop
        preload="auto"
        aria-hidden
        onError={() => setAudioAvailable(false)}
      />
      {children}
    </WeddingAudioContext.Provider>
  );
}

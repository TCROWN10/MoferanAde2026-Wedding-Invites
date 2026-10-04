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
  needsUserPlay: boolean;
  /** True only after the guest clicked Open Invitation on the landing page. */
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

/** Shared audio for `/celebration` only — stays silent until the envelope seal is opened. */
export function WeddingAudioProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [needsUserPlay, setNeedsUserPlay] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const isLanding = pathname === "/";

  const startedRef = useRef(false);

  /** Must be called from a user gesture (the envelope seal opening) so mobile browsers allow sound. */
  const tryPlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return Promise.resolve();
    startedRef.current = true;
    setMusicEnabled(true);
    el.loop = true;
    return el.play().then(
      () => setNeedsUserPlay(false),
      () => {
        setNeedsUserPlay(true);
      },
    );
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

    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !isLanding) return;
    el.pause();
    startedRef.current = false;
  }, [isLanding]);

  useEffect(() => {
    const onVis = () => {
      const el = audioRef.current;
      if (!el || !startedRef.current || document.hidden) return;
      el.play().catch(() => setNeedsUserPlay(true));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const value: WeddingAudioContextValue = {
    tryPlay,
    needsUserPlay: needsUserPlay && !isLanding,
    musicEnabled: musicEnabled && !isLanding,
  };

  return (
    <WeddingAudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={WEDDING_AUDIO_SRC}
        loop
        preload="metadata"
        aria-hidden
        onError={() => {
          setNeedsUserPlay(false);
          setMusicEnabled(false);
        }}
      />
      {children}
    </WeddingAudioContext.Provider>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import CoverScreen from '../components/CoverScreen';
import CloudTransition from '../components/CloudTransition';
import GardenHero from '../components/GardenHero';
import themeMusic from '../assets/music/theme.mp3';
import RainOverlay from '../components/RainOverlay';

const T = { clearing: 2800, revealed: 7000 };
const MUSIC_VOLUME = 0.35;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// iOS-safe scroll lock
function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    return () => {
      Object.assign(body.style, prev);
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

export default function InvitationExperience() {
  const [phase, setPhase] = useState('cover');
  const timers = useRef([]);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const startedRef = useRef(false);   // ← FIX 1: gate for events

  useBodyScrollLock(phase !== 'revealed');

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Smooth volume fade helper
  const fadeTo = useCallback((target, duration = 600) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const start = audio.volume;
    const startTime = performance.now();

    fadeRef.current = setInterval(() => {
      const t = Math.min(1, (performance.now() - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t >= 1) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 30);
  }, []);

  // Video section signals — gated so they do nothing before the user clicks Open
  useEffect(() => {
    const onPause = () => {
      if (!startedRef.current) return;   // ← FIX 2: bail if music never started
      fadeTo(0, 400);
      setTimeout(() => {
        if (audioRef.current && audioRef.current.volume < 0.02) {
          audioRef.current.pause();
        }
      }, 450);
    };

    const onResume = () => {
      if (!startedRef.current) return;   // ← FIX 3: bail if music never started
      const audio = audioRef.current;
      if (!audio) return;
      audio.play().catch(() => {});
      fadeTo(MUSIC_VOLUME, 700);
    };

    window.addEventListener('music:pause', onPause);
    window.addEventListener('music:resume', onResume);

    return () => {
      window.removeEventListener('music:pause', onPause);
      window.removeEventListener('music:resume', onResume);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, [fadeTo]);

  const open = useCallback(() => {
    if (phase !== 'cover') return;

    // Music starts here — inside the click handler. This is the ONLY
    // place the source is attached and the ONLY place playback begins.
    const audio = audioRef.current;
    if (audio) {
      startedRef.current = true;             // ← FIX 4: unlock music logic
      if (!audio.src) audio.src = themeMusic; // ← FIX 5: attach source NOW
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeTo(MUSIC_VOLUME, 900);
    }

    if (prefersReducedMotion()) {
      setPhase('revealed');
      return;
    }
    setPhase('sky');
    timers.current = [
      setTimeout(() => setPhase('clearing'), T.clearing),
      setTimeout(() => setPhase('revealed'), T.revealed),
    ];
  }, [phase, fadeTo]);

  return (
    <>
      <GardenHero revealed={phase === 'revealed' || phase === 'clearing'} />
      <CloudTransition phase={phase} />
      <CoverScreen phase={phase} onOpen={open} />
       <RainOverlay />
      {/* ← FIX 6: no src, no preload. Nothing to fetch until the click. */}
      <audio ref={audioRef} loop playsInline />
    </>
  );
}
import { useEffect, useRef, useState } from 'react';
import { invitation as inv } from '../data/invitation.config';

export default function VideoSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Autoplay on enter, pause on leave
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Keep the video element in sync with our mute state
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (muted) {
      video.muted = false;
      video.play().catch(() => {});
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="video"
      className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
    >
      {/* --- Full-bleed background video --- */}
      <video
        ref={videoRef}
        src={inv.video.src}
        poster={inv.video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* --- Soft scrim so text stays legible --- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
        }}
      />

      {/* --- Content card --- */}
      <div className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16">

        <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
          {inv.video.eyebrow}
        </p>

        <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
          {inv.video.title}
        </h2>

        <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
          <span className="h-px w-10 bg-current" />
          <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
            <path d="M4 0 L8 4 L4 8 L0 4 Z" />
          </svg>
          <span className="h-px w-10 bg-current" />
        </div>

        <p className="mx-auto max-w-sm font-serif text-base italic leading-[1.95] text-forest/75">
          {inv.video.caption}
        </p>

        {/* Sound toggle — floating button inside the card */}
        {inv.video.hasAudio && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Play sound' : 'Mute sound'}
            aria-pressed={!muted}
            className="mt-10 inline-flex items-center gap-3 rounded-sm border border-forest/25 bg-mist/60 px-6 py-3
                       font-serif text-xs uppercase tracking-[.35em] text-forest/85 backdrop-blur-sm
                       transition hover:border-forest/50 hover:bg-mist/80 hover:text-forest
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rain"
          >
            {muted ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M2 6h3l4-3v10l-4-3H2z" />
                  <path d="M11 6l3 4M14 6l-3 4" />
                </svg>
                Play Sound
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M2 6h3l4-3v10l-4-3H2z" />
                  <path d="M11 6a3 3 0 0 1 0 4M13 4a6 6 0 0 1 0 8" />
                </svg>
                Mute
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
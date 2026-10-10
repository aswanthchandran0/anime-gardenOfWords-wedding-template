import { useCallback, useEffect, useRef, useState } from 'react'
import { invitation as inv } from '../data/invitation.config';
import gardenBg from '../assets/replace-garden-hero-bg.jpg';
import memoryImage from '../assets/replace-garden-hero-bg.jpg';
import detailBg from '../assets/replace-details-bg.jpg';
import huggingBg from '../assets/replace-hugging.jpg';
import hugging2Bg from '../assets/replace-hugging2.jpg';
import hugging3Bg from '../assets/replace-celebration-bg.jpg';
import countdownBg from '../assets/replace-countdown-bg.jpeg';
import celebrationBg from '../assets/replace-hugging3.jpg';
import scheduleBg from '../assets/replace-schedule-bg.jpg'
import Countdown from './Countdown';
import ViewLocationButton from './ViewLocationButton';
import AddToCalendarButton from './AddToCalendarButton';
import galleryBg from '../assets/replace-gallery-bg.jpg';
import closingBg from '../assets/replace-closing-bg.jpg'
import Gallery from './Gallery';
import VideoSection from './VideoSection';
import momentVideo from '../assets/videos/replace-moment.mp4'

function AmbientOverlay() {
  return (
    <svg
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="g-sun" cx=".55" cy=".28" r=".55">
          <stop offset="0" stopColor="#F6E7BE" stopOpacity=".55" />
          <stop offset="1" stopColor="#F6E7BE" stopOpacity="0" />
        </radialGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      <ellipse cx="220" cy="230" rx="220" ry="260" fill="url(#g-sun)" />
      <g fill="none" stroke="#F3F4F1" strokeWidth="1">
        {[[110, 590, 0], [260, 640, 1.6], [180, 700, 3.1], [330, 560, 2.2]].map(
          ([x, y, d], i) => (
            <ellipse key={i} className="ripple" cx={x} cy={y} rx="24" ry="6"
              style={{ animationDelay: `${d}s` }} />
          )
        )}
      </g>
      <g stroke="#F3F4F1" strokeWidth=".8" opacity=".45">
        {[40, 110, 170, 240, 300, 360].map((x, i) => (
          <line key={x} className="rain-streak" x1={x} y1="0" x2={x - 4} y2="40"
            style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </g>
    </svg>
  );
}

function GardenBackdrop() {
  return (
    <>
      <img src={gardenBg} alt="" aria-hidden="true" draggable="false"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      <div className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(247,245,239,0.65) 0%, rgba(247,245,239,0.22) 45%, rgba(247,245,239,0) 75%)',
        }} />
    </>
  );
}

export default function GardenHero({ revealed }) {
  const detailsRef = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const scrollToDetails = useCallback((e) => {
    e.preventDefault();
    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

   // Autoplay video on enter/pause on leave + signal music to duck/resume
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      window.dispatchEvent(new Event('music:pause'));
      window.dispatchEvent(new Event('rain:hide'));      // ← ADD
      video.play().catch(() => {});
    } else {
      window.dispatchEvent(new Event('music:resume'));
      window.dispatchEvent(new Event('rain:show'));      // ← ADD
      video.pause();
    }
  },
  { threshold: 0.35 }
);
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Reflect mute state on the video element
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
    <main className="fixed inset-0 z-10 overflow-y-auto bg-mist">
      <div className="relative min-h-[100svh]">
        <GardenBackdrop />
        <AmbientOverlay />

        <div
          className={`relative z-10 flex min-h-[100svh] items-center justify-center px-5 transition-all duration-[2200ms] ease-out
            ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="w-full max-w-md rounded-sm bg-mist/35 px-8 py-12 text-center text-forest shadow-[0_20px_60px_-30px_rgba(52,75,59,.6)] backdrop-blur-md">
            <p className="font-serif text-sm tracking-[.2em]">{inv.families}</p>
            <p className="mx-auto mt-4 max-w-[18rem] font-serif text-base leading-relaxed text-forest/80">
              {inv.invitationLine}
            </p>
            <h2 className="my-8 font-serif text-[clamp(2rem,9vw,3.2rem)] font-light leading-tight">
              {inv.partnerOne}
              <span className="block font-serif text-xl italic text-rain">and</span>
              {inv.partnerTwo}
            </h2>
            <div className="mx-auto h-px w-10 bg-forest/40" />
            <p className="mt-6 font-serif text-lg tracking-[.15em]">{inv.displayDate}</p>
            <p className="mx-auto mt-6 max-w-[17rem] font-serif text-base italic leading-relaxed text-forest/75">
              {inv.quote}
            </p>
            <button
              type="button"
              onClick={scrollToDetails}
              aria-label="Scroll to details"
              className="mt-10 inline-block text-rain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <svg className="nudge h-5 w-5" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M3 6l5 5 5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Memory strip --- */}
      <section
        aria-hidden="true"
        className="relative h-[80svh] w-full overflow-hidden bg-mist sm:h-[90svh]"
      >
        <img src={memoryImage} alt="" draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      </section>

     {/* --- Section: Details (background image + centered card) --- */}
<section
  id="details"
  ref={detailsRef}
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background image */}
  <img
    src={detailBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Soft scrim so the card's frost has something to work with */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card */}
  <div
    className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16"
  >
    {/* Eyebrow */}
    <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
      {inv.reception.eyebrow}
    </p>

    {/* Title */}
    <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
      {inv.reception.title}
    </h2>

    {/* Year — a decorative subtitle */}
    <p className="mt-3 font-serif text-lg italic tracking-[.5em] text-forest/65">
      {inv.reception.year}
    </p>

    {/* Ornamental divider: line — diamond — line */}
    <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
      <span className="h-px w-10 bg-current" />
      <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
        <path d="M4 0 L8 4 L4 8 L0 4 Z" />
      </svg>
      <span className="h-px w-10 bg-current" />
    </div>

    {/* Description */}
    <p className="mx-auto max-w-sm font-serif text-base leading-[1.95] text-forest/85">
      {inv.reception.description}
    </p>

    {/* Verse */}
    <p className="mx-auto mt-6 max-w-xs font-serif text-base italic leading-[1.95] text-forest/70">
      {inv.reception.verse}
    </p>

    {/* --- Date panel --- */}
    <div className="mx-auto mt-12 max-w-xs border-y border-forest/20 py-6">
      <p className="font-serif text-xs uppercase tracking-[.45em] text-forest/60">
        {inv.reception.weekday}
      </p>

      <div className="my-3 flex items-center justify-center gap-3">
        <span className="h-px w-6 bg-forest/30" />
        <p className="font-serif text-6xl font-light leading-none text-forest">
          {inv.reception.day}
        </p>
        <span className="h-px w-6 bg-forest/30" />
      </div>

      <p className="font-serif text-xs uppercase tracking-[.45em] text-forest/70">
        {inv.reception.month} · {inv.reception.year2}
      </p>
    </div>

    
    <div className="mt-10 space-y-3 font-serif text-forest/80">
      <p className="text-sm uppercase tracking-[.35em]">{inv.reception.time}</p>

      <p className="mx-auto h-px w-8 bg-forest/30" />

      <p className="text-base tracking-[.08em]">{inv.reception.venue}</p>

      <p className="text-sm italic tracking-normal text-forest/55">
        {inv.reception.address}
      </p>
    </div>
  </div>
</section>

 {/* --- hugging strip --- */}
      <section
        aria-hidden="true"
        className="relative h-[30vh] w-full overflow-hidden bg-mist sm:h-[90svh]"
      >
        <img src={huggingBg} alt="" draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      </section>

{/* --- Section: Countdown --- */}
<section
  id="countdown"
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background */}
  <img
    src={countdownBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Scrim */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card */}
  <div className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16">
    <Countdown />
  </div>
</section>


 {/* --- hugging 2 strip --- */}
      <section
        aria-hidden="true"
        className="relative h-[30vh] w-full overflow-hidden bg-mist sm:h-[90svh]"
      >
        <img src={hugging2Bg} alt="" draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      </section>



{/* --- Section: Celebration / Venue --- */}
<section
  id="celebration"
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background */}
  <img
    src={celebrationBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Scrim */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card */}
  <div className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16">

    {/* Eyebrow */}
    <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
      {inv.celebration.eyebrow}
    </p>

    {/* Title */}
    <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
      {inv.celebration.title}
    </h2>

    {/* Ornamental divider */}
    <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
      <span className="h-px w-10 bg-current" />
      <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
        <path d="M4 0 L8 4 L4 8 L0 4 Z" />
      </svg>
      <span className="h-px w-10 bg-current" />
    </div>

    {/* Verse — the emotional beat */}
    <p className="mx-auto max-w-sm font-serif text-base italic leading-[1.95] text-forest/75">
      {inv.celebration.verse}
    </p>

    {/* Description */}
    <p className="mx-auto mt-6 max-w-sm font-serif text-base leading-[1.95] text-forest/85">
      {inv.celebration.description}
    </p>

    {/* --- Venue panel: bordered block with name + address --- */}
    <div className="mx-auto mt-12 max-w-sm border-y border-forest/20 py-8">

      {/* Small "venue" label */}
      <p className="font-serif text-[10px] uppercase tracking-[.5em] text-forest/50">
        The Venue
      </p>

      {/* Venue name — biggest text here */}
      <p className="mt-4 font-serif text-[clamp(1.4rem,5vw,1.9rem)] font-light leading-tight tracking-[.05em] text-forest">
        {inv.celebration.venueName}
      </p>

      {/* One-line poetic descriptor */}
      <p className="mt-3 font-serif text-sm italic leading-relaxed text-forest/65">
        {inv.celebration.venueLine}
      </p>

      {/* Inner hairline */}
      <div className="mx-auto my-6 h-px w-8 bg-forest/25" />

     

    </div>
  </div>
</section>


 {/* --- hugging 2 strip --- */}
      <section
        aria-hidden="true"
        className="relative h-[30vh] w-full overflow-hidden bg-mist sm:h-[90svh]"
      >
        <img src={hugging3Bg} alt="" draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
      </section>


{/* =====================================================================
    SECTION 9 — DATE & SCHEDULE
===================================================================== */}
<section
  id="schedule"
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background */}
  <img
    src={scheduleBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Scrim */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card */}
  <div className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16">

    {/* Eyebrow */}
    <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
      {inv.schedule.eyebrow}
    </p>

    {/* Calendar block */}
    <div className="mx-auto mt-10 max-w-xs">
      <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/55">
        {inv.schedule.weekday}
      </p>

      <div className="my-5 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-forest/25" />
        <p className="font-serif text-7xl font-light leading-none text-forest sm:text-8xl">
          {inv.schedule.day}
        </p>
        <span className="h-px w-10 bg-forest/25" />
      </div>

      <p className="font-serif text-sm uppercase tracking-[.5em] text-forest/75">
        {inv.schedule.month}
        <span className="mx-2 text-forest/40">·</span>
        {inv.schedule.year}
      </p>
    </div>

    {/* Ornamental divider */}
    <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
      <span className="h-px w-10 bg-current" />
      <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
        <path d="M4 0 L8 4 L4 8 L0 4 Z" />
      </svg>
      <span className="h-px w-10 bg-current" />
    </div>

    {/* Event name */}
    <h2 className="font-serif text-[clamp(1.6rem,6vw,2.2rem)] font-light leading-tight tracking-[.08em]">
      {inv.schedule.eventName}
    </h2>

    {/* Time */}
    <p className="mt-4 font-serif text-xs uppercase tracking-[.5em] text-forest/55">
      {inv.schedule.timeLabel}
    </p>
    <p className="mt-2 font-serif text-lg tracking-[.1em] text-forest/85">
      {inv.schedule.time}
    </p>

    {/* Venue panel */}
    <div className="mx-auto mt-12 max-w-sm border-y border-forest/20 py-8">
      <p className="font-serif text-[10px] uppercase tracking-[.5em] text-forest/50">
        {inv.schedule.venueLabel}
      </p>

      <p className="mt-4 font-serif text-[clamp(1.4rem,5vw,1.9rem)] font-light leading-tight tracking-[.05em] text-forest">
        {inv.schedule.venueName}
      </p>

      <p className="mt-3 font-serif text-sm italic leading-relaxed text-forest/65">
        {inv.schedule.venueLine}
      </p>

      <div className="mx-auto my-6 h-px w-8 bg-forest/25" />

      <address className="not-italic font-serif text-sm leading-[1.9] tracking-[.08em] text-forest/80">
        {inv.schedule.addressLine1}
        <br />
        {inv.schedule.addressLine2}
      </address>
    </div>

    {/* Actions */}
    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <ViewLocationButton />
      <AddToCalendarButton />
    </div>
  </div>
</section>


{/* =====================================================================
    SECTION 10 — GALLERY
===================================================================== */}
<section
  id="gallery"
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background */}
  <img
    src={galleryBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Scrim */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card — wider than the others to hold the grid */}
  <div className="relative z-10 w-full max-w-3xl rounded-sm bg-mist/55 px-6 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-10 sm:py-16">
    <Gallery />
  </div>
</section>


 <section
      ref={sectionRef}
      aria-label="A moment in motion"
      className="relative z-40 h-[100svh] w-full overflow-hidden bg-mist sm:h-[90svh]"
    >
      <video
        ref={videoRef}
        src={momentVideo}
        poster={inv.video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {inv.video.hasAudio && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Play sound' : 'Mute sound'}
          aria-pressed={!muted}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full
                     border border-mist/40 bg-forest/60 px-4 py-2 backdrop-blur-md
                     font-serif text-[10px] uppercase tracking-[.35em] text-mist/95
                     transition-colors hover:bg-forest/80
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
        >
          {muted ? (
            <>
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M2 6h3l4-3v10l-4-3H2z" />
                <path d="M11 6l3 4M14 6l-3 4" />
              </svg>
              Play Sound
            </>
          ) : (
            <>
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M2 6h3l4-3v10l-4-3H2z" />
                <path d="M11 6a3 3 0 0 1 0 4M13 4a6 6 0 0 1 0 8" />
              </svg>
              Mute
            </>
          )}
        </button>
      )}
    </section>

{/* =====================================================================
    SECTION 11 — CLOSING / THANK YOU + EVERLOOM CREDIT
===================================================================== */}
<section
  id="closing"
  className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-mist px-5 py-24"
>
  {/* Background */}
  <img
    src={closingBg}
    alt=""
    aria-hidden="true"
    draggable="false"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
  />

  {/* Scrim */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(247,245,239,0.7) 0%, rgba(247,245,239,0.3) 55%, rgba(247,245,239,0) 90%)',
    }}
  />

  {/* Frosted card */}
  <div className="relative z-10 w-full max-w-lg rounded-sm bg-mist/55 px-8 py-12 text-center text-forest shadow-[0_30px_80px_-40px_rgba(52,75,59,.55)] backdrop-blur-md sm:px-12 sm:py-16">

    {/* Eyebrow */}
    <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
      {inv.closing.eyebrow}
    </p>

    {/* Title */}
    <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
      {inv.closing.title}
    </h2>

    {/* Ornamental divider */}
    <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
      <span className="h-px w-10 bg-current" />
      <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
        <path d="M4 0 L8 4 L4 8 L0 4 Z" />
      </svg>
      <span className="h-px w-10 bg-current" />
    </div>

    {/* Message */}
    <p className="mx-auto max-w-sm font-serif text-base leading-[1.95] text-forest/85">
      {inv.closing.message}
    </p>

    {/* Signature */}
    <p className="mt-10 font-serif text-lg italic tracking-[.15em] text-forest/70">
      {inv.closing.signature}
    </p>

    {/* Hairline */}
    <div className="mx-auto mt-16 h-px w-16 bg-forest/25" />

    {/* Credit */}
    <p className="mt-8 font-serif text-[10px] uppercase tracking-[.5em] text-forest/45">
      {inv.closing.credit.prefix}
    </p>

    <a
      href={inv.closing.credit.href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block font-serif text-base tracking-[.35em] text-forest transition-colors
                 hover:text-rain
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rain"
    >
      {inv.closing.credit.name}
    </a>
  </div>
</section>

    </main>
  );
}
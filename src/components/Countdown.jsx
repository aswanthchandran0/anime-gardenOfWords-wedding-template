import { useEffect, useState } from 'react';
import { invitation as inv } from '../data/invitation.config';

// Break milliseconds into { days, hours, minutes, seconds }
function splitDuration(ms) {
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const targetIso = inv.countdown.overrideTarget || inv.weddingDate;
  const target = new Date(targetIso).getTime();

  const [time, setTime] = useState(() => splitDuration(target - Date.now()));

  useEffect(() => {
    // Update once per second. Align to the second boundary so
    // the seconds digit flips cleanly on real tick marks.
    let intervalId;
    const tick = () => setTime(splitDuration(target - Date.now()));
    tick();
    intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [target]);

  const units = [
    { label: inv.countdown.labels.days, value: time.days },
    { label: inv.countdown.labels.hours, value: time.hours },
    { label: inv.countdown.labels.minutes, value: time.minutes },
    { label: inv.countdown.labels.seconds, value: time.seconds },
  ];

  return (
    <>
      {/* Eyebrow */}
      <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
        {inv.countdown.eyebrow}
      </p>

      {/* Title */}
      <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
        {inv.countdown.title}
      </h2>

      {/* Ornamental divider */}
      <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
        <span className="h-px w-10 bg-current" />
        <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
          <path d="M4 0 L8 4 L4 8 L0 4 Z" />
        </svg>
        <span className="h-px w-10 bg-current" />
      </div>

      {/* Timer grid */}
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-3 sm:gap-5">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <div className="relative flex h-16 w-full items-center justify-center border border-forest/20 bg-mist/30 backdrop-blur-sm sm:h-20">
              <span className="font-serif text-3xl font-light leading-none text-forest sm:text-4xl">
                {String(u.value).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-3 font-serif text-[10px] uppercase tracking-[.35em] text-forest/60">
              {u.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer line */}
      <p className="mt-10 font-serif text-sm italic tracking-normal text-forest/60">
        {inv.countdown.footer}
      </p>
    </>
  );
}
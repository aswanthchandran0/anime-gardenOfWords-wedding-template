import { invitation as inv } from '../data/invitation.config';

// Converts an ISO string into Google Calendar's expected UTC format
// "YYYYMMDDTHHMMSSZ". Handles timezones correctly via the offset
// embedded in the ISO string.
function toGoogleDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export default function AddToCalendarButton() {
  const c = inv.schedule.calendar;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: c.title,
    details: c.description,
    location: c.location,
    dates: `${toGoogleDate(c.start)}/${toGoogleDate(c.end)}`,
  });

  const href = `https://calendar.google.com/calendar/render?${params.toString()}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-sm border border-forest/25 bg-mist/40 px-6 py-3 font-serif text-xs uppercase tracking-[.35em] text-forest/85 backdrop-blur-sm
                 transition hover:border-forest/50 hover:bg-mist/60 hover:text-forest
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rain"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
        <path d="M5 2v3M11 2v3M2.5 7h11" />
      </svg>
      Add to Calendar
    </a>
  );
}
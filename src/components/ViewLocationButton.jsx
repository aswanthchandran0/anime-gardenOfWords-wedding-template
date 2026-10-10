import { invitation as inv } from '../data/invitation.config';

export default function ViewLocationButton() {
  const href = inv.schedule.mapHref;

  // Hide the button entirely if no link is configured.
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-sm border border-forest/25 bg-mist/40 px-6 py-3 font-serif text-xs uppercase tracking-[.35em] text-forest/85 backdrop-blur-sm
                 transition hover:border-forest/50 hover:bg-mist/60 hover:text-forest
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rain"
    >
      {/* Pin icon */}
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M8 14s4-4.5 4-8a4 4 0 1 0-8 0c0 3.5 4 8 4 8Z" />
        <circle cx="8" cy="6" r="1.4" />
      </svg>
      View Location
    </a>
  );
}
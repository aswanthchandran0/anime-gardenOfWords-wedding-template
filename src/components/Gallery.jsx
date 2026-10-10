import { useEffect, useState } from 'react';
import { invitation as inv } from '../data/invitation.config';

// --- Import your photos here ---
// Rename these to match the actual files you save in src/assets/
import g1 from '../assets/replace-gallery-01.jpg';
import g2 from '../assets/replace-gallery-02.jpg';
import g3 from '../assets/replace-gallery-03.jpg';
import g4 from '../assets/replace-gallery-04.jpg';
import g5 from '../assets/replace-gallery-05.jpg';
import g6 from '../assets/replace-gallery-06.jpg';

const PHOTOS = [
  { src: g1, alt: 'Moment 1', caption: '' },
  { src: g2, alt: 'Moment 2', caption: '' },
  { src: g3, alt: 'Moment 3', caption: '' },
  { src: g4, alt: 'Moment 4', caption: '' },
  { src: g5, alt: 'Moment 5', caption: '' },
  { src: g6, alt: 'Moment 6', caption: '' },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  // Close on Esc; navigate with arrows when open
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight')
        setOpenIndex((i) => (i + 1) % PHOTOS.length);
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
    };

    window.addEventListener('keydown', onKey);

    // Lock body scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  return (
    <>
      {/* Header */}
      <p className="font-serif text-xs uppercase tracking-[.5em] text-forest/60">
        {inv.gallery.eyebrow}
      </p>

      <h2 className="mt-6 font-serif text-[clamp(1.9rem,7vw,2.6rem)] font-light leading-tight tracking-[.08em]">
        {inv.gallery.title}
      </h2>

      {/* Ornamental divider */}
      <div className="my-10 flex items-center justify-center gap-3 text-forest/40">
        <span className="h-px w-10 bg-current" />
        <svg className="h-2 w-2" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
          <path d="M4 0 L8 4 L4 8 L0 4 Z" />
        </svg>
        <span className="h-px w-10 bg-current" />
      </div>

      {/* Verse */}
      <p className="mx-auto max-w-sm font-serif text-base italic leading-[1.95] text-forest/75">
        {inv.gallery.verse}
      </p>

      {/* Grid — masonry-ish via CSS columns on mobile, grid on desktop */}
      <div className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {PHOTOS.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo ${i + 1}`}
            className="group relative aspect-square overflow-hidden rounded-sm border border-forest/10 bg-mist/30
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rain"
          >
            <img
              src={p.src}
              alt={p.alt}
              draggable="false"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover
                         transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />

            {/* Soft hover overlay */}
            <span className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10" />
          </button>
        ))}
      </div>

      {/* --- Lightbox --- */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/80 px-4 py-12 backdrop-blur-md"
          onClick={() => setOpenIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-mist/30 bg-mist/10 text-mist transition hover:bg-mist/20
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3 L13 13 M13 3 L3 13" />
            </svg>
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-mist/30 bg-mist/10 text-mist transition hover:bg-mist/20 sm:left-6
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3 L5 8 L10 13" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i + 1) % PHOTOS.length);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-mist/30 bg-mist/10 text-mist transition hover:bg-mist/20 sm:right-6
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mist"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3 L11 8 L6 13" />
            </svg>
          </button>

          {/* Image + caption */}
          <div
            className="relative max-h-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[openIndex].src}
              alt={PHOTOS[openIndex].alt}
              draggable="false"
              className="max-h-[80svh] w-auto max-w-full select-none object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
            />
            {PHOTOS[openIndex].caption && (
              <p className="mt-4 text-center font-serif text-sm italic text-mist/80">
                {PHOTOS[openIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
import { invitation as inv } from '../data/invitation.config';

// Import from src/assets — Vite will hash & bundle them.
// If you use /public instead, delete these imports and use
// <img src="/images/tree-top-left.png" ... /> directly.
import treeTopLeft from '../assets/tree-top-left.png';
import boyBottomLeft from '../assets/boy-bottom-left.png';
import girlTopRight from '../assets/girl-top-right.png';

export default function CoverScreen({ phase, onOpen }) {
  const gone = phase !== 'cover';

  return (
    <section
      aria-label="Invitation cover"
      aria-hidden={gone}
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-mist text-forest
        transition-all duration-[1600ms] ease-out
        ${gone ? 'pointer-events-none scale-[1.04] opacity-0' : 'opacity-100'}`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* ---- Tree canopy: top-left corner, bleeds off the edge ---- */}
      <img
        src={treeTopLeft}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="pointer-events-none absolute -left-6 -top-6 w-[70vw] max-w-md select-none
                   sm:-left-10 sm:-top-10"
      />

      {/* ---- Boy: bottom-left, looking up/right toward center ---- */}
      <img
        src={boyBottomLeft}
        alt=""
        aria-hidden="true"
        draggable="false"
       className="pointer-events-none absolute -left-6 bottom-0 w-[42vw] max-w-[320px] select-none
           sm:-left-8 sm:w-[34vw]"
      />

      {/* ---- Girl: top-right, in the doorway, looking down/left ---- */}
      <img
        src={girlTopRight}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="pointer-events-none absolute -right-4 top-0 w-[50vw] max-w-sm select-none
                   sm:-right-6 sm:w-[42vw]"
      />

      {/* ---- Center text block ---- */}
      <div className="relative z-10 px-8 text-center">
        <h1 className="pl-[.5em] font-serif text-[clamp(1.6rem,7vw,2.6rem)] font-light uppercase leading-[2.1] tracking-[.5em]">
          {inv.partnerOne}
          <span className="block text-[.55em] tracking-normal">&amp;</span>
          {inv.partnerTwo}
        </h1>
        <div className="mx-auto my-8 h-px w-10 bg-forest/50" />
        <p className="font-serif text-base italic leading-relaxed text-forest/80">
          {inv.coverQuote}
        </p>
      </div>

      {/* ---- Open button ---- */}
      <button
        type="button"
        onClick={onOpen}
        className="absolute z-10 flex flex-col items-center gap-2 font-serif text-sm tracking-[.3em] text-forest/80 transition hover:text-forest
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-rain"
        style={{ bottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
      >
        Open invitation
        <svg className="nudge h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M3 6l5 5 5-5" />
        </svg>
      </button>
    </section>
  );
}
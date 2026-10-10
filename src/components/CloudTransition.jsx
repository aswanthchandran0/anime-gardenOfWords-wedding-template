// Three depth layers of blurred cloud masses. The outer wrapper parts like a
// curtain; the inner wrapper keeps drifting slowly.
const LAYERS = [
  {
    depth: 'back',
    dur: '70s',
    dir: -1,
    blur: 'blur-3xl',
    tone: 'bg-sky/70',
    blobs: [[-10, 8, 70, 30], [40, 18, 80, 34], [75, 6, 60, 26]],
  },
  {
    depth: 'mid',
    dur: '48s',
    dir: 1,
    blur: 'blur-2xl',
    tone: 'bg-cloud/80',
    blobs: [[-20, 36, 80, 34], [30, 46, 90, 38], [70, 34, 70, 32]],
  },
  {
    depth: 'front',
    dur: '34s',
    dir: -1,
    blur: 'blur-xl',
    tone: 'bg-cloud/95',
    blobs: [[-15, 62, 85, 36], [35, 70, 95, 40], [80, 60, 60, 34]],
  },
];

export default function CloudTransition({ phase }) {
  // Only render during the reveal.
  if (phase === 'cover' || phase === 'revealed') return null;

  const clearing = phase === 'clearing';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      // GPU-composite the whole tree so mobile doesn't jank on transition
      style={{ willChange: clearing ? 'opacity' : 'auto' }}
    >
      {/* 1. Deep sky wash — fades out first */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-rain via-[#4a7487] to-sky transition-opacity duration-[2800ms] ease-in-out
          ${clearing ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* 2. Sun bloom — fades IN as the clouds part */}
      <div
        className={`absolute -top-1/4 left-1/2 h-[90vh] w-[120vw] -translate-x-1/2 rounded-full bg-sun/60 blur-3xl transition-opacity duration-[3000ms] ease-out
          ${clearing ? 'opacity-70' : 'opacity-0'}`}
      />

      {/* 3. Cloud layers — slide outward + fade */}
      {LAYERS.map((l, i) => (
        <div
          key={l.depth}
          className="absolute inset-0 transition-all ease-in-out will-change-transform"
          style={{
            transitionDuration: `${4200 - i * 500}ms`,
            transitionDelay: clearing ? `${i * 120}ms` : '0ms',
            transform: clearing
              ? `translate3d(${l.dir * 70}%, ${-6 - i * 3}%, 0)`
              : 'translate3d(0, 0, 0)',
            opacity: clearing ? 0 : 1,
          }}
        >
          <div className="cloud-drift absolute inset-0" style={{ '--d': l.dur }}>
            {l.blobs.map(([x, y, w, h], k) => (
              <div
                key={k}
                className={`absolute rounded-[50%] ${l.tone} ${l.blur}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
import { useEffect, useRef, useState } from 'react';

const DROP_COUNT = 90;
const BASE_SPEED = 0.9;

export default function RainOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const dropsRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  // Fade the rain out when the video section enters view
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onHide = () => setVisible(false);
    const onShow = () => setVisible(true);
    window.addEventListener('rain:hide', onHide);
    window.addEventListener('rain:show', onShow);
    return () => {
      window.removeEventListener('rain:hide', onHide);
      window.removeEventListener('rain:show', onShow);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const { w, h } = sizeRef.current;
      dropsRef.current = Array.from({ length: DROP_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 6 + Math.random() * 10,
        speed: BASE_SPEED + Math.random() * 0.6,
        opacity: 0.08 + Math.random() * 0.20,
      }));
    };

    const step = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = 'round';

      for (const d of dropsRef.current) {
        ctx.strokeStyle = `rgba(243, 244, 241, ${d.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;

        if (d.y > h + 20) {
          d.y = -20;
          d.x = Math.random() * w;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    spawn();

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      step();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      spawn();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[35] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
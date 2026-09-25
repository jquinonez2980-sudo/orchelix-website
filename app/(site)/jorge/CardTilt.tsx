"use client";

/* The card leans toward the pointer and its sheen follows it — a physical
   object under a light, not a screenshot. On touch screens there is no
   hover, so the CSS lets it drift on its own instead. Writes four custom
   properties; all the drawing is in card.css. Off under reduced motion. */

import { useEffect, useRef, type ReactNode } from "react";

export default function CardTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      el.style.setProperty("--rx", `${(-cur.y * 9).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(cur.x * 12).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(50 + cur.x * 45).toFixed(1)}%`);
      el.style.setProperty("--my", `${(50 + cur.y * 45).toFixed(1)}%`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      target.x = clamp(((e.clientX - box.left) / box.width - 0.5) * 2);
      target.y = clamp(((e.clientY - box.top) / box.height - 0.5) * 2);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    el.dataset.tilt = "live";
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="dc__tilt" ref={ref}>
      {children}
    </div>
  );
}

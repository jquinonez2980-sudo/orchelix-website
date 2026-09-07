'use client';

/**
 * React Bits — DotGrid-inspired low-opacity hero backdrop (owned CSS/canvas).
 * No Club GSAP / InertiaPlugin. Static when prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type DotGridProps = {
  className?: string;
  baseColor?: string;
  activeColor?: string;
  gap?: number;
  dotSize?: number;
  opacity?: number;
};

export default function DotGrid({
  className = '',
  baseColor = 'rgba(18, 20, 26, 0.14)',
  activeColor = 'rgba(13, 92, 99, 0.28)',
  gap = 28,
  dotSize = 1.25,
  opacity = 0.35,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let dots: { x: number; y: number }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          dots.push({ x, y });
        }
      }
      draw();
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - pointer.current.x;
        const dy = d.y - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        const near = !reduced && dist < 90;
        ctx.beginPath();
        ctx.arc(d.x, d.y, near ? dotSize * 1.6 : dotSize, 0, Math.PI * 2);
        ctx.fillStyle = near ? activeColor : baseColor;
        ctx.fill();
      }
    };

    const parent = canvas.parentElement?.parentElement; // section
    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    const target: HTMLElement | Window = parent ?? window;
    if (!reduced) {
      target.addEventListener('pointermove', onMove as EventListener);
      if (parent) parent.addEventListener('pointerleave', onLeave);
    }
    return () => {
      window.removeEventListener('resize', resize);
      target.removeEventListener('pointermove', onMove as EventListener);
      if (parent) parent.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [baseColor, activeColor, gap, dotSize, reduced]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="h-full w-full pointer-events-none" />
    </div>
  );
}

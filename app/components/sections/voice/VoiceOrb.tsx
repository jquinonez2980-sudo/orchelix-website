"use client";

/* Esmi's voice, drawn. A lit sphere with three living outlines around it, a
   shell of particles turning in 3D, and ripples that leave it while she
   talks. Everything is driven by one number, `level` (0–1), worked out each
   frame: while playing, the recording's loudness curve at the playhead
   (read straight off the audio element); while loading, a quick shimmer;
   while the play button is hovered, a small lean-in.

   Canvas 2D, additive blending, paused off-screen. Reduced motion: one still
   frame at rest. */

import { useEffect, useRef, type RefObject } from "react";
import { envelopeAt } from "@/app/components/sections/VoiceWave";

export type OrbState = "idle" | "hover" | "loading" | "playing";

const BLUE: [number, number, number] = [59, 130, 246];
const CYAN: [number, number, number] = [34, 211, 238];
const ICE: [number, number, number] = [207, 250, 254];
const DEEP: [number, number, number] = [30, 64, 175];

const rgba = ([r, g, b]: [number, number, number], a: number) =>
  `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;

type P = { th: number; ph: number; sp: number; r: number };

export default function VoiceOrb({
  state,
  audioRef,
  duration,
  className,
}: {
  state: OrbState;
  audioRef: RefObject<HTMLAudioElement | null>;
  duration: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* The draw loop is set up once; it reads the latest props from here. */
  const live = useRef({ state, duration });
  useEffect(() => {
    live.current = { state, duration };
  }, [state, duration]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const parts: P[] = Array.from({ length: 70 }, () => ({
      th: Math.random() * Math.PI * 2,
      ph: Math.acos(2 * Math.random() - 1),
      sp: 0.15 + Math.random() * 0.35,
      r: 0.6 + Math.random() * 1.2,
    }));
    const ripples: { t: number }[] = [];

    let size = 0;
    let dpr = 1;
    let raf = 0;
    let onScreen = true;
    let visible = true;
    let level = 0;
    let last = performance.now();
    let sinceRipple = 0;

    function resize() {
      const box = wrap!.getBoundingClientRect();
      size = box.width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * dpr);
      canvas!.style.width = `${size}px`;
      canvas!.style.height = `${size}px`;
    }

    function blob(c: number, R: number, t: number, amp: number, seed: number) {
      ctx!.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const th = (i / steps) * Math.PI * 2;
        const n =
          Math.sin(3 * th + t * 1.3 + seed) * 0.5 +
          Math.sin(5 * th - t * 1.9 + seed * 2.1) * 0.3 +
          Math.sin(8 * th + t * 2.7 + seed * 3.7) * 0.2;
        const r = R + n * amp;
        const x = c + Math.cos(th) * r;
        const y = c + Math.sin(th) * r;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.closePath();
    }

    function targetLevel() {
      const { state, duration } = live.current;
      const el = audioRef.current;
      if (state === "playing" && el && duration > 0) {
        return Math.min(1, 0.18 + envelopeAt(el.currentTime / duration) * 0.95);
      }
      if (state === "loading") return 0.3 + 0.15 * Math.sin(performance.now() / 180);
      return state === "hover" ? 0.28 : 0;
    }

    function draw(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const t = reduceMotion ? 2 : now / 1000;
      const target = reduceMotion ? 0 : targetLevel();
      /* Fast attack, slower release — reads as a voice, not a meter. */
      level += (target - level) * (target > level ? 0.35 : 0.08);

      const W = size;
      const c = W / 2;
      const R = W * 0.25 * (1 + level * 0.1 + Math.sin(t * 1.2) * 0.012);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, W);
      ctx!.globalCompositeOperation = "lighter";

      /* Aura */
      const aura = ctx!.createRadialGradient(c, c, R * 0.4, c, c, W * 0.5);
      aura.addColorStop(0, rgba(BLUE, 0.4 + level * 0.3));
      aura.addColorStop(0.45, rgba(CYAN, 0.1 + level * 0.14));
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = aura;
      ctx!.fillRect(0, 0, W, W);

      /* Ripples */
      if (!reduceMotion && live.current.state === "playing") {
        sinceRipple += dt;
        if (sinceRipple > 520 - level * 260 && level > 0.12) {
          ripples.push({ t: 0 });
          sinceRipple = 0;
        }
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t += dt / 1600;
        if (r.t >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const e = 1 - Math.pow(1 - r.t, 2);
        ctx!.strokeStyle = rgba(CYAN, (1 - r.t) * 0.45);
        ctx!.lineWidth = 1.4;
        ctx!.beginPath();
        ctx!.arc(c, c, R * (1.1 + e * 0.9), 0, Math.PI * 2);
        ctx!.stroke();
      }

      /* Particle shell, turning in 3D; it widens as she speaks. */
      const shell = R * (1.5 + level * 0.3);
      for (const p of parts) {
        if (!reduceMotion) p.th += (dt / 1000) * p.sp * (1 + level * 2.5);
        const x = Math.sin(p.ph) * Math.cos(p.th);
        const y = Math.cos(p.ph);
        const z = Math.sin(p.ph) * Math.sin(p.th);
        const tilt = 0.35;
        const yy = y * Math.cos(tilt) - z * Math.sin(tilt);
        const zz = y * Math.sin(tilt) + z * Math.cos(tilt);
        const depth = (zz + 1) / 2; // 1 = front
        const px = c + x * shell;
        const py = c + yy * shell;
        ctx!.fillStyle = rgba(depth > 0.5 ? ICE : BLUE, 0.15 + depth * 0.7);
        ctx!.beginPath();
        ctx!.arc(px, py, p.r * (0.5 + depth), 0, Math.PI * 2);
        ctx!.fill();
      }

      /* The living outlines */
      const amp = R * (0.05 + level * 0.3);
      ctx!.lineWidth = 2;
      ctx!.strokeStyle = rgba(BLUE, 0.85);
      blob(c, R * 1.08, t, amp, 0);
      ctx!.stroke();
      ctx!.strokeStyle = rgba(CYAN, 0.75);
      blob(c, R * 1.12, t * 1.15, amp * 0.9, 1.7);
      ctx!.stroke();
      ctx!.lineWidth = 1.2;
      ctx!.strokeStyle = rgba(ICE, 0.55);
      blob(c, R * 1.04, t * 0.9, amp * 0.7, 3.1);
      ctx!.stroke();

      /* The sphere */
      ctx!.globalCompositeOperation = "source-over";
      const body = ctx!.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.05, c, c, R * 1.05);
      body.addColorStop(0, "rgba(236, 254, 255, 1)");
      body.addColorStop(0.18, rgba(CYAN, 1));
      body.addColorStop(0.55, rgba(BLUE, 1));
      body.addColorStop(1, rgba(DEEP, 1));
      ctx!.fillStyle = body;
      blob(c, R, t * 0.8, amp * 0.35, 5.3);
      ctx!.fill();

      /* Rim light */
      ctx!.globalCompositeOperation = "lighter";
      const rim = ctx!.createRadialGradient(c, c, R * 0.7, c, c, R * 1.05);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, rgba(CYAN, 0.35 + level * 0.3));
      ctx!.fillStyle = rim;
      ctx!.beginPath();
      ctx!.arc(c, c, R * 1.05, 0, Math.PI * 2);
      ctx!.fill();
    }

    function loop(now: number) {
      draw(now);
      if (onScreen && visible && !reduceMotion) raf = requestAnimationFrame(loop);
    }
    function kick() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && visible && !reduceMotion) kick();
    });
    io.observe(wrap);
    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible && onScreen && !reduceMotion) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    resize();
    if (reduceMotion) draw(performance.now());
    else kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [audioRef]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true" style={{ aspectRatio: "1 / 1", width: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

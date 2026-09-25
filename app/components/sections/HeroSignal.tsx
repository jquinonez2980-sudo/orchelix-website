"use client";

/* The live scene around the hero ring — "Every call answered", acted out.

   Calls arrive out of the dark as comets on curved paths and dive into the
   mark. Each landing sends a shockwave off the ring and floats a small
   "Answered · EN" / "Atendida · ES" tag away from it. Two tilted orbits of
   light circle the mark, and a blue-cyan glow breathes behind it.

   Two canvases, one behind the 3D ring and one in front, so the orbits
   genuinely wrap around it: the far half of each orbit is drawn on the back
   layer, the near half and the arriving calls on the front.

   Decoration only (aria-hidden) — the headline says it in words. Pauses off
   screen and in hidden tabs; reduced motion gets the still glow and orbits,
   no traffic. */

import { useEffect, useRef } from "react";

type RGB = [number, number, number];
const BLUE: RGB = [59, 130, 246];
const CYAN: RGB = [34, 211, 238];
const ICE: RGB = [207, 250, 254];
const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;

type Orbit = { tilt: number; flat: number; r: number; speed: number; phase: number; rgb: RGB; n: number };
type Call = { sx: number; sy: number; cx: number; cy: number; t: number; speed: number; rgb: RGB; lang: "en" | "es" };
type Wave = { t: number };
type Tag = { x: number; y: number; vx: number; vy: number; t: number; text: string };

/* The stage is the ring's box; the canvases overhang it by this much on each
   side so comets can arrive from outside it. */
const OVERHANG = 0.16;
/* Ring radius as a share of the stage (the flat mark is 78% tall). */
const RING = 0.37;

const ORBITS: Orbit[] = [
  { tilt: 0.38, flat: 0.26, r: 0.5, speed: 0.00022, phase: 0, rgb: CYAN, n: 3 },
  { tilt: -0.62, flat: 0.34, r: 0.46, speed: -0.00017, phase: 2, rgb: BLUE, n: 2 },
];

export default function HeroSignal({ labels }: { labels: { en: string; es: string } }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!wrap || !back || !front) return;
    const bx = back.getContext("2d");
    const fx = front.getContext("2d");
    if (!bx || !fx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() ||
      "ui-sans-serif, system-ui, sans-serif";

    let W = 0;
    let dpr = 1;
    let raf = 0;
    let onScreen = true;
    let visible = true;
    let last = performance.now();
    let nextCall = 1400; // let the ring finish building first
    let flare = 0;
    let langFlip = false;
    const calls: Call[] = [];
    const waves: Wave[] = [];
    const tags: Tag[] = [];
    const start = performance.now();

    function resize() {
      W = wrap!.getBoundingClientRect().width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [back!, front!]) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(W * dpr);
        c.style.width = `${W}px`;
        c.style.height = `${W}px`;
      }
    }

    /* Stage fraction → canvas pixels (the canvas is the stage plus overhang). */
    const S = () => W / (1 + OVERHANG * 2);

    function spawn() {
      const c = W / 2;
      const ang = Math.random() * Math.PI * 2;
      const dist = W * 0.52;
      const sx = c + Math.cos(ang) * dist;
      const sy = c + Math.sin(ang) * dist;
      /* Bend the path sideways so calls swoop in rather than fly straight. */
      const bend = (Math.random() < 0.5 ? -1 : 1) * (0.25 + Math.random() * 0.25);
      const mx = (sx + c) / 2 - (sy - c) * bend;
      const my = (sy + c) / 2 + (sx - c) * bend;
      langFlip = !langFlip;
      calls.push({
        sx,
        sy,
        cx: mx,
        cy: my,
        t: 0,
        speed: 0.55 + Math.random() * 0.25,
        rgb: langFlip ? CYAN : BLUE,
        lang: langFlip ? "es" : "en",
      });
    }

    function orbitPoint(o: Orbit, a: number) {
      const s = S();
      const x = Math.cos(a) * o.r * s;
      const y = Math.sin(a) * o.r * s * o.flat;
      const c = Math.cos(o.tilt);
      const sn = Math.sin(o.tilt);
      /* sin(a) > 0 is the near half of the ellipse. */
      return { x: W / 2 + x * c - y * sn, y: W / 2 + x * sn + y * c, near: Math.sin(a) > 0 };
    }

    function drawOrbit(ctx: CanvasRenderingContext2D, o: Orbit, near: boolean, t: number) {
      ctx.lineWidth = near ? 1.3 : 0.9;
      ctx.strokeStyle = rgba(o.rgb, near ? 0.38 : 0.16);
      ctx.beginPath();
      let pen = false;
      for (let k = 0; k <= 180; k++) {
        const a = (k / 180) * Math.PI * 2;
        const p = orbitPoint(o, a);
        if (p.near !== near) {
          pen = false;
          continue;
        }
        if (!pen) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
        pen = true;
      }
      ctx.stroke();
      /* Beads of light running the orbit, each with a short tail. */
      for (let i = 0; i < o.n; i++) {
        const head = o.phase + (i / o.n) * Math.PI * 2 + t * o.speed;
        for (let k = 0; k < 14; k++) {
          const a = head - k * 0.035 * Math.sign(o.speed || 1);
          const p = orbitPoint(o, a);
          if (p.near !== near) continue;
          const fade = 1 - k / 14;
          const r = (k === 0 ? 3.2 : 2.2) * fade + 0.4;
          ctx.fillStyle = rgba(k === 0 ? ICE : o.rgb, (near ? 0.95 : 0.45) * fade);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function draw(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const t = reduce ? 3000 : now - start;
      const c = W / 2;
      const s = S();
      const ringR = RING * s;

      for (const ctx of [bx!, fx!]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, W);
        ctx.globalCompositeOperation = "lighter";
      }

      /* ── Back layer: the glow and the far side of the orbits. */
      const breath = 0.5 + 0.5 * Math.sin(t * 0.0012);
      const aura = bx!.createRadialGradient(c, c, ringR * 0.2, c, c, ringR * (1.9 + 0.1 * breath + 0.25 * flare));
      aura.addColorStop(0, rgba(CYAN, 0.28 + 0.1 * breath + 0.3 * flare));
      aura.addColorStop(0.4, rgba([37, 99, 235], 0.28 + 0.08 * breath));
      aura.addColorStop(1, "rgba(0,0,0,0)");
      bx!.fillStyle = aura;
      bx!.fillRect(0, 0, W, W);
      for (const o of ORBITS) drawOrbit(bx!, o, false, t);

      /* ── Front layer. */
      for (const o of ORBITS) drawOrbit(fx!, o, true, t);

      /* Shockwaves off the ring. */
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.t += dt / 1300;
        if (w.t >= 1) {
          waves.splice(i, 1);
          continue;
        }
        const e = 1 - Math.pow(1 - w.t, 3);
        fx!.strokeStyle = rgba(CYAN, (1 - w.t) * 0.6);
        fx!.lineWidth = 2 * (1 - w.t) + 0.4;
        fx!.beginPath();
        fx!.arc(c, c, ringR * (1.02 + e * 0.55), 0, Math.PI * 2);
        fx!.stroke();
      }

      /* Incoming calls. */
      for (let i = calls.length - 1; i >= 0; i--) {
        const k = calls[i];
        k.t += (dt / 1000) * k.speed;
        if (k.t >= 1) {
          calls.splice(i, 1);
          flare = 1;
          waves.push({ t: 0 });
          const ang = Math.atan2(k.cy - c, k.cx - c) + Math.PI + (Math.random() - 0.5);
          tags.push({
            x: c + Math.cos(ang) * ringR * 1.15,
            y: c + Math.sin(ang) * ringR * 1.15,
            vx: Math.cos(ang) * 0.018,
            vy: Math.sin(ang) * 0.018 - 0.01,
            t: 0,
            text: k.lang === "es" ? labels.es : labels.en,
          });
          continue;
        }
        const at = (u: number) => ({
          x: (1 - u) * (1 - u) * k.sx + 2 * (1 - u) * u * k.cx + u * u * c,
          y: (1 - u) * (1 - u) * k.sy + 2 * (1 - u) * u * k.cy + u * u * c,
        });
        const e = k.t * k.t;
        const tail = Math.max(0, e - 0.34);
        const fadeIn = Math.min(1, k.t * 5);
        fx!.lineCap = "round";
        const steps = 12;
        for (let j = 0; j < steps; j++) {
          const a = at(tail + ((e - tail) * j) / steps);
          const b = at(tail + ((e - tail) * (j + 1)) / steps);
          fx!.strokeStyle = rgba(k.rgb, (j / steps) * 0.85 * fadeIn);
          fx!.lineWidth = 0.6 + (j / steps) * 3.6;
          fx!.beginPath();
          fx!.moveTo(a.x, a.y);
          fx!.lineTo(b.x, b.y);
          fx!.stroke();
        }
        const p = at(e);
        const g = fx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        g.addColorStop(0, rgba(ICE, fadeIn));
        g.addColorStop(0.35, rgba(k.rgb, 0.7 * fadeIn));
        g.addColorStop(1, rgba(k.rgb, 0));
        fx!.fillStyle = g;
        fx!.beginPath();
        fx!.arc(p.x, p.y, 18, 0, Math.PI * 2);
        fx!.fill();
      }

      /* Answered tags drift out and fade. */
      fx!.globalCompositeOperation = "source-over";
      fx!.textAlign = "center";
      fx!.textBaseline = "middle";
      fx!.font = `500 ${Math.max(10, Math.round(W * 0.018))}px ${font}`;
      for (let i = tags.length - 1; i >= 0; i--) {
        const g = tags[i];
        g.t += dt / 2200;
        if (g.t >= 1) {
          tags.splice(i, 1);
          continue;
        }
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        const a = g.t < 0.15 ? g.t / 0.15 : 1 - (g.t - 0.15) / 0.85;
        const tw = fx!.measureText(g.text).width + 22;
        const th = W * 0.042;
        fx!.fillStyle = `rgba(6, 10, 20, ${0.7 * a})`;
        fx!.strokeStyle = rgba(CYAN, 0.55 * a);
        fx!.lineWidth = 1;
        fx!.beginPath();
        fx!.roundRect(g.x - tw / 2, g.y - th / 2, tw, th, th / 2);
        fx!.fill();
        fx!.stroke();
        fx!.fillStyle = rgba(ICE, a);
        fx!.fillText(g.text, g.x, g.y + 0.5);
      }

      flare *= 0.94;
      if (!reduce) {
        nextCall -= dt;
        if (nextCall <= 0) {
          spawn();
          nextCall = 1100 + Math.random() * 1300;
        }
      }
    }

    function loop(now: number) {
      draw(now);
      if (onScreen && visible && !reduce) raf = requestAnimationFrame(loop);
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
      if (onScreen && visible && !reduce) kick();
    });
    io.observe(wrap);
    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible && onScreen && !reduce) kick();
    };
    document.addEventListener("visibilitychange", onVis);

    resize();
    if (reduce) draw(performance.now());
    else kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [labels.en, labels.es]);

  return (
    <div ref={wrapRef} className="lg-signal" aria-hidden="true">
      <canvas ref={backRef} className="lg-signal__back" />
      <canvas ref={frontRef} className="lg-signal__front" />
    </div>
  );
}

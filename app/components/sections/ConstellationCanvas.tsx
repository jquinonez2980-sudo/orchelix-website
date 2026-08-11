"use client";

/* A live node network for the /solutions opening column — replaces the
   static `solutions-visual.png` (a single frame of exactly this idea) with
   the real thing: nodes drift on their own, the lines between them redraw
   every frame, and the centre node carries the accent the way the original
   artwork did.

   Canvas 2D, not WebGL — the "3D scene" direction was considered and the
   user chose this instead. No new dependency: `three` already sits in
   package.json from an earlier hero experiment that was tried and rejected
   (see Hero.tsx history), and pulling it in here for a flat node graph would
   be the wrong tool for a 2D drift.

   Respects `prefers-reduced-motion`: draws one settled frame and stops,
   rather than disabling the visual outright — the same choice the ledger's
   own Settle verb makes elsewhere in this file. */

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  center?: boolean;
};

const LINK_DIST = 130;
const NODE_COUNT = 22;
const DRIFT = 0.12;
const CURSOR_RADIUS = 90;
const MIN_DIST = 34; // nodes push apart below this — without it, drift alone lets them clump

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/* rgba(...) in, alpha swapped out — the ink and foil tokens are already
   channel triples in this file's own custom properties, so this avoids a
   second colour system just for canvas alpha compositing. */
function withAlpha(rgbaOrHex: string, alpha: number): string {
  const rgbaMatch = rgbaOrHex.match(/rgba?\(([^)]+)\)/);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(",").map((s) => s.trim());
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
  }
  const hex = rgbaOrHex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ConstellationCanvas({ max = 320 }: { max?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = readVar("--lg-ink-3", "rgba(46, 50, 62, 0.48)");
    const foil = readVar("--lg-foil", "#B7135A");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    function seed() {
      const list: Node[] = [];
      list.push({ x: width / 2, y: height / 2, vx: 0, vy: 0, r: 5, center: true });
      for (let i = 0; i < NODE_COUNT; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * DRIFT,
          vy: (Math.random() - 0.5) * DRIFT,
          r: 2 + Math.random() * 1.6,
        });
      }
      nodes = list;
    }

    function resize() {
      const box = wrap!.getBoundingClientRect();
      width = box.width;
      height = box.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (n.center) continue;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));

        // A light pull toward the cursor — enough to feel alive, not enough
        // to turn a page decoration into something demanding attention.
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < CURSOR_RADIUS) {
          n.x += dx * 0.006;
          n.y += dy * 0.006;
        }
      }

      // Separation — drift alone lets two nodes wander into the same spot
      // and sit there, which reads as a clump rather than a field. Any node
      // closer than MIN_DIST to a neighbour (the fixed centre included) gets
      // nudged directly away from it before the frame draws.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.center) continue;
        let pushX = 0;
        let pushY = 0;
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy) || 0.001;
          if (d < MIN_DIST) {
            const force = (MIN_DIST - d) / MIN_DIST;
            pushX += (dx / d) * force;
            pushY += (dy / d) * force;
          }
        }
        a.x = Math.max(0, Math.min(width, a.x + pushX * 0.8));
        a.y = Math.max(0, Math.min(height, a.y + pushY * 0.8));
      }

      // Links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;
          const t = 1 - d / LINK_DIST;
          const isAccent = a.center || b.center;
          ctx!.strokeStyle = withAlpha(isAccent ? foil : ink, (isAccent ? 0.55 : 0.4) * t);
          ctx!.lineWidth = isAccent ? 1.1 : 0.75;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx!.fillStyle = n.center ? foil : withAlpha(ink, 0.85);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion) raf = requestAnimationFrame(step);
    }

    function onMove(e: PointerEvent) {
      const box = wrap!.getBoundingClientRect();
      mouse.x = e.clientX - box.left;
      mouse.y = e.clientY - box.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibility() {
      running = document.visibilityState === "visible";
      if (running && !reduceMotion) raf = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) step(); // one settled frame, then stop
    });
    ro.observe(wrap);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (reduceMotion) {
      step();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label=""
      aria-hidden="true"
      style={{
        width: "100%",
        maxWidth: max,
        aspectRatio: "1 / 1",
        position: "relative",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

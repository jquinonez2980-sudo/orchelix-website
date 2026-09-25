"use client";

/* The /solutions opening visual — "two agents, one console, one audit trail"
   drawn as the thing itself rather than a decoration beside it.

   - The console is a wireframe globe (a Fibonacci sphere with its nearest
     neighbours joined) that turns slowly in 3D.
   - Esmi and Nia orbit it on tilted paths, passing in front of and behind
     the globe, each trailing a short comet tail.
   - Every so often an agent sends a packet into the core. When it lands the
     core flares, a shockwave rings out, and the next tick on the audit ring
     lights up and stays lit: every action, one log.

   Replaces ConstellationCanvas, which drew graphite ink nodes onto the night
   band and so was close to invisible there.

   Canvas 2D with additive blending, no new dependency. The pointer tilts
   the scene a little. Pauses when off-screen or when the tab is hidden.
   Under prefers-reduced-motion it draws one settled frame and stops. */

import { useEffect, useRef } from "react";

type V3 = { x: number; y: number; z: number };
type Agent = {
  name: string;
  rgb: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  tiltX: number;
  tiltZ: number;
  trail: { x: number; y: number; z: number }[];
  nextEmit: number;
};
type Packet = { agent: number; t: number; speed: number };
type Wave = { t: number };

const BLUE: [number, number, number] = [96, 165, 250];
const CYAN: [number, number, number] = [34, 211, 238];
const ICE: [number, number, number] = [207, 250, 254];

const SPHERE_N = 150;
const RING_TICKS = 96;
const INTRO_MS = 1800;
const ASPECT = 0.84;

function rgba([r, g, b]: [number, number, number], a: number) {
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;
}

function fibonacciSphere(n: number): V3[] {
  const pts: V3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }
  return pts;
}

function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function rotZ(p: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
/* Canvas has no reliable letter-spacing across browsers; hair spaces stand in
   for the tracked caps the site sets its labels in. */
const spaced = (s: string) => s.toUpperCase().split("").join("\u200A");
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AgentCore({
  max = 520,
  labels = { core: "Console", ring: "Audit trail" },
}: {
  max?: number;
  labels?: { core: string; ring: string };
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const displayFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() ||
      "ui-sans-serif, system-ui, sans-serif";

    const sphere = fibonacciSphere(SPHERE_N);
    /* Join each point to its nearest few neighbours once, up front. */
    const edges: [number, number][] = [];
    for (let i = 0; i < sphere.length; i++) {
      const d = sphere
        .map((p, j) => ({ j, d: Math.hypot(p.x - sphere[i].x, p.y - sphere[i].y, p.z - sphere[i].z) }))
        .filter((e) => e.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      for (const e of d) if (e.d < 0.42) edges.push([i, e.j]);
    }

    const agents: Agent[] = [
      { name: "ESMI", rgb: BLUE, radius: 0.8, speed: 0.00042, phase: 0.4, tiltX: 0.42, tiltZ: -0.18, trail: [], nextEmit: 900 },
      { name: "NIA", rgb: CYAN, radius: 0.68, speed: -0.00056, phase: 2.9, tiltX: -0.3, tiltZ: 0.34, trail: [], nextEmit: 1600 },
    ];
    const packets: Packet[] = [];
    const waves: Wave[] = [];
    const ring = new Float32Array(RING_TICKS); // brightness per tick, decays to a floor once written
    const written = new Uint8Array(RING_TICKS);
    let head = 0;
    let flare = 0;

    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let onScreen = true;
    let start = performance.now();
    let last = start;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      const box = wrap!.getBoundingClientRect();
      size = box.width;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * ASPECT * dpr);
      canvas!.style.width = `${size}px`;
      canvas!.style.height = `${size * ASPECT}px`;
    }

    /* Perspective projection into canvas pixels. Unit space: 1 = half-size. */
    function project(p: V3) {
      const cam = 3.2;
      const s = cam / (cam + p.z);
      const half = size / 2;
      return { x: half + p.x * s * half * 0.86, y: half + p.y * s * half * 0.86, s, z: p.z };
    }

    function agentPos(a: Agent, now: number): V3 {
      const ang = a.phase + now * a.speed;
      let p: V3 = { x: Math.cos(ang) * a.radius, y: 0, z: Math.sin(ang) * a.radius };
      p = rotX(p, a.tiltX);
      p = rotZ(p, a.tiltZ);
      return p;
    }

    function draw(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const elapsed = reduceMotion ? INTRO_MS * 2 : Math.max(0, now - start);
      const intro = Math.min(1, elapsed / INTRO_MS);
      const t = reduceMotion ? 4200 : now;

      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;

      const W = size;
      const half = W / 2;
      /* The scene is laid out in a square and the box crops its top and
         bottom — the ring is wider than the globe is tall. */
      ctx!.setTransform(dpr, 0, 0, dpr, 0, (-(W - W * ASPECT) / 2) * dpr);
      ctx!.clearRect(0, 0, W, W);
      ctx!.globalCompositeOperation = "lighter";

      /* Ambient bloom behind everything. */
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.0016);
      const bloomR = half * (0.62 + 0.06 * pulse + 0.1 * flare);
      const bloom = ctx!.createRadialGradient(half, half, 0, half, half, bloomR);
      bloom.addColorStop(0, rgba(CYAN, 0.34 * intro + 0.25 * flare));
      bloom.addColorStop(0.35, rgba([37, 99, 235], 0.22 * intro));
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = bloom;
      ctx!.fillRect(0, 0, W, W);

      /* Scene rotation. */
      const spin = t * 0.00018;
      const rx = 0.5 + tilt.y * 0.3;
      const ry = tilt.x * 0.5;
      const view = (p: V3) => rotX(rotY(p, ry), rx);

      /* ── Audit ring: a flat disc of ticks around the globe. */
      const ringR = 0.9;
      const ringItems: { a: ReturnType<typeof project>; b: ReturnType<typeof project>; i: number; z: number }[] = [];
      for (let i = 0; i < RING_TICKS; i++) {
        const ang = (i / RING_TICKS) * Math.PI * 2 - spin * 0.6;
        const len = 0.05 + ring[i] * 0.07;
        const inner = view({ x: Math.cos(ang) * ringR, y: 0, z: Math.sin(ang) * ringR });
        const outer = view({ x: Math.cos(ang) * (ringR + len), y: 0, z: Math.sin(ang) * (ringR + len) });
        ringItems.push({ a: project(inner), b: project(outer), i, z: inner.z });
      }
      const ringReveal = easeOutCubic(Math.max(0, Math.min(1, (elapsed - 500) / 1200)));

      const drawRing = (front: boolean) => {
        /* The track the ticks sit on — faint behind the globe, lit in front. */
        ctx!.lineWidth = front ? 1.2 : 0.8;
        ctx!.strokeStyle = rgba(front ? CYAN : BLUE, (front ? 0.32 : 0.16) * ringReveal);
        ctx!.beginPath();
        let started = false;
        for (let k = 0; k <= 160; k++) {
          const ang = (k / 160) * Math.PI * 2;
          const v = view({ x: Math.cos(ang) * ringR, y: 0, z: Math.sin(ang) * ringR });
          if (front !== v.z < 0) {
            started = false;
            continue;
          }
          const q = project(v);
          if (!started) ctx!.moveTo(q.x, q.y);
          else ctx!.lineTo(q.x, q.y);
          started = true;
        }
        ctx!.stroke();
        for (const r of ringItems) {
          if (front !== r.z < 0) continue;
          const order = r.i / RING_TICKS;
          if (order > ringReveal) continue;
          const lit = ring[r.i];
          const depth = front ? 1 : 0.45;
          ctx!.strokeStyle = lit > 0.05 ? rgba(lit > 0.5 ? ICE : CYAN, (0.25 + lit * 0.75) * depth) : rgba(BLUE, 0.22 * depth);
          ctx!.lineWidth = lit > 0.05 ? 1.6 : 1;
          ctx!.beginPath();
          ctx!.moveTo(r.a.x, r.a.y);
          ctx!.lineTo(r.b.x, r.b.y);
          ctx!.stroke();
        }
      };

      /* Write head: a bright marker on the ring where the next entry lands. */
      const headAng = (head / RING_TICKS) * Math.PI * 2 - spin * 0.6;

      drawRing(false);

      /* ── Globe. */
      const scale = 0.56 * easeOutBack(intro);
      const pts = sphere.map((p) => {
        const v = view(rotY(p, spin));
        const s = { x: v.x * scale, y: v.y * scale, z: v.z * scale };
        return { ...project(s), z: v.z };
      });

      const edgeAlpha = easeOutCubic(Math.max(0, Math.min(1, (elapsed - 700) / 1000)));
      ctx!.lineWidth = 0.8;
      for (const [i, j] of edges) {
        const a = pts[i];
        const b = pts[j];
        const front = 1 - (a.z + b.z + 2) / 4; // 1 = nearest
        ctx!.strokeStyle = rgba(front > 0.5 ? CYAN : BLUE, (0.08 + front * 0.34) * edgeAlpha);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
      for (const p of pts) {
        const front = 1 - (p.z + 1) / 2;
        const r = (0.7 + front * 1.5) * p.s;
        ctx!.fillStyle = rgba(front > 0.55 ? ICE : BLUE, 0.35 + front * 0.6);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* Core: a hot centre that flares when a packet lands. */
      const coreR = half * (0.07 + 0.012 * pulse + 0.05 * flare) * intro;
      const core = ctx!.createRadialGradient(half, half, 0, half, half, coreR * 3);
      core.addColorStop(0, rgba([255, 255, 255], 0.95));
      core.addColorStop(0.18, rgba(ICE, 0.85));
      core.addColorStop(0.45, rgba(CYAN, 0.35 + flare * 0.3));
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(half, half, coreR * 3, 0, Math.PI * 2);
      ctx!.fill();

      /* Shockwaves. */
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.t += dt / 1100;
        if (w.t >= 1) {
          waves.splice(i, 1);
          continue;
        }
        const e = easeOutCubic(w.t);
        ctx!.strokeStyle = rgba(CYAN, (1 - w.t) * 0.55);
        ctx!.lineWidth = 1.5 * (1 - w.t) + 0.3;
        ctx!.beginPath();
        const wr = 0.08 + e * 0.8;
        for (let k = 0; k <= 64; k++) {
          const ang = (k / 64) * Math.PI * 2;
          const q = project(view({ x: Math.cos(ang) * wr, y: 0, z: Math.sin(ang) * wr }));
          if (k === 0) ctx!.moveTo(q.x, q.y);
          else ctx!.lineTo(q.x, q.y);
        }
        ctx!.stroke();
      }

      drawRing(true);

      if (ringReveal > 0.99) {
        const hp = project(view({ x: Math.cos(headAng) * (ringR + 0.06), y: 0, z: Math.sin(headAng) * (ringR + 0.06) }));
        const g = ctx!.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 10);
        g.addColorStop(0, rgba(ICE, 0.9));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(hp.x, hp.y, 10, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* ── Agents, their trails, and their packets. */
      const agentScreen = agents.map((a) => {
        const p = view(agentPos(a, t));
        return { a, p, s: project(p) };
      });

      for (const { a, p } of agentScreen) {
        if (!reduceMotion) {
          a.trail.unshift(p);
          if (a.trail.length > 34) a.trail.pop();
        }
      }

      /* Packets travel on a curve from the agent (where it is now) to the core. */
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.t += (dt / 1000) * pk.speed;
        const src = agentScreen[pk.agent];
        if (pk.t >= 1) {
          packets.splice(i, 1);
          flare = 1;
          waves.push({ t: 0 });
          ring[head] = 1;
          written[head] = 1;
          head = (head + 1) % RING_TICKS;
          if (head === 0) written.fill(0);
          continue;
        }
        const ctrl = { x: (src.s.x + half) / 2 + (src.s.y - half) * 0.35, y: (src.s.y + half) / 2 - (src.s.x - half) * 0.35 };
        const at = (u: number) => ({
          x: (1 - u) * (1 - u) * src.s.x + 2 * (1 - u) * u * ctrl.x + u * u * half,
          y: (1 - u) * (1 - u) * src.s.y + 2 * (1 - u) * u * ctrl.y + u * u * half,
        });
        const e = pk.t * pk.t * (3 - 2 * pk.t);
        const tailStart = Math.max(0, e - 0.22);
        const p0 = at(tailStart);
        const p1 = at(e);
        const grad = ctx!.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grad.addColorStop(0, rgba(src.a.rgb, 0));
        grad.addColorStop(1, rgba(src.a.rgb, 0.9));
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        const steps = 8;
        for (let k = 0; k <= steps; k++) {
          const q = at(tailStart + ((e - tailStart) * k) / steps);
          if (k === 0) ctx!.moveTo(q.x, q.y);
          else ctx!.lineTo(q.x, q.y);
        }
        ctx!.stroke();
        const glow = ctx!.createRadialGradient(p1.x, p1.y, 0, p1.x, p1.y, 7);
        glow.addColorStop(0, rgba(ICE, 1));
        glow.addColorStop(1, rgba(src.a.rgb, 0));
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p1.x, p1.y, 7, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const { a, p, s } of agentScreen) {
        const behind = p.z > 0.15 ? 0.45 : 1;
        const appear = easeOutCubic(Math.max(0, Math.min(1, (elapsed - 900) / 900)));
        /* Comet trail */
        for (let k = a.trail.length - 1; k > 0; k--) {
          const q0 = project(a.trail[k]);
          const q1 = project(a.trail[k - 1]);
          ctx!.strokeStyle = rgba(a.rgb, (1 - k / a.trail.length) * 0.5 * behind * appear);
          ctx!.lineWidth = (1 - k / a.trail.length) * 3.2 * q1.s;
          ctx!.beginPath();
          ctx!.moveTo(q0.x, q0.y);
          ctx!.lineTo(q1.x, q1.y);
          ctx!.stroke();
        }
        const r = 7 * s.s;
        const halo = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5);
        halo.addColorStop(0, rgba(ICE, 0.95 * behind * appear));
        halo.addColorStop(0.25, rgba(a.rgb, 0.7 * behind * appear));
        halo.addColorStop(1, rgba(a.rgb, 0));
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, r * 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalCompositeOperation = "source-over";
        ctx!.font = `500 ${Math.max(9, Math.round(W * 0.021))}px ${displayFont}`;
        ctx!.fillStyle = rgba([234, 240, 250], 0.88 * behind * appear);
        ctx!.textBaseline = "middle";
        const labelX = s.x > half ? s.x + r * 2.4 : s.x - r * 2.4;
        ctx!.textAlign = s.x > half ? "left" : "right";
        ctx!.fillText(spaced(a.name), labelX, s.y);
        ctx!.globalCompositeOperation = "lighter";
      }

      /* Labels for the console and the ring, set once the scene has formed. */
      ctx!.globalCompositeOperation = "source-over";
      const labelAlpha = easeOutCubic(Math.max(0, Math.min(1, (elapsed - 1500) / 800)));
      ctx!.textAlign = "center";
      ctx!.font = `500 ${Math.max(8, Math.round(W * 0.018))}px ${displayFont}`;
      ctx!.fillStyle = rgba([234, 240, 250], 0.6 * labelAlpha);
      const ringFront = project(view({ x: 0, y: 0, z: -(ringR + 0.1) }));
      ctx!.fillText(spaced(labels.ring), ringFront.x, ringFront.y + W * 0.04);
      ctx!.fillStyle = rgba(ICE, 0.75 * labelAlpha);
      ctx!.fillText(spaced(labels.core), half, half - half * 0.66);

      flare *= 0.94;
      for (let i = 0; i < RING_TICKS; i++) {
        const floor = written[i] ? 0.28 : 0;
        ring[i] = Math.max(floor, ring[i] - dt * 0.0009);
      }

      /* Emit. Agents behind the globe still send; the curve reads either way. */
      if (!reduceMotion && elapsed > INTRO_MS) {
        agents.forEach((a, idx) => {
          a.nextEmit -= dt;
          if (a.nextEmit <= 0) {
            packets.push({ agent: idx, t: 0, speed: 0.75 + Math.random() * 0.35 });
            a.nextEmit = 1100 + Math.random() * 1500;
          }
        });
      }
    }

    function loop(now: number) {
      draw(now);
      if (visible && onScreen && !reduceMotion) raf = requestAnimationFrame(loop);
    }
    function kick() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const box = wrap!.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1.2, Math.min(1.2, v));
      tilt.tx = clamp(((e.clientX - box.left) / box.width - 0.5) * 2);
      tilt.ty = clamp(((e.clientY - box.top) / box.height - 0.5) * 2);
    }
    function onLeave() {
      tilt.tx = 0;
      tilt.ty = 0;
    }
    function onVisibility() {
      visible = document.visibilityState === "visible";
      if (visible && onScreen && !reduceMotion) kick();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && visible && !reduceMotion) kick();
    });
    io.observe(wrap);

    /* Pre-fill part of the ring so the log reads as already running. */
    for (let i = 0; i < 18; i++) {
      ring[i] = 0.28;
      written[i] = 1;
    }
    head = 18;

    resize();
    start = performance.now();
    if (reduceMotion) {
      draw(start);
    } else {
      kick();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [labels.core, labels.ring]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="lg-agent-core"
      style={{ width: "100%", maxWidth: max, aspectRatio: `1 / ${ASPECT}`, position: "relative" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

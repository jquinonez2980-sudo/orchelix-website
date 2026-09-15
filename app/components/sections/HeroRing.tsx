"use client";

/* The Orchelix ring, as a 3D motion mark, in the homepage hero.

   Rebuilt 2026-09-15 at the owner's request ("make the logo look like a real
   3D motion animation — right now it looks cheap"). The approved 2026-09-12
   study rendered near-black frosted glass on a near-black ground with a ±6°
   sway: on screen it read as grey wire. What replaced it:

   - THE BUILD. Once per visit the mark is constructed in 3D: each of the
     sixteen strokes grows along its own path, in order around the ring, a
     rounded cap riding the growing tip, while the ring turns in from a
     three-quarter view and the camera settles onto it. It lands straight on,
     exactly on the outline of the flat logo.
   - THE STUDIO. A black room with large softboxes and one royal-blue floor
     bounce, so polished tubes catch long, clean highlights. The environment
     turns slowly, so those highlights glide along the curves while the mark
     itself only sways — the difference between a product shot and a
     screenshot of a mesh.
   - THE MATERIAL. Polished graphite metal under a clearcoat, thicker tubes,
     round-profiled at 24 radial segments so the highlights stay unbroken.
   - THE HAND. The pointer tilts the mark a few degrees and moves the key
     light. It never spins.

   THE FLAT MARK IS STILL THE TRUTH. Straight on, the tubes project onto the
   same outline as public/orchelix-mark.svg, because both are built from the
   one copy of the path data in app/lib/ringPaths.ts.

   Everything degrades to the flat SVG, silently: JS off, reduced motion, a
   small device, no WebGL, a lost context. */

import { useEffect, useRef } from "react";
/* Types only — erased at compile time. three.js itself arrives through the
   dynamic import inside the effect, after the fallback checks. */
import type * as THREE from "three";
import { RING_PATHS, RING_STROKE, RING_VIEWBOX } from "@/app/lib/ringPaths";

const VB_W = 90.93;
const VB_H = 100;
const CX = VB_W / 2;
const CY = VB_H / 2;

const RING_FRAC = 0.78; // share of the stage height the ring fills
const TUBE_R = 2.0; // viewBox units
const SWAY = (8 * Math.PI) / 180; // ±8°
const SWAY_PERIOD = 14; // seconds
const DEPTH_R = 48;

/* The build: 2.6s from first frame to rest. */
const INTRO_MS = 2600;
/* How long a first visit waits for the renderer before it gives up on the
   build and draws the flat mark instead. A slow phone still gets the glass
   later — it just skips the construction. */
const BOOT_WAIT_MS = 1400;

/* The build runs once per visit, not once per mount. Next remounts this on
   client navigation back to the homepage, and replaying it every time would
   turn a one-off into a tic. */
let introPlayed = false;
/* The nav mark glows the first time the ring lands in it, once per visit. */
let landingGlowPlayed = false;

type GL = {
  render: () => void;
  resize: () => void;
  /** 0..1 through the build; 1 is the resting mark. */
  setIntro: (p: number) => void;
  /** Seconds of idle motion since the build landed. */
  setIdle: (t: number) => void;
  /** Smoothed pointer, -1..1 on each axis. */
  setPointer: (x: number, y: number) => void;
  ringPx: () => number;
  dispose: () => void;
};

export default function HeroRing() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!stage || !ring || !canvas) return;

    const hero = stage.closest("section") as HTMLElement | null;
    const navMark = document.querySelector<SVGElement>("[data-ring-target]");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* `deviceMemory` is Chromium-only; absent means "unknown", not "small".
       Only an actual number under 4 opts out. */
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMemory = typeof mem === "number" && mem < 4;
    const canGL = !reduced && !lowMemory;

    let disposed = false;
    let gl: GL | null = null;
    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;
    let idleT = 0;
    let motion = !reduced;
    let introStart = 0; // performance.now() when the build began; 0 = none
    let introP = 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    /* ---- the hand-off to the nav mark -----------------------------------
       As the hero scrolls away the ring flies up into the nav mark and the
       two crossfade: the nav mark is empty at the top of the homepage and
       fills as the ring arrives. The first time it lands, the mark glows in
       the accent and settles to solid (`is-landing`, once per visit). */

    const handoff = () => {
      if (!hero) return;
      const hr = hero.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -hr.top / (hr.height * 0.55)));
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      if (navMark) {
        const st = stage.getBoundingClientRect();
        const tr = navMark.getBoundingClientRect();
        const ringPx = gl ? gl.ringPx() : stage.clientHeight * RING_FRAC;
        if (ringPx > 0 && tr.height > 0) {
          const s = 1 + (tr.height / ringPx - 1) * e;
          const dx = tr.left + tr.width / 2 - (st.left + st.width / 2);
          const dy = tr.top + tr.height / 2 - (st.top + st.height / 2);
          ring.style.transform = p ? `translate(${dx * e}px,${dy * e}px) scale(${s})` : "";
        }
        const fade = p < 0.72 ? 1 : Math.max(0, 1 - (p - 0.72) / 0.22);
        ring.style.opacity = fade === 1 ? "" : String(fade);
        navMark.style.opacity = String(Math.max(0, Math.min(1, (p - 0.7) / 0.25)));
        if (p >= 0.95 && !landingGlowPlayed && !reduced) {
          landingGlowPlayed = true;
          navMark.classList.add("is-landing");
          navMark.addEventListener(
            "animationend",
            () => navMark.classList.remove("is-landing"),
            { once: true },
          );
        }
      }
      ring.style.pointerEvents = p > 0.05 ? "none" : "";
    };

    /* ---- render loop ---------------------------------------------------- */

    const frame = (now: number) => {
      if (disposed || !gl) {
        running = false;
        return;
      }
      const visible = inView && !document.hidden && ring.style.opacity !== "0";
      if (!visible) {
        running = false;
        last = 0;
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;

      if (introStart) {
        introP = Math.min(1, (now - introStart) / INTRO_MS);
        if (introP >= 1) introStart = 0;
      }
      if (motion && introP >= 1) idleT += dt;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const settled =
        Math.abs(pointer.tx - pointer.x) < 1e-3 && Math.abs(pointer.ty - pointer.y) < 1e-3;

      gl.setIntro(introP);
      gl.setIdle(idleT);
      gl.setPointer(pointer.x, pointer.y);
      gl.render();

      /* Stop once nothing is moving: a hero that is merely on screen must not
         hold a rAF loop open when motion is off. */
      if (motion || !settled || introP < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
        last = 0;
      }
    };
    const kick = () => {
      if (disposed || running || !gl) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    /* ---- intro ----------------------------------------------------------
       A first visit that can render hides the flat mark (`is-waiting`, a
       class only JS adds, so the no-JS page still shows it) and waits up to
       BOOT_WAIT_MS for the renderer. In time: the 3D build plays. Too slow:
       the flat mark draws in as before and the glass fades over it later.
       Repeat visits and late boots go straight to the resting mark. */
    let buildable = canGL && !introPlayed;
    let bootTimer = 0;

    const drawFlat = () => {
      ring.classList.remove("is-waiting");
      ring.classList.add("is-drawing");
    };

    if (buildable) {
      ring.classList.add("is-waiting");
      bootTimer = window.setTimeout(() => {
        if (gl || disposed) return;
        buildable = false;
        introPlayed = true;
        drawFlat();
      }, BOOT_WAIT_MS);
    } else if (!canGL && !reduced && !introPlayed) {
      introPlayed = true;
      drawFlat();
    }

    const startGlass = () => {
      if (!gl || disposed) return;
      clearTimeout(bootTimer);
      if (buildable) {
        buildable = false;
        introPlayed = true;
        introP = 0;
        introStart = performance.now();
        /* The build starts from nothing, so the canvas goes up at once
           rather than fading over an empty frame. */
        ring.classList.add("is-building");
      } else {
        introP = 1;
      }
      ring.classList.remove("is-waiting");
      ring.classList.add("is-glass");
    };

    /* ---- boot ------------------------------------------------------------
       three.js is imported here, after the fallback conditions are ruled
       out, so a visitor with reduced motion or a small device never
       downloads it. */
    if (canGL) {
      void (async () => {
        try {
          const T = await import("three");
          if (disposed) return;
          gl = initGL(T, canvas, stage);
          if (!gl) return;

          canvas.addEventListener(
            "webglcontextlost",
            (ev) => {
              ev.preventDefault();
              gl?.dispose();
              gl = null;
              running = false;
              ring.classList.remove("is-glass", "is-building", "is-waiting");
            },
            { once: true },
          );

          gl.resize();
          startGlass();
          handoff();
          kick();
        } catch {
          /* No WebGL, no memory for a context, a blocked import — show the
             flat mark, which is a correct hero on its own. */
          gl = null;
          clearTimeout(bootTimer);
          ring.classList.remove("is-glass", "is-building");
          if (ring.classList.contains("is-waiting")) {
            introPlayed = true;
            drawFlat();
          }
        }
      })();
    }

    /* ---- events --------------------------------------------------------- */

    const aim = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      kick();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") aim(e);
    };
    const onStageDrag = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.buttons) aim(e);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        handoff();
        kick();
      });
    };
    const onResize = () => {
      gl?.resize();
      handoff();
      kick();
    };
    const onVisibility = () => kick();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerdown", aim);
    stage.addEventListener("pointermove", onStageDrag, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    ro?.observe(stage);

    const io =
      hero && "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            inView = entries[0].isIntersecting;
            kick();
          })
        : null;
    if (hero && io) io.observe(hero);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      motion = !mq.matches;
      kick();
    };
    mq.addEventListener("change", onMq);

    handoff();

    /* ---- teardown -------------------------------------------------------- */
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(bootTimer);
      window.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", aim);
      stage.removeEventListener("pointermove", onStageDrag);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onMq);
      ro?.disconnect();
      io?.disconnect();
      gl?.dispose();
      gl = null;
      /* The nav mark belongs to every route; leave it visible on the way out
         or it stays invisible on whatever page comes next. */
      if (navMark) {
        navMark.style.opacity = "";
        navMark.classList.remove("is-landing");
      }
    };
  }, []);

  return (
    <div className="lg-ring-stage" ref={stageRef} aria-hidden="true">
      <div className="lg-ring" ref={ringRef}>
        <canvas className="lg-ring__gl" ref={canvasRef} aria-hidden="true" />
        {/* The mark itself, and the only part of this that is announced. It is
            what a visitor sees before the canvas arrives, instead of it, and
            after the hand-off begins. */}
        <svg
          className="lg-ring__line"
          viewBox={RING_VIEWBOX}
          role="img"
          aria-label="Orchelix"
          fill="none"
          stroke="currentColor"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {RING_PATHS.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The scene.
--------------------------------------------------------------------------- */

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

function initGL(
  T: typeof import("three"),
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
): GL | null {
  const renderer = new T.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(22, 1, 1, 4000);

  /* ---- studio ----------------------------------------------------------
     A black room lit by large softboxes. Polished metal is defined entirely
     by what it reflects, so these panels ARE the look: long white streaks
     down the tubes, and one royal-blue bounce from below that reads as the
     brand accent catching the underside of every curve. */
  const envScene = new T.Scene();
  const roomGeo = new T.BoxGeometry(200, 200, 200);
  const roomMat = new T.MeshBasicMaterial({ color: 0x030406, side: T.BackSide });
  envScene.add(new T.Mesh(roomGeo, roomMat));
  const envGeos: THREE.BufferGeometry[] = [roomGeo];
  const envMats: THREE.Material[] = [roomMat];
  const softbox = (
    w: number,
    h: number,
    pos: [number, number, number],
    color: number,
    intensity: number,
  ) => {
    const g = new T.PlaneGeometry(w, h);
    const m = new T.MeshBasicMaterial({
      color: new T.Color(color).multiplyScalar(intensity),
      side: T.DoubleSide,
    });
    const mesh = new T.Mesh(g, m);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.lookAt(0, 0, 0);
    envScene.add(mesh);
    envGeos.push(g);
    envMats.push(m);
  };
  softbox(160, 40, [-10, 85, 40], 0xffffff, 5); // overhead key
  softbox(26, 150, [-85, 10, 50], 0xffffff, 6); // left strip
  softbox(20, 140, [85, 0, 10], 0xdfe6ff, 4); // right rim
  softbox(150, 110, [0, 10, 95], 0x9aa6bd, 0.7); // broad front wash, behind camera
  softbox(40, 60, [45, 35, 90], 0xffffff, 4); // front kicker, top right
  softbox(170, 30, [0, -85, 30], 0x4b72dc, 6); // royal-blue floor bounce
  softbox(40, 90, [-20, 0, -95], 0x6484db, 2.5); // blue back glow

  const pmrem = new T.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(envScene, 0.02);
  scene.environment = envRT.texture;

  /* Direct lights for the sharp glints the environment is too soft to give. */
  const key = new T.DirectionalLight(0xffffff, 3.2);
  scene.add(key);
  const rim = new T.DirectionalLight(0x6484db, 2.4);
  rim.position.set(60, -30, -80);
  scene.add(rim);

  /* ---- material -------------------------------------------------------- */
  const mat = new T.MeshPhysicalMaterial({
    color: 0xc3cad6,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    iridescence: 0.22,
    iridescenceIOR: 1.35,
    iridescenceThicknessRange: [180, 420],
    envMapIntensity: 1.6,
  });

  /* ---- geometry ---------------------------------------------------------
     Depth: a gentle dome plus a saddle twist. Straight on this projects back
     onto the flat mark; the depth shows as the ring turns. */
  const depth = (x: number, y: number) => {
    const u = (x - CX) / DEPTH_R;
    const v = (CY - y) / DEPTH_R;
    const r2 = u * u + v * v;
    return 8 * Math.max(0, 1 - r2) + 7 * u * v;
  };
  const P = (x: number, y: number) => new T.Vector3(x - CX, CY - y, depth(x, y));

  const group = new T.Group();
  const RADIAL = 24;
  const capGeo = new T.SphereGeometry(TUBE_R, 28, 18);
  const geos: THREE.BufferGeometry[] = [capGeo];

  type Stroke = {
    curve: THREE.CurvePath<THREE.Vector3>;
    geo: THREE.BufferGeometry;
    tubular: number;
    head: THREE.Mesh;
    tail: THREE.Mesh;
    order: number; // 0..1 position in the build sequence
  };
  const strokes: Stroke[] = [];

  for (const d of RING_PATHS) {
    const n = (d.match(/-?\d*\.?\d+/g) ?? []).map(Number);
    const cp = new T.CurvePath<THREE.Vector3>();
    let x = n[0];
    let y = n[1];
    let count = 0;
    for (let i = 2; i + 5 < n.length; i += 6) {
      cp.add(
        new T.CubicBezierCurve3(P(x, y), P(n[i], n[i + 1]), P(n[i + 2], n[i + 3]), P(n[i + 4], n[i + 5])),
      );
      x = n[i + 4];
      y = n[i + 5];
      count++;
    }
    if (!count) continue;
    /* Enough segments for unbroken highlights, capped so the longest strokes
       stay cheap on a phone GPU. */
    const tubular = Math.min(360, Math.max(48, count * 14));
    const geo = new T.TubeGeometry(cp, tubular, TUBE_R, RADIAL, false);
    geos.push(geo);
    group.add(new T.Mesh(geo, mat));
    const tail = new T.Mesh(capGeo, mat);
    const head = new T.Mesh(capGeo, mat);
    tail.position.copy(cp.getPointAt(0));
    head.position.copy(cp.getPointAt(1));
    group.add(tail, head);
    strokes.push({ curve: cp, geo, tubular, head, tail, order: 0 });
  }

  /* Build order: around the ring, clockwise from the top, by each stroke's
     starting angle — so the construction reads as one sweep, not as the
     arbitrary order the vectoriser wrote the paths in. */
  const angle = (s: Stroke) => {
    const p = s.curve.getPointAt(0);
    return (Math.atan2(p.x, p.y) + Math.PI * 2) % (Math.PI * 2);
  };
  [...strokes]
    .sort((a, b) => angle(a) - angle(b))
    .forEach((s, i, arr) => {
      s.order = i / Math.max(1, arr.length - 1);
    });

  scene.add(group);

  /* ---- camera ---------------------------------------------------------- */
  let ringPx = 0;
  let camDist = 0;

  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    let visH = VB_H / RING_FRAC;
    if (w / h < VB_W / VB_H) visH = VB_W / RING_FRAC / (w / h);
    camDist = visH / 2 / Math.tan((camera.fov * Math.PI) / 360);
    camera.position.set(0, 0, camDist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    ringPx = (VB_H * h) / visH;
  };

  /* ---- motion state ---------------------------------------------------- */
  let intro = 1;
  let idle = 0;
  let px = 0;
  let py = 0;
  const tip = new T.Vector3();

  const applyBuild = () => {
    /* Each stroke grows over 38% of the build's first 80%, staggered by its
       place in the sweep. */
    for (const s of strokes) {
      const start = s.order * 0.42;
      const local = easeOutCubic(clamp01((intro * 0.8 - start) / 0.38 + (intro >= 1 ? 1 : 0)));
      const segs = Math.round(local * s.tubular);
      s.geo.setDrawRange(0, segs * RADIAL * 6);
      s.tail.visible = local > 0;
      s.head.visible = local > 0;
      if (local > 0) {
        s.curve.getPointAt(Math.max(0.0001, segs / s.tubular), tip);
        s.head.position.copy(tip);
      }
    }
  };

  const applyPose = () => {
    const turn = 1 - easeOutExpo(clamp01(intro / 0.9));
    const ph = (idle * 2 * Math.PI) / SWAY_PERIOD;

    group.rotation.y = -0.85 * turn + Math.sin(ph) * SWAY + px * 0.14;
    group.rotation.x = 0.28 * turn + Math.sin(ph * 0.5) * SWAY * 0.35 + py * 0.1;
    group.rotation.z = -0.12 * turn;
    group.position.y = Math.sin((idle * 2 * Math.PI) / 7) * 0.9 * clamp01(idle / 2);
    const s = 0.9 + 0.1 * easeOutCubic(clamp01(intro / 0.85));
    group.scale.setScalar(s);

    if (camDist) camera.position.z = camDist * (1 + 0.16 * turn);

    /* The studio turns: fast during the build (a light sweep across the
       landing mark), then a slow continuous glide. */
    const sweep = easeInOutSine(clamp01((intro - 0.35) / 0.65));
    scene.environmentRotation.set(0.15 + py * 0.08, -2.2 + 2.2 * sweep + idle * 0.09 + px * 0.25, 0);

    const az = -0.6 + px * 0.5;
    const el = 0.65 - py * 0.35;
    key.position
      .set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el))
      .multiplyScalar(100);
  };

  applyBuild();

  return {
    render: () => renderer.render(scene, camera),
    resize,
    ringPx: () => ringPx,
    setIntro: (p: number) => {
      if (p !== intro) {
        intro = p;
        applyBuild();
      }
      applyPose();
    },
    setIdle: (t: number) => {
      idle = t;
      applyPose();
    },
    setPointer: (x: number, y: number) => {
      px = x;
      py = y;
      applyPose();
    },
    dispose: () => {
      for (const g of geos) g.dispose();
      for (const g of envGeos) g.dispose();
      for (const m of envMats) m.dispose();
      mat.dispose();
      envRT.texture.dispose();
      pmrem.dispose();
      scene.environment = null;
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

"use client";

/* The Orchelix ring, in frosted glass, in the homepage hero.

   Ported from the approved study in design-sources/ring-3d/hero-ring-reference.html.
   The geometry, the environment, the material numbers and the hand-off maths
   are that file's, not new decisions — read it before changing any constant
   here. What is new is only what a React component has to do that a static
   page did not: own its lifetime, tear the GPU objects down, and never render
   on the server.

   THE FLAT MARK IS THE TRUTH. Seen straight on, the tubes project onto the
   same outline as public/orchelix-mark.svg, because both are built from the
   one copy of the path data in app/lib/ringPaths.ts. The depth only reveals
   itself as the ring sways.

   It sways; it never spins. No flares, no starfield, no bloom, no morph. The
   pointer moves the light, never the mesh.

   Everything degrades to the flat SVG, and the degraded state is silent: a
   visitor who gets the fallback sees the hero mark, not an apology. */

import { useEffect, useRef } from "react";
/* Types only — `import type` is erased at compile time, so naming three's
   types here costs the bundle nothing. The library itself arrives through the
   dynamic import inside the effect, after the fallback checks. */
import type * as THREE from "three";
import { RING_PATHS, RING_STROKE, RING_VIEWBOX } from "@/app/lib/ringPaths";

const VB_W = 90.93;
const VB_H = 100;
const CX = VB_W / 2;
const CY = VB_H / 2;

const RING_FRAC = 0.78; // share of the stage height the ring fills
const TUBE_R = 1.3; // viewBox units — the brand's heavy weight
const SWAY = (6 * Math.PI) / 180; // ±6°
const SWAY_PERIOD = 12; // seconds
const DEPTH_R = 48;

/* The intro runs once per visit, not once per mount. Next remounts this on
   client navigation back to the homepage, and replaying the reveal every time
   would turn a one-off into a tic. */
let introPlayed = false;

type GL = {
  render: () => void;
  resize: () => void;
  setLight: (x: number, y: number) => void;
  setSway: (t: number) => void;
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
    /* `deviceMemory` is Chromium-only and absent elsewhere; absent means "we
       do not know", which is not the same as "too small". Only an actual
       number under 4 opts out. */
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMemory = typeof mem === "number" && mem < 4;

    let disposed = false;
    let gl: GL | null = null;
    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;
    let swayT = 0;
    let motion = !reduced;
    const light = { x: 0, y: 0, tx: 0, ty: 0 };

    /* ---- the flat mark, and the hand-off ------------------------------- */

    /* With no target in the DOM there is nothing to hand off to, so the ring
       simply stays put and the nav mark is left alone at full opacity. */
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
          ring.style.transform = p
            ? `translate(${dx * e}px,${dy * e}px) scale(${s})`
            : "";
        }
        const fade = p < 0.72 ? 1 : Math.max(0, 1 - (p - 0.72) / 0.22);
        ring.style.opacity = fade === 1 ? "" : String(fade);
        navMark.style.opacity = String(Math.max(0, Math.min(1, (p - 0.7) / 0.25)));
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
      if (motion) swayT += dt;

      light.x += (light.tx - light.x) * 0.08;
      light.y += (light.ty - light.y) * 0.08;
      const settled =
        Math.abs(light.tx - light.x) < 1e-3 && Math.abs(light.ty - light.y) < 1e-3;

      gl.setSway(swayT);
      gl.setLight(light.x, light.y);
      gl.render();

      /* Stop once nothing is moving. A hero that is merely on screen must not
         hold a rAF loop open for the life of the visit. */
      if (motion || !settled) {
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

    /* ---- intro ---------------------------------------------------------- */

    /* `is-glass` is what hides the flat mark, so it may only ever be set when
       there is a live canvas to hide it behind. Gating it on the timer alone
       put the fallback in the worst possible state: with reduced motion on,
       the mark was hidden at 950ms and nothing took its place, leaving an
       empty square where the hero mark should be. Two conditions, both
       required — the intro is finished AND the renderer is up. */
    let introDone = reduced || introPlayed;
    const revealGlass = () => {
      if (introDone && gl && !disposed) ring.classList.add("is-glass");
    };

    let introTimer = 0;
    if (!introDone) {
      ring.classList.add("is-drawing");
      introTimer = window.setTimeout(() => {
        introDone = true;
        introPlayed = true;
        revealGlass();
      }, 950);
    }

    /* ---- boot ------------------------------------------------------------
       Nothing is imported at module scope: three.js is pulled in here, after
       the fallback conditions have been ruled out, so a visitor with reduced
       motion or a small device never downloads it at all. */
    if (!reduced && !lowMemory) {
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
              ring.classList.remove("is-glass");
            },
            { once: true },
          );

          gl.resize();
          revealGlass();
          handoff();
          kick();
        } catch {
          /* No WebGL, no memory for a context, a blocked import — the flat
             mark is already on screen and is a correct hero on its own. */
          gl = null;
          ring.classList.remove("is-glass");
        }
      })();
    }

    /* ---- events --------------------------------------------------------- */

    const aim = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      light.tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.8)));
      light.ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.8)));
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
      clearTimeout(introTimer);
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
      if (navMark) navMark.style.opacity = "";
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
            <path
              key={i}
              d={d}
              pathLength={1}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The scene. Every constant below comes from the approved study; the only
   deliberate departure is the colour-space line, because three r152 replaced
   `outputEncoding = sRGBEncoding` with `outputColorSpace = SRGBColorSpace`
   and the installed r185 no longer defines the old constant at all.
--------------------------------------------------------------------------- */
function initGL(
  T: typeof import("three"),
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
): GL | null {
  /* TWO CORRECTIONS FOR r185, BOTH MEASURED, NOT GUESSED.

     The study was authored against r150 and its numbers only reproduce under
     r150's pipeline. Ported literally to r185 the ring came out near-black:
     measured against a capture of the reference, the shipped port lit 4.0% of
     the frame at mean luminance 67.9, where the reference lights 11.6% at
     84.7. It read as dark wire, not as glass.

     1. COLOUR MANAGEMENT. r150 defaulted `ColorManagement.enabled` to false;
        r152 flipped it to true. With it on, every colour set from a hex is
        converted sRGB → linear, so the environment's four softboxes emit far
        less than the numbers say — the blue floor line lands at roughly a
        third of its authored radiance. The scene's values were chosen in the
        unmanaged pipeline, so the honest way to honour them is to render them
        in it. This is a global flag, and it is safe to set here only because
        nothing else in the app draws with three.

     2. LIGHT INTENSITY. r155 removed `useLegacyLights`, which r150 defaulted
        to true, making physically-correct lighting the only mode. The key
        light's authored 1.4 is a legacy figure; π is the conversion factor.

     Together they measure 11.5% lit at mean 82.5 — the reference to within
     noise. Change either and the ring goes dark again. */
  T.ColorManagement.enabled = false;

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
  renderer.toneMappingExposure = 1.05;

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(22, 1, 1, 2000);

  /* Studio environment: a black room with four narrow softboxes. Glass is
     defined by what it reflects, so the tubes pick these up as thin streaks
     and the iridescence tints them only at the grazing edges. */
  const envScene = new T.Scene();
  const roomGeo = new T.BoxGeometry(100, 100, 100);
  const roomMat = new T.MeshBasicMaterial({ color: 0x020305, side: T.BackSide });
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
  softbox(90, 5, [-8, 42, 16], 0xffffff, 14); // overhead strip
  softbox(4, 70, [-44, 4, 20], 0xffffff, 11); // left strip
  softbox(4, 60, [44, 0, -10], 0xffffff, 7); // right rim
  softbox(60, 4, [6, -40, 24], 0x6484db, 8); // cool floor line

  const pmrem = new T.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(envScene, 0.008);
  scene.environment = envRT.texture;

  /* 1.4 is the study's legacy-lighting figure; see correction 2 above. */
  const key = new T.DirectionalLight(0xffffff, 1.4 * Math.PI);
  scene.add(key);

  /* The Frosted setting — the approved one. Normal blending, opaque: custom
     and additive blending do not composite reliably across browsers. */
  const mat = new T.MeshPhysicalMaterial({
    color: 0x090b0f,
    metalness: 0,
    roughness: 0.34,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.28,
    iridescence: 0.6,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [240, 560],
    specularIntensity: 1,
    envMapIntensity: 1.5,
  });
  /* Rounded ends, matching the flat mark's round caps. A duller copy of the
     glass, so a sphere does not flare into a hot dot. */
  const capMat = mat.clone();
  capMat.roughness = 0.5;
  capMat.clearcoat = 0;
  capMat.envMapIntensity = 0.9;

  /* Depth: a gentle dome plus a saddle twist. Front-on this projects back
     onto the flat mark; the depth only shows as the ring sways. */
  const depth = (x: number, y: number) => {
    const u = (x - CX) / DEPTH_R;
    const v = (CY - y) / DEPTH_R;
    const r2 = u * u + v * v;
    return 8 * Math.max(0, 1 - r2) + 7 * u * v;
  };
  const P = (x: number, y: number) => new T.Vector3(x - CX, CY - y, depth(x, y));

  const group = new T.Group();
  const cap = new T.SphereGeometry(TUBE_R * 0.96, 18, 12);
  const tubeGeos: THREE.BufferGeometry[] = [cap];

  for (const d of RING_PATHS) {
    const n = (d.match(/-?\d*\.?\d+/g) ?? []).map(Number);
    const cp = new T.CurvePath<THREE.Vector3>();
    let x = n[0];
    let y = n[1];
    let count = 0;
    for (let i = 2; i + 5 < n.length; i += 6) {
      cp.add(
        new T.CubicBezierCurve3(
          P(x, y),
          P(n[i], n[i + 1]),
          P(n[i + 2], n[i + 3]),
          P(n[i + 4], n[i + 5]),
        ),
      );
      x = n[i + 4];
      y = n[i + 5];
      count++;
    }
    if (!count) continue;
    const geo = new T.TubeGeometry(cp, Math.max(32, count * 12), TUBE_R, 14, false);
    tubeGeos.push(geo);
    group.add(new T.Mesh(geo, mat));
    for (const p of [cp.getPoint(0), cp.getPoint(1)]) {
      const s = new T.Mesh(cap, capMat);
      s.position.copy(p);
      group.add(s);
    }
  }
  scene.add(group);

  let ringPx = 0;

  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    let visH = VB_H / RING_FRAC;
    if (w / h < VB_W / VB_H) visH = VB_W / RING_FRAC / (w / h);
    camera.position.set(0, 0, visH / 2 / Math.tan((camera.fov * Math.PI) / 360));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    ringPx = (VB_H * h) / visH;
  };

  return {
    render: () => renderer.render(scene, camera),
    resize,
    ringPx: () => ringPx,
    setSway: (t: number) => {
      const ph = (t * 2 * Math.PI) / SWAY_PERIOD;
      group.rotation.y = Math.sin(ph) * SWAY;
      group.rotation.x = Math.sin(ph * 0.5 + 1.1) * SWAY * 0.25;
    },
    setLight: (lx: number, ly: number) => {
      // Key light sits up-left-front; the pointer swings it up to ±18°.
      const az = -0.55 + lx * 0.32;
      const el = 0.6 - ly * 0.32;
      key.position
        .set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el))
        .multiplyScalar(100);
    },
    dispose: () => {
      for (const g of tubeGeos) g.dispose();
      for (const g of envGeos) g.dispose();
      for (const m of envMats) m.dispose();
      mat.dispose();
      capMat.dispose();
      envRT.texture.dispose();
      pmrem.dispose();
      scene.environment = null;
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

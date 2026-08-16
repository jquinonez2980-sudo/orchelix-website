import { inscription, setScroll } from "./store";
import { beatFromProgress, setWindowsFromSections, writing } from "./writing/WritingDirector";
import { FACE_Z, rowX1, rowY } from "./world/volumeLayout";
import { FIRST_BOOKED } from "./data/nightRegister";

/* Native document scroll. No hijack, no window listener, no React state.
   Beats include the first filament (beat 2) between the hero and Hear Esmi. */

const SECTION_IDS = [
  "top",
  "hear-esmi",
  "problem",
  "solutions",
  "how",
  "why",
  "operators",
  "book",
];

const cache: { id: string; top: number }[] = [];
let lastMeasure = 0;

function measure(force = false) {
  const now = performance.now();
  if (!force && now - lastMeasure < 250) return;
  lastMeasure = now;
  cache.length = 0;
  const scrollY = window.scrollY;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    cache.push({ id, top: el.getBoundingClientRect().top + scrollY });
  }
}

export function sampleScroll() {
  if (typeof window === "undefined") return;
  const scrolling = document.scrollingElement ?? document.documentElement;
  const max = Math.max(1, scrolling.scrollHeight - scrolling.clientHeight);
  const progress = Math.min(1, Math.max(0, scrolling.scrollTop / max));

  measure();
  setWindowsFromSections(
    cache.map((row) => ({ id: row.id, progress: Math.min(1, Math.max(0, row.top / max)) })),
  );
  setScroll(progress, beatFromProgress(progress));
}

export function bindResizeMeasure() {
  const onResize = () => measure(true);
  window.addEventListener("resize", onResize, { passive: true });
  measure(true);
  return () => window.removeEventListener("resize", onResize);
}

export function isNarrowView() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

const CAM = [
  { pos: [2.15, 0.62, 6.4], target: [0.3, 0.08, 0], fov: 28 },
  { pos: [1.42, 0.58, 4.85], target: [0.05, 0.32, 0], fov: 26 },
  { pos: [1.72, 0.48, 5.35], target: [0.18, 0.06, 0], fov: 27 },
  { pos: [1.14, 0.7, 3.05], target: [0.48, 0.62, 0.08], fov: 20 },
  { pos: [1.68, 0.46, 5.15], target: [0.2, 0.1, 0], fov: 27 },
  { pos: [1.88, 0.52, 5.55], target: [0.24, 0.06, 0], fov: 27 },
] as const;

const CAM_NARROW = [
  { pos: [0.72, 0.78, 7.85], target: [-0.02, 0.16, 0], fov: 32 },
  { pos: [0.58, 0.74, 6.55], target: [-0.04, 0.3, 0], fov: 30 },
  { pos: [0.64, 0.68, 7.05], target: [0.0, 0.14, 0], fov: 31 },
  { pos: [0.42, 0.92, 5.35], target: [0.12, 0.52, 0.06], fov: 29 },
  { pos: [0.66, 0.64, 6.85], target: [0.0, 0.14, 0], fov: 31 },
  { pos: [0.7, 0.68, 7.25], target: [0.02, 0.12, 0], fov: 31 },
] as const;

export function cameraForProgress(progress: number) {
  const narrow = isNarrowView();
  const table = narrow ? CAM_NARROW : CAM;
  if (inscription.quality.reducedMotion) {
    const c = table[0];
    return { position: [...c.pos] as [number, number, number], target: [...c.target] as [number, number, number], fov: c.fov };
  }
  const beat = inscription.beat;
  const a = table[Math.max(0, beat - 1)];
  const b = table[Math.min(5, beat)];
  const t = 1 - Math.pow(1 - Math.min(1, progress), 1.05);
  const mix = beat >= 6 ? 1 : 0.35 + t * 0.25;
  const base = {
    position: [
      a.pos[0] + (b.pos[0] - a.pos[0]) * mix,
      a.pos[1] + (b.pos[1] - a.pos[1]) * mix,
      a.pos[2] + (b.pos[2] - a.pos[2]) * mix,
    ] as [number, number, number],
    target: [
      a.target[0] + (b.target[0] - a.target[0]) * mix,
      a.target[1] + (b.target[1] - a.target[1]) * mix,
      a.target[2] + (b.target[2] - a.target[2]) * mix,
    ] as [number, number, number],
    fov: a.fov + (b.fov - a.fov) * mix,
  };

  const strike = Math.max(writing.stamp, beat === 4 ? 1 : 0);
  if (strike <= 0.01) return base;

  const row = FIRST_BOOKED < 0 ? 0 : FIRST_BOOKED;
  const dieX = rowX1() - 0.14;
  const lockTarget: [number, number, number] = narrow
    ? [0.08 + dieX * 0.42, 0.28 + rowY(row) + 0.1, FACE_Z + 0.04]
    : [0.32 + dieX * 0.7, 0.08 + rowY(row) + 0.14, FACE_Z + 0.05];
  const dolly = narrow ? 4.55 - writing.press * 0.1 : 2.42 - writing.press * 0.16;
  const lockPos: [number, number, number] = narrow
    ? [lockTarget[0] + 0.32, lockTarget[1] + 0.28, lockTarget[2] + dolly]
    : [lockTarget[0] + 0.22, lockTarget[1] + 0.14, lockTarget[2] + dolly];
  const w = narrow
    ? 0.38 + writing.press * 0.22
    : beat === 4
      ? 0.55 + writing.press * 0.45
      : Math.min(1, writing.press);
  const fov = narrow ? 29.2 - writing.press * 0.35 : 20 - writing.press * 0.8;
  return {
    position: [
      base.position[0] + (lockPos[0] - base.position[0]) * w,
      base.position[1] + (lockPos[1] - base.position[1]) * w,
      base.position[2] + (lockPos[2] - base.position[2]) * w,
    ] as [number, number, number],
    target: [
      base.target[0] + (lockTarget[0] - base.target[0]) * w,
      base.target[1] + (lockTarget[1] - base.target[1]) * w,
      base.target[2] + (lockTarget[2] - base.target[2]) * w,
    ] as [number, number, number],
    fov: base.fov + (fov - base.fov) * w,
  };
}

export { inscription };

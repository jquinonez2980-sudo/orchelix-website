import { inscription } from "../store";
import { ENTRY_COUNT } from "../world/volumeLayout";
import { FIRST_BOOKED } from "../data/nightRegister";

/* Scroll is the clock. Every row, filament, and the stamp are functions
   of progress. Beat 2 is the first filament, not a skipped integer. */

export type RowPlay = {
  approach: number;
  write: number;
};

export type WritingState = {
  rows: RowPlay[];
  stamp: number;
  press: number;
  impact: number;
  stamped: boolean;
  active: number[];
};

export const windows = {
  p2: 0.07,
  p3: 0.16,
  p4: 0.42,
  p5: 0.66,
  p6: 0.84,
};

export const writing: WritingState = {
  rows: Array.from({ length: ENTRY_COUNT }, () => ({ approach: 0, write: 0 })),
  stamp: 0,
  press: 0,
  impact: 0,
  stamped: false,
  active: [],
};

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function remap(v: number, a: number, b: number) {
  if (b <= a) return v >= b ? 1 : 0;
  return clamp01((v - a) / (b - a));
}

function smooth(v: number) {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
}

function playFromLocal(local: number): RowPlay {
  return {
    approach: smooth(remap(local, 0, 0.22)),
    write: smooth(remap(local, 0.06, 0.78)),
  };
}

let intro = 0;

/* Press verb: hold, then fall with weight, strike, settle. */
function pressCurve(t: number) {
  const x = clamp01(t);
  if (x < 0.52) return x * 0.035;
  if (x < 0.74) {
    const u = (x - 0.52) / 0.22;
    return 0.035 + u * u * u * u * 0.945;
  }
  if (x < 0.86) {
    const u = (x - 0.74) / 0.12;
    return 0.98 + Math.sin(u * Math.PI) * 0.055;
  }
  return 1;
}

export function updateWriting(dt = 0) {
  const p = inscription.progress;
  const reduced = inscription.quality.reducedMotion;

  if (reduced) {
    for (const row of writing.rows) {
      row.approach = 1;
      row.write = 1;
    }
    writing.stamp = 1;
    writing.press = 1;
    writing.impact = 0;
    writing.stamped = true;
    writing.active = [];
    return writing;
  }

  intro = Math.min(1, intro + dt / 2.1);

  const { p4, p5 } = windows;

  writing.rows[0] = playFromLocal(intro);

  const queued = ENTRY_COUNT - 1;
  const from = 0.002;
  const span = Math.max(0.08, p4 - from);
  for (let i = 1; i < ENTRY_COUNT; i++) {
    const slot = (i - 1) / queued;
    const start = from + slot * span * 0.78;
    const end = start + span * 0.28;
    writing.rows[i] = playFromLocal(remap(p, start, end));
  }

  writing.stamp = remap(p, p4, Math.min(p5, p4 + 0.09));
  writing.press = pressCurve(writing.stamp);
  writing.impact = writing.stamp > 0.7 && writing.stamp < 0.88
    ? Math.sin(remap(writing.stamp, 0.7, 0.88) * Math.PI)
    : 0;
  writing.stamped = writing.press > 0.9;

  writing.active = [];
  for (let i = 0; i < ENTRY_COUNT; i++) {
    const row = writing.rows[i];
    if (row.approach > 0.02 && row.write < 0.97) writing.active.push(i);
  }
  return writing;
}

export function beatFromProgress(progress: number) {
  if (progress < windows.p2) return 1;
  if (progress < windows.p3) return 2;
  if (progress < windows.p4) return 3;
  if (progress < windows.p5) return 4;
  if (progress < windows.p6) return 5;
  return 6;
}

export function setWindowsFromSections(
  tops: { id: string; progress: number }[],
) {
  const at = (id: string) => tops.find((t) => t.id === id)?.progress;
  const top = at("top") ?? 0;
  const hear = at("hear-esmi") ?? 0.16;
  const solutions = at("solutions") ?? 0.42;
  const why = at("why") ?? 0.66;
  const book = at("book") ?? 0.84;
  windows.p2 = top + (hear - top) * 0.28;
  windows.p3 = hear;
  windows.p4 = solutions;
  windows.p5 = why;
  windows.p6 = book;
}

export { FIRST_BOOKED };

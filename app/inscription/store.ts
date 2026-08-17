"use client";

/* Single source of truth for the homepage scene.
   Theme mode is a React subscription. Scroll progress is a mutable field
   sampled inside useFrame so the React tree never re-renders on scroll. */

export type Backend = "none" | "webgpu" | "webgl";
export type QualityTier = "high" | "mid" | "off";

export type Quality = {
  tier: QualityTier;
  dpr: [number, number];
  antialias: boolean;
  transmission: boolean;
  env: boolean;
  allowWebGPU: boolean;
  reducedMotion: boolean;
};

export type SceneTheme = {
  clear: string;
  fog: string;
  fogDensity: number;
  exposure: number;
  envIntensity: number;
  key: { color: string; intensity: number; position: [number, number, number] };
  fill: { color: string; intensity: number };
  hemi: { sky: string; ground: string; intensity: number };
  ledger: {
    tint: string;
    roughness: number;
    ior: number;
    transmission: number;
    thickness: number;
    attenuation: string;
    attenuationDistance: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
  pages: { color: string; roughness: number };
  ruling: { color: string; opacity: number };
  filament: { color: string; emission: number; width: number };
  type: { ink: string; ink2: string; foil: string };
};

export type InscriptionState = {
  mode: "light" | "dark";
  quality: Quality;
  backend: Backend;
  ready: boolean;
  hidden: boolean;
  progress: number;
  beat: number;
};

const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export const inscription: InscriptionState = {
  mode: "light",
  quality: {
    tier: "high",
    dpr: [1, 1.5],
    antialias: true,
    transmission: true,
    env: true,
    allowWebGPU: true,
    reducedMotion: false,
  },
  backend: "none",
  ready: false,
  hidden: false,
  progress: 0,
  beat: 1,
};

export function subscribeInscription(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getInscriptionSnapshot() {
  return inscription;
}

export function setInscription<K extends keyof InscriptionState>(
  key: K,
  value: InscriptionState[K],
) {
  if (inscription[key] === value) return;
  inscription[key] = value;
  if (key !== "progress" && key !== "beat") emit();
}

export function setMode(mode: "light" | "dark") {
  if (inscription.mode === mode) return;
  inscription.mode = mode;
  if (typeof document !== "undefined") {
    try {
      localStorage.setItem("orchelix-inscription-theme", mode);
    } catch {
      /* private mode */
    }
  }
  emit();
}

export function setScroll(progress: number, beat: number) {
  inscription.progress = progress;
  inscription.beat = beat;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

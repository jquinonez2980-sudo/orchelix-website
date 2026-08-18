import { inscription, setInscription, type Quality, type QualityTier } from "./store";

const HIGH: Quality = {
  tier: "high",
  dpr: [1, 1.5],
  antialias: true,
  transmission: true,
  transmissionScale: 1,
  env: true,
  allowWebGPU: true,
  reducedMotion: false,
  fps: 60,
  texScale: 1,
};

const MID: Quality = {
  tier: "mid",
  dpr: [1, 1.15],
  antialias: false,
  transmission: true,
  transmissionScale: 0.55,
  env: true,
  allowWebGPU: true,
  reducedMotion: false,
  fps: 45,
  texScale: 0.7,
};

const LOW: Quality = {
  tier: "low",
  dpr: [1, 1],
  antialias: false,
  transmission: true,
  transmissionScale: 0.38,
  env: false,
  allowWebGPU: false,
  reducedMotion: false,
  fps: 30,
  texScale: 0.45,
};

const OFF: Quality = {
  tier: "off",
  dpr: [1, 1],
  antialias: false,
  transmission: false,
  transmissionScale: 0.35,
  env: false,
  allowWebGPU: false,
  reducedMotion: true,
  fps: 0,
  texScale: 0.35,
};

/* iPadOS 13+ reports itself as "Macintosh", so the UA test alone misses iPads;
   a Mac with a touchscreen does not exist, which makes maxTouchPoints the
   reliable second term. */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && (navigator.maxTouchPoints ?? 0) > 1)
  );
}

export function detectQuality(): Quality {
  if (typeof window === "undefined") return HIGH;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const narrow = window.matchMedia("(max-width: 768px)").matches;

  /* No WebGL probe here. Creating a context just to read the GPU string is a
     long task and races the real renderer. Heuristics are enough to pick a
     live tier; context-lost still falls back to the poster. */

  if (saveData) return { ...OFF, reducedMotion };

  /* Reduced motion keeps the volume, frozen. The poster is only for
     save-data / missing WebGL — never the only experience on a capable phone. */
  if (isIOS() || narrow || cores <= 4 || memory <= 4) {
    return { ...LOW, reducedMotion };
  }

  if (cores <= 6 || memory <= 8) {
    return { ...MID, reducedMotion };
  }

  return { ...HIGH, reducedMotion };
}

export function applyQuality(next: Quality) {
  setInscription("quality", next);
}

export function dropQualityStep() {
  const motion = inscription.quality.reducedMotion;
  const current = inscription.quality.tier;
  /* Low is the live floor. Off is detect-only (save-data) or a lost context.
     Auto-dropping to off unmounted the canvas after a janky scroll. */
  if (current === "high") applyQuality({ ...MID, reducedMotion: motion });
  else if (current === "mid") applyQuality({ ...LOW, reducedMotion: motion });
}

export function tierRank(tier: QualityTier) {
  return tier === "high" ? 3 : tier === "mid" ? 2 : tier === "low" ? 1 : 0;
}

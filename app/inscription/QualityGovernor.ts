import { inscription, setInscription, type Quality, type QualityTier } from "./store";

const HIGH: Quality = {
  tier: "high",
  dpr: [1, 1.5],
  antialias: true,
  transmission: true,
  env: true,
  allowWebGPU: true,
  reducedMotion: false,
};

const MID: Quality = {
  tier: "mid",
  dpr: [1, 1.15],
  antialias: false,
  transmission: true,
  env: true,
  allowWebGPU: true,
  reducedMotion: false,
};

const OFF: Quality = {
  tier: "off",
  dpr: [1, 1],
  antialias: false,
  transmission: false,
  env: false,
  allowWebGPU: false,
  reducedMotion: true,
};

function readGpuRenderer(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl");
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const info = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "") : "";
    const lose = gl.getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return info;
  } catch {
    return "";
  }
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
  const gpu = readGpuRenderer();
  const integrated = /intel|uhd|iris|mali|adreno|swiftshader|llvmpipe/i.test(gpu);

  if (saveData) return { ...OFF, reducedMotion };

  if (reducedMotion && (narrow || integrated || cores <= 4)) {
    return { ...OFF, reducedMotion: true };
  }

  if (narrow || integrated || cores <= 4 || memory <= 4) {
    return { ...MID, reducedMotion };
  }

  return { ...HIGH, reducedMotion };
}

export function applyQuality(next: Quality) {
  setInscription("quality", next);
}

export function dropQualityStep() {
  const current = inscription.quality.tier;
  if (current === "high") applyQuality({ ...MID, reducedMotion: inscription.quality.reducedMotion });
  else if (current === "mid") applyQuality({ ...OFF, reducedMotion: inscription.quality.reducedMotion });
}

export function tierRank(tier: QualityTier) {
  return tier === "high" ? 2 : tier === "mid" ? 1 : 0;
}

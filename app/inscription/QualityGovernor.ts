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
};

const MID: Quality = {
  tier: "mid",
  dpr: [1, 1.15],
  antialias: false,
  transmission: true,
  transmissionScale: 0.6,
  env: true,
  allowWebGPU: true,
  reducedMotion: false,
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

  /* iOS takes the poster rather than the live scene. Other phones keep it —
     Android was verified rendering the volume fine, so disabling every narrow
     viewport was too blunt and cost the scene on hardware that can run it.

     MID — which is what they used to get — keeps transmission and environment
     on. Transmission makes three draw the whole scene a second time into a
     full-resolution target every frame, and iOS Safari has the tightest WebGL
     memory ceiling of the mainstream browsers. When it cannot service that it
     does not raise: it draws nothing, which is the blank canvas being
     reported on iPhone.

     iOS cannot be caught by the `integrated` test above, because Safari
     removed WEBGL_debug_renderer_info for fingerprinting reasons — so
     readGpuRenderer() returns "" there and every iPhone reads as a desktop
     GPU. The device test has to be explicit.

     This is deliberately the conservative fix: the poster is a real, readable
     frame of the register, so a phone gets correct content instead of a black
     void. A cheaper *live* tier is the better answer and is worth building,
     but three attempts at one (transmission off; transmission off with
     environment on; transmission on at reduced resolution) each failed to
     render the volume on desktop, so the scene has a dependency on the full
     path that needs isolating before a mobile tier can be trusted. */
  if (isIOS()) {
    return { ...OFF, reducedMotion };
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
  /* Mid is the live floor. Off is detect-only (reduced motion / save-data).
     Auto-dropping mid → off unmounted the canvas after a janky scroll and
     left the faint poster — the volume looked like it died at rest. */
  if (current === "high") applyQuality({ ...MID, reducedMotion: inscription.quality.reducedMotion });
}

export function tierRank(tier: QualityTier) {
  return tier === "high" ? 2 : tier === "mid" ? 1 : 0;
}

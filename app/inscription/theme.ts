import type { SceneTheme } from "./store";

export type { SceneTheme };

/* Two times of day of the same room.
   Light = daylight materials studio, 09:00.
   Dark = night operations desk, 02:18.
   Magenta exists only on the die and its impression. */

export const LIGHT_THEME: SceneTheme = {
  clear: "#F4F5F6",
  fog: "#F4F5F6",
  fogDensity: 0.005,
  exposure: 1.08,
  envIntensity: 1.05,
  key: { color: "#F3F5F7", intensity: 2.15, position: [-3.1, 5.4, 2.2] },
  fill: { color: "#DDE0E4", intensity: 0.2 },
  hemi: { sky: "#F2F4F6", ground: "#C5C8CD", intensity: 0.46 },
  ledger: {
    tint: "#D5DCE3",
    roughness: 0.02,
    ior: 1.52,
    transmission: 0.8,
    thickness: 0.78,
    attenuation: "#C5CCD4",
    attenuationDistance: 1.35,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
  },
  pages: { color: "#F4F1EA", roughness: 0.55 },
  ruling: { color: "#2A2E36", opacity: 0.5 },
  filament: { color: "#2A2E36", emission: 0.03, width: 1.4 },
  type: { ink: "#3A3F4A", ink2: "rgba(46,50,62,0.38)", foil: "#3A3F4A" },
};

export const DARK_THEME: SceneTheme = {
  clear: "#05070A",
  fog: "#05070A",
  fogDensity: 0.034,
  exposure: 0.82,
  envIntensity: 0.38,
  key: { color: "#A8B8C8", intensity: 0.48, position: [-0.55, 3.2, 1.4] },
  fill: { color: "#151A22", intensity: 0.05 },
  hemi: { sky: "#1A222C", ground: "#08090C", intensity: 0.1 },
  ledger: {
    tint: "#E4EAF0",
    roughness: 0.01,
    ior: 1.5,
    transmission: 0.94,
    thickness: 0.48,
    attenuation: "#5A6572",
    attenuationDistance: 2.4,
    clearcoat: 1,
    clearcoatRoughness: 0.008,
  },
  pages: { color: "#2A3038", roughness: 0.64 },
  ruling: { color: "#C4CCD6", opacity: 0.46 },
  filament: { color: "#C8D0D8", emission: 1.8, width: 1.6 },
  type: { ink: "#C8CDD6", ink2: "rgba(232,234,238,0.34)", foil: "#C8CDD6" },
};

export function themeFor(mode: "light" | "dark"): SceneTheme {
  return mode === "dark" ? DARK_THEME : LIGHT_THEME;
}

export function readStoredMode(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("orchelix-inscription-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

import type { SceneTheme } from "./store";

export type { SceneTheme };

/* Two times of day of the same room.
   Light = daylight materials studio, 09:00.
   Dark = night operations desk, 02:18.
   Magenta exists only on the die and its impression. */

export const LIGHT_THEME: SceneTheme = {
  clear: "#F4F5F6",
  fog: "#F4F5F6",
  fogDensity: 0.007,
  exposure: 1.2,
  envIntensity: 1.28,
  key: { color: "#F3F5F7", intensity: 2.7, position: [-3.1, 5.4, 2.2] },
  fill: { color: "#DDE0E4", intensity: 0.26 },
  hemi: { sky: "#F2F4F6", ground: "#C5C8CD", intensity: 0.52 },
  ledger: {
    tint: "#EEF0F2",
    roughness: 0.045,
    ior: 1.52,
    transmission: 1,
    thickness: 1.4,
    attenuation: "#E6E8EB",
    attenuationDistance: 2.1,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
  },
  pages: { color: "#F7F7F6", roughness: 0.44 },
  ruling: { color: "#2E323E", opacity: 0.68 },
  filament: { color: "#2A2E36", emission: 0.04, width: 2.1 },
  type: { ink: "#2E323E", ink2: "rgba(46,50,62,0.62)", foil: "#2E323E" },
};

export const DARK_THEME: SceneTheme = {
  clear: "#05070A",
  fog: "#05070A",
  fogDensity: 0.095,
  exposure: 0.56,
  envIntensity: 0.07,
  key: { color: "#7E92A8", intensity: 0.1, position: [-0.4, 3.1, 1.1] },
  fill: { color: "#10141A", intensity: 0.02 },
  hemi: { sky: "#0C1118", ground: "#030406", intensity: 0.04 },
  ledger: {
    tint: "#5C6674",
    roughness: 0.07,
    ior: 1.5,
    transmission: 0.97,
    thickness: 1.85,
    attenuation: "#0A0D12",
    attenuationDistance: 0.55,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  },
  pages: { color: "#0C1016", roughness: 0.7 },
  ruling: { color: "#5A6270", opacity: 0.28 },
  filament: { color: "#E4EDF6", emission: 3.4, width: 3.6 },
  type: { ink: "#E8EAEE", ink2: "rgba(232,234,238,0.58)", foil: "#E8EAEE" },
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

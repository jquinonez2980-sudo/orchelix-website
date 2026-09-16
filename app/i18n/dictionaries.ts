import "server-only";
import type { Locale } from "./config";
import type { Messages } from "./messages/en";
import competitiveEn from "./messages/patches/competitive-2026-09-16-en";
import competitiveEs from "./messages/patches/competitive-2026-09-16-es";

/* Catalogues are loaded per-request on the server and never reach the client
   bundle, so adding languages costs nothing in shipped JavaScript. */
const dictionaries = {
  en: () => import("./messages/en").then((m) => m.default),
  es: () => import("./messages/es").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Messages>>;

const patches = {
  en: competitiveEn,
  es: competitiveEs,
} as const;

/* Shallow-to-deep merge for competitive-truth overlays. Arrays in the patch
   replace the base array wholesale; objects recurse; leaves overwrite. */
function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(patch)) return patch as T;
  if (typeof patch !== "object" || typeof base !== "object" || base === null || Array.isArray(base)) {
    return patch as T;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
    out[k] = deepMerge((base as Record<string, unknown>)[k], v);
  }
  return out as T;
}

export async function getDictionary(locale: Locale): Promise<Messages> {
  const base = await dictionaries[locale]();
  return deepMerge(base, patches[locale]);
}

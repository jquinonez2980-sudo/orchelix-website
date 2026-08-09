import type { Locale } from "@/app/i18n/config";
import type { Industry } from "./types";
import INDUSTRIES_EN from "./en";
import INDUSTRIES_ES from "./es";

export type { Industry } from "./types";

/* Sector copy lives here rather than in the message catalogues: seven sectors
   times four problems, six benefits, and five questions is a large body of
   copy that only two routes read, and folding it into en.ts/es.ts would
   triple a file every page already imports. */
const BY_LOCALE: Record<Locale, Industry[]> = {
  en: INDUSTRIES_EN,
  es: INDUSTRIES_ES,
};

export function getIndustries(locale: Locale): Industry[] {
  return BY_LOCALE[locale];
}

export function getIndustry(locale: Locale, slug: string): Industry | undefined {
  return BY_LOCALE[locale].find((i) => i.slug === slug);
}

/* Slugs are locale-independent by design, so the route's static params come
   from one list rather than per-locale ones. */
export const INDUSTRY_SLUGS = INDUSTRIES_EN.map((i) => i.slug);

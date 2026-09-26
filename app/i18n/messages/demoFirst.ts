/* Demo-first CTA copy — 2026-09-25 (Jorge-approved, copy only).

   New strings for the home hero, the home close, and the /home-services hero
   button. They live here rather than in the catalogues because the overlay
   patches can only override keys `Messages` already has. The live line is the
   same number as the nav: +1 561 566 1066. */
import type { Locale } from "@/app/i18n/config";

export const DEMO_TEL = "tel:+15615661066";

export type DemoFirstCopy = {
  heroTitleGlow: string;
  heroCall: string;
  heroTryOwnLine: string;
  closeHeading: string;
  closeBody: string;
  closeCall: string;
  closePilot: string;
  hearEsmiAnswer: string;
};

const COPY: Record<Locale, DemoFirstCopy> = {
  en: {
    heroTitleGlow: "Esmi answers.",
    heroCall: "Hear Esmi answer — 561-566-1066",
    heroTryOwnLine: "Heard her? Try it on your own line",
    closeHeading: "Heard her? Try Esmi on your line.",
    closeBody: "A 14-day pilot on your real number is $149.",
    closeCall: "Hear Esmi answer — 561-566-1066",
    closePilot: "Start the 14-day pilot",
    hearEsmiAnswer: "Hear Esmi answer — 561-566-1066",
  },
  es: {
    heroTitleGlow: "Esmi contesta.",
    heroCall: "Escucha a Esmi — 561-566-1066",
    heroTryOwnLine: "¿La escuchaste? Pruébala en tu línea",
    closeHeading: "¿La escuchaste? Prueba a Esmi en tu línea.",
    closeBody: "Un piloto de 14 días en tu número real cuesta $149.",
    closeCall: "Escucha a Esmi — 561-566-1066",
    closePilot: "Empieza el piloto de 14 días",
    hearEsmiAnswer: "Escucha a Esmi — 561-566-1066",
  },
};

export function demoFirstCopy(locale: Locale): DemoFirstCopy {
  return COPY[locale] ?? COPY.en;
}

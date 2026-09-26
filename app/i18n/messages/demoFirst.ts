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
    heroTitleGlow: "Esmi answers both.",
    heroCall: "Hear Esmi answer — call 561-566-1066",
    heroTryOwnLine: "Heard her? Try it on your own line",
    closeHeading: "Heard Esmi pick up? Try it on your own line.",
    closeBody:
      "A 14-day pilot on your real number is $149. After-hours answering, Google Calendar + SMS, English and Spanish included.",
    closeCall: "Hear Esmi answer — 561-566-1066",
    closePilot: "Start the 14-day pilot",
    hearEsmiAnswer: "Hear Esmi answer — call 561-566-1066",
  },
  es: {
    heroTitleGlow: "Esmi contesta las dos.",
    heroCall: "Escucha a Esmi contestar — llama al 561-566-1066",
    heroTryOwnLine: "¿Ya la escuchaste? Pruébala en tu propia línea",
    closeHeading: "¿Escuchaste a Esmi contestar? Pruébala en tu propia línea.",
    closeBody:
      "Un piloto de 14 días en tu número real cuesta $149. Fuera de horario, Google Calendar + SMS, inglés y español incluidos.",
    closeCall: "Escucha a Esmi contestar — 561-566-1066",
    closePilot: "Empieza el piloto de 14 días",
    hearEsmiAnswer: "Escucha a Esmi contestar — llama al 561-566-1066",
  },
};

export function demoFirstCopy(locale: Locale): DemoFirstCopy {
  return COPY[locale] ?? COPY.en;
}

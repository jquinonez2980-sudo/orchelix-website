/* Demo-first copy overlay — 2026-09-25 (Jorge-approved, copy only).
   Deep-merged onto the EN catalogue AFTER the 2026-09-16 competitive overlay.
   No prices change here: every figure matches /pricing. */
import type { Messages } from "../en";
import base from "../en";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const PRICE_Q = "How much does an AI receptionist cost?";

const patch = {
  home: {
    /* The glow phrase ("Esmi answers.") lives in `demoFirst.ts`. */
    heroTitle: "The 9pm call?",
    heroLede:
      "Esmi, the AI receptionist from Orchelix, answers 24/7 in English and Spanish and books Google Calendar with SMS confirmation.",
  },
  pages: {
    /* Arrays replace wholesale in the overlay, so the FAQ is the base list
       with only the pricing answer swapped — it now states the setup fee. */
    aiReceptionist: {
      faq: base.pages.aiReceptionist.faq.map((f) =>
        f.q === PRICE_Q
          ? {
              ...f,
              a: "Esmi Local / Starter is $299/mo + $499 setup. Growth is $599/mo + $799 setup, and Scale is $999/mo with custom setup — setup is done for you. A fourteen-day pilot is $149, credited to your first invoice if you continue.",
            }
          : f,
      ),
    },
    verticals: {
      homeServices: {
        lede: "Built for Jobber shops that lose jobs when the phone rings and nobody’s there to answer. A bilingual AI receptionist for home-services businesses. Esmi picks up after hours, on weekends, and while your crew is on a job — qualifies the work, and books it onto Google Calendar with SMS confirmation.",
        closeBody:
          "Try it on your own line: a 14-day pilot is $149. After that, Esmi Local is $299/mo + $499 setup.",
      },
    },
  },
} satisfies DeepPartial<Messages>;

export default patch;

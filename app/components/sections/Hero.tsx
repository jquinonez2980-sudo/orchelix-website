/* The opening band.

   Near-black, full-bleed, and sized by its own content rather than by the
   viewport — the first frame has to show that the page continues. Nothing
   here gates the page: no "enter", no overlay. A visitor can scroll straight
   past on the first gesture.

   The band makes one promise and proves it in the same viewport:

   1. The outcome, at Display size — "Every call answered." The name is in
      the nav lockup and in the glass mark beside this column; the headline
      does not spend itself repeating the logo.
   2. One line of what the company does.
   3. The live line (`HeroLine`) — the number Esmi answers, 24/7, set large.
      A visitor can test the claim before they read another word, which is
      the one thing a competitor's hero cannot copy.
   4. The action: the stamp ($149 pilot) and a quiet action that hands the
      visitor down to the recorded call in the next band, so a visitor not
      ready to dial still has somewhere to go that is not away.

   The conditions strip sits at the FOOT of the band rather than above the
   headline, where it would be an eyebrow (DESIGN.md, The No Kicker Rule).

   One animation in the column. The headline is Struck — revealed left to
   right — once, in 300ms, and then it holds. It is declared on the resting
   state, so with JS off or motion suppressed the words are simply there. */

import { Section, PageTitle, Stamp, QuietAction } from "@/app/components/ledger";
import { type Locale } from "@/app/i18n/config";
import { ESMI_PILOT_PAYMENT_LINK } from "@/app/lib/pilotPayment";
import type { Messages } from "@/app/i18n/messages/en";
import HeroRing from "./HeroRing";
import HeroLine from "./HeroLine";

/* HeroRing is a Client Component, imported plainly rather than through
   `next/dynamic` with `ssr: false`.

   WHY NOT `ssr: false`. Next 16 rejects it outright from a Server Component —
   "`ssr: false` is not allowed with `next/dynamic` in Server Components" — and
   the lazy-loading guide in node_modules/next/dist/docs says the option only
   works inside a Client Component. The usual workaround is a thin client
   wrapper, and here that would make the hero worse rather than better.

   WHAT IT WAS BUYING, AND HOW THAT IS STILL PAID. The point of `ssr: false`
   was to keep three.js off the server render and out of everyone else's
   bundle. That is not what the flag was doing: three.js is behind an
   `await import("three")` inside the component's own effect, which runs after
   hydration, on the homepage only, and only once the reduced-motion, low-
   memory and WebGL checks have passed. Skipping SSR would have added nothing
   to that.

   WHAT IT WAS COSTING. HeroRing renders a flat SVG of the mark as its resting
   state. Server-rendered, that mark is in the HTML, so it is there with
   JavaScript off, there before hydration, and there in the frame before the
   canvas fades up — no empty square, no pop-in. `ssr: false` would have
   removed exactly that, which is the Legible Default Rule the rest of this
   surface is built on. */

export default function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  const words = t.home.heroTitle.split(" ");
  const tail = words.pop() ?? "";
  const head = words.join(" ");
  return (
    <Section id="top" tone="night" tight>
      <div className="lg-hero-grid--ring">
      <div className="lg-hero-offer">
        {/* Archivo light at the top of the wdth axis, uppercase, open
            tracking — all of it from `PageTitle` and the --lg-* type tokens,
            which are the only way a heading is set here. The ink is `--lg-ink`, which the night
            band has already retargeted to #e8eaee: 14.91:1 on this ground. */}
        <PageTitle tone="night" max="14ch">
          {/* The last word carries the vivid gradient — one phrase, once. */}
          <span className="lg-strike">
            {head}{head && " "}<span className="lg-glow-text">{tail}</span>
          </span>
        </PageTitle>

        <p className="lg-prose lg-hero-body">{t.home.heroLede}</p>

        <HeroLine head={t.home.lineHead} note={t.home.lineNote} label={t.home.lineCall} />

        <div className="lg-hero-actions">
          <Stamp href={ESMI_PILOT_PAYMENT_LINK}>{locale === "es" ? "Empieza un piloto de $149" : "Start a $149 pilot"}</Stamp>
          <QuietAction tone="night" href="#hear-esmi">{t.home.hearFirst}</QuietAction>
        </div>
      </div>

      {/* The mark, in glass. Decorative in the sense that the hero states
          everything it says in words first — but it carries the company's
          own name as its label, so it is a real image, not a spacer. */}
      <HeroRing />
      </div>

      {/* The conditions of record — where it is answered from. The languages
          are stated once, on the live line; a second EN/ES/FR run here
          disagreed with it (French is an add-on, not a language the line
          answers in natively). Facts, set in the label voice,
          closing the band with a rule. The ticking clock that stood here was
          removed 2026-09-11: a live readout under a hero is a HUD device. */}
      <div className="lg-hero-meta">
        <span className="lg-hero-meta__line" aria-hidden="true" />
        <p>{t.home.metaPlace}</p>
      </div>
    </Section>
  );
}

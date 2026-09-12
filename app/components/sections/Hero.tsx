/* The opening band.

   Near-black, full-bleed, and sized by its own content rather than by the
   viewport — the first frame has to show that the page continues, because the
   site's problem is too few visitors and a splash taxes every one of them.
   Nothing here gates the page: no "enter", no click to proceed, no overlay.
   A visitor can scroll straight past on the first gesture.

   Three things, in this order: the name, one line of what the company does,
   one action. The conditions strip sits at the FOOT of the band rather than
   above the wordmark, where it would be an eyebrow — headings in this world
   stand alone (DESIGN.md, The No Kicker Rule).

   One animation. The wordmark is Struck — revealed left to right, the way it
   would be written — once, in 300ms, and then it holds. It is declared on the
   resting state, so with JS off, with motion suppressed, or in the frame
   before the animation starts, the name is simply on the page. */

import { Section, PageTitle, Stamp } from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import HeroRing from "./HeroRing";

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
  return (
    <Section id="top" tone="night">
      <div className="lg-hero-grid--ring">
      <div className="lg-hero-offer">
        {/* Archivo light at the top of the wdth axis, uppercase, open
            tracking — all of it from `PageTitle` and the --lg-* type tokens,
            which are the only way a heading is set here. The ink is `--lg-ink`, which the night
            band has already retargeted to #e8eaee: 14.91:1 on this ground. */}
        <PageTitle tone="night" max="12ch">
          <span className="lg-strike">{t.home.wordmark}</span>
        </PageTitle>

        <p className="lg-prose lg-hero-body">{t.home.heroLede}</p>

        <div className="lg-hero-actions">
          <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
        </div>
      </div>

      {/* The mark, in glass. Decorative in the sense that the hero states
          everything it says in words first — but it carries the company's
          own name as its label, so it is a real image, not a spacer. */}
      <HeroRing />
      </div>

      {/* The conditions of record — what this page is, where it is answered
          from, and which languages it carries. Facts, set in the label voice,
          closing the band with a rule. The ticking clock that stood here was
          removed 2026-09-11: a live readout under a hero is a HUD device. */}
      <div className="lg-hero-meta">
        <span className="lg-hero-meta__line" aria-hidden="true" />
        <p>{t.home.metaLine}</p>
        <p>{t.home.metaPlace}</p>
        <p>
          <span>EN</span>
          <Sep />
          <span>ES</span>
          <Sep />
          <span>FR</span>
        </p>
      </div>
    </Section>
  );
}

function Sep() {
  return <span aria-hidden="true" className="lg-hero-sep" />;
}

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

export default function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <Section id="top" tone="night">
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

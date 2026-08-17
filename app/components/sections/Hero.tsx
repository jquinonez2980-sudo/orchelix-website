/* Poster first viewport. The DOM register chart is gone — the Inscription
   occupies that column. The offer type stays. */

import { Stamp, QuietAction } from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import LiveClock from "./LiveClock";

export default function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <section id="top" className="lg-world lg-field lg-cloth-vivid lg-hero-scene relative">
      <div
        aria-hidden="true"
        className="lg-ticks pointer-events-none absolute inset-y-0 left-0 hidden w-[7px] lg:block"
        style={{ zIndex: 1 }}
      />

      <div className="lg-hero-inner relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10" style={{ zIndex: 1 }}>
        <div className="lg-hero-meta">
          <p>{t.home.metaLine}</p>
          <p>{t.home.metaPlace}</p>
          <p>
            <LiveClock />
          </p>
          <p>
            <span>EN</span>
            <Sep />
            <span>ES</span>
            <Sep />
            <span>FR+</span>
          </p>
          <span className="lg-hero-meta__line" aria-hidden="true" />
        </div>

        <div className="lg-hero-grid lg-hero-grid--inscription">
          <div className="lg-hero-offer">
            <PosterTitle lines={t.home.heroTitle} />

            <p className="lg-prose lg-hero-body">{t.home.heroBody}</p>

            <div className="lg-hero-actions">
              <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
              <QuietAction href="#hear-esmi">{t.common.hearRealCall}</QuietAction>
            </div>

            <a href="tel:+15615661066" className="lg-quiet lg-hero-phone">
              {t.common.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function splitPoster(line: string) {
  const clean = line.replace(/\.$/, "");
  const words = clean.split(" ");
  if (words.length <= 2) {
    return { lead: words.slice(0, -1).join(" "), last: `${words.at(-1) ?? ""}.` };
  }
  if (words.length === 3) {
    return { lead: words.slice(0, 2).join(" "), last: `${words[2]}.` };
  }
  return {
    lead: words.slice(0, -3).join(" "),
    last: `${words.slice(-3).join(" ")}.`,
  };
}

function PosterTitle({ lines }: { lines: string[] }) {
  return (
    <h1 className="lg-poster">
      {lines.map((line) => {
        const { lead, last } = splitPoster(line);
        return (
          <span className="lg-poster-block" key={line}>
            {lead ? <span className="lg-poster-lead">{lead}</span> : null}
            <span className="lg-poster-last">{last}</span>
          </span>
        );
      })}
    </h1>
  );
}

function Sep() {
  return <span aria-hidden="true" className="lg-hero-sep" />;
}

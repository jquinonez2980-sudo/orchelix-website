/* Poster first viewport: stacked condensed type, meta strip, plus marks.
   The register is the one hover-to-explore object, not a competing column
   of explanation. */

import { Stamp, QuietAction } from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import HeroExplore from "./HeroExplore";
import LiveClock from "./LiveClock";
import { PlusFrame } from "./PlusMark";

type Disposition = "BOOKED" | "ROUTED" | "ANSWERED" | "CLOSED";

type Entry = {
  time: string;
  lang: "EN" | "ES";
  reason: string;
  disposition: Disposition;
  detail: string;
};

const ENTRIES: Entry[] = [
  { time: "18:42", lang: "ES", reason: "Plantilla de encimera", disposition: "BOOKED", detail: "Jue 9:00" },
  { time: "19:07", lang: "EN", reason: "After-hours, no heat", disposition: "ROUTED", detail: "On-call tech" },
  { time: "19:51", lang: "ES", reason: "Seguimiento de cotización", disposition: "ANSWERED", detail: "Callback set" },
  { time: "20:26", lang: "EN", reason: "Reschedule — slab template", disposition: "BOOKED", detail: "Fri 11:15" },
  { time: "21:14", lang: "EN", reason: "New lead — kitchen remodel", disposition: "BOOKED", detail: "Tue 14:30" },
  { time: "21:58", lang: "ES", reason: "Horario y dirección", disposition: "ANSWERED", detail: "From knowledge base" },
  { time: "22:35", lang: "EN", reason: "Invoice question", disposition: "ROUTED", detail: "Accounts, 09:00" },
  { time: "23:36", lang: "ES", reason: "Estado del trabajo #4471", disposition: "ANSWERED", detail: "From knowledge base" },
  { time: "01:03", lang: "EN", reason: "Water leak — commercial", disposition: "ROUTED", detail: "On-call tech" },
  { time: "02:18", lang: "EN", reason: "Wrong number", disposition: "CLOSED", detail: "No action" },
];

const DISPOSITION_ORDER: Disposition[] = ["BOOKED", "ROUTED", "ANSWERED", "CLOSED"];

const DISPOSITION_COLOR: Record<Disposition, string> = {
  BOOKED: "var(--lg-foil)",
  ROUTED: "var(--lg-rule-text)",
  ANSWERED: "var(--lg-tick-text)",
  CLOSED: "var(--lg-ink-3)",
};

const TALLY = DISPOSITION_ORDER.map((d) => ({
  d,
  n: ENTRIES.filter((e) => e.disposition === d).length,
})).filter((x) => x.n > 0);

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

        <div className="lg-hero-grid">
          <div className="lg-hero-offer">
            <PlusFrame>
              <PosterTitle lines={t.home.heroTitle} />
            </PlusFrame>

            <p className="lg-prose lg-hero-body">{t.home.heroBody}</p>

            <div className="lg-hero-actions">
              <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
              <QuietAction href="#hear-esmi">{t.common.hearRealCall}</QuietAction>
            </div>

            <a href="tel:+15615661066" className="lg-quiet lg-hero-phone">
              {t.common.phone}
            </a>
          </div>

          <div className="lg-hero-register lg-inset lg-hero-register-solid lg-margin-rule">
            <HeroExplore
              hint={t.home.exploreHint}
              hintTouch={t.home.exploreHintTouch}
              esmiTitle={t.home.exploreEsmi}
              esmiBody={t.home.exploreEsmiBody}
              recordTitle={t.home.exploreRecord}
              recordBody={t.home.exploreRecordBody}
            >
              <Register t={t} />
            </HeroExplore>
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
  return (
    <span
      aria-hidden="true"
      className="lg-hero-sep"
    />
  );
}

function Register({ t }: { t: Messages }) {
  const c = t.home.columns;
  const d = t.home.dispositions;

  return (
    <figure className="m-0" style={{ minWidth: 0 }}>
      <figcaption
        className="lg-fig flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: "var(--lg-ink-2)",
          paddingBottom: "0.8rem",
          borderBottom: "2px solid var(--lg-rule)",
        }}
      >
        <span>{t.home.registerCaption}</span>
        <span style={{ color: "var(--lg-ink-3)" }}>{t.home.registerWindow}</span>
      </figcaption>

      <div
        className="lg-fig lg-row lg-reg-row"
        style={{
          fontSize: "0.625rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--lg-ink-3)",
          padding: "0.7rem 0",
          borderBottom: "1px solid var(--lg-hair)",
        }}
      >
        <span>{c.time}</span>
        <span>{c.lang}</span>
        <span>{c.reason}</span>
        <span className="lg-reg-head-outcome">{c.outcome}</span>
        <span className="lg-reg-head-disp">{c.disposition}</span>
      </div>

      <div className="lg-register">
        {ENTRIES.map((e, i) => {
          const mark = e.disposition === "BOOKED" || e.lang === "ES" ? "esmi" : undefined;
          return (
            <div
              key={e.time}
              className="lg-row lg-reg-row"
              data-mark={mark}
              data-disp={e.disposition}
              style={{ "--i": i, padding: "0.72rem 0" } as React.CSSProperties}
            >
              <span className="lg-fig" style={{ fontSize: "0.8125rem", color: "var(--lg-ink-2)" }}>
                {e.time}
              </span>

              <span
                className="lg-fig"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.08em",
                  color: e.lang === "ES" ? "var(--lg-foil)" : "var(--lg-ink-3)",
                }}
              >
                {e.lang}
              </span>

              <span
                className="lg-reg-reason"
                lang={e.lang.toLowerCase()}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--lg-ink)",
                }}
              >
                {e.reason}
              </span>

              <span
                className="lg-fig lg-reg-outcome"
                style={{ fontSize: "0.6875rem", color: "var(--lg-ink-3)", letterSpacing: "0.03em" }}
              >
                {e.detail}
              </span>

              <span
                className="lg-fig lg-tick lg-reg-disp"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.09em",
                  color: DISPOSITION_COLOR[e.disposition],
                }}
              >
                {d[e.disposition]}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="lg-fig flex flex-wrap items-center gap-x-5 gap-y-2"
        style={{
          fontSize: "0.625rem",
          letterSpacing: "0.11em",
          textTransform: "uppercase",
          color: "var(--lg-ink-2)",
          borderTop: "2px solid var(--lg-rule)",
          paddingTop: "0.85rem",
        }}
      >
        <span style={{ color: "var(--lg-ink-3)" }}>{t.home.tallyCalls.replace("{n}", String(ENTRIES.length))}</span>
        {TALLY.map((x) => (
          <span key={x.d} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" style={{ width: 9, height: 2, background: DISPOSITION_COLOR[x.d] }} />
            {x.n} {d[x.d].toLowerCase()}
          </span>
        ))}
      </div>

      <p
        className="lg-fig"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.03em",
          color: "var(--lg-ink-2)",
          marginTop: "0.8rem",
          marginBottom: 0,
        }}
      >
        {t.home.illustrative}
      </p>
    </figure>
  );
}

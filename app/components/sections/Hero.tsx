/* The register is the hero — the artifact at full scale with its own ruled
   grid and notation, the way the craft bar puts the map itself in the first
   viewport. On mobile the register leads and the offer copy follows it. */

import { Stamp, QuietAction } from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import HeroProof from "./HeroProof";

type Disposition = "BOOKED" | "ROUTED" | "ANSWERED" | "CLOSED";

type Entry = {
  time: string;
  lang: "EN" | "ES";
  reason: string;
  disposition: Disposition;
  detail: string;
};

/* Illustrative register. Shapes and dispositions mirror real Esmi call
   handling; the entries themselves are authored, and the page says so.

   The reasons are deliberately NOT translated between locales: they are what
   callers actually said, and a night on a bilingual line genuinely contains
   both languages. Translating them would misrepresent the product. Only the
   chrome — column heads, caption, dispositions — changes language. */
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

/* 2026-08-10 rebrand: the register used to code each disposition in its own
   hue (gold/red/green). The new brand has exactly one accent and reserves
   it for the outcome that should read as the "AI moment" — a booked
   appointment — everything else stays structural Graphite/ink, distinguished
   by the label itself rather than a colour per status. `--lg-rule-text` and
   `--lg-tick-text` both resolve to the same ink colour now; the separate
   names are kept only so this map doesn't need to change shape. */
const DISPOSITION_COLOR: Record<Disposition, string> = {
  BOOKED: "var(--lg-foil)",
  ROUTED: "var(--lg-rule-text)",
  ANSWERED: "var(--lg-tick-text)",
  CLOSED: "var(--lg-ink-3)",
};

/* Counts are derived, never typed — the foot rule can only ever describe the
   rows actually rendered above it. */
const TALLY = DISPOSITION_ORDER.map((d) => ({
  d,
  n: ENTRIES.filter((e) => e.disposition === d).length,
})).filter((x) => x.n > 0);

export default function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <section id="top" className="lg-world lg-field lg-cloth-vivid relative">
      {/* Measure ticks down the field edge — the ruled page's own scale. */}
      <div
        aria-hidden="true"
        className="lg-ticks pointer-events-none absolute inset-y-0 left-0 hidden w-[7px] lg:block"
        style={{ zIndex: 1 }}
      />

      <div
        className="lg-hero-grid relative mx-auto grid max-w-[1320px] gap-y-14 px-5 pt-16 pb-16 sm:px-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-x-14 lg:px-10 lg:pt-24 lg:pb-24"
        style={{ zIndex: 1 }}
      >
        {/* ── Offer column ── */}
        <div className="max-w-[34rem] self-center">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "82%",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.028em",
              textTransform: "uppercase",
              color: "var(--lg-ink)",
              textWrap: "balance",
              margin: 0,
            }}
          >
            {t.home.heroTitle[0]}
            <br />
            {t.home.heroTitle[1]}
          </h1>

          <p
            className="lg-prose"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              lineHeight: 1.62,
              color: "var(--lg-ink-2)",
              maxWidth: "40ch",
              marginTop: "1.7rem",
              marginBottom: 0,
            }}
          >
            {t.home.heroBody}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
            <QuietAction href="#hear-esmi">{t.common.hearRealCall}</QuietAction>
          </div>

          {/* Real production sample in the first viewport — illustrate
              the register above; prove the voice here. */}
          <HeroProof locale={locale} />

          {/* The number itself — a visible way to reach a person right now,
              not buried in the meta line it used to share with EN · ES and
              the countries served. Someone ready to call shouldn't have to
              find it in a caption. */}
          <a
            href="tel:+15615661066"
            className="lg-quiet"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 600,
              fontSize: "1.0625rem",
              letterSpacing: "0.01em",
              color: "var(--lg-ink)",
              textDecoration: "none",
              marginTop: "1.6rem",
            }}
          >
            {t.common.phone}
          </a>

          {/* Drawn rules, not glyphs. */}
          <div
            className="lg-fig mt-3 flex flex-wrap items-center gap-y-2"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--lg-ink-2)",
            }}
          >
            <span>EN · ES · FR+</span>
            <Sep />
            <span>{t.common.countries}</span>
          </div>
        </div>

        {/* ── The register ──
            Cut into the cloth rather than printed on it. `lg-inset` draws the
            recess; the red margin rule is its left wall, which is why the
            recess carries no left border of its own. The padding is the depth
            of the cut and only exists at lg, where the two-column grid does —
            below that the recess retires and the register runs to the gutters.
            The section's own `pt` already spaces this from the nav, so the cut
            only needs its inner margin. */}
        <div className="lg-hero-register lg-inset lg-hero-register-solid lg-margin-rule self-center lg:py-8 lg:pr-7 lg:pl-8">
          <Register t={t} />
        </div>
      </div>
    </section>
  );
}

function Sep() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 1,
        height: "0.85em",
        background: "var(--lg-rule)",
        opacity: 0.75,
        margin: "0 0.85em",
      }}
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

      {/* Column heads */}
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
        {ENTRIES.map((e, i) => (
          <div
            key={e.time}
            className="lg-row lg-reg-row"
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
        ))}
      </div>

      {/* Foot rule — the ledger's subtotal line, tallied from the rows above. */}
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

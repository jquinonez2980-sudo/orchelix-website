import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import FlowPulseOverlay from "@/app/components/sections/FlowPulseOverlay";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  Band,
  PageVisual,
} from "@/app/components/ledger";
import howItWorksDiagram from "@/public/how-it-works-diagram.png";

export function generateStaticParams() {
  return localesFor("/how-it-works").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.howItWorks.title,
    description: t.pages.howItWorks.description,
    alternates: {
      canonical: localizedHref("/how-it-works", locale),
      languages: { en: "/how-it-works", es: "/es/how-it-works" },
    },
  };
}

export default async function HowItWorksPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.howItWorks;

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-start">
            <div>
              <PageTitle max="15ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>
            <div className="flex flex-col items-end gap-8">
              {/* Input → AI → structured output, the page's whole argument in
                  one diagram before the schedule spells it out step by step.
                  The artwork itself is the original PNG; FlowPulseOverlay is
                  an absolutely-positioned SVG on top of it, so the picture
                  stays exactly as designed and only the two pulses + the AI
                  node's glow are live. `lineHeight: 0` clears the few
                  pixels of inline-image whitespace that would otherwise
                  throw the overlay's alignment off by that amount. */}
              <div style={{ position: "relative", width: "100%", maxWidth: 340, lineHeight: 0 }}>
                <PageVisual src={howItWorksDiagram} max={340} />
                <FlowPulseOverlay />
              </div>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href={localizedHref("/pricing", locale)}>{t.common.seePricing}</QuietAction>
              </div>
            </div>
          </div>
        </Section>

        {/* ── The schedule ── */}
        <Section tone="stock">
          <SectionTitle tone="stock" max="18ch">
            {p.scheduleHeading}
          </SectionTitle>
          <Prose tone="stock" size="1.0625rem" max="58ch" style={{ marginTop: "1.3rem", marginBottom: "3.5rem" }}>
            {p.scheduleLede}
          </Prose>

          <ol className="m-0 list-none p-0" style={{ borderTop: "2px solid var(--lg-rule)" }}>
            {p.schedule.map((s) => (
              <li
                key={s.when}
                className="grid gap-x-10 gap-y-3 lg:grid-cols-[8rem_minmax(0,1.15fr)_minmax(0,0.85fr)]"
                style={{ padding: "1.8rem 0", borderBottom: "1px solid var(--lg-hair)" }}
              >
                <span
                  className="lg-fig"
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "var(--lg-rule)",
                  }}
                >
                  {s.when}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStretch: "86%",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      letterSpacing: "-0.01em",
                      textTransform: "uppercase",
                      color: "var(--lg-ink-on-stock)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {s.title}
                  </h3>
                  <Prose tone="stock" size="0.9375rem" max="52ch">
                    {s.desc}
                  </Prose>
                </div>

                <p
                  className="lg-fig"
                  style={{
                    fontSize: "0.6875rem",
                    lineHeight: 1.7,
                    letterSpacing: "0.02em",
                    color: "var(--lg-ink-on-stock-2)",
                    margin: 0,
                    borderLeft: "1px solid var(--lg-rule-quiet)",
                    paddingLeft: "1.1rem",
                  }}
                >
                  {s.output}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── The rules you set ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="16ch">{p.rulesHeading}</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {p.rulesLede}
              </Prose>
            </div>
            <RuledList items={p.rules} labelWidth="8.5rem" />
          </div>
        </Section>

        {/* ── The Monday scorecard ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="16ch">{p.mondayHeading}</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {p.mondayLede}
              </Prose>
            </div>
            <RuledList items={p.monday} labelWidth="9rem" />
          </div>
        </Section>

        {/* ── Who runs it ── */}
        <Section tone="stock-2" tight>
          <SectionTitle tone="stock-2" max="20ch">
            {p.consultantHeading}
          </SectionTitle>
          <Prose tone="stock-2" size="1.0625rem" max="62ch" style={{ marginTop: "1.3rem", marginBottom: "2.5rem" }}>
            {p.consultantLede}
          </Prose>
          <Band tone="stock-2" cols={4} items={p.consultantBand} />
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href={localizedHref("/book", locale)} size="1rem">
                {t.common.bookPilot}
              </Stamp>
              <QuietAction href={localizedHref("/solutions", locale)}>{p.seeTheAgents}</QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

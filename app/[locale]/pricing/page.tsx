import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/app/components/JsonLd";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import PricingGrowthChart from "@/app/components/sections/PricingGrowthChart";
import { ESMI_PILOT_PAYMENT_LINK } from "@/app/lib/pilotPayment";
import { isLocale, localesFor, localizedHref, type Locale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import type { Messages } from "@/app/i18n/messages/en";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  Band,
  Disclosure,
} from "@/app/components/ledger";
import pricingVisual from "@/public/pricing-visual.png";

const SITE_URL = "https://www.orchelix.com";

/* "Start a pilot" is the real $149 one-time payment — the live Stripe Payment
   Link, which redirects to /book?pilot=success on completion. The others are
   conversations, so they go to the Cal.com booking page. */
const PILOT_HREF = ESMI_PILOT_PAYMENT_LINK;
const SCALE_HREF = "/book?intent=scale";

export function generateStaticParams() {
  return localesFor("/pricing").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.pricing.title,
    description: t.pages.pricing.description,
    alternates: {
      canonical: localizedHref("/pricing", locale),
      languages: { en: "/pricing", es: "/es/pricing" },
    },
  };
}

export default async function PricingPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.pricing;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: p.title,
            item: `${SITE_URL}${localizedHref("/pricing", locale)}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: p.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
            <div>
              <PageTitle max="16ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>

            <div className="flex flex-col items-end gap-8">
              <PricingGrowthChart src={pricingVisual} max={300} />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
                <Stamp href={PILOT_HREF}>{p.startPilot}</Stamp>
                <QuietAction href={`${localizedHref("/book", locale)}?intent=demo`}>
                  {p.bookWalkthrough}
                </QuietAction>
              </div>
            </div>
          </div>
        </Section>

        {/* ── The rate schedule ── */}
        <Section tone="field-2" id="plans">
          <SectionTitle max="18ch">{p.scheduleHeading}</SectionTitle>
          <Prose size="1.0625rem" max="52ch" style={{ marginTop: "1.3rem", marginBottom: "3.5rem" }}>
            {p.scheduleLede}
          </Prose>

          <RateSchedule t={t} locale={locale} />

          <p
            className="lg-fig"
            style={{
              fontSize: "0.6875rem",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
              color: "var(--lg-ink-2)",
              maxWidth: "78ch",
              marginTop: "2rem",
              marginBottom: 0,
            }}
          >
            {p.finePrint}
          </p>
        </Section>

        {/* ── The pilot ── */}
        <Section tone="stock" tight>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <SectionTitle tone="stock" max="20ch">
                {p.pilotHeading}
              </SectionTitle>
              <Prose tone="stock" size="1.0625rem" max="56ch" style={{ marginTop: "1.3rem" }}>
                {p.pilotBody}
              </Prose>
            </div>
            <Stamp href={PILOT_HREF}>{p.startThePilot}</Stamp>
          </div>
        </Section>

        {/* ── Included + add-ons ── */}
        <Section tone="field">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <div>
              <SectionTitle max="16ch">{p.includedHeading}</SectionTitle>
              <ul className="m-0 mt-8 list-none p-0" style={{ borderTop: "2px solid var(--lg-rule)" }}>
                {p.included.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      color: "var(--lg-ink)",
                      padding: "0.85rem 0",
                      borderBottom: "1px solid var(--lg-hair-2)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionTitle max="16ch">{p.addOnsHeading}</SectionTitle>
              <dl className="lg-fig m-0 mt-8" style={{ borderTop: "2px solid var(--lg-rule)" }}>
                {p.addOns.map(([label, price]) => (
                  <div
                    key={label}
                    className="lg-row"
                    style={{ gridTemplateColumns: "minmax(0,1fr) auto", padding: "0.85rem 0" }}
                  >
                    <dt
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        color: "var(--lg-ink)",
                      }}
                    >
                      {label}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: "0.8125rem",
                        letterSpacing: "0.04em",
                        color: "var(--lg-foil)",
                        textAlign: "right",
                      }}
                    >
                      {price}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* ── How setup runs ── */}
        <Section tone="stock-2" tight>
          <SectionTitle tone="stock-2" max="22ch">
            {p.afterStartHeading}
          </SectionTitle>
          <div className="mt-10">
            <Band tone="stock-2" cols={3} items={p.afterStart} />
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field">
          <SectionTitle max="14ch">{p.questionsHeading}</SectionTitle>
          <div className="mt-10">
            <Disclosure items={p.faq} />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {t.common.startWithOneWorkflow}
              </SectionTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                {t.common.startWithOneWorkflowBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href={PILOT_HREF} size="1rem">
                {p.startThePilot}
              </Stamp>
              <QuietAction href={SCALE_HREF}>{t.common.talkToConsultant}</QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

function RateSchedule({ t, locale }: { t: Messages; locale: Locale }) {
  const p = t.pages.pricing;
  const v = p.values;

  /* Plan names and prices are the same commercial facts in both languages and
     are not translated. Only the row labels and the descriptive cells are. */
  const rows: { term: string; cells: [string, string, string]; strong?: boolean }[] = [
    { term: p.terms.monthly, cells: ["$299", "$599", "$999"], strong: true },
    { term: p.terms.setup, cells: ["$499", "$799", v.custom] },
    { term: p.terms.minutes, cells: ["300", "800", "1,500"] },
    { term: p.terms.overage, cells: ["$0.25", "$0.20", "$0.15"] },
    { term: p.terms.numbers, cells: [v.starterNumbers, v.growthNumbers, v.scaleNumbers] },
    { term: p.terms.channels, cells: [v.starterChannels, v.growthChannels, v.scaleChannels] },
    { term: p.terms.booking, cells: [v.starterBooking, v.growthBooking, v.scaleBooking] },
    { term: p.terms.knowledge, cells: [v.starterKnowledge, v.growthKnowledge, v.scaleKnowledge] },
    { term: p.terms.support, cells: [v.starterSupport, v.growthSupport, v.scaleSupport] },
  ];

  const head = ["", "Starter", "Growth", "Scale"];
  const actions = [
    { href: PILOT_HREF, label: p.startPilotShort },
    { href: PILOT_HREF, label: p.startPilotShort },
    { href: SCALE_HREF, label: p.talkToUs },
  ];

  return (
    <div>
      <p
        className="lg-fig lg:hidden"
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--lg-ink-3)",
          margin: "0 0 0.75rem",
        }}
      >
        {locale === "es" ? "Desliza para ver los tres planes →" : "Swipe to see all three plans →"}
      </p>
      <div className="overflow-x-auto">
        <table className="lg-fig w-full" style={{ borderCollapse: "collapse", minWidth: 720 }}>
        <caption className="sr-only">{p.scheduleCaption}</caption>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h || "term"}
                scope="col"
                style={{
                  textAlign: i === 0 ? "left" : "right",
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: i === 0 ? "var(--lg-ink-3)" : "var(--lg-ink)",
                  padding: i === 0 ? "0 0.9rem 0.8rem 0" : "0 0.9rem 0.8rem",
                  borderBottom: "2px solid var(--lg-rule)",
                  borderLeft: i === 0 ? undefined : "1px solid var(--lg-rule-quiet)",
                  width: i === 0 ? "22%" : "26%",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.term}>
              <th
                scope="row"
                style={{
                  textAlign: "left",
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink-3)",
                  padding: "0.85rem 0.9rem 0.85rem 0",
                  borderBottom: "1px solid var(--lg-hair-2)",
                  verticalAlign: "top",
                }}
              >
                {row.term}
              </th>
              {row.cells.map((c, i) => (
                <td
                  key={i}
                  style={{
                    textAlign: "right",
                    fontFamily: row.strong ? "var(--font-display)" : undefined,
                    fontStretch: row.strong ? "86%" : undefined,
                    fontSize: row.strong ? "1.5rem" : "0.8125rem",
                    fontWeight: row.strong ? 700 : 400,
                    letterSpacing: row.strong ? "-0.01em" : "0.02em",
                    color: row.strong ? "var(--lg-foil)" : "var(--lg-ink)",
                    padding: "0.85rem 0.9rem",
                    borderBottom: "1px solid var(--lg-hair-2)",
                    borderLeft: "1px solid var(--lg-rule-quiet)",
                    verticalAlign: "top",
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: "1.4rem 0 0" }} />
            {actions.map((c, i) => (
              <td
                key={i}
                style={{
                  padding: "1.4rem 0.9rem 0",
                  textAlign: "right",
                  borderLeft: "1px solid var(--lg-rule-quiet)",
                }}
              >
                <a
                  href={c.href === SCALE_HREF ? localizedHref("/book", locale) + "?intent=scale" : c.href}
                  className="lg-quiet"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStretch: "88%",
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--lg-ink)",
                    textDecoration: "none",
                  }}
                >
                  {c.label}
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

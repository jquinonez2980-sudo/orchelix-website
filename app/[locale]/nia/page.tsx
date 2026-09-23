import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  StatusKey,
  RuledList,
  Band,
} from "@/app/components/ledger";

const SITE_URL = "https://www.orchelix.com";

/* Nia — Orchelix's outbound follow-up caller, sold as an Esmi add-on.

   Honesty rules for this page (PRODUCT.md): Nia is live — Orchelix uses her on
   its own leads — and client onboarding runs as a pilot. The page says both.
   Never describe the dial gate as making anyone "TCPA/CRTC compliant"; the
   rules section describes checks, and the note says they are not legal advice.
   The price is the same commercial fact in both languages and must match the
   add-on row on /pricing. */

export function generateStaticParams() {
  return localesFor("/nia").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.nia.title,
    description: t.pages.nia.description,
    alternates: {
      canonical: localizedHref("/nia", locale),
      languages: { en: "/nia", es: "/es/nia" },
    },
  };
}

export default async function NiaPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.nia;
  const book = localizedHref("/book", locale);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nia — AI follow-up caller",
    serviceType: "AI outbound lead follow-up",
    description:
      "Calls inbound leads back within minutes in English or Spanish and books appointments on the business's calendar. Calls only leads with a recorded consent. Add-on to Esmi.",
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: ["Ontario, Canada", "South Florida, United States"],
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "299",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="night" scene>
          <div className="mb-6">
            <StatusKey>{p.status}</StatusKey>
          </div>
          <PageTitle max="18ch">{p.heading}</PageTitle>
          <Prose size="1.0625rem" max="54ch" style={{ marginTop: "1.7rem" }}>
            {p.lede}
          </Prose>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Stamp href={book}>{t.common.bookPilot}</Stamp>
            <QuietAction href={book}>{p.hearNia}</QuietAction>
          </div>
          <div className="mt-16">
            <Band cols={4} items={p.flow} />
          </div>
        </Section>

        {/* ── Capabilities ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <SectionTitle max="12ch">{p.capabilitiesHeading}</SectionTitle>
            <RuledList items={p.capabilities} labelWidth="8.5rem" />
          </div>
        </Section>

        {/* ── The dial gate, in plain words ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
            <div>
              <SectionTitle max="12ch">{p.rulesHeading}</SectionTitle>
              <Prose size="0.9375rem" max="40ch" style={{ marginTop: "1.2rem" }}>
                {p.rulesLede}
              </Prose>
            </div>
            <RuledList items={p.rules} labelWidth="8.5rem" />
          </div>
          <p
            className="lg-fig"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.02em",
              color: "var(--lg-ink-2)",
              maxWidth: "76ch",
              marginTop: "3rem",
              marginBottom: 0,
              lineHeight: 1.8,
            }}
          >
            {p.rulesNote}
          </p>
        </Section>

        {/* ── Proof + price ── */}
        <Section tone="stock" tight>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <SectionTitle tone="stock" max="14ch">
                {p.proofHeading}
              </SectionTitle>
              <Prose tone="stock" size="1.0625rem" max="46ch" style={{ marginTop: "1.2rem" }}>
                {p.proofBody}
              </Prose>
            </div>
            <div>
              <SectionTitle tone="stock" max="14ch">
                {p.priceHeading}
              </SectionTitle>
              <div className="mt-6">
                <RuledList tone="stock" items={p.price} labelWidth="7.5rem" />
              </div>
              <Prose tone="stock" size="0.9375rem" max="52ch" style={{ marginTop: "1.4rem" }}>
                {p.priceNote}
              </Prose>
            </div>
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="night" style={{ borderTop: "2px solid var(--lg-foil)" }}>
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
              <Stamp href={book} size="1rem">
                {t.common.bookPilot}
              </Stamp>
              <QuietAction href={localizedHref("/pricing", locale)}>{t.common.seePricing}</QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

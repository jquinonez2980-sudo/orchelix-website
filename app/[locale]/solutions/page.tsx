import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ConstellationCanvas from "@/app/components/sections/ConstellationCanvas";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import {
  Section,
  PageTitle,
  SectionTitle,
  EntryTitle,
  Prose,
  Stamp,
  QuietAction,
  StatusKey,
  RuledList,
  Band,
  Plate,
} from "@/app/components/ledger";
import bilingualOperations from "@/public/bilingual-operations.jpg";

const SITE_URL = "https://www.orchelix.com";

export function generateStaticParams() {
  return localesFor("/solutions").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.solutions.title,
    description: t.pages.solutions.description,
    alternates: {
      canonical: localizedHref("/solutions", locale),
      languages: { en: "/solutions", es: "/es/solutions" },
    },
  };
}

export default async function SolutionsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.solutions;

  /* Service names and descriptions stay English in the structured data: it is
     read by crawlers against the canonical English entity, and the product
     names are not translated in either language. */
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        name: "Esmi — AI Virtual Receptionist",
        description:
          "24/7 bilingual (EN/ES) AI receptionist that answers calls, qualifies callers, and books appointments via voice, SMS, and email.",
        serviceType: "AI Virtual Receptionist",
      },
      {
        name: "Revenue-Ops Agents",
        description:
          "AI agents that qualify pipeline, follow up across HubSpot, Salesforce, Pipedrive, and Zoho, and close the loop on every lead.",
        serviceType: "AI Sales Automation",
      },
      {
        name: "AcumenAI — Accounting & Finance",
        description:
          "Multi-agent operations with financial automation built in — bookkeeping, financial close, and reporting with human oversight.",
        serviceType: "AI Financial Operations",
      },
    ].map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", ...s, provider: { "@id": `${SITE_URL}/#org` } },
    })),
  };

  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field" scene>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-start">
            <div>
              <PageTitle max="17ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>
            <div className="flex flex-col items-end gap-8">
              <ConstellationCanvas max={320} />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Band items={t.home.shared} />
          </div>
        </Section>

        {/* ── Esmi — shipped ── */}
        <Section tone="field-2" id="agent-esmi">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <div className="mb-5">
                <StatusKey>{t.common.inProduction}</StatusKey>
              </div>
              <SectionTitle max="14ch">{t.home.esmiName}</SectionTitle>
              <Prose size="1rem" max="44ch" style={{ marginTop: "1.4rem" }}>
                {t.home.esmiBody}
              </Prose>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Stamp href={localizedHref("/book", locale)} size="0.875rem">
                  {t.common.bookPilot}
                </Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
            <Plate src={bilingualOperations} alt={t.visuals.bilingualOperations} max={720} />
          </div>
          <div className="mt-16">
            <RuledList items={p.esmiCapabilities} labelWidth="8.5rem" />
          </div>
        </Section>

        {/* ── In development ── */}
        <Section tone="field">
          <p
            className="lg-fig"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--lg-ink-3)",
              paddingBottom: "0.85rem",
              borderBottom: "1px solid var(--lg-rule)",
              margin: "0 0 3.5rem",
            }}
          >
            {t.common.inDevelopment}
          </p>

          <div className="grid gap-x-14 gap-y-16 lg:grid-cols-2">
            <div id="agent-revops">
              <EntryTitle size="1.25rem">{t.home.inDev[0].title}</EntryTitle>
              <Prose size="0.9375rem" max="46ch" style={{ marginTop: "1rem", marginBottom: "1.8rem" }}>
                {t.home.inDev[0].desc}
              </Prose>
              <RuledList items={p.revopsCapabilities} labelWidth="7.5rem" topRule="var(--lg-hair)" />
            </div>

            <div id="agent-finance">
              <EntryTitle size="1.25rem">{t.home.inDev[1].title}</EntryTitle>
              <Prose size="0.9375rem" max="46ch" style={{ marginTop: "1rem", marginBottom: "1.8rem" }}>
                {t.home.inDev[1].desc}
              </Prose>
              <RuledList items={p.acumenCapabilities} labelWidth="7.5rem" topRule="var(--lg-hair)" />
            </div>
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
            {p.inDevNote}
          </p>
        </Section>

        {/* ── How a deployment runs ── */}
        <Section tone="stock" tight>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle tone="stock" max="14ch">
              {p.deploymentHeading}
            </SectionTitle>
            <div>
              <Prose tone="stock" size="1.0625rem" max="56ch" style={{ marginBottom: "2.5rem" }}>
                {p.deploymentLede}
              </Prose>
              <Band tone="stock" cols={4} items={p.deploymentBand} />
            </div>
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
              <Stamp href={localizedHref("/book", locale)} size="1rem">
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

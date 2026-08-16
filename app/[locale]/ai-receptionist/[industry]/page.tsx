import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getIndustry, INDUSTRY_SLUGS } from "@/app/i18n/industries";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  Band,
  Disclosure,
  EntryList,
} from "@/app/components/ledger";

/* Sector pages. Converted from the light world 2026-08-08 — see the copy
   modules in app/i18n/industries/ for the claims corrected in that pass. */

export function generateStaticParams() {
  /* Both axes are static, so every locale-and-sector pair is prerendered
     rather than rendered on demand. Slugs are locale-independent. */
  return localesFor("/ai-receptionist").flatMap((locale) =>
    INDUSTRY_SLUGS.map((industry) => ({ locale, industry }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/ai-receptionist/[industry]">): Promise<Metadata> {
  const { locale, industry } = await params;
  if (!isLocale(locale)) return {};
  const s = getIndustry(locale, industry);
  if (!s) return {};
  const path = `/ai-receptionist/${industry}`;
  return {
    title: s.title,
    description: s.description,
    alternates: {
      canonical: localizedHref(path, locale),
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localizedHref(path, l)])
      ),
    },
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/[locale]/ai-receptionist/[industry]">) {
  const { locale, industry } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const s = getIndustry(locale, industry);
  if (!s) notFound();

  const p = t.pages.aiReceptionist;
  const path = `/ai-receptionist/${industry}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.schema.serviceType,
    description: s.schema.serviceDescription,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: p.title,
        item: `${SITE_URL}${localizedHref("/ai-receptionist", locale)}`,
      },
      { "@type": "ListItem", position: 3, name: s.name, item: `${SITE_URL}${localizedHref(path, locale)}` },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field" scene>
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <PageTitle max="17ch">{s.hero.headline}</PageTitle>
              <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
                {s.hero.sub}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
            {/* The sector replaces the first fact, so the band says what this
                page is about before the reader scrolls. */}
            <Band items={[["Sector", s.name], ...p.facts.slice(1)]} cols={2} />
          </div>
        </Section>

        {/* ── What the phone costs ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle tone="stock" max="14ch">
              {t.pages.verticals.homeServices.slipsHeading}
            </SectionTitle>
            <EntryList
              tone="stock"
              entries={s.problems.map((x) => ({ title: x.title, desc: x.body }))}
            />
          </div>
        </Section>

        {/* ── What Esmi does here ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle max="12ch">{p.doesHeading}</SectionTitle>
            <RuledList
              items={s.benefits.map((b) => [b.title, b.body] as [string, string])}
              labelWidth="11rem"
            />
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">{p.faqHeading}</SectionTitle>
            <Disclosure items={s.faqs} />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/try-esmi" size="1rem">
                {t.common.hearRealCall}
              </Stamp>
              <QuietAction href={localizedHref("/ai-receptionist", locale)}>
                {p.title}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

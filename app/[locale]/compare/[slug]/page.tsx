import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import {
  getComparison,
  getComparisons,
  getCompareChrome,
  COMPARE_SLUGS,
} from "@/app/i18n/compare";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  Disclosure,
  CompareRows,
} from "@/app/components/ledger";

/* One comparison.

   The section order is deliberate and is the opposite of the usual: the
   honest "when the other option wins" block sits ABOVE the questions and
   below the cost, where it cannot be missed, rather than buried at the foot
   as a disclaimer. A reader who finds the concession before they finish the
   page reads the rest of it differently. */

export function generateStaticParams() {
  return localesFor("/compare").flatMap((locale) =>
    COMPARE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/compare/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getComparison(locale, slug);
  if (!p) return {};
  const path = `/compare/${slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: localizedHref(path, locale),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localizedHref(path, l)])),
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${localizedHref(path, locale)}`,
      title: p.hero.headline,
      description: p.description,
      siteName: "Orchelix",
    },
  };
}

export default async function ComparePage({ params }: PageProps<"/[locale]/compare/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = getComparison(locale, slug);
  if (!p) notFound();

  const c = getCompareChrome(locale);
  const path = `/compare/${slug}`;
  const others = getComparisons(locale).filter((x) => x.slug !== slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
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
        name: c.hubTitle,
        item: `${SITE_URL}${localizedHref("/compare", locale)}`,
      },
      { "@type": "ListItem", position: 3, name: p.other, item: `${SITE_URL}${localizedHref(path, locale)}` },
    ],
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field" scene>
          <PageTitle max="18ch">{p.hero.headline}</PageTitle>
          <Prose size="1.0625rem" max="54ch" style={{ marginTop: "1.7rem" }}>
            {p.hero.sub}
          </Prose>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Stamp href="/try-esmi">{t.common.hearRealCall}</Stamp>
            <QuietAction href={localizedHref("/missed-call-calculator", locale)}>
              {locale === "es" ? "Calcular mis llamadas perdidas" : "Calculate my missed calls"}
            </QuietAction>
          </div>
        </Section>

        {/* ── Side by side ── */}
        <Section tone="stock">
          <SectionTitle tone="stock" max="16ch" >
            {p.rowsHeading}
          </SectionTitle>
          <div style={{ marginTop: "2.2rem" }}>
            <CompareRows
              tone="stock"
              rows={p.rows}
              leftLabel={c.esmiLabel}
              rightLabel={p.other}
            />
          </div>
        </Section>

        {/* ── Cost ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <SectionTitle max="12ch">{p.costHeading}</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.3rem" }}>
                {p.costLede}
              </Prose>
            </div>
            <RuledList
              labelWidth="16rem"
              items={p.costs.map((x): [string, ReactNode] => [
                x.label,
                <span key={x.label}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStretch: "86%",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      letterSpacing: "-0.01em",
                      color: "var(--lg-ink)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {x.value}
                  </span>
                  {x.note ? (
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        lineHeight: 1.55,
                        color: "var(--lg-ink-3)",
                        marginTop: "0.45rem",
                        maxWidth: "58ch",
                      }}
                    >
                      {x.note}
                    </span>
                  ) : null}
                </span>,
              ])}
            />
          </div>
        </Section>

        {/* ── The concession ──
            Foil rule on the left, same device the calculator uses for its
            verdict. It is the most important block on the page. */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle max="15ch">{p.honestHeading}</SectionTitle>
            <div>
              <Prose size="1.0625rem" max="54ch" style={{ marginBottom: "1.8rem" }}>
                {p.honestBody}
              </Prose>
              <div style={{ borderLeft: "2px solid var(--lg-foil)", paddingLeft: "1.4rem" }}>
                <RuledList
                  items={p.honestCases.map(
                    (x, i) => [String(i + 1).padStart(2, "0"), x] as [string, string]
                  )}
                  labelWidth="4rem"
                  topRule="transparent"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">
              {locale === "es" ? "Preguntas que hacen primero" : "Questions people ask first"}
            </SectionTitle>
            <Disclosure items={p.faqs} />
          </div>
        </Section>

        {/* ── Siblings ── */}
        <Section tone="field" tight>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle as="h3" max="12ch">
              {c.otherComparisons}
            </SectionTitle>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {others.map((o) => (
                <QuietAction key={o.slug} href={localizedHref(`/compare/${o.slug}`, locale)}>
                  {o.other}
                </QuietAction>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {c.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
                {c.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/try-esmi" size="1rem">
                {t.common.hearRealCall}
              </Stamp>
              <QuietAction href={localizedHref("/pricing", locale)}>
                {t.common.seePricing}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

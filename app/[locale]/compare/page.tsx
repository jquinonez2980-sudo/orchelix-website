import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getComparisons, getCompareChrome } from "@/app/i18n/compare";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  EntryList,
} from "@/app/components/ledger";

export function generateStaticParams() {
  return localesFor("/compare").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCompareChrome(locale);
  return {
    title: c.hubTitle,
    description: c.hubDescription,
    alternates: {
      canonical: localizedHref("/compare", locale),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localizedHref("/compare", l)])),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedHref("/compare", locale)}`,
      title: c.hubHeading,
      description: c.hubDescription,
      siteName: "Orchelix",
    },
  };
}

export default async function CompareHubPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const c = getCompareChrome(locale);
  const all = getComparisons(locale);

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
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.hubTitle,
    itemListElement: all.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.other,
      url: `${SITE_URL}${localizedHref(`/compare/${p.slug}`, locale)}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd, itemListJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        <Section tone="field" scene>
          <PageTitle max="16ch">{c.hubHeading}</PageTitle>
          <Prose size="1.0625rem" max="56ch" style={{ marginTop: "1.7rem" }}>
            {c.hubLede}
          </Prose>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Stamp href="/try-esmi">{t.common.hearRealCall}</Stamp>
            <QuietAction href={localizedHref("/missed-call-calculator", locale)}>
              {locale === "es" ? "Calcular mis llamadas perdidas" : "Calculate my missed calls"}
            </QuietAction>
          </div>
        </Section>

        <Section tone="stock">
          <EntryList
            tone="stock"
            entries={all.map((p) => ({
              title: p.hero.headline,
              desc: p.hero.sub,
              meta: p.other,
            }))}
          />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {all.map((p) => (
              <QuietAction
                key={p.slug}
                tone="stock"
                href={localizedHref(`/compare/${p.slug}`, locale)}
              >
                {p.other}
              </QuietAction>
            ))}
          </div>
        </Section>

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

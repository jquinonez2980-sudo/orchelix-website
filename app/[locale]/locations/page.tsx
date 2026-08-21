import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getLocations, getLocationChrome } from "@/app/i18n/locations";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  Band,
  EntryList,
} from "@/app/components/ledger";

/* The metro index.

   This exists to be a hub, not a doorway: it links the eight written pages and
   says plainly why there are eight rather than eighty. The `notListed` block at
   the foot is the honest version of the sentence most local-SEO hubs imply and
   never write down — that the service is not geographically bounded, and the
   page list is an editorial choice. */

export function generateStaticParams() {
  return localesFor("/locations").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getLocationChrome(locale);
  return {
    title: c.hubTitle,
    description: c.hubDescription,
    alternates: {
      canonical: localizedHref("/locations", locale),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localizedHref("/locations", l)])),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedHref("/locations", locale)}`,
      title: c.hubHeading,
      description: c.hubDescription,
      siteName: "Orchelix",
    },
  };
}

export default async function LocationsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const c = getLocationChrome(locale);
  const all = getLocations(locale);

  const us = all.filter((l) => l.country === "US");
  const ca = all.filter((l) => l.country === "CA");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: c.hubTitle,
        item: `${SITE_URL}${localizedHref("/locations", locale)}`,
      },
    ],
  };

  /* An ItemList rather than eight loose links: it tells a crawler these are
     siblings in one set, which is what stops a hub reading as a link farm. */
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.hubTitle,
    itemListElement: all.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.name,
      url: `${SITE_URL}${localizedHref(`/locations/${l.slug}`, locale)}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd, itemListJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field" scene>
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <PageTitle max="16ch">{c.hubHeading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {c.hubLede}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
            <Band
              items={
                [
                  [c.regionLabel, `${us.length + ca.length} ${locale === "es" ? "ciudades" : "metros"}`],
                  [c.languagesLabel, c.languagesValue],
                  [c.hoursLabel, c.hoursValue],
                  [
                    locale === "es" ? "Mercados" : "Markets",
                    `${us.length} ${locale === "es" ? "EE. UU." : "US"} · ${ca.length} ${locale === "es" ? "Canadá" : "CA"}`,
                  ],
                ] as [string, string][]
              }
              cols={2}
            />
          </div>
        </Section>

        {/* ── South Florida ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle tone="stock" max="12ch">
              {c.usHeading}
            </SectionTitle>
            <EntryList
              tone="stock"
              columns={2}
              entries={us.map((l) => ({
                title: l.name,
                desc: l.hero.sub,
                meta: l.areaCodes.join(" · "),
              }))}
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {us.map((l) => (
              <QuietAction
                key={l.slug}
                tone="stock"
                href={localizedHref(`/locations/${l.slug}`, locale)}
              >
                {l.name}
              </QuietAction>
            ))}
          </div>
        </Section>

        {/* ── Southern Ontario ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="12ch">{c.caHeading}</SectionTitle>
            <EntryList
              columns={2}
              entries={ca.map((l) => ({
                title: l.name,
                desc: l.hero.sub,
                meta: l.areaCodes.join(" · "),
              }))}
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {ca.map((l) => (
              <QuietAction key={l.slug} href={localizedHref(`/locations/${l.slug}`, locale)}>
                {l.name}
              </QuietAction>
            ))}
          </div>
        </Section>

        {/* ── The honest footnote ── */}
        <Section tone="field" tight>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">{c.notListedHeading}</SectionTitle>
            <Prose size="1.0625rem" max="56ch">
              {c.notListedBody}
            </Prose>
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

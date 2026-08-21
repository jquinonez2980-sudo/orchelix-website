import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getLocation, getLocations, getLocationChrome, LOCATION_SLUGS } from "@/app/i18n/locations";
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

/* A metro page.

   Schema note, because it is the thing local pages most often get wrong: this
   emits `Service` with an `areaServed` City, NOT `LocalBusiness`. Orchelix has
   one address, in West Palm Beach. Publishing a LocalBusiness node for Toronto
   or Miami would assert a physical premises that does not exist — which is
   both a lie and, since the 2024 site-reputation work, the specific pattern
   Google penalises hardest in local results. The company node lives once, in
   app/shell.tsx, and every page here references it by @id rather than
   redeclaring it with a borrowed address. */

export function generateStaticParams() {
  return localesFor("/locations").flatMap((locale) =>
    LOCATION_SLUGS.map((city) => ({ locale, city }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/locations/[city]">): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale)) return {};
  const l = getLocation(locale, city);
  if (!l) return {};
  const path = `/locations/${city}`;
  return {
    title: l.title,
    description: l.description,
    alternates: {
      canonical: localizedHref(path, locale),
      languages: Object.fromEntries(LOCALES.map((x) => [x, localizedHref(path, x)])),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedHref(path, locale)}`,
      title: l.hero.headline,
      description: l.description,
      siteName: "Orchelix",
    },
  };
}

export default async function LocationPage({
  params,
}: PageProps<"/[locale]/locations/[city]">) {
  const { locale, city } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const l = getLocation(locale, city);
  if (!l) notFound();

  const c = getLocationChrome(locale);
  const path = `/locations/${city}`;
  const others = getLocations(locale).filter((x) => x.slug !== city);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: l.title.split("|")[0].trim(),
    description: l.schema.serviceDescription,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: {
      "@type": "City",
      name: l.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: l.region,
        address: {
          "@type": "PostalAddress",
          addressRegion: l.regionCode,
          addressCountry: l.country,
        },
      },
    },
    availableLanguage: ["en", "es"],
    url: `${SITE_URL}${localizedHref(path, locale)}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({
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
        item: `${SITE_URL}${localizedHref("/locations", locale)}`,
      },
      { "@type": "ListItem", position: 3, name: l.name, item: `${SITE_URL}${localizedHref(path, locale)}` },
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
              <PageTitle max="17ch">{l.hero.headline}</PageTitle>
              <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
                {l.hero.sub}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
            <Band
              items={
                [
                  [c.regionLabel, `${l.name}, ${l.regionCode}`],
                  [c.areaCodesLabel, l.areaCodes.join(" · ")],
                  [c.languagesLabel, c.languagesValue],
                  [c.hoursLabel, c.hoursValue],
                ] as [string, string][]
              }
              cols={2}
            />
          </div>
        </Section>

        {/* ── Why the phone behaves this way here ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle tone="stock" max="14ch">
              {c.contextHeading}
            </SectionTitle>
            <EntryList
              tone="stock"
              entries={l.phoneContext.map((x) => ({ title: x.title, desc: x.body }))}
            />
          </div>
        </Section>

        {/* ── What calls in this market ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle max="12ch">{c.sectorsHeading}</SectionTitle>
            <RuledList
              items={l.sectors.map((s) => [s.name, s.body] as [string, string])}
              labelWidth="13rem"
            />
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">{c.faqHeading}</SectionTitle>
            <Disclosure items={l.faqs} />
          </div>
        </Section>

        {/* ── Sibling metros ──
            Lateral links, not a footer link dump: seven items, named, on the
            same rule the rest of the page is drawn with. */}
        <Section tone="field-2" tight>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle as="h3" max="12ch">
              {c.otherMetrosHeading}
            </SectionTitle>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {others.map((o) => (
                <QuietAction key={o.slug} href={localizedHref(`/locations/${o.slug}`, locale)}>
                  {o.name}
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
              <QuietAction href={localizedHref("/locations", locale)}>{c.hubTitle}</QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

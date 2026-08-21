import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import Calculator from "./Calculator";
import { isLocale, localesFor, localizedHref, LOCALES } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getCalculatorCopy } from "@/app/i18n/calculator";
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
} from "@/app/components/ledger";

const PATH = "/missed-call-calculator";

/* The missed-call calculator.

   This is the acquisition asset the /missed-calls landing page is not. That
   page converts paid traffic that already arrived; this one is built to be
   the thing people search for ("what do missed calls cost", "missed call
   calculator") and, more valuably, the thing other people link to. Free
   tools earn links. Landing pages do not.

   Which is why there is no email gate on the result. See Calculator.tsx. */

export function generateStaticParams() {
  return localesFor(PATH).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCalculatorCopy(locale);
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: localizedHref(PATH, locale),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localizedHref(PATH, l)])),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedHref(PATH, locale)}`,
      title: c.heading,
      description: c.description,
      siteName: "Orchelix",
    },
  };
}

export default async function CalculatorPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const c = getCalculatorCopy(locale);

  /* WebApplication, not SoftwareApplication: this runs in the browser, it is
     free, and `offers` at price 0 is the property that makes a free-tool
     result eligible for the treatment Google gives tools rather than the one
     it gives marketing pages. */
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.heading,
    url: `${SITE_URL}${localizedHref(PATH, locale)}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    description: c.description,
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#org` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
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
        name: c.heading,
        item: `${SITE_URL}${localizedHref(PATH, locale)}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[appJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field" scene>
          <div style={{ marginBottom: "3.4rem" }}>
            <PageTitle max="19ch">{c.heading}</PageTitle>
            <Prose size="1.0625rem" max="52ch" style={{ marginTop: "1.7rem" }}>
              {c.lede}
            </Prose>
          </div>
          <Calculator c={c} />
        </Section>

        {/* ── The arithmetic, printed ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <SectionTitle tone="stock" max="14ch">
                {c.methodHeading}
              </SectionTitle>
              <Prose tone="stock" size="1rem" max="42ch" style={{ marginTop: "1.3rem" }}>
                {c.methodBody}
              </Prose>
            </div>
            <RuledList
              tone="stock"
              items={c.methodSteps}
              labelWidth="11rem"
            />
          </div>
        </Section>

        {/* ── Where it runs high and where it runs low ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle max="16ch">{c.assumptionsHeading}</SectionTitle>
            <RuledList
              items={c.assumptions.map(
                (a, i) => [String(i + 1).padStart(2, "0"), a] as [string, string]
              )}
              labelWidth="4rem"
            />
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">{c.faqHeading}</SectionTitle>
            <Disclosure items={c.faqs} />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="17ch">
                {c.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
                {c.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/try-esmi" size="1rem">
                {c.ctaHear}
              </Stamp>
              <QuietAction href={localizedHref("/book", locale)}>{c.ctaBook}</QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

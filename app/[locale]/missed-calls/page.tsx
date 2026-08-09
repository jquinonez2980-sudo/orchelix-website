import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import LeadCaptureForm from "./LeadCaptureForm";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
} from "@/app/components/ledger";

/* Converted from the light world 2026-08-09.

   This was the last surface running `esmi-dark`: cyan #00F0FF to purple
   #A855F7 gradient text, blurred colour blobs behind the hero, and glass
   panels — the exact palette and treatment the redesign brief names as the
   thing to avoid. All of it is gone, along with a `→` glyph used as an icon
   and a bulleted list drawn with coloured dots.

   The lead form keeps its behaviour untouched; only its cyan accents move to
   foil so it stops being the one teal-and-cyan object in a navy world. */

export function generateStaticParams() {
  return localesFor("/missed-calls").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getDictionary(locale)).pages.missedCalls;
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: localizedHref("/missed-calls", locale),
      languages: { en: "/missed-calls", es: "/es/missed-calls" },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localizedHref("/missed-calls", locale)}`,
      title: p.heading,
      description: p.description,
      siteName: "Orchelix",
    },
  };
}

export default async function MissedCallsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.missedCalls;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: p.title,
        item: `${SITE_URL}${localizedHref("/missed-calls", locale)}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening + the form ── */}
        <Section tone="field">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              <PageTitle max="17ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="44ch" style={{ marginTop: "1.7rem", marginBottom: "2.6rem" }}>
                {p.lede}
              </Prose>
              <RuledList items={p.bullets} labelWidth="7rem" />
            </div>

            <div>
              <SectionTitle as="h2" max="16ch">
                {p.formHeading}
              </SectionTitle>
              <Prose size="1rem" max="40ch" style={{ marginTop: "1.2rem", marginBottom: "2rem" }}>
                {p.formLede}
              </Prose>
              {/* The form reads `useSearchParams` for its UTM fields. The
                  old route rendered on demand so that never mattered; this
                  one prerenders, and Next requires the client-side bailout
                  to sit behind a boundary. The fallback is the block's own
                  top rule, so the layout does not shift when it hydrates. */}
              <Suspense
                fallback={
                  <div style={{ borderTop: "2px solid var(--lg-rule)", minHeight: "26rem" }} />
                }
              >
                <LeadCaptureForm />
              </Suspense>
            </div>
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

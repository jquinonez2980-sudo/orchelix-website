import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ShowcaseDemo from "./ShowcaseDemo";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
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

/* Converted from the light world 2026-08-09.

   Removed structurally: a "by Orchelix" kicker above the H1, gradient text
   set in italic serif inside the display heading, a radial-gradient wash and
   dot grid behind the hero, three icon + heading + text cards, and 12px
   rounded buttons with inset highlight shadows.

   Honesty corrections, all reported before they were made:
   - "One bookkeeper, 200 clients." — a capacity claim with nothing behind it.
     PRODUCT.md bars outcome metrics; the close now states what the product
     does rather than how many clients it lets one person carry.
   - the page asserted AcumenAI in the present tense with no shipping status,
     while PRODUCT.md lists it as in development. The status is now the first
     row of the opening band, matching the marker added to /app.
   - "Go to Dashboard" linked to landing-pink-five-23.vercel.app, a raw
     preview host, from a public page. It points at /app. */

export function generateStaticParams() {
  return localesFor("/acumen").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getDictionary(locale)).pages.acumen;
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: localizedHref("/acumen", locale),
      languages: { en: "/acumen", es: "/es/acumen" },
    },
  };
}

export default async function AcumenPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.acumen;

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening: the pipeline runs beside the offer ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              <PageTitle max="14ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/app">{p.openConsole}</QuietAction>
              </div>

              <div className="mt-10">
                <Band items={p.facts} cols={2} />
              </div>
            </div>

            {/* The artifact: a real pipeline run, stepped through. */}
            <div className="lg-margin-rule lg:pl-8">
              <ShowcaseDemo />
            </div>
          </div>
        </Section>

        {/* ── Why it is different ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle tone="stock" max="16ch">
              {p.whyHeading}
            </SectionTitle>
            <EntryList
              tone="stock"
              entries={p.why.map((w) => ({ title: w.title, desc: w.desc }))}
            />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="52ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href={localizedHref("/book", locale)} size="1rem">
                {t.common.bookPilot}
              </Stamp>
              <QuietAction href={localizedHref("/solutions", locale)}>
                {t.nav.products}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

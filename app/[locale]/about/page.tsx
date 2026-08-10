import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  EntryList,
} from "@/app/components/ledger";

export function generateStaticParams() {
  return localesFor("/about").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.about.title,
    description: t.pages.about.description,
    alternates: {
      canonical: localizedHref("/about", locale),
      languages: { en: "/about", es: "/es/about" },
    },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.about;

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-start">
            <div>
              <PageTitle max="15ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>
            <div className="flex flex-col items-end gap-8">
              {/* Brand accent filling what was previously dead white space in
                  this column — the logo's own helix motif, decorative only. */}
              <img
                src="/about-visual.png"
                alt=""
                aria-hidden="true"
                style={{ width: "100%", maxWidth: 320, height: "auto" }}
              />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
                <Stamp href={localizedHref("/book", locale)}>{t.common.talkToConsultant}</Stamp>
                <QuietAction href={localizedHref("/how-it-works", locale)}>
                  {t.nav.howItWorks}
                </QuietAction>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Why this exists ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle tone="stock" max="14ch">
              {p.whyHeading}
            </SectionTitle>
            <div>
              <Prose tone="stock" size="1.0625rem" max="58ch" style={{ marginBottom: "3rem" }}>
                {p.whyLede}
              </Prose>
              <EntryList tone="stock" entries={p.failures} />
            </div>
          </div>
        </Section>

        {/* ── What we commit to ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="16ch">{p.commitHeading}</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {p.commitLede}
              </Prose>
            </div>
            <RuledList items={p.commitments} labelWidth="8rem" />
          </div>
        </Section>

        {/* ── How an engagement runs ── */}
        <Section tone="field">
          <SectionTitle max="18ch">{p.engagementHeading}</SectionTitle>
          <div className="mt-12">
            <EntryList columns={2} entries={p.engagement} />
          </div>
        </Section>

        {/* ── Where we operate ── */}
        <Section tone="stock-2" tight>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle tone="stock-2" max="16ch">
                {p.whereHeading}
              </SectionTitle>
              <Prose tone="stock-2" size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {p.whereLede}
              </Prose>
            </div>
            <RuledList tone="stock-2" items={p.reach} labelWidth="8rem" />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
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

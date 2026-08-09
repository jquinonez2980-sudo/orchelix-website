import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getIndustries } from "@/app/i18n/industries";
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
} from "@/app/components/ledger";

/* Converted from the light world 2026-08-08.

   Removed as fabricated proof: a three-quote testimonial block whose copy was
   literally prefixed "[Placeholder]" and was live on the public page. Its own
   source comment said "replace with real, attributable customer quotes before
   relying on this for trust" — it had not been. PRODUCT.md is explicit that
   there are no public testimonials and that absent proof is never invented,
   so the block is gone rather than restyled. What carries the page instead is
   the thing that is real: a recording of Esmi taking a call, on /try-esmi.

   Also removed structurally: six `Eyebrow` kickers, a six-card icon +
   heading + text benefits grid, and the numbered how-it-works strip. */

export function generateStaticParams() {
  return localesFor("/ai-receptionist").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getDictionary(locale)).pages.aiReceptionist;
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: localizedHref("/ai-receptionist", locale),
      languages: { en: "/ai-receptionist", es: "/es/ai-receptionist" },
    },
  };
}

export default async function AiReceptionistPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.aiReceptionist;
  const sectors = getIndustries(locale);
  const base = localizedHref("/ai-receptionist", locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: p.title, item: `${SITE_URL}${base}` },
    ],
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <PageTitle max="16ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
            <Band items={p.facts} cols={2} />
          </div>
        </Section>

        {/* ── What it does ── */}
        <Section tone="field-2">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionTitle max="12ch">{p.doesHeading}</SectionTitle>
            <RuledList items={p.does} labelWidth="7rem" />
          </div>
        </Section>

        {/* ── Sectors: the index of the deep pages ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle tone="stock" max="16ch">
                {p.sectorsHeading}
              </SectionTitle>
              <Prose tone="stock" size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {p.sectorsLede}
              </Prose>
            </div>

            <nav aria-label={p.sectorsIndexLabel}>
              <ol
                className="lg-anchor m-0 list-none p-0"
                style={{ "--lg-anchor-w": "2px" } as React.CSSProperties}
              >
                {sectors.map((s, i) => (
                  <li
                    key={s.slug}
                    className="lg-settle-item"
                    style={
                      {
                        "--i": i,
                        borderBottom: "1px solid rgba(16,36,58,0.14)",
                      } as React.CSSProperties
                    }
                  >
                    <a
                      href={`${base}/${s.slug}`}
                      className="lg-quiet flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                      style={{
                        padding: "1.15rem 0",
                        textDecoration: "none",
                        color: "var(--lg-ink-on-stock)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontStretch: "86%",
                          fontWeight: 600,
                          fontSize: "1.0625rem",
                          letterSpacing: "-0.008em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.name}
                      </span>
                      <span
                        className="lg-fig"
                        style={{
                          fontSize: "0.625rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--lg-ink-on-stock-2)",
                        }}
                      >
                        {s.slug}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Section>

        {/* ── Questions ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <SectionTitle max="14ch">{p.faqHeading}</SectionTitle>
            <Disclosure items={p.faq} />
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

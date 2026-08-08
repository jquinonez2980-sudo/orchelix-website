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
} from "@/app/components/ledger";

export function generateStaticParams() {
  return localesFor("/industries").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.industries.title,
    description: t.pages.industries.description,
    alternates: {
      canonical: localizedHref("/industries", locale),
      languages: { en: "/industries", es: "/es/industries" },
    },
  };
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.industries;

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <div>
              <PageTitle max="16ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
              <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
              <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
            </div>
          </div>

          {/* Index — the contents page of what follows. */}
          <nav aria-label={p.indexLabel} className="mt-16">
            <ol
              className="lg-fig m-0 grid list-none gap-0 p-0 sm:grid-cols-2 lg:grid-cols-4"
              style={{ borderTop: "1px solid var(--lg-rule)" }}
            >
              {p.sectors.map((s, i) => (
                <li
                  key={s.id}
                  style={{
                    borderLeft: i === 0 ? undefined : "1px solid var(--lg-rule-quiet)",
                    paddingLeft: i === 0 ? 0 : "1.1rem",
                    paddingRight: "1.1rem",
                    paddingTop: "1.1rem",
                    paddingBottom: "1.2rem",
                  }}
                >
                  <a
                    href={`#${s.id}`}
                    className="lg-quiet"
                    style={{
                      display: "inline-block",
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--lg-ink)",
                      textDecoration: "none",
                    }}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Section>

        {/* ── Sectors ── */}
        {p.sectors.map((s, i) => (
          <Section key={s.id} id={s.id} tone={i % 2 === 0 ? "field-2" : "field"}>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <SectionTitle max="14ch">{s.name}</SectionTitle>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.0625rem",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "var(--lg-foil)",
                    maxWidth: "30ch",
                    margin: "1.2rem 0 0",
                  }}
                >
                  {s.line}
                </p>
                <Prose size="0.9375rem" max="44ch" style={{ marginTop: "1.2rem" }}>
                  {s.desc}
                </Prose>
              </div>

              <dl className="lg-fig m-0" style={{ borderTop: "2px solid var(--lg-rule)" }}>
                {s.trades.map(([name, calls]) => (
                  <div
                    key={name}
                    className="lg-row"
                    style={{
                      gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.15fr)",
                      padding: "0.95rem 0",
                    }}
                  >
                    <dt
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStretch: "88%",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        letterSpacing: "0.01em",
                        color: "var(--lg-ink)",
                        paddingRight: "1rem",
                      }}
                    >
                      {name}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: "0.6875rem",
                        letterSpacing: "0.03em",
                        color: "var(--lg-ink-3)",
                        borderLeft: "1px solid var(--lg-rule-quiet)",
                        paddingLeft: "1rem",
                      }}
                    >
                      {calls}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>
        ))}

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="18ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href={localizedHref("/book", locale)} size="1rem">
                {t.common.bookPilot}
              </Stamp>
              <QuietAction href={localizedHref("/how-it-works", locale)}>
                {t.nav.howItWorks}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import BookForm from "./BookForm";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  RuledList,
  Band,
} from "@/app/components/ledger";

/* Fabricated proof removed 2026-08-08: two named testimonials (Marisol
   Santiago / Riverstone Clinic, Javier Cárdenas / Northstar Accounting) and a
   five-logo client strip (Northstar, Riverstone, Bloom & Co., Maplewood HVAC,
   Iglesia Pueblo). None were real customers. Per PRODUCT.md the only usable
   evidence is real Esmi call recordings — so the page offers to play one
   rather than quoting a client who does not exist.

   Also removed: "SOC 2 in-progress" and the French-language claim, both listed
   as unverified in PRODUCT.md. PIPEDA alignment is real for Canadian
   operations and stays. */

export function generateStaticParams() {
  return localesFor("/book").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.book.title,
    description: t.pages.book.description,
    alternates: {
      canonical: localizedHref("/book", locale),
      languages: { en: "/book", es: "/es/book" },
    },
  };
}

export default async function BookPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.book;

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening + the form ── */}
        <Section tone="field" scene>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <PageTitle max="14ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="42ch" style={{ marginTop: "1.7rem", marginBottom: "2.8rem" }}>
                {p.lede}
              </Prose>
              <RuledList items={p.promises} labelWidth="7rem" />
            </div>

            <div>
              {/* The form is a client component, so its copy crosses the
                  boundary as a prop — only the `form` slice, not the whole
                  catalogue. */}
              <BookForm t={p.form} />
            </div>
          </div>
        </Section>

        {/* ── What happens on the call ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <SectionTitle tone="stock" max="16ch">
              {p.agendaHeading}
            </SectionTitle>

            <ol className="m-0 list-none p-0" style={{ borderTop: "2px solid var(--lg-rule)" }}>
              {p.agenda.map((a) => (
                <li
                  key={a.when}
                  className="grid gap-x-10 gap-y-2 lg:grid-cols-[9rem_minmax(0,1fr)]"
                  style={{
                    padding: "1.6rem 0",
                    borderBottom: "1px solid var(--lg-hair)",
                  }}
                >
                  <span
                    className="lg-fig"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "var(--lg-rule)",
                    }}
                  >
                    {a.when}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStretch: "86%",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        letterSpacing: "-0.01em",
                        textTransform: "uppercase",
                        color: "var(--lg-ink-on-stock)",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      {a.title}
                    </h3>
                    <Prose tone="stock" size="0.9375rem" max="56ch">
                      {a.desc}
                    </Prose>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ── How we handle what you tell us ── */}
        <Section tone="field-2" tight>
          <SectionTitle max="22ch">{p.dataHeading}</SectionTitle>
          <Prose size="1.0625rem" max="60ch" style={{ marginTop: "1.3rem", marginBottom: "2.5rem" }}>
            {p.dataLede}
          </Prose>
          <Band cols={4} items={p.dataBand} />
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}

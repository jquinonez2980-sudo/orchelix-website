import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "../../components/sections/Nav";
import Footer from "../../components/sections/Footer";
import ContactForm from "../../components/sections/ContactForm";
import FinalCTA from "../../components/sections/FinalCTA";
import JsonLd from "../../components/JsonLd";
import { getAllIndustrySlugs, getIndustry, type Industry } from "../industries";

const SITE_URL = "https://www.orchelix.com";

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ industry: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) return {};
  const pagePath = `/ai-receptionist/${ind.slug}`;
  return {
    title: ind.title,
    description: ind.description,
    alternates: { canonical: pagePath },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${pagePath}`,
      title: ind.title,
      description: ind.description,
    },
    twitter: {
      card: "summary_large_image",
      title: ind.title,
      description: ind.description,
    },
  };
}

/* ─── Icon helper ─────────────────────────────────────────────────────────── */

const ICON_PATHS: Record<string, string> = {
  "phone-off":
    "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.43 9.46a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.34 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11zM23 1 1 23",
  clock:
    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  dollar:
    "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  check:
    "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  shield:
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  alert:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  globe:
    "M2 12a10 10 0 1 0 20 0A10 10 0 0 0 2 12zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const d = ICON_PATHS[name] ?? ICON_PATHS["check"];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split("M").filter(Boolean).map((seg, i) => (
        <path key={i} d={`M${seg}`} />
      ))}
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: 11,
        lineHeight: 1,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "var(--teal-600)",
        margin: "0 0 18px",
      }}
    >
      {children}
    </p>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) notFound();

  const pagePath = `/ai-receptionist/${ind.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${pagePath}#service`,
    name: ind.schema.serviceType,
    description: ind.schema.serviceDescription,
    serviceType: ind.schema.serviceType,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: [
      { "@type": "City", name: "West Palm Beach", containedIn: "FL" },
      { "@type": "City", name: "Boca Raton", containedIn: "FL" },
      { "@type": "City", name: "Fort Lauderdale", containedIn: "FL" },
      { "@type": "City", name: "Miami", containedIn: "FL" },
      { "@type": "State", name: "Florida" },
      { "@type": "Country", name: "United States" },
    ],
    url: `${SITE_URL}${pagePath}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ind.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Orchelix AI", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Receptionist",
        item: `${SITE_URL}/ai-receptionist`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ind.name,
        item: `${SITE_URL}${pagePath}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <Nav />

      {/* ── Hero ── */}
      <section
        className="px-6 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28 lg:pt-28"
        style={{
          background:
            "linear-gradient(180deg, var(--surface-2) 0%, var(--paper) 100%)",
        }}
      >
        <div
          className="mx-auto max-w-[1200px] flex flex-col items-center text-center"
          style={{ gap: 24 }}
        >
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <a
              href="/ai-receptionist"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                textDecoration: "none",
              }}
            >
              AI Receptionist
            </a>
            <span aria-hidden="true" style={{ color: "var(--ink-4)", fontSize: 11 }}>›</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--teal-600)",
              }}
            >
              {ind.eyebrow}
            </span>
          </nav>

          <h1
            className="text-[36px] sm:text-[48px] lg:text-[58px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              maxWidth: 780,
              margin: 0,
            }}
          >
            {ind.hero.headline}
          </h1>
          <p
            className="text-[17px] sm:text-[19px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: 600,
              margin: 0,
            }}
          >
            {ind.hero.sub}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
            <a
              href="/book"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 28px",
                borderRadius: 12,
                background: "var(--navy-600)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.08) inset, 0 1px 2px rgba(10,37,64,0.12)",
                transition: "background 220ms var(--ease-standard)",
              }}
            >
              Book a demo
            </a>
            <a
              href="/try-esmi"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 28px",
                borderRadius: 12,
                border: "1px solid var(--line-strong)",
                background: "#fff",
                color: "var(--ink)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 220ms var(--ease-standard)",
              }}
            >
              Try Esmi live
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <Eyebrow>The Problem</Eyebrow>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[42px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.026em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              What it costs when calls go unanswered
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ind.problems.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    color: "var(--teal-600)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={p.icon} size={20} />
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.3,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        style={{ background: "var(--surface-2)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <Eyebrow>How It Works</Eyebrow>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[42px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.026em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Live in 2–3 weeks
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Configure",
                body: "We learn your scripts, FAQs, calendar, and escalation rules during a dedicated onboarding session.",
              },
              {
                n: "02",
                title: "Integrate",
                body: "Esmi connects to your phone line and calendar. We test every scenario before going live.",
              },
              {
                n: "03",
                title: "Answer",
                body: "Every call is answered immediately — 24/7, with no hold times and no missed leads.",
              },
              {
                n: "04",
                title: "Review",
                body: "You get call summaries and a dashboard. We tune the scripts based on real call data each month.",
              },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    color: "var(--teal-600)",
                  }}
                >
                  {s.n}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: 1.3,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <Eyebrow>What You Get</Eyebrow>
            <h2
              className="text-[28px] sm:text-[36px] lg:text-[42px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.026em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Built for {ind.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ind.benefits.map((b) => (
              <div
                key={b.title}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--teal-50, #f0fdfa)",
                    border: "1px solid var(--teal-100, #ccfbf1)",
                    color: "var(--teal-600)",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={b.icon} size={20} />
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.3,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <FinalCTA />

      {/* ── Pricing teaser ── */}
      <section
        className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
        style={{ background: "var(--surface-2)" }}
      >
        <div
          className="mx-auto max-w-[1200px] flex flex-col items-center text-center"
          style={{ gap: 16 }}
        >
          <Eyebrow>Pricing</Eyebrow>
          <h2
            className="text-[24px] sm:text-[30px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.022em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            Transparent pricing, no surprises
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: 480,
              margin: 0,
            }}
          >
            Plans start at a flat monthly rate with no per-minute overage fees
            for standard usage. See full pricing and what's included.
          </p>
          <a
            href="/pricing"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1,
              padding: "13px 22px",
              borderRadius: 10,
              border: "1px solid var(--line-strong)",
              background: "#fff",
              color: "var(--ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
            }}
          >
            View pricing →
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[780px]">
          <div className="mb-12 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2
              className="text-[28px] sm:text-[34px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.024em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Common questions
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {ind.faqs.map(({ q, a }) => (
              <details
                key={q}
                style={{
                  borderBottom: "1px solid var(--line)",
                  paddingBottom: 2,
                }}
                className="group"
              >
                <summary
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: "var(--ink)",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "18px 0",
                  }}
                >
                  {q}
                  <span
                    aria-hidden="true"
                    className="group-open:rotate-45"
                    style={{
                      flexShrink: 0,
                      fontSize: 22,
                      lineHeight: 1,
                      color: "var(--teal-600)",
                      transition: "transform 200ms",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--ink-2)",
                    margin: "0 0 18px",
                    paddingRight: 32,
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24"
        style={{ background: "var(--surface-2)" }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <Eyebrow>Get Started</Eyebrow>
            <h2
              className="text-[28px] sm:text-[36px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.026em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Talk to us about your {ind.eyebrow.toLowerCase()} operation
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                maxWidth: 480,
                margin: "14px auto 0",
              }}
            >
              Tell us about your business and we'll show you exactly how Esmi
              handles calls for {ind.name.toLowerCase()}.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}

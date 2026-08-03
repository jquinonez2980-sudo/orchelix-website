import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import JsonLd from "../components/JsonLd";

const SITE_URL = "https://www.orchelix.com";
const CYAN = "#00F0FF";

export const metadata: Metadata = {
  title: "Stop Losing Bookings to Missed Calls | Esmi by Orchelix",
  description:
    "Esmi is an AI receptionist that answers after hours, books appointments on your calendar, and captures leads — in English and Spanish. Try the live demo in two minutes.",
  alternates: { canonical: "/missed-calls" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Stop losing bookings to missed and after-hours calls",
    description:
      "AI receptionist that answers, books, and texts you the lead — EN · ES. Try Esmi live in 2 minutes.",
    url: `${SITE_URL}/missed-calls`,
    siteName: "Orchelix",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Missed calls",
      item: `${SITE_URL}/missed-calls`,
    },
  ],
};

const BULLETS = [
  "Answers when you’re busy, closed, or with a client",
  "Books directly on your calendar — no “we’ll call you back”",
  "Every call, chat, and appointment in one dashboard",
  "English and Spanish on the same line",
];

export default function MissedCallsPage() {
  return (
    <div
      className="esmi-dark min-h-screen"
      style={{
        background: "var(--esmi-bg, #0A0F1C)",
        color: "var(--esmi-text, #EAF2FF)",
      }}
    >
      <JsonLd data={breadcrumbJsonLd} />
      <Nav theme="dark" />

      <main id="main-content">
        <section
          style={{
            background:
              "linear-gradient(180deg, #060A14 0%, #0A0F1C 60%, #0B1322 100%)",
            padding: "104px 0 88px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(0,240,255,0.07) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
              maskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -160,
              left: "12%",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(0,240,255,0.14) 0%, transparent 70%)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              right: "6%",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 70%)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />

          <div className="relative mx-auto max-w-[640px] px-6 text-center sm:px-8 lg:px-10">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(234,242,255,0.70)",
                background: "rgba(0,240,255,0.06)",
                border: "1px solid rgba(0,240,255,0.22)",
                borderRadius: 999,
                padding: "7px 13px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: CYAN,
                  boxShadow: "0 0 10px rgba(0,240,255,0.9)",
                  display: "inline-block",
                }}
              />
              Esmi · AI receptionist
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.032em",
                color: "#fff",
                margin: "0 auto 20px",
              }}
            >
              Stop losing bookings to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #00F0FF 0%, #7DD3FC 40%, #A855F7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                missed and after-hours calls
              </span>
              .
            </h1>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 2.2vw, 18px)",
                lineHeight: 1.6,
                color: "rgba(234,242,255,0.62)",
                margin: "0 auto 36px",
                maxWidth: 520,
              }}
            >
              Esmi answers your phone and website chat, books appointments on
              your calendar, and sends you the lead — in English and Spanish.
            </p>

            <ul
              className="mx-auto max-w-[440px] text-left"
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 auto 40px",
              }}
            >
              {BULLETS.map((item) => (
                <li
                  key={item}
                  style={{
                    position: "relative",
                    paddingLeft: 28,
                    marginBottom: 12,
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(234,242,255,0.78)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 7,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: CYAN,
                      boxShadow: "0 0 10px rgba(0,240,255,0.6)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/try-esmi"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)",
                  color: "#04121A",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 28px rgba(0,240,255,0.45)",
                }}
              >
                Try Esmi live (2 minutes) →
              </Link>
              <Link
                href="/get-started"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "rgba(234,242,255,0.88)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Book a 15-min setup
              </Link>
            </div>

            <p
              style={{
                marginTop: 28,
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "rgba(234,242,255,0.42)",
              }}
            >
              No app install. Talk to the live demo like a customer — then we
              put it on your number.
            </p>
          </div>
        </section>

        <section
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#0A0F1C",
            padding: "28px 0",
          }}
        >
          <div className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 text-center">
            {[
              "EN · ES bilingual",
              "24/7 coverage",
              "Calendar booking",
              "Lead capture",
            ].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(234,242,255,0.45)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </main>

      <Footer theme="dark" />
    </div>
  );
}

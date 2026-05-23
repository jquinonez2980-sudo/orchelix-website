"use client";

import Image from "next/image";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";

const LIVE_URL = "https://ai-receptionist-production-3446.up.railway.app";

const SUGGESTIONS = [
  { key: "book",     label: "Book an appointment",  lang: "EN" },
  { key: "hours",    label: "Hours of operation",    lang: "EN" },
  { key: "reservar", label: "Reservar una cita",     lang: "ES" },
  { key: "urgent",   label: "I have an urgent issue", lang: "EN" },
];

const STATS = [
  { k: "Pickup time", v: "12.4", u: "s",       meta: "vs. industry avg. 48s" },
  { k: "Languages",   v: "EN",   u: " · ES · FR", meta: "Mid-call switching" },
  { k: "Resolution",  v: "87",   u: "%",        meta: "No human handoff needed" },
  { k: "Coverage",    v: "24/7", u: "",         meta: "Nights · weekends · holidays" },
];

const CAPABILITIES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>
      </svg>
    ),
    h: "Books appointments end-to-end.",
    p: "Esmi reads your live calendar, offers the right slots, books the visit, and sends a bilingual SMS confirmation — all on one call.",
    v: "87%",
    l: "of bookings auto-confirmed without staff handoff.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
      </svg>
    ),
    h: "Qualifies new leads.",
    p: "Esmi asks the questions your sales team would, scores the lead, and drops a one-paragraph brief into your CRM before the caller hangs up.",
    v: "<1m",
    l: "From inbound ring to a written CRM brief in your inbox.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4M12 17h.01"/>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
      </svg>
    ),
    h: "Escalates urgency.",
    p: "When a caller is hurt, angry, or in real distress, Esmi recognizes the signal in two languages — and pages the right on-call human in seconds.",
    v: "10s",
    l: "Median time to page your on-call human.",
  },
];

const LOGOS = ["Riverstone Clinic", "NORTHSTAR Accounting", "Bloom & Co.", "Maplewood HVAC", "Iglesia Pueblo"];
const COMPLIANCE = ["PIPEDA-aligned", "SOC 2 in-progress", "EN · ES · FR", "Canadian data residency"];

function sendSuggestion(key: string) {
  const iframe = document.getElementById("esmi-iframe") as HTMLIFrameElement | null;
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage({ type: "esmi-suggest", key }, "*");
  }
}

/* ─────────────────────────────────────────────────────────── PAGE */
export default function TryEsmiPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <EsmiHero />
        <DemoStage />
        <Capabilities />
        <TrustStrip />
        <EsmiCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── HERO */
function EsmiHero() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #06122A 0%, #0A2540 70%, #0f2d4a 100%)",
        padding: "80px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(94,234,212,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(20,184,166,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10"
        style={{ position: "relative", textAlign: "center" }}
      >
        {/* Esmi mark */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <EsmiMark />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.60)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "7px 13px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Live · Virtual receptionist
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(34px, 6vw, 60px)",
            lineHeight: 1.08,
            letterSpacing: "-0.032em",
            color: "#fff",
            margin: "0 auto 24px",
            maxWidth: 760,
          }}
        >
          Meet Esmi, your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #5EEAD4 0%, #5BB6FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            24/7 AI receptionist
          </span>
          .
        </h1>

        {/* Lead */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            margin: "0 auto 40px",
            maxWidth: 600,
          }}
        >
          Esmi answers every call in under fifteen seconds — bilingually, on weekends,
          and without missing a single appointment. Try the live demo below, then book
          a walkthrough for your business.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 44,
          }}
        >
          <a
            href="#demo"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              padding: "15px 28px",
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--teal-500) 0%, #5BB6FF 100%)",
              color: "#fff",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 20px rgba(20,184,166,0.35)",
            }}
          >
            Try the live demo →
          </a>
          <a
            href="/book"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 15,
              padding: "15px 28px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            Book a personalized demo
          </a>
        </div>

        {/* Trust chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {[
            {
              icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
              text: <><strong>EN · ES</strong> bilingual</>,
            },
            {
              icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
              text: <><strong>24/7</strong> · nights &amp; weekends</>,
            },
            {
              icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>,
              text: <><strong>14-second</strong> pickup</>,
            },
            {
              icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
              text: <>Books &amp; <strong>confirms</strong></>,
            },
          ].map((chip, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "rgba(255,255,255,0.70)",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 999,
                padding: "8px 14px",
              }}
            >
              <span style={{ color: "var(--teal-400)", display: "flex" }}>{chip.icon}</span>
              {chip.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── DEMO STAGE */
function DemoStage() {
  return (
    <section
      id="demo"
      style={{
        background: "#fff",
        padding: "80px 0 100px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        {/* Section head */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow navy>Live demo</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.026em",
              color: "var(--ink)",
              margin: "14px 0 0",
            }}
          >
            Talk to Esmi — right now.
          </h2>
        </div>

        {/* Stage frame */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--line)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.8) inset, 0 24px 64px -16px rgba(10,37,64,0.16), 0 6px 16px -4px rgba(10,37,64,0.08)",
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 20px",
              background: "#F4F6F9",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
                <span
                  key={i}
                  style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "block" }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-3)",
                flex: 1,
                textAlign: "center",
              }}
            >
              esmi · <b style={{ color: "var(--ink-2)" }}>live demo</b>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#22C55E",
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.20)",
                borderRadius: 999,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "inline-block",
                }}
              />
              Listening · EN · ES
            </span>
          </div>

          {/* Iframe */}
          <div style={{ height: "min(680px, 75vh)", background: "#06122A", position: "relative" }}>
            {/* Fallback shown behind iframe — visible if src fails to load */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: 32,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 16.5v2.6a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h2.6a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L7.3 9a16 16 0 0 0 6 6l1.13-1.14a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.7a2 2 0 0 1 1.72 2.03Z"/>
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "rgba(255,255,255,0.50)", margin: 0, maxWidth: 320, lineHeight: 1.6 }}>
                The live demo is warming up. Book a personalized walkthrough and we&apos;ll show you Esmi live on your line.
              </p>
              <a
                href="/book"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "12px 22px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Book a personalized demo →
              </a>
            </div>
            <iframe
              id="esmi-iframe"
              src={LIVE_URL}
              title="Esmi — Live receptionist demo"
              allow="microphone; autoplay"
              loading="lazy"
              style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>

          {/* Suggestion rail */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              padding: "16px 20px",
              background: "#F4F6F9",
              borderTop: "1px solid var(--line)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginRight: 4,
                flexShrink: 0,
              }}
            >
              Try saying
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => sendSuggestion(s.key)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ink-2)",
                  background: "#fff",
                  border: "1px solid var(--line-strong)",
                  borderRadius: 999,
                  padding: "7px 14px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "border-color 180ms, background 180ms",
                }}
              >
                {s.label}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color:
                      s.lang === "ES"
                        ? "var(--teal-700)"
                        : "var(--ink-3)",
                    background:
                      s.lang === "ES"
                        ? "var(--teal-50)"
                        : "var(--surface-2, #F4F6F9)",
                    border:
                      s.lang === "ES"
                        ? "1px solid var(--teal-100)"
                        : "1px solid var(--line)",
                    borderRadius: 4,
                    padding: "2px 5px",
                  }}
                >
                  {s.lang}
                </span>
              </button>
            ))}
          </div>

          {/* Micro-stats */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{
              borderTop: "1px solid var(--line)",
              background: "#fff",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 24px",
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--line)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
                className={i % 2 === 0 && i < 2 ? "border-b border-[var(--line)] lg:border-b-0" : ""}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  {s.k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 24,
                    lineHeight: 1.1,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.v}
                  {s.u && (
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--ink-3)",
                        letterSpacing: 0,
                      }}
                    >
                      {s.u}
                    </span>
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    color: "var(--ink-3)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: 13.5,
            color: "var(--ink-3)",
            lineHeight: 1.6,
            marginTop: 20,
          }}
        >
          This is the live Esmi runtime. Click a quick-reply above to watch her handle a
          real conversation — or{" "}
          <a href="/book" style={{ color: "var(--teal-700)", textDecoration: "underline" }}>
            book a personalized walkthrough
          </a>{" "}
          to hear her live on your line.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── CAPABILITIES */
function Capabilities() {
  return (
    <section style={{ background: "var(--surface-2, #F4F6F9)", padding: "100px 0" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ maxWidth: 580, marginBottom: 64 }}>
          <Eyebrow navy>What Esmi handles</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.026em",
              color: "var(--ink)",
              margin: "16px 0 16px",
            }}
          >
            A real front desk — without the front desk.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: 0,
            }}
          >
            Three things Esmi does on day one. The rest she learns from your team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  top: 0,
                  height: 2,
                  background: "linear-gradient(90deg, var(--teal-500), #5BB6FF)",
                  borderRadius: "0 0 4px 4px",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  background: "linear-gradient(135deg, var(--teal-50) 0%, #fff 100%)",
                  border: "1px solid var(--teal-100)",
                  color: "var(--teal-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 10px -4px rgba(20,184,166,0.18)",
                }}
              >
                {cap.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 19,
                  lineHeight: 1.3,
                  letterSpacing: "-0.016em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {cap.h}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  margin: 0,
                  flex: 1,
                }}
              >
                {cap.p}
              </p>

              {/* Pull stat */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 28,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(90deg, var(--teal-600) 0%, #3B8FD4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cap.v}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    lineHeight: 1.4,
                    maxWidth: 200,
                  }}
                >
                  {cap.l}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────── TRUST STRIP */
function TrustStrip() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "48px 0",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            Trusted by operators across North America
          </span>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 32px",
              justifyContent: "center",
            }}
          >
            {LOGOS.map((logo) => (
              <span
                key={logo}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 13.5,
                  letterSpacing: "0.05em",
                  color: "var(--ink-3)",
                }}
              >
                {logo}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 20px",
              justifyContent: "center",
            }}
          >
            {COMPLIANCE.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "var(--ink-4)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────── FINAL CTA */
function EsmiCTA() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          style={{
            borderRadius: 24,
            background: "linear-gradient(135deg, #06122A 0%, #0A2540 60%, #0D2E50 100%)",
            padding: "60px 56px",
            position: "relative",
            overflow: "hidden",
          }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:items-center"
        >
          {/* Grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(94,234,212,0.05) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              pointerEvents: "none",
            }}
          />
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(20,184,166,0.10) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Left: copy */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal-400, #22C2A8)",
                marginBottom: 16,
              }}
            >
              <span style={{ width: 14, height: 1, background: "currentColor", opacity: 0.8, display: "inline-block" }} />
              Want Esmi for your business?
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(24px, 3.5vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.024em",
                color: "#fff",
                margin: "0 0 18px",
              }}
            >
              Book a personalized demo for your business.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.60)",
                margin: "0 0 32px",
                maxWidth: 520,
              }}
            >
              Thirty minutes with a senior consultant. We&apos;ll dial Esmi into a real workflow
              on your line — your scripts, your calendar, your edge cases — and send you a
              one-page proposal afterward.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="/book"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 12,
                  background: "#fff",
                  color: "#06122A",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
                }}
              >
                Book a personalized demo →
              </a>
              <a
                href="/solutions#agent-esmi"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 12,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                See Esmi in the agent stack
              </a>
            </div>
          </div>

          {/* Right: testimonial card */}
          <div
            style={{
              position: "relative",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              padding: "28px 28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {/* Esmi mark small */}
            <EsmiMark small />

            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.72)",
                margin: 0,
                fontStyle: "normal",
              }}
            >
              &ldquo;The receptionist agent picked up 412 calls in its first month —
              bilingually, on weekends, and without missing a single appointment.
              It paid for itself before the pilot ended.&rdquo;
            </blockquote>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.80)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                MS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5, color: "#fff" }}>
                  Marisol Santiago
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                  Office manager · Riverstone Clinic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── SHARED HELPERS */

function EsmiMark({ small }: { small?: boolean }) {
  return (
    <Image
      src="/esmi-logo.png"
      alt="Esmi"
      width={small ? 72 : 120}
      height={small ? 28 : 46}
      style={{ height: small ? 28 : 46, width: "auto", objectFit: "contain" }}
      priority
    />
  );
}

function Eyebrow({ children, navy }: { children: React.ReactNode; navy?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: 11,
        lineHeight: 1,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: navy ? "var(--navy-500)" : "var(--teal-700)",
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
      {children}
    </span>
  );
}

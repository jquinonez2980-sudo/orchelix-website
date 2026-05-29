import Image from "next/image";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import EsmiChat from "./EsmiChat";

const STATS = [
  { k: "Pickup time", v: "12.4", u: "s",          meta: "vs. industry avg. 48s" },
  { k: "Languages",   v: "EN",   u: " · ES · FR", meta: "Mid-call switching" },
  { k: "Resolution",  v: "87",   u: "%",          meta: "No human handoff needed" },
  { k: "Coverage",    v: "24/7", u: "",           meta: "Nights · weekends · holidays" },
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
    v: "End-to-end",
    l: "Books the visit and confirms by bilingual SMS — no staff handoff.",
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

const CYAN = "#00F0FF";

/* ─────────────────────────────────────────────────────────── PAGE */
export default function TryEsmiPage() {
  return (
    <div className="esmi-dark" style={{ background: "var(--esmi-bg)", color: "var(--esmi-text)" }}>
      <Nav theme="dark" />
      <main id="top">
        <EsmiHero />
        <DemoStage />
        <Capabilities />
        <TrustStrip />
        <EsmiCTA />
      </main>
      <Footer theme="dark" />
    </div>
  );
}

/* ─────────────────────────────────────────────── Shared backdrop bits */
function GridTexture({ size = 40, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,240,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        pointerEvents: "none",
        maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 80%)",
      }}
    />
  );
}

function AuroraBlob({
  color,
  size,
  top,
  left,
  right,
  delay = 0,
}: {
  color: string;
  size: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden="true"
      data-esmi-motion
      style={{
        position: "absolute",
        top,
        left,
        right,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        filter: "blur(8px)",
        pointerEvents: "none",
        animation: `esmi-aurora 14s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

/* Decorative, CSS-only waveform band for the hero (ambient — no JS state). */
function AmbientWave() {
  const bars = Array.from({ length: 40 });
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: 56,
        marginBottom: 40,
        opacity: 0.8,
      }}
    >
      {bars.map((_, i) => {
        const mid = Math.abs(i - bars.length / 2);
        const base = 10 + Math.max(0, 26 - mid * 1.4);
        return (
          <span
            key={i}
            data-esmi-motion
            style={{
              width: 3,
              height: base,
              borderRadius: 2,
              background: i % 2 === 0 ? CYAN : "#A855F7",
              transformOrigin: "center",
              opacity: 0.35 + Math.max(0, 0.5 - mid * 0.025),
              boxShadow: "0 0 6px rgba(0,240,255,0.4)",
              animation: `esmi-wave ${1.2 + (i % 5) * 0.18}s ease-in-out ${i * 0.04}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── HERO */
function EsmiHero() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #060A14 0%, #0A0F1C 60%, #0B1322 100%)",
        padding: "104px 0 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GridTexture size={40} opacity={0.07} />
      <AuroraBlob color="rgba(0,240,255,0.16)" size={620} top={-160} left="12%" />
      <AuroraBlob color="rgba(168,85,247,0.16)" size={560} top={-80} right="8%" delay={3} />

      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10" style={{ position: "relative", textAlign: "center" }}>
        {/* Esmi mark + live pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
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
              color: "rgba(234,242,255,0.70)",
              background: "rgba(0,240,255,0.06)",
              border: "1px solid rgba(0,240,255,0.22)",
              borderRadius: 999,
              padding: "7px 13px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              data-esmi-motion
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: CYAN,
                boxShadow: "0 0 10px rgba(0,240,255,0.9)",
                display: "inline-block",
                flexShrink: 0,
                animation: "esmi-glow-pulse 2s ease-in-out infinite",
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
            fontSize: "clamp(34px, 6vw, 62px)",
            lineHeight: 1.07,
            letterSpacing: "-0.032em",
            color: "#fff",
            margin: "0 auto 24px",
            maxWidth: 780,
          }}
        >
          Meet Esmi, your{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00F0FF 0%, #7DD3FC 40%, #A855F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(0,240,255,0.3)",
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
            color: "rgba(234,242,255,0.62)",
            margin: "0 auto 40px",
            maxWidth: 620,
          }}
        >
          Esmi answers every call in under fifteen seconds — bilingually, on weekends,
          and without missing a single appointment. Try the live demo below, then book
          a walkthrough for your business.
        </p>

        <AmbientWave />

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 44 }}>
          <a
            href="#demo"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              padding: "15px 28px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)",
              color: "#04121A",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 28px rgba(0,240,255,0.45)",
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(234,242,255,0.88)",
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
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
                color: "rgba(234,242,255,0.72)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 999,
                padding: "8px 14px",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: CYAN, display: "flex" }}>{chip.icon}</span>
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
        background: "#0A0F1C",
        padding: "84px 0 100px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AuroraBlob color="rgba(0,240,255,0.10)" size={500} top={40} left="-6%" delay={1} />

      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10" style={{ position: "relative" }}>
        {/* Section head */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow>Live demo</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.026em",
              color: "#fff",
              margin: "14px 0 0",
            }}
          >
            Talk to Esmi — right now.
          </h2>
        </div>

        {/* Split: console + metrics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* Glass console */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(0,240,255,0.18)",
              background: "rgba(255,255,255,0.03)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px -24px rgba(0,0,0,0.7), 0 0 60px -20px rgba(0,240,255,0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Chrome bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                background: "rgba(255,255,255,0.04)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((cdot, i) => (
                  <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: cdot, display: "block" }} />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "rgba(234,242,255,0.42)",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                esmi · <b style={{ color: "rgba(234,242,255,0.72)" }}>live demo</b>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: CYAN,
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.25)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span data-esmi-motion style={{ width: 5, height: 5, borderRadius: "50%", background: CYAN, display: "inline-block", boxShadow: "0 0 8px rgba(0,240,255,0.9)", animation: "esmi-glow-pulse 2s ease-in-out infinite" }} />
                Listening · EN · ES
              </span>
            </div>

            {/* Chat UI */}
            <div style={{ height: "clamp(480px, 64vh, 660px)" }}>
              <EsmiChat />
            </div>
          </div>

          {/* Metrics panel */}
          <MetricsPanel />
        </div>

        {/* Caption */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: 13.5,
            color: "rgba(234,242,255,0.42)",
            lineHeight: 1.6,
            marginTop: 22,
          }}
        >
          This is the live Esmi runtime. Type anything to start — or{" "}
          <a href="/book" style={{ color: CYAN, textDecoration: "underline" }}>
            book a personalized walkthrough
          </a>{" "}
          to hear her live on your line.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────── METRICS PANEL */
function MetricsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(234,242,255,0.40)",
          paddingLeft: 2,
        }}
      >
        Live signals
      </span>
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 16,
              bottom: 16,
              width: 2,
              borderRadius: 2,
              background: "linear-gradient(180deg, #00F0FF, #A855F7)",
              boxShadow: "0 0 12px rgba(0,240,255,0.5)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(234,242,255,0.42)",
            }}
          >
            {s.k}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1.1,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {s.v}
            {s.u && (
              <span style={{ fontSize: 14, fontWeight: 500, color: CYAN, letterSpacing: 0 }}>
                {s.u}
              </span>
            )}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "rgba(234,242,255,0.42)", lineHeight: 1.4 }}>
            {s.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────── CAPABILITIES */
function Capabilities() {
  return (
    <section style={{ background: "#0B1322", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <AuroraBlob color="rgba(168,85,247,0.10)" size={520} top={-60} right="-4%" delay={2} />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10" style={{ position: "relative" }}>
        <div style={{ maxWidth: 600, marginBottom: 64 }}>
          <Eyebrow>What Esmi handles</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.026em",
              color: "#fff",
              margin: "16px 0 16px",
            }}
          >
            A real front desk — without the front desk.
          </h2>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.6, color: "rgba(234,242,255,0.62)", margin: 0 }}>
            Three things Esmi does on day one. The rest she learns from your team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 18,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  top: 0,
                  height: 2,
                  background: "linear-gradient(90deg, #00F0FF, #A855F7)",
                  borderRadius: "0 0 4px 4px",
                  boxShadow: "0 0 12px rgba(0,240,255,0.4)",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.25)",
                  color: CYAN,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,240,255,0.2)",
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
                  color: "#fff",
                  margin: 0,
                }}
              >
                {cap.h}
              </h3>

              <p style={{ fontFamily: "var(--font-display)", fontSize: 14.5, lineHeight: 1.65, color: "rgba(234,242,255,0.62)", margin: 0, flex: 1 }}>
                {cap.p}
              </p>

              {/* Pull stat */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
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
                    background: "linear-gradient(90deg, #00F0FF 0%, #A855F7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {cap.v}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "rgba(234,242,255,0.42)", lineHeight: 1.4, maxWidth: 200 }}>
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
        background: "#0A0F1C",
        padding: "48px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(234,242,255,0.42)",
            }}
          >
            Trusted by operators across North America
          </span>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px", justifyContent: "center" }}>
            {LOGOS.map((logo) => (
              <span
                key={logo}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 13.5,
                  letterSpacing: "0.05em",
                  color: "rgba(234,242,255,0.55)",
                }}
              >
                {logo}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", justifyContent: "center" }}>
            {COMPLIANCE.map((cc) => (
              <span
                key={cc}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "rgba(234,242,255,0.34)",
                }}
              >
                {cc}
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
    <section style={{ padding: "80px 0", background: "#0A0F1C" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          style={{
            borderRadius: 24,
            background: "linear-gradient(135deg, #0B1322 0%, #0D1730 60%, #11183A 100%)",
            border: "1px solid rgba(0,240,255,0.18)",
            padding: "60px 56px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 80px -30px rgba(0,240,255,0.4)",
          }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:items-center"
        >
          <GridTexture size={36} opacity={0.06} />
          <AuroraBlob color="rgba(0,240,255,0.14)" size={420} top={-90} right={-60} />
          <AuroraBlob color="rgba(168,85,247,0.12)" size={360} top={120} left={-60} delay={2} />

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
                color: CYAN,
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
                color: "rgba(234,242,255,0.62)",
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
                  background: "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)",
                  color: "#04121A",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 28px rgba(0,240,255,0.45)",
                }}
              >
                Book a personalized demo →
              </a>
              <a
                href="tel:+15615661066"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "15px 28px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(234,242,255,0.88)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Esmi now
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
                  color: "rgba(234,242,255,0.78)",
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: "28px 28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <EsmiMark small />

            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "rgba(234,242,255,0.78)",
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
                  background: "rgba(0,240,255,0.10)",
                  border: "1px solid rgba(0,240,255,0.25)",
                  color: CYAN,
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
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "rgba(234,242,255,0.45)" }}>
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

function Eyebrow({ children }: { children: React.ReactNode }) {
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
        color: CYAN,
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
      {children}
    </span>
  );
}

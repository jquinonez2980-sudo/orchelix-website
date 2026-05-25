import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Orchelix builds reliable AI systems that run revenue operations for SMEs — lead qualification, call handling, deal closing, and financial close with human oversight.",
};

/* ─── Shared style objects ─────────────────────────────────────────────── */

const eyebrowStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--font-mono)",
  fontWeight: 500,
  fontSize: 11,
  lineHeight: 1,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--teal-700)",
};

const eyebrowLightStyle: React.CSSProperties = {
  ...eyebrowStyle,
  color: "var(--teal-400)",
};

const sectionH2: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 46,
  lineHeight: 1.06,
  letterSpacing: "-0.028em",
  color: "var(--ink)",
  margin: 0,
};

const sectionH2Light: React.CSSProperties = {
  ...sectionH2,
  color: "#fff",
};

const sectionP: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: 1.6,
  color: "var(--ink-2)",
  margin: 0,
};

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span style={light ? eyebrowLightStyle : eyebrowStyle}>
      <span
        style={{
          width: 18,
          height: 1,
          background: "currentColor",
          opacity: 0.7,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Challenge />
        <Approach />
        <WhoWeAre />
        <WhyOrchelix />
        <TrackRecord />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}

/* ─── 1. Hero ───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--navy-700)",
        backgroundImage: `
          radial-gradient(ellipse 70% 80% at 0% 0%, rgba(20,184,166,0.22), transparent 60%),
          radial-gradient(ellipse 60% 70% at 100% 100%, rgba(20,184,166,0.14), transparent 55%),
          linear-gradient(160deg, #0A2540 0%, #061626 100%)
        `,
        borderBottom: "1px solid rgba(20,184,166,0.12)",
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.28,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 90% 100% at 30% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 100% at 30% 0%, black, transparent 75%)",
        }}
      />
      {/* Helix watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -60,
          bottom: -80,
          width: 460,
          height: 460,
          pointerEvents: "none",
          opacity: 0.055,
        }}
      >
        <Image
          src="/orchelix-mark-light.png"
          alt=""
          width={460}
          height={460}
          quality={40}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10"
        style={{ position: "relative", zIndex: 1, paddingTop: 96, paddingBottom: 96 }}
      >
        <div style={{ maxWidth: 760 }}>
          <Eyebrow light>About Orchelix</Eyebrow>

          <h1
            className="text-[38px] sm:text-[52px] lg:text-[64px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.032em",
              color: "#fff",
              margin: "24px 0 0",
            }}
          >
            Building reliable AI systems that actually run revenue operations.
          </h1>

          <p
            className="text-[17px] sm:text-[19px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
              margin: "24px 0 0",
              maxWidth: 620,
            }}
          >
            Orchelix deploys multi-agent AI systems that qualify leads, handle inbound calls, manage
            deal pipelines, and close the books — with a senior consultant overseeing every
            deployment and human-in-the-loop controls your team can trust.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
            <a
              href="/book"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15,
                lineHeight: 1,
                padding: "16px 28px",
                borderRadius: 12,
                background: "#fff",
                color: "var(--navy-600)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 1px 3px rgba(10,37,64,0.18)",
              }}
            >
              Book a strategy call
            </a>
            <a
              href="/solutions"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "16px 28px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              See our agents
              <span style={{ fontSize: 14, opacity: 0.8 }}>→</span>
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            marginTop: 72,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 40,
            gap: "32px 0",
          }}
        >
          {[
            { value: "14 days", label: "Average time to first live agent" },
            { value: "3 agents", label: "Revenue, Receptionist, Accounting" },
            { value: "PIPEDA", label: "Compliant from day one" },
            { value: "GTA-based", label: "Senior consultants, no help desk" },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{ paddingRight: 24 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 1,
                  letterSpacing: "-0.022em",
                  color: "var(--teal-400)",
                  margin: "0 0 8px",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.48)",
                  margin: 0,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 2. The Challenge ──────────────────────────────────────────────────── */

function Challenge() {
  const pains = [
    {
      title: "Generic tools, zero fit.",
      desc: "Off-the-shelf AI products aren't designed for revenue operations. They need heavy customisation before they do anything useful — and most companies lack the in-house team to make that happen.",
    },
    {
      title: "Pilots that never graduate.",
      desc: "Most AI engagements stall in a proof-of-concept that impresses the demo room but never touches a live lead, a real call, or an actual invoice.",
    },
    {
      title: "No accountability after go-live.",
      desc: "Vendors hand over a system and walk away. When the model drifts, volumes spike, or edge cases appear, there's no one to call.",
    },
  ];

  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{
        borderBottom: "1px solid var(--line)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,37,64,0.025), transparent 70%), var(--surface-2)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20"
          style={{ alignItems: "start", gap: 48 }}
        >
          {/* Left column */}
          <div style={{ display: "grid", gap: 20 }}>
            <Eyebrow>The problem</Eyebrow>
            <h2 style={{ ...sectionH2, fontSize: 40 }}>
              Most AI projects create complexity. Few create revenue.
            </h2>
            <p style={sectionP}>
              Companies investing in AI for revenue operations run into the same three walls:
              tools that don&apos;t fit, projects that stall, and vendors who disappear after go-live.
              The result is a growing graveyard of expensive pilots that never touched a real
              customer.
            </p>
            <p style={{ ...sectionP, fontSize: 16 }}>
              Orchelix was built to close that gap — production-grade agents, deployed in weeks,
              with a consultant alongside you for as long as you need.
            </p>
          </div>

          {/* Right column — pain point cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {pains.map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: "24px 28px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.3,
                    letterSpacing: "-0.012em",
                    color: "var(--ink)",
                    margin: "0 0 8px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Our Approach ───────────────────────────────────────────────────── */

const methodSteps = [
  {
    label: "Discover",
    n: "01",
    title: "Map the workflow in depth.",
    desc: "A senior consultant joins your team to document the exact process we'll automate — the handoffs, exceptions, and edge cases that trip up generic tools. We leave with a signed-off blueprint, not a slide deck.",
    accent: "var(--teal-500)",
  },
  {
    label: "Design",
    n: "02",
    title: "Architect the right agent stack.",
    desc: "We select and configure the models, tools, memory layers, and guardrails for your specific workflow. Every architectural decision is tied to a measurable outcome — calls answered, leads qualified, invoices reconciled.",
    accent: "var(--teal-500)",
  },
  {
    label: "Deploy",
    n: "03",
    title: "Go live in 14 days.",
    desc: "Your first agent integrates with your existing phone system, inbox, CRM, or ERP. We run it in shadow mode first, validate outputs against your benchmarks, then flip the switch with you in the room.",
    accent: "var(--teal-500)",
  },
  {
    label: "Optimize",
    n: "04",
    title: "Improve continuously.",
    desc: "Every action is logged and reviewable. We tune prompts, retrain on your edge cases, and add the next agent only when the first one has demonstrably earned the expansion. No revenue left on the table, no runaway automation.",
    accent: "var(--teal-500)",
  },
];

function Approach() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "grid", gap: 18, maxWidth: 720, marginBottom: 64 }}>
          <Eyebrow>Our methodology</Eyebrow>
          <h2 style={sectionH2}>Discover. Design. Deploy. Optimize.</h2>
          <p style={sectionP}>
            A repeatable four-phase process that turns a messy revenue workflow into a
            production-grade AI system — with a consultant accountable at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
          {methodSteps.map((step, i) => (
            <div
              key={step.n}
              style={{
                position: "relative",
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "32px 28px 28px",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 28,
                  right: 28,
                  height: 2,
                  background: "linear-gradient(90deg, var(--teal-500), var(--teal-300))",
                  borderRadius: "0 0 2px 2px",
                }}
              />

              {/* Step number + label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--teal-700)",
                    background: "var(--teal-50)",
                    border: "1px solid var(--teal-100)",
                    borderRadius: 999,
                    padding: "5px 12px",
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 24,
                    lineHeight: 1,
                    color: "rgba(10,37,64,0.08)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.n}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.3,
                  letterSpacing: "-0.014em",
                  color: "var(--ink)",
                  margin: "0 0 12px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>

              {/* Step connector arrow — desktop only, all but last */}
              {i < methodSteps.length - 1 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -13,
                    transform: "translateY(-50%)",
                    width: 24,
                    height: 24,
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    color: "var(--teal-600)",
                    fontSize: 12,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Who We Are ─────────────────────────────────────────────────────── */

function WhoWeAre() {
  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,37,64,0.025), transparent 70%), var(--surface-2)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24"
          style={{ alignItems: "center", gap: 56 }}
        >
          {/* Left */}
          <div style={{ display: "grid", gap: 20 }}>
            <Eyebrow>Who we are</Eyebrow>
            <h2 style={{ ...sectionH2, fontSize: 40 }}>
              Senior operators. Not a help desk.
            </h2>
            <p style={sectionP}>
              Orchelix is a Toronto-based AI consulting firm led by practitioners with backgrounds
              in enterprise software, revenue operations, and applied AI. We&apos;ve built and
              scaled revenue systems — and we bring that operating experience into every engagement.
            </p>
            <p style={{ ...sectionP, fontSize: 16 }}>
              Each client works directly with a named senior consultant, not a rotating cast of
              account managers. Our specialist network — spanning LLM engineering, CRM integration,
              telephony, and accounting automation — is engaged on demand, not padded into a
              retainer you&apos;ll pay for regardless.
            </p>
            <p style={{ ...sectionP, fontSize: 16 }}>
              We operate in English and Spanish natively, serve clients across Canada and the
              United States, and maintain PIPEDA-compliant data practices from day one.
            </p>
          </div>

          {/* Right — attribute cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "Named senior lead",
                desc: "One consultant owns your engagement end-to-end.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
                  </svg>
                ),
                title: "Bilingual by default",
                desc: "English + Spanish natively. French on request.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                ),
                title: "PIPEDA-compliant",
                desc: "Canadian privacy law built into every system.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                ),
                title: "GTA-headquartered",
                desc: "On-site availability across Greater Toronto Area.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: "22px 20px",
                  boxShadow: "var(--shadow-sm)",
                  display: "grid",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: "linear-gradient(135deg, var(--teal-50) 0%, #fff 100%)",
                    border: "1px solid var(--teal-100)",
                    color: "var(--teal-700)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 10px -4px rgba(20,184,166,0.15)",
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 15,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Why Orchelix ───────────────────────────────────────────────────── */

const differentiators = [
  {
    label: "Real Oversight",
    title: "Human-in-the-loop, not human-out-of-the-loop.",
    desc: "Every agent action is reviewable, overridable, and auditable. You approve what gets automated and you coach the system when it misses — through a console designed for operators, not engineers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        <path d="M19 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
        <path d="m17 8 2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: "Revenue Focus",
    title: "We measure success in dollars, not tokens.",
    desc: "Our agents are scoped to revenue-generating workflows: qualified leads, booked meetings, closed deals, reconciled invoices. Every deployment ships with a revenue scorecard — not a dashboard of API calls.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: "Right-Sized Partnership",
    title: "Consultancy quality at software scale.",
    desc: "Flat-rate monthly pricing, no surprise project fees. Your senior consultant stays on retainer — available to tune, scale, or pivot the system as your business changes. Cancel anytime, keep everything.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
  },
];

function WhyOrchelix() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "grid", gap: 18, maxWidth: 680, marginBottom: 64 }}>
          <Eyebrow>Why Orchelix</Eyebrow>
          <h2 style={sectionH2}>Built like a consultancy. Priced like software.</h2>
          <p style={sectionP}>
            Three principles that separate a reliable revenue system from another expensive pilot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24 }}>
          {differentiators.map(({ label, title, desc, icon }) => (
            <div
              key={label}
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "36px 32px",
                display: "grid",
                gap: 16,
                alignContent: "start",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 15,
                  background: "linear-gradient(135deg, var(--navy-600) 0%, var(--navy-500) 100%)",
                  color: "var(--teal-400)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 20px -8px rgba(10,37,64,0.3)",
                }}
              >
                {icon}
              </div>

              {/* Label chip */}
              <span
                style={{
                  alignSelf: "start",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--teal-700)",
                  background: "var(--teal-50)",
                  border: "1px solid var(--teal-100)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  display: "inline-block",
                }}
              >
                {label}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: 1.28,
                  letterSpacing: "-0.016em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Track Record ───────────────────────────────────────────────────── */

const results = [
  {
    stat: "94%",
    detail: "of inbound calls resolved without human transfer",
  },
  {
    stat: "3.4×",
    detail: "average increase in qualified leads per sales rep",
  },
  {
    stat: "< 14 days",
    detail: "from contract signature to first live agent",
  },
  {
    stat: "100%",
    detail: "of deployments maintained PIPEDA compliance at launch",
  },
];

function TrackRecord() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--navy-600)",
        backgroundImage: `
          radial-gradient(ellipse 70% 80% at 100% 0%, rgba(20,184,166,0.18), transparent 55%),
          radial-gradient(ellipse 60% 60% at 0% 100%, rgba(20,184,166,0.10), transparent 50%),
          linear-gradient(160deg, #0A2540 0%, #081D33 100%)
        `,
        borderTop: "1px solid rgba(20,184,166,0.1)",
        borderBottom: "1px solid rgba(20,184,166,0.1)",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -100,
          top: -60,
          width: 380,
          height: 380,
          pointerEvents: "none",
          opacity: 0.04,
        }}
      >
        <Image
          src="/orchelix-mark-light.png"
          alt=""
          width={380}
          height={380}
          quality={40}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10"
        style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}
      >
        <div style={{ display: "grid", gap: 16, maxWidth: 620, marginBottom: 64 }}>
          <Eyebrow light>Our track record</Eyebrow>
          <h2 style={sectionH2Light}>
            Results that show up on a revenue report, not a vanity dashboard.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 2 }}>
          {results.map(({ stat, detail }, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
              }}
              className={i > 0 ? "border-l-0 sm:border-l border-t sm:border-t-0 border-white/[0.08]" : ""}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 42,
                  lineHeight: 1,
                  letterSpacing: "-0.028em",
                  color: "var(--teal-400)",
                  margin: "0 0 12px",
                }}
              >
                {stat}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                }}
              >
                {detail}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 12,
            color: "rgba(255,255,255,0.25)",
            marginTop: 40,
          }}
        >
          Based on deployments to date across Orchelix client engagements.
        </p>
      </div>
    </section>
  );
}

/* ─── 7. CTA Banner ─────────────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <section className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:gap-10"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--navy-700)",
            backgroundImage: `
              radial-gradient(ellipse 60% 100% at 100% 50%, rgba(20,184,166,0.28), transparent 65%),
              radial-gradient(ellipse 50% 90% at 0% 100%, rgba(20,184,166,0.12), transparent 60%),
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.10), transparent 70%),
              linear-gradient(135deg, #0A2540 0%, #051A31 100%)
            `,
            borderRadius: 26,
            padding: "48px 40px",
            color: "#fff",
            border: "1px solid rgba(20,184,166,0.18)",
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.08) inset,
              0 0 0 1px rgba(20,184,166,0.06),
              0 40px 100px -30px rgba(10,37,64,0.45),
              0 24px 60px -20px rgba(20,184,166,0.14)
            `,
          }}
        >
          {/* Grid overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.35,
              pointerEvents: "none",
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black, transparent 80%)",
            }}
          />
          {/* Watermark */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -60,
              top: -40,
              width: 280,
              height: 280,
              pointerEvents: "none",
              opacity: 0.06,
            }}
          >
            <Image
              src="/orchelix-mark-light.png"
              alt=""
              width={280}
              height={280}
              quality={40}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              className="text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: "-0.026em",
                margin: 0,
                maxWidth: 520,
                color: "#fff",
              }}
            >
              Ready to see what a real AI deployment looks like?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.72)",
                margin: "14px 0 0",
                maxWidth: 460,
              }}
            >
              Book a 30-minute strategy call with a senior consultant. We&apos;ll map one revenue
              workflow you can automate in under 14 days — at no cost to you.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-3 lg:ml-auto lg:shrink-0"
            style={{ position: "relative", zIndex: 1 }}
          >
            <a
              href="/try-esmi"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Try Esmi live
            </a>
            <a
              href="/book"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 24px",
                borderRadius: 12,
                background: "#fff",
                color: "var(--navy-600)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Book a strategy call
              <span style={{ fontSize: 14, opacity: 0.85 }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

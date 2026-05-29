import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Orchelix builds reliable AI systems that run revenue operations for SMEs — lead qualification, call handling, deal closing, and financial close with human oversight.",
};

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
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-[120px]">
      {/* Dot grid + teal radial — matches solutions/pricing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 78% 20%, rgba(20,184,166,0.07), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-line) 30%, var(--color-line) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <span
          className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
        >
          <span className="inline-block h-px w-[18px] bg-current opacity-70" />
          About Orchelix
        </span>

        <h1
          className="mt-7 mb-7 max-w-[860px] text-balance text-[38px] leading-[1.06] font-medium tracking-[-0.03em] sm:text-[54px] sm:leading-[1.04] lg:text-[66px] lg:leading-[1.02] lg:tracking-[-0.036em]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Building reliable AI systems that actually{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
          >
            run revenue operations.
          </span>
        </h1>

        <p
          className="mb-10 max-w-[580px] text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Orchelix deploys multi-agent AI systems that qualify leads, handle inbound
          calls, manage deal pipelines, and close the books — with a senior consultant
          overseeing every deployment and human-in-the-loop controls your team can trust.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(10,37,64,0.10)] transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
          >
            Book a strategy call <span className="ml-1.5 opacity-85">→</span>
          </a>
          <a
            href="/solutions"
            className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-surface-2"
            style={{
              fontFamily: "var(--font-display)",
              borderColor: "var(--line-strong)",
              background: "#fff",
              color: "var(--navy-600)",
            }}
          >
            See our agents
          </a>
        </div>

        {/* Stat strip */}
        <div
          className="mt-16 grid grid-cols-2 gap-y-8 border-t pt-10 lg:grid-cols-4"
          style={{ borderColor: "var(--line)" }}
        >
          {[
            { value: "14 days", label: "Average time to first live agent" },
            { value: "3 agents", label: "Revenue, Receptionist & Accounting" },
            { value: "PIPEDA", label: "Compliant from day one" },
            { value: "WPB-based", label: "Senior consultants, no help desk" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="text-[26px] font-semibold leading-none tracking-[-0.022em]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {value}
              </p>
              <p
                className="mt-2 text-[13px] leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
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
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              The problem
            </span>
            <h2
              className="text-[34px] font-semibold leading-[1.07] tracking-[-0.026em] sm:text-[42px] lg:text-[48px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Most AI projects create complexity. Few create revenue.
            </h2>
            <p
              className="text-[17px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Companies investing in AI for revenue operations run into the same three
              walls: tools that don&apos;t fit, projects that stall, and vendors who
              disappear after go-live. The result is a growing graveyard of expensive
              pilots that never touched a real customer.
            </p>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Orchelix was built to close that gap — production-grade agents, deployed
              in weeks, with a consultant alongside you for as long as you need.
            </p>
          </div>

          {/* Right — pain cards */}
          <div className="flex flex-col gap-4">
            {pains.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-[18px] border bg-white p-6 sm:p-7"
                style={{
                  borderColor: "var(--line)",
                  boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
                }}
              >
                <h3
                  className="mb-2 text-[15px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
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
  },
  {
    label: "Design",
    n: "02",
    title: "Architect the right agent stack.",
    desc: "We select and configure the models, tools, memory layers, and guardrails for your specific workflow. Every architectural decision is tied to a measurable outcome — calls answered, leads qualified, invoices reconciled.",
  },
  {
    label: "Deploy",
    n: "03",
    title: "Go live in 14 days.",
    desc: "Your first agent integrates with your existing phone system, inbox, CRM, or ERP. We run it in shadow mode first, validate outputs against your benchmarks, then flip the switch with you in the room.",
  },
  {
    label: "Optimize",
    n: "04",
    title: "Improve continuously.",
    desc: "Every action is logged and reviewable. We tune prompts, retrain on your edge cases, and add the next agent only when the first one has demonstrably earned the expansion. No revenue left on the table.",
  },
];

function Approach() {
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14">
          <span
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Our methodology
          </span>
          <h2
            className="mb-4 max-w-[680px] text-[34px] font-semibold leading-[1.07] tracking-[-0.026em] sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Discover. Design. Deploy. Optimize.
          </h2>
          <p
            className="max-w-[580px] text-[17px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            A repeatable four-phase process that turns a messy revenue workflow into a
            production-grade AI system — with a consultant accountable at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <div
              key={step.n}
              className="relative overflow-hidden rounded-[20px] border p-7"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
              }}
            >
              {/* Teal top accent */}
              <div
                className="absolute inset-x-7 top-0 h-[2px] rounded-b"
                style={{
                  background: "linear-gradient(90deg, var(--color-teal-500), var(--color-teal-300))",
                }}
              />

              {/* Label + ghost number */}
              <div className="mb-6 flex items-center justify-between">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--teal-700)",
                    background: "var(--color-teal-50)",
                    border: "1px solid var(--color-teal-100)",
                  }}
                >
                  {step.label}
                </span>
                <span
                  className="text-[22px] font-semibold leading-none tabular-nums"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "rgba(10,37,64,0.08)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.n}
                </span>
              </div>

              <h3
                className="mb-3 text-[17px] font-semibold leading-snug tracking-[-0.012em]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13.5px] leading-[1.7]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {step.desc}
              </p>

              {/* Connector arrow — desktop only, all but last */}
              {i < methodSteps.length - 1 && (
                <div
                  className="absolute top-1/2 -right-3 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-[12px] lg:flex"
                  style={{
                    borderColor: "var(--line)",
                    color: "var(--teal-600)",
                    zIndex: 2,
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
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              Who we are
            </span>
            <h2
              className="text-[34px] font-semibold leading-[1.07] tracking-[-0.026em] sm:text-[42px] lg:text-[48px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Senior operators. Not a help desk.
            </h2>
            <p
              className="text-[17px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Orchelix is a West Palm Beach-based AI consulting firm led by practitioners
              with backgrounds in enterprise software, revenue operations, and applied AI.
              We&apos;ve built and scaled revenue systems — and we bring that operating
              experience into every engagement.
            </p>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Each client works directly with a named senior consultant, not a rotating
              cast of account managers. Our specialist network — spanning LLM
              engineering, CRM integration, telephony, and accounting automation — is
              engaged on demand, not padded into a retainer.
            </p>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              We operate in English and Spanish natively, serve clients across South
              Florida, the GTA in Ontario, and all of North America, and maintain
              PIPEDA-compliant data practices from day one.
            </p>
          </div>

          {/* Right — attribute cards 2×2 */}
          <div className="grid grid-cols-2 gap-4">
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
                title: "WPB-headquartered",
                desc: "On-site in South Florida · GTA Ontario · remote across North America.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-[18px] border bg-white p-5 sm:p-6"
                style={{
                  borderColor: "var(--line)",
                  boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[11px]"
                  style={{
                    background: "linear-gradient(135deg, var(--color-teal-50) 0%, #fff 100%)",
                    border: "1px solid var(--color-teal-100)",
                    color: "var(--teal-700)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 10px -4px rgba(20,184,166,0.15)",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h3
                    className="mb-1 text-[14px] font-semibold leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.55]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                  >
                    {desc}
                  </p>
                </div>
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
    desc: "Every agent action is reviewable, overridable, and auditable. You approve what gets automated and coach the system when it misses — through a console designed for operators, not engineers.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: "Right-Sized Partnership",
    title: "Consultancy quality at software scale.",
    desc: "Flat-rate monthly pricing, no surprise project fees. Your senior consultant stays on retainer — available to tune, scale, or pivot the system as your business changes. Cancel anytime, keep everything.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
  },
];

function WhyOrchelix() {
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14">
          <span
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Why Orchelix
          </span>
          <h2
            className="mb-4 max-w-[640px] text-[34px] font-semibold leading-[1.07] tracking-[-0.026em] sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Built like a consultancy. Priced like software.
          </h2>
          <p
            className="max-w-[520px] text-[17px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            Three principles that separate a reliable revenue system from another
            expensive pilot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {differentiators.map(({ label, title, desc, icon }) => (
            <div
              key={label}
              className="flex flex-col gap-5 rounded-[20px] border p-7 sm:p-8"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
                boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
              }}
            >
              {/* Icon in navy tile */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-[14px]"
                style={{
                  background: "linear-gradient(135deg, var(--color-navy-600) 0%, var(--color-navy-500) 100%)",
                  color: "var(--teal-400)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 20px -8px rgba(10,37,64,0.30)",
                }}
              >
                {icon}
              </div>

              {/* Label chip */}
              <span
                className="inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--teal-700)",
                  background: "var(--color-teal-50)",
                  border: "1px solid var(--color-teal-100)",
                }}
              >
                {label}
              </span>

              <div>
                <h3
                  className="mb-3 text-[18px] font-semibold leading-[1.28] tracking-[-0.014em]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[14.5px] leading-[1.65]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Track Record ───────────────────────────────────────────────────── */

const results = [
  { stat: "24/7",      detail: "Every call answered — day, night, and weekends, in English and Spanish" },
  { stat: "< 14 days", detail: "From contract signature to your first live agent in production" },
  { stat: "Human-led", detail: "A senior consultant owns every deployment — no tier-one tickets" },
  { stat: "100%",      detail: "Of deployments PIPEDA-aligned at launch, with a full audit trail" },
];

function TrackRecord() {
  return (
    <section
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-[620px]">
          <span
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            How we operate
          </span>
          <h2
            className="mb-4 text-[34px] font-semibold leading-[1.07] tracking-[-0.026em] sm:text-[42px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Commitments that show up in your operations, not a vanity dashboard.
          </h2>
        </div>

        <div
          className="grid grid-cols-2 overflow-hidden rounded-[20px] border lg:grid-cols-4"
          style={{ borderColor: "var(--line)", background: "#fff" }}
        >
          {results.map(({ stat, detail }, i) => (
            <div
              key={i}
              className={[
                "p-7 sm:p-8",
                i > 0 ? "border-l" : "",
                i >= 2 ? "border-t lg:border-t-0" : "",
              ].filter(Boolean).join(" ")}
              style={{ borderColor: "var(--line)" }}
            >
              <p
                className="mb-2.5 text-[38px] font-semibold leading-none tracking-[-0.028em] sm:text-[44px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--teal-600)" }}
              >
                {stat}
              </p>
              <p
                className="text-[13.5px] leading-[1.55]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-6 text-[12px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
        >
          The baseline every Orchelix engagement is built to deliver.
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
          className="overflow-hidden rounded-[24px] p-10 sm:p-12 lg:p-16"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 100% 0%, rgba(20,184,166,0.18), transparent 60%),
              radial-gradient(ellipse 60% 80% at 0% 100%, rgba(20,184,166,0.10), transparent 60%),
              linear-gradient(180deg, #0D2238 0%, #061B33 100%)
            `,
            boxShadow:
              "0 40px 100px -30px rgba(10,37,64,0.55), 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <h2
                className="mb-4 text-[28px] font-semibold leading-[1.1] tracking-[-0.022em] text-white sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to see what a real AI deployment looks like?
              </h2>
              <p
                className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book a 30-minute strategy call with a senior consultant. We&apos;ll map
                one revenue workflow you can automate in under 14 days — at no cost to you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="/try-esmi"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Try Esmi live
              </a>
              <a
                href="/book"
                className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", color: "var(--navy-600)" }}
              >
                Book a strategy call <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

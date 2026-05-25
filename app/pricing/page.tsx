"use client";

import { useState } from "react";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

type Billing = "monthly" | "annual";

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <>
      <Nav />
      <main id="top">
        <PricingHero billing={billing} setBilling={setBilling} />
        <HybridModel />
        <Tiers billing={billing} />
        <CompareTable />
        <FAQ />
        <PricingFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function PricingHero({
  billing,
  setBilling,
}: {
  billing: Billing;
  setBilling: (b: Billing) => void;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-[132px] lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(20,184,166,0.08), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-line) 30%, var(--color-line) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[760px]">
        <span
          className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
        >
          <span className="inline-block h-px w-[18px] bg-current opacity-70" />
          Pricing
          <span className="inline-block h-px w-[18px] bg-current opacity-70" />
        </span>

        <h1
          className="mt-6 mb-6 text-balance text-[42px] leading-[1.05] font-medium tracking-[-0.032em] sm:text-[60px] sm:leading-[1.03] lg:text-[72px] lg:tracking-[-0.036em]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Pricing that grows with your{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
          >
            revenue
          </span>
          .
        </h1>

        <p
          className="mb-10 text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          We orchestrate intelligent agent systems that directly improve your
          bottom line — generating more revenue and reducing operational costs.
          Pay for the system that works for you.
        </p>

        {/* Billing toggle */}
        <div
          className="inline-flex rounded-[12px] border p-1"
          style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
          role="tablist"
          aria-label="Billing cadence"
        >
          {(["monthly", "annual"] as Billing[]).map((mode) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={billing === mode}
              onClick={() => setBilling(mode)}
              className="relative inline-flex items-center gap-2 rounded-[9px] px-5 py-2.5 text-[13px] font-medium transition-all"
              style={{
                fontFamily: "var(--font-display)",
                background: billing === mode ? "#fff" : "transparent",
                color: billing === mode ? "var(--ink)" : "var(--ink-3)",
                boxShadow:
                  billing === mode
                    ? "0 1px 3px rgba(10,37,64,0.10), 0 1px 0 rgba(10,37,64,0.04)"
                    : "none",
              }}
            >
              {mode === "monthly" ? "Monthly" : "Annual"}
              {mode === "annual" && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}
                >
                  SAVE 18%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Hybrid model explainer ─────────────────────────────────────────────── */

function HybridModel() {
  return (
    <section
      className="px-6 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--navy-500)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            How our pricing works
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
          </span>
          <p
            className="mx-auto mt-3 max-w-[560px] text-[16px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            We use a hybrid orchestration model designed around real business
            outcomes. This aligns our success with yours.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {[
            {
              num: "01",
              title: "Base Orchestration Fee",
              desc: "Covers system design, agent coordination, integrations, and ongoing optimization — the infrastructure that makes the system run.",
            },
            {
              num: "02",
              title: "Performance Component",
              desc: "Ties part of your investment to measurable results — qualified leads, appointments booked, or time saved — above an agreed baseline.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex gap-5 rounded-[18px] border bg-white p-6 sm:p-7"
              style={{
                borderColor: "var(--line)",
                boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
              }}
            >
              <span
                className="shrink-0 text-[13px] font-bold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--teal-500)" }}
              >
                {item.num}
              </span>
              <div>
                <div
                  className="mb-1.5 text-[15px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {item.title}
                </div>
                <p
                  className="text-[14px] leading-[1.6]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tiers ───────────────────────────────────────────────────────────────── */

type TierFeature = { head: string } | { text: string };

interface TierDef {
  id: string;
  name: string;
  sub: string;
  desc: string;
  monthly: string;
  annual: string;
  noteMonthly: string;
  noteAnnual: string;
  featured: boolean;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  features: TierFeature[];
}

const TIERS: TierDef[] = [
  {
    id: "pilot",
    name: "Pilot",
    sub: "01 / Prove it",
    desc: "Test and prove ROI with one orchestrated agent before committing to a larger system.",
    monthly: "$4,250",
    annual: "$3,475",
    noteMonthly: "Annual billing saves 18%.",
    noteAnnual: "Billed at $41,700/year · save 18%.",
    featured: false,
    ctaLabel: "Start with Pilot",
    ctaHref: "/book",
    features: [
      { text: "**1 fully orchestrated AI agent** (Esmi or custom workflow)" },
      { text: "System design, integrations, and initial coordination" },
      { text: "Defined success metrics and ROI tracking" },
      { text: "Monthly performance reviews and optimization" },
      { text: "Clear 60–90 day success criteria" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    sub: "02 / Run it",
    desc: "Your first orchestrated AI revenue system — agents that work together to move revenue forward.",
    monthly: "$8,500",
    annual: "$6,967",
    noteMonthly: "No long contracts. Cancel anytime.",
    noteAnnual: "Billed at $83,600/year · save 18%.",
    featured: true,
    badge: "Most popular",
    ctaLabel: "Book a demo",
    ctaHref: "/book",
    features: [
      { text: "**2–4 agents** orchestrated as one revenue system" },
      { text: "Full system design and ongoing orchestration" },
      { text: "Lead qualification + appointment setting workflows" },
      { text: "Human handoff protocols and performance reporting" },
      { text: "Monthly optimization focused on results" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    sub: "03 / Scale it",
    desc: "A complete orchestrated system managing revenue operations from first contact through financial close.",
    monthly: "$16,500",
    annual: "$13,500",
    noteMonthly: "Annual billing saves 18%.",
    noteAnnual: "Billed at $162,000/year · save 18%.",
    featured: false,
    ctaLabel: "Book a demo",
    ctaHref: "/book",
    features: [
      { text: "**Full multi-agent Revenue OS** — Receptionist + Sales-Ops + Finance" },
      { text: "Custom agent orchestration and advanced workflows" },
      { text: "Detailed analytics and performance dashboards" },
      { text: "Priority support and monthly strategy optimization" },
      { text: "Stronger performance component tied to results" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    sub: "04 / Custom",
    desc: "A tailored AI revenue operating system built around your specific goals and scale.",
    monthly: "Custom",
    annual: "Custom",
    noteMonthly: "Starting at $28,000+/month · scoped per engagement.",
    noteAnnual: "Starting at $28,000+/month · scoped per engagement.",
    featured: false,
    ctaLabel: "Talk to sales",
    ctaHref: "/book",
    features: [
      { text: "**Fully custom** multi-agent architecture" },
      { text: "Dedicated orchestration and success management" },
      { text: "Custom integrations and advanced workflows" },
      { text: "Flexible outcome-based components" },
      { text: "Quarterly business reviews and continuous optimization" },
      { text: "Custom KPIs tied to revenue, cost savings, or efficiency" },
    ],
  },
];

function bold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

function Tiers({ billing }: { billing: Billing }) {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, billing }: { tier: TierDef; billing: Billing }) {
  const price = billing === "monthly" ? tier.monthly : tier.annual;
  const note = billing === "monthly" ? tier.noteMonthly : tier.noteAnnual;
  const isCustom = price === "Custom";

  if (tier.featured) {
    return (
      <article
        className="relative overflow-hidden rounded-[22px] p-6 text-white"
        aria-labelledby={`tier-${tier.id}`}
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 100% 0%, rgba(20,184,166,0.18), transparent 60%),
            radial-gradient(ellipse 70% 50% at 0% 100%, rgba(20,184,166,0.10), transparent 60%),
            linear-gradient(180deg, #0D2238 0%, #061B33 100%)
          `,
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(20,184,166,0.12), 0 32px 80px -24px rgba(10,37,64,0.50), 0 20px 48px -16px rgba(20,184,166,0.20)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(180deg, black 0%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[20%] top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.50), transparent)",
          }}
        />

        <div className="relative">
          {tier.badge && (
            <span
              className="mb-5 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{
                background: "rgba(20,184,166,0.20)",
                color: "#5EEAD4",
                border: "1px solid rgba(20,184,166,0.25)",
              }}
            >
              {tier.badge}
            </span>
          )}

          <div className="mb-1 flex items-baseline justify-between">
            <div
              className="text-[21px] font-semibold tracking-[-0.018em] text-white"
              id={`tier-${tier.id}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tier.name}
            </div>
            <div
              className="text-[11px] font-medium text-teal-300/70"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tier.sub}
            </div>
          </div>

          <p
            className="mb-6 text-[13.5px] leading-[1.55] text-white/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tier.desc}
          </p>

          <div className="mb-6 border-t border-white/[0.08] pt-5">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[36px] font-semibold leading-none tracking-[-0.030em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {price}
              </span>
              {!isCustom && (
                <span
                  className="text-[13px] text-white/50"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  / mo
                </span>
              )}
            </div>
            <div
              className="mt-1.5 text-[11.5px] text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {note}
            </div>
          </div>

          <a
            href={tier.ctaHref}
            className="mb-6 flex h-11 items-center justify-center rounded-xl bg-white text-[14px] font-medium transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", color: "var(--navy-700)" }}
          >
            {tier.ctaLabel} <span className="ml-1.5 opacity-70">→</span>
          </a>

          <ul className="flex flex-col gap-3">
            {tier.features.map((f, i) =>
              "head" in f ? (
                <li
                  key={i}
                  className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-300/70"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {f.head}
                </li>
              ) : (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full"
                    style={{ background: "rgba(20,184,166,0.22)", color: "#5EEAD4" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l5 5 9-11" />
                    </svg>
                  </span>
                  <span
                    className="text-[13px] leading-[1.5] text-white/75"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {bold(f.text)}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex flex-col rounded-[22px] border p-6"
      aria-labelledby={`tier-${tier.id}`}
      style={{
        borderColor: "var(--line)",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(10,37,64,0.06), 0 1px 2px rgba(10,37,64,0.04)",
      }}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <div
          className="text-[21px] font-semibold tracking-[-0.018em]"
          id={`tier-${tier.id}`}
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {tier.name}
        </div>
        <div
          className="text-[11px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          {tier.sub}
        </div>
      </div>

      <p
        className="mb-6 text-[13.5px] leading-[1.55]"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
      >
        {tier.desc}
      </p>

      <div className="mb-6 border-t pt-5" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[36px] font-semibold leading-none tracking-[-0.030em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {price}
          </span>
          {!isCustom && (
            <span
              className="text-[13px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
            >
              / mo
            </span>
          )}
        </div>
        <div
          className="mt-1.5 text-[11.5px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          {note}
        </div>
      </div>

      <a
        href={tier.ctaHref}
        className="mb-6 flex h-11 items-center justify-center rounded-xl border text-[14px] font-medium transition-colors hover:bg-surface-2"
        style={{
          fontFamily: "var(--font-display)",
          borderColor: "var(--line-strong)",
          background: "#fff",
          color: "var(--navy-600)",
        }}
      >
        {tier.ctaLabel}
        {tier.id === "enterprise" && <span className="ml-1.5 opacity-70">→</span>}
      </a>

      <ul className="flex flex-col gap-3">
        {tier.features.map((f, i) =>
          "head" in f ? (
            <li
              key={i}
              className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
            >
              {f.head}
            </li>
          ) : (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 shrink-0 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full"
                style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l5 5 9-11" />
                </svg>
              </span>
              <span
                className="text-[13px] leading-[1.5]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {bold(f.text)}
              </span>
            </li>
          )
        )}
      </ul>
    </article>
  );
}

/* ─── Comparison table ───────────────────────────────────────────────────── */

type CellVal = string;

interface CompareRow {
  feat: string;
  hint?: string;
  pilot: CellVal;
  growth: CellVal;
  scale: CellVal;
  enterprise: CellVal;
}

interface CompareSection {
  section: string;
  rows: CompareRow[];
}

const COMPARE: CompareSection[] = [
  {
    section: "Agents & orchestration",
    rows: [
      { feat: "Agents included", pilot: "1 agent", growth: "2–4 agents", scale: "Revenue OS (3)", enterprise: "Custom (unlimited)" },
      { feat: "System design", pilot: "✓", growth: "✓", scale: "✓", enterprise: "Fully custom" },
      { feat: "Orchestration", hint: "Ongoing agent coordination", pilot: "Initial", growth: "Ongoing", scale: "Advanced", enterprise: "Dedicated" },
      { feat: "Custom workflows", pilot: "—", growth: "Combined", scale: "Full Revenue OS", enterprise: "Unlimited" },
    ],
  },
  {
    section: "Performance & reporting",
    rows: [
      { feat: "Success metrics & ROI tracking", pilot: "✓", growth: "✓", scale: "✓", enterprise: "✓" },
      { feat: "Performance component", hint: "Tied to qualified leads or bookings", pilot: "Basic", growth: "✓", scale: "Stronger", enterprise: "Outcome guarantees" },
      { feat: "Analytics dashboards", pilot: "Monthly scorecard", growth: "Performance reports", scale: "Advanced dashboards", enterprise: "Custom KPIs" },
    ],
  },
  {
    section: "Support & people",
    rows: [
      { feat: "Consultant access", pilot: "Monthly reviews", growth: "Monthly optimization", scale: "Priority support", enterprise: "Dedicated team" },
      { feat: "Business reviews", pilot: "Monthly", growth: "Monthly", scale: "Monthly strategy", enterprise: "Quarterly + monthly" },
      { feat: "Success criteria", pilot: "60–90 day window", growth: "Ongoing", scale: "Ongoing", enterprise: "Custom" },
    ],
  },
  {
    section: "Billing",
    rows: [
      { feat: "Monthly billing", pilot: "✓", growth: "✓", scale: "✓", enterprise: "Custom" },
      { feat: "Annual discount", pilot: "18%", growth: "18%", scale: "18%", enterprise: "Custom" },
    ],
  },
];

function Cell({ val, mid }: { val: CellVal; mid?: boolean }) {
  if (val === "✓") {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full"
        style={{ background: "var(--teal-50)", color: "var(--teal-600)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l5 5 9-11" />
        </svg>
      </span>
    );
  }
  if (val === "—") {
    return <span className="text-[14px]" style={{ color: "var(--ink-4)" }}>—</span>;
  }
  return (
    <span
      className="text-[13px] leading-snug"
      style={{
        fontFamily: "var(--font-display)",
        color: mid ? "var(--ink)" : "var(--ink-2)",
        fontWeight: mid ? 500 : 400,
      }}
    >
      {val}
    </span>
  );
}

function CompareTable() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[620px]">
          <span
            className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--navy-500)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Compare plans
          </span>
          <h2
            className="mb-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[38px] lg:text-[44px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            What&apos;s in each plan, side by side.
          </h2>
          <p
            className="text-[16px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            Agents, orchestration, performance, and people — pick the row that matters most to you.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[18px] border" style={{ borderColor: "var(--line)" }}>
          <table className="w-full min-w-[760px] border-collapse bg-white">
            <thead>
              <tr>
                <th
                  className="w-[28%] border-b py-4 pl-6 pr-4 text-left"
                  style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
                    Plan
                  </div>
                  <div className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                    Features
                  </div>
                </th>
                {[
                  { sub: "01 · Prove it", name: "Pilot", mid: false },
                  { sub: "02 · Run it · Most popular", name: "Growth", mid: true },
                  { sub: "03 · Scale it", name: "Scale", mid: false },
                  { sub: "04 · Custom", name: "Enterprise", mid: false },
                ].map(({ sub, name, mid }) => (
                  <th
                    key={name}
                    className="border-b py-4 px-3 text-center"
                    style={{
                      borderColor: "var(--line)",
                      background: mid ? "rgba(10,37,64,0.03)" : "var(--surface-2)",
                    }}
                  >
                    <div
                      className="truncate text-[10px] font-medium uppercase tracking-[0.12em]"
                      style={{ fontFamily: "var(--font-mono)", color: mid ? "var(--teal-600)" : "var(--ink-3)" }}
                    >
                      {sub}
                    </div>
                    <div className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                      {name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((group) => (
                <>
                  <tr key={group.section} style={{ background: "var(--surface-2)" }}>
                    <td
                      colSpan={5}
                      className="border-t py-2.5 pl-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
                      style={{ borderColor: "var(--line)", fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                    >
                      {group.section}
                    </td>
                  </tr>
                  {group.rows.map((row, ri) => (
                    <tr key={ri} className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-3.5 pl-6 pr-4 align-top">
                        <div className="text-[13.5px] font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                          {row.feat}
                        </div>
                        {row.hint && (
                          <div className="mt-0.5 text-[12px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}>
                            {row.hint}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center align-middle"><Cell val={row.pilot} /></td>
                      <td className="py-3.5 px-3 text-center align-middle" style={{ background: "rgba(10,37,64,0.02)" }}><Cell val={row.growth} mid /></td>
                      <td className="py-3.5 px-3 text-center align-middle"><Cell val={row.scale} /></td>
                      <td className="py-3.5 px-3 text-center align-middle"><Cell val={row.enterprise} /></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "How is the performance component calculated?",
    a: "We work with you during onboarding to define clear, trackable metrics (such as qualified leads or appointments booked). The performance component is then tied to results above an agreed baseline.",
  },
  {
    q: "Can I start with Pilot and upgrade later?",
    a: "Yes. Most clients begin with Pilot to validate results, then move to Growth once the impact is proven. Upgrades are designed to be seamless.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes. Paying annually saves 18% compared to monthly billing across all tiers.",
  },
  {
    q: "What if I need something more custom?",
    a: "Our Enterprise tier is fully customizable. We'll work with you to design a system and pricing model aligned with your specific revenue goals.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* Intro */}
          <div>
            <span
              className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              Frequently asked
            </span>
            <h2
              className="mb-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Answers, before you ask.
            </h2>
            <p
              className="mb-8 text-[16px] leading-[1.6]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              If a question isn&apos;t here, talk to a senior consultant — not
              a chatbot. We answer the same day.
            </p>

            <div
              className="rounded-[18px] border p-6"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <div
                className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
              >
                Still deciding?
              </div>
              <p
                className="mb-4 text-[14px] leading-[1.55]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                Book a 30-minute strategy call with a senior Orchelix
                consultant. No deck, no slides — just your workflow.
              </p>
              <a
                href="/book"
                className="inline-flex h-9 items-center rounded-[10px] px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
              >
                Book a strategy call →
              </a>
            </div>
          </div>

          {/* Questions */}
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderColor: "var(--line)" }}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span
                    className="text-[15px] font-semibold leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="mt-0.5 shrink-0 text-[18px] leading-none transition-transform"
                    style={{
                      color: "var(--ink-3)",
                      transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openIdx === i && (
                  <p
                    className="pb-5 text-[14.5px] leading-[1.65]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────────────────────────── */

function PricingFinalCTA() {
  return (
    <section
      className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]"
      style={{ borderTop: "1px solid var(--line)" }}
    >
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
                Ready to orchestrate your revenue operations?
              </h2>
              <p
                className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let&apos;s build a system that delivers measurable results for
                your business.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="/book"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book a strategy call
              </a>
              <a
                href="/book"
                className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", color: "var(--navy-600)" }}
              >
                Start with Pilot <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

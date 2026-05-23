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
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
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
          Pay for the work it{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            actually does
          </span>
          .
        </h1>

        <p
          className="mb-10 text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          A senior consultant, a focused two-week pilot, and a plan that grows
          with the agents you trust. No long contracts. Cancel anytime.
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

/* ─── Tiers ───────────────────────────────────────────────────────────────── */

type TierFeature =
  | { head: string }
  | { text: string };

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
  ctaPrimary: boolean;
  features: TierFeature[];
}

const TIERS: TierDef[] = [
  {
    id: "pilot",
    name: "Pilot",
    sub: "01 / Prove it",
    desc: "One agent, one workflow, instrumented end-to-end in two weeks. Read the scorecard, then decide.",
    monthly: "$2,400",
    annual: "$1,950",
    noteMonthly: "14-day deployment included.",
    noteAnnual: "Billed annually · 14-day deployment included.",
    featured: false,
    ctaLabel: "Start a pilot",
    ctaHref: "#book-pilot",
    ctaPrimary: false,
    features: [
      { text: "**One Orchelix agent** of your choice — Receptionist, Revenue-Ops, or Finance" },
      { text: "Up to **1,500 agent actions** / month" },
      { text: "EN · ES bilingual out of the box" },
      { head: "Included" },
      { text: "Senior consultant, weekly check-in" },
      { text: "Operator console + full audit log" },
      { text: "One CRM or ledger integration" },
      { text: "Monday-morning scorecard, email + PDF" },
    ],
  },
  {
    id: "operate",
    name: "Operate",
    sub: "02 / Run it",
    desc: "A full revenue-operations stack — three agents, one console, a senior consultant on the line.",
    monthly: "$5,800",
    annual: "$4,750",
    noteMonthly: "No long contracts. Cancel anytime.",
    noteAnnual: "Billed annually · save $12,600/yr.",
    featured: true,
    badge: "Most popular",
    ctaLabel: "Book a demo",
    ctaHref: "#book-operate",
    ctaPrimary: true,
    features: [
      { text: "**All three agents** — Receptionist, Revenue-Ops, and Finance OS" },
      { text: "Up to **10,000 agent actions** / month" },
      { text: "EN · ES bilingual + French add-on available" },
      { head: "Everything in Pilot, plus" },
      { text: "**Dedicated senior consultant** with a 4-hour SLA" },
      { text: "Unlimited integrations — CRM, ledger, calendar, phone" },
      { text: "Monthly business review with revenue scorecard" },
      { text: "PIPEDA-aligned audit trail · data residency on request" },
      { text: "Priority phone & Slack support" },
    ],
  },
  {
    id: "orchestrate",
    name: "Orchestrate",
    sub: "03 / Scale it",
    desc: "For multi-location operators and professional firms — custom workflows, SSO, and a named delivery team.",
    monthly: "Custom",
    annual: "Custom",
    noteMonthly: "From $14k/mo · scoped per engagement.",
    noteAnnual: "From $14k/mo · scoped per engagement.",
    featured: false,
    ctaLabel: "Talk to sales",
    ctaHref: "#contact-sales",
    ctaPrimary: false,
    features: [
      { text: "**Unlimited agents** across multiple locations or business units" },
      { text: "**Volume agent actions** — scaled to your operations" },
      { text: "EN · ES · FR + custom language tuning" },
      { head: "Everything in Operate, plus" },
      { text: "**Named delivery team** — consultant + engineer + analyst" },
      { text: "Custom integrations & bespoke agent workflows" },
      { text: "SSO, role-based access, and approval workflows" },
      { text: "SOC 2 reports, MSA, custom DPA" },
      { text: "1-hour SLA · 24/7 on-call escalation" },
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
        className="relative overflow-hidden rounded-[22px] p-7 text-white"
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
        {/* Grid texture */}
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
            background:
              "linear-gradient(90deg, transparent, rgba(20,184,166,0.50), transparent)",
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
              className="text-[22px] font-semibold tracking-[-0.018em] text-white"
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
            className="mb-6 text-[14px] leading-[1.55] text-white/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tier.desc}
          </p>

          <div className="mb-7 border-t border-white/[0.08] pt-6">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[40px] font-semibold leading-none tracking-[-0.030em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {price}
              </span>
              {!isCustom && (
                <span
                  className="text-[14px] text-white/50"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  / month
                </span>
              )}
            </div>
            <div
              className="mt-1.5 text-[12px] text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {note}
            </div>
          </div>

          <a
            href={tier.ctaHref}
            className="mb-7 flex h-11 items-center justify-center rounded-xl bg-white text-[14px] font-medium transition-opacity hover:opacity-90"
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
                    className="text-[13.5px] leading-[1.5] text-white/75"
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
      className="flex flex-col rounded-[22px] border p-7"
      aria-labelledby={`tier-${tier.id}`}
      style={{
        borderColor: "var(--line)",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(10,37,64,0.06), 0 1px 2px rgba(10,37,64,0.04)",
      }}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <div
          className="text-[22px] font-semibold tracking-[-0.018em]"
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
        className="mb-6 text-[14px] leading-[1.55]"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
      >
        {tier.desc}
      </p>

      <div
        className="mb-7 border-t pt-6"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[40px] font-semibold leading-none tracking-[-0.030em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {price}
          </span>
          {!isCustom && (
            <span
              className="text-[14px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
            >
              / month
            </span>
          )}
        </div>
        <div
          className="mt-1.5 text-[12px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          {note}
        </div>
      </div>

      <a
        href={tier.ctaHref}
        className="mb-7 flex h-11 items-center justify-center rounded-xl border text-[14px] font-medium transition-colors hover:bg-surface-2"
        style={{
          fontFamily: "var(--font-display)",
          borderColor: "var(--line-strong)",
          background: "#fff",
          color: "var(--navy-600)",
        }}
      >
        {tier.ctaLabel}
        {tier.id === "orchestrate" && <span className="ml-1.5 opacity-70">→</span>}
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
                className="text-[13.5px] leading-[1.5]"
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

type CellVal = string; // "✓" | "—" | other text

interface CompareRow {
  feat: string;
  hint?: string;
  pilot: CellVal;
  operate: CellVal;
  orchestrate: CellVal;
}

interface CompareSection {
  section: string;
  rows: CompareRow[];
}

const COMPARE: CompareSection[] = [
  {
    section: "Agents & capacity",
    rows: [
      { feat: "Agents included", hint: "Receptionist · Revenue-Ops · Finance OS", pilot: "1 of your choice", operate: "All 3", orchestrate: "Unlimited" },
      { feat: "Agent actions / month", hint: "Calls answered, deals processed, lines reconciled", pilot: "1,500", operate: "10,000", orchestrate: "Volume" },
      { feat: "Languages", pilot: "EN · ES", operate: "EN · ES (+ FR add-on)", orchestrate: "EN · ES · FR + custom" },
      { feat: "Locations / business units", pilot: "1", operate: "Up to 3", orchestrate: "Unlimited" },
    ],
  },
  {
    section: "Integrations",
    rows: [
      { feat: "CRM, ledger, calendar, phone", pilot: "1 integration", operate: "Unlimited", orchestrate: "Unlimited + custom" },
      { feat: "Bespoke workflows", hint: "Agents shaped to your exact process", pilot: "—", operate: "2 / quarter", orchestrate: "Unlimited" },
      { feat: "API access", pilot: "—", operate: "✓", orchestrate: "✓" },
    ],
  },
  {
    section: "People & service",
    rows: [
      { feat: "Senior consultant", hint: "Named human you can call", pilot: "Weekly check-in", operate: "Dedicated", orchestrate: "Named delivery team" },
      { feat: "Support SLA", pilot: "Next business day", operate: "4 hours", orchestrate: "1 hour · 24/7" },
      { feat: "Business review", pilot: "Weekly scorecard", operate: "Monthly review", orchestrate: "QBRs + monthly" },
    ],
  },
  {
    section: "Security & compliance",
    rows: [
      { feat: "PIPEDA-aligned audit trail", pilot: "✓", operate: "✓", orchestrate: "✓" },
      { feat: "Data residency on request", pilot: "—", operate: "✓", orchestrate: "✓" },
      { feat: "SSO & role-based access", pilot: "—", operate: "—", orchestrate: "✓" },
      { feat: "SOC 2 report · custom DPA · MSA", pilot: "—", operate: "On request", orchestrate: "✓" },
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
    return (
      <span
        className="text-[14px]"
        style={{ color: "var(--ink-4)" }}
      >
        —
      </span>
    );
  }
  return (
    <span
      className="text-[13.5px] leading-snug"
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
            className="mb-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.024em] sm:text-[40px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            What&apos;s in each plan, side by side.
          </h2>
          <p
            className="text-[16px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            Everything we ship — agents, integrations, controls, and people.
            Pick the row that matters most to you.
          </p>
        </div>

        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto rounded-[18px] border" style={{ borderColor: "var(--line)" }}>
          <table className="w-full min-w-[640px] border-collapse bg-white">
            <thead>
              <tr>
                <th
                  className="w-[40%] border-b py-4 pl-6 pr-4 text-left"
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
                  { sub: "01 · Prove it", name: "Pilot" },
                  { sub: "02 · Run it · Most popular", name: "Operate", mid: true },
                  { sub: "03 · Scale it", name: "Orchestrate" },
                ].map(({ sub, name, mid }) => (
                  <th
                    key={name}
                    className="border-b py-4 px-4 text-center"
                    style={{
                      borderColor: "var(--line)",
                      background: mid ? "rgba(10,37,64,0.03)" : "var(--surface-2)",
                    }}
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.12em] truncate" style={{ fontFamily: "var(--font-mono)", color: mid ? "var(--teal-600)" : "var(--ink-3)" }}>
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
                      colSpan={4}
                      className="border-t py-2.5 pl-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
                      style={{
                        borderColor: "var(--line)",
                        fontFamily: "var(--font-mono)",
                        color: "var(--ink-3)",
                      }}
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
                      <td className="py-3.5 px-4 text-center align-middle">
                        <Cell val={row.pilot} />
                      </td>
                      <td className="py-3.5 px-4 text-center align-middle" style={{ background: "rgba(10,37,64,0.02)" }}>
                        <Cell val={row.operate} mid />
                      </td>
                      <td className="py-3.5 px-4 text-center align-middle">
                        <Cell val={row.orchestrate} />
                      </td>
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
    q: "What does a two-week pilot actually look like?",
    a: "Week one, a senior consultant sits with your team and writes the workflow we'll automate. Week two, your first agent goes live in your tools — phone, inbox, CRM, or ledger — with a scorecard you can read on Monday morning. We measure against the goal you set at kickoff. If it doesn't move the number, we don't move forward.",
  },
  {
    q: 'What counts as an "agent action"?',
    a: "A discrete piece of work the agent performs: a call answered, a lead qualified, a transaction reconciled, a follow-up sent. Read-only operations and internal sync don't count. We show your live action count in the operator console — no surprise overages.",
  },
  {
    q: "What happens if we exceed our monthly actions?",
    a: "Nothing breaks. We notify you at 80% and your consultant works with you on the right next step — staying on the same tier, adding a top-up pack, or moving up. No service interruptions, no surprise charges.",
  },
  {
    q: "Are there setup fees?",
    a: "No. The 14-day deployment is included in every plan. Custom integrations on Orchestrate are scoped separately, but anything in our standard connector library (CRMs, ledgers, calendars, phone, email) is included.",
  },
  {
    q: "Can we start small and add agents later?",
    a: "That's exactly how most clients onboard. Begin with the agent that has the clearest payback for you, then add the next one when the first has earned the room. Same console, same consultant, no re-platforming.",
  },
  {
    q: "How are you different from a generic AI assistant?",
    a: "Orchelix is a multi-agent system with operator-grade controls — every action is logged, every workflow is human-reviewable, and a senior consultant owns the deployment with you. We're a consultancy that ships software, not a chatbot with a billing page.",
  },
  {
    q: "Where is data stored, and who can see it?",
    a: "Data is encrypted in transit and at rest, stored in Canadian or US regions by default, and Canadian data residency is available on Operate and Orchestrate by request. PIPEDA-aligned by default. SOC 2 audit in progress; reports available on Orchestrate.",
  },
  {
    q: "What if we want to cancel?",
    a: "Monthly plans cancel anytime, effective end of cycle. Annual plans cancel with 30 days' notice. You keep export access to every agent action and audit log for 60 days after cancellation.",
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

            {/* Help card */}
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
                Book a 30-minute call with a senior Orchelix consultant. No
                deck, no slides — just your workflow.
              </p>
              <a
                href="#book"
                className="inline-flex h-9 items-center rounded-[10px] px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
              >
                Book a call →
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
                Start with one agent. Pay for itself in 30 days.
              </h2>
              <p
                className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A focused two-week pilot, a senior consultant on the line, and
                a scorecard you can read on Monday morning. Add the next agent
                only when the first one has earned the room.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Talk to a consultant
              </a>
              <a
                href="#book"
                className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", color: "var(--navy-600)" }}
              >
                Book a demo <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

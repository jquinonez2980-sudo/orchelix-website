"use client";

import { useState } from "react";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <PricingHero />
        <HowItWorks />
        <Tiers />
        <FAQ />
        <PricingFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function PricingHero() {
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
          Custom AI Agents That Capture Leads, Scale Sales &{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
          >
            Automate Operations
          </span>
          .
        </h1>

        <p
          className="mb-10 text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Production-grade AI agent systems built with LangGraph. Setup + monthly managed service.
          Works across North America.
        </p>

        <a
          href="/book"
          className="inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
        >
          Book a Free Strategy Call
        </a>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

function HowItWorks() {
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
            Our process
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
          </span>
          <p
            className="mx-auto mt-3 max-w-[560px] text-[16px] leading-[1.6]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            From your first call to ongoing optimization — a clear, managed process every step of the way.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {[
            {
              num: "01",
              title: "Discovery Call",
              desc: "Free 30-minute call to understand your workflows and goals.",
            },
            {
              num: "02",
              title: "Custom Build",
              desc: "We design and train agents specifically for your business.",
            },
            {
              num: "03",
              title: "Launch & Train",
              desc: "We deploy the system and train your team.",
            },
            {
              num: "04",
              title: "Monthly Optimization",
              desc: "Ongoing monitoring, improvements, and support.",
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
  setupPrice: string;
  monthlyNote: string;
  featured: boolean;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  idealFor: string;
  features: TierFeature[];
}

const TIERS: TierDef[] = [
  {
    id: "esmi",
    name: "Esmi AI Virtual Receptionist & Lead Qualification System",
    sub: "01",
    desc: "24/7 AI agent that qualifies inbound leads, answers FAQs, books appointments, and escalates when needed — via voice, SMS, and email. EN/ES bilingual.",
    setupPrice: "$8,500",
    monthlyNote: "From $1,099 / mo · managed service",
    featured: true,
    badge: "Most Popular",
    ctaLabel: "Get Started with Esmi",
    ctaHref: "/book",
    idealFor: "Any business that receives inbound leads or inquiries.",
    features: [
      { text: "**Custom LangGraph AI agent** (voice + SMS + email)" },
      { text: "Advanced lead qualification with scoring and routing" },
      { text: "FAQ answering trained on your business" },
      { text: "Appointment booking + calendar sync" },
      { text: "CRM or Google Workspace integration" },
      { text: "Custom Streamlit dashboard with analytics" },
      { text: "Monthly monitoring, optimization & updates" },
      { text: "Human-in-the-loop design with escalation paths" },
    ],
  },
  {
    id: "sales",
    name: "Revenue Operations Agents",
    sub: "02",
    desc: "AI sales co-pilot that enriches leads, scores them against your ICP, runs personalized follow-ups, preps meetings, and keeps your pipeline clean — with human approvals.",
    setupPrice: "$9,500",
    monthlyNote: "From $1,299 / mo · managed service",
    featured: false,
    ctaLabel: "Get the Sales Assistant",
    ctaHref: "/book",
    idealFor: "Sales teams and businesses with active lead flow.",
    features: [
      { text: "Lead enrichment & research agent" },
      { text: "Qualification scoring based on your ICP" },
      { text: "Personalized follow-up sequence agent" },
      { text: "Meeting preparation summaries" },
      { text: "Pipeline hygiene & deal stage automation" },
      { text: "CRM integration & automated logging" },
      { text: "Custom sales dashboard" },
      { text: "Monthly optimization and performance reporting" },
      { text: "Human-in-the-loop approvals" },
    ],
  },
  {
    id: "firmos",
    name: 'Custom Multi-Agent Operations System ("Firm OS")',
    sub: "03 / Firm OS",
    desc: "A coordinated team of 2–4 AI agents handling lead qualification, sales, document processing, and financial operations — all sharing memory under one dashboard.",
    setupPrice: "$24,000",
    monthlyNote: "From $2,499 / mo · managed service · phased delivery",
    featured: false,
    ctaLabel: "Book a Free Strategy Call",
    ctaHref: "/book",
    idealFor: "Growing businesses ready for coordinated AI operations.",
    features: [
      { text: "**2–4 orchestrated AI agents** (lead qualification + sales + document processing + financial ops)" },
      { text: "Shared memory across agents" },
      { text: "Central custom Streamlit oversight dashboard" },
      { text: "Deep integrations with your existing tools" },
      { text: "Bookkeeping automation module (categorization, invoice extraction, reconciliation)" },
      { text: "Advanced guardrails and audit logs" },
      { text: "Monthly strategy calls + continuous optimization" },
      { text: "Full team training and documentation" },
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

function Tiers() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IdealFor({ text, featured }: { text: string; featured: boolean }) {
  return featured ? (
    <div
      className="mt-5 pt-4 border-t border-white/[0.08] text-[12px] leading-[1.5] text-white/40"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span className="font-semibold text-white/55 uppercase tracking-[0.07em] text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>Ideal for · </span>
      {text}
    </div>
  ) : (
    <div
      className="mt-5 pt-4 border-t text-[12px] leading-[1.5]"
      style={{ borderColor: "var(--line)", fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
    >
      <span className="font-semibold uppercase tracking-[0.07em] text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>Ideal for · </span>
      {text}
    </div>
  );
}

function TierCard({ tier }: { tier: TierDef }) {
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

          <div className="mb-1">
            <div
              className="text-[11px] font-medium text-teal-300/70 mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tier.sub}
            </div>
            <div
              className="text-[18px] font-semibold tracking-[-0.018em] text-white leading-snug"
              id={`tier-${tier.id}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tier.name}
            </div>
          </div>

          <p
            className="mb-6 mt-3 text-[13.5px] leading-[1.55] text-white/60"
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
                {tier.setupPrice}
              </span>
              <span
                className="text-[13px] text-white/50"
                style={{ fontFamily: "var(--font-display)" }}
              >
                setup
              </span>
            </div>
            <div
              className="mt-1.5 text-[11.5px] text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tier.monthlyNote}
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

          <IdealFor text={tier.idealFor} featured />
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
      <div className="mb-1">
        <div
          className="text-[11px] font-medium mb-1"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          {tier.sub}
        </div>
        <div
          className="text-[18px] font-semibold tracking-[-0.018em] leading-snug"
          id={`tier-${tier.id}`}
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {tier.name}
        </div>
      </div>

      <p
        className="mb-6 mt-3 text-[13.5px] leading-[1.55]"
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
            {tier.setupPrice}
          </span>
          <span
            className="text-[13px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
          >
            setup
          </span>
        </div>
        <div
          className="mt-1.5 text-[11.5px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          {tier.monthlyNote}
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

      <IdealFor text={tier.idealFor} featured={false} />
    </article>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "How long does it take to launch?",
    a: "Esmi and the Sales Assistant typically launch in 2–3 weeks. The Firm OS uses phased delivery, with the first phase live in 4–6 weeks.",
  },
  {
    q: "Can I start with one system and add more later?",
    a: "Yes. Many clients begin with Esmi and later expand to the Sales Assistant or Firm OS.",
  },
  {
    q: "Do you offer bookkeeping automation?",
    a: "Yes. It's available as a module inside the Firm OS and can be added to other packages.",
  },
  {
    q: "What happens after launch?",
    a: "You receive monthly monitoring, optimization, updates, and support as part of the managed service.",
  },
  {
    q: "Can I cancel the monthly service?",
    a: "Yes. The monthly managed service is flexible — no long-term contracts required.",
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
                Ready to Get Started?
              </h2>
              <p
                className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book a free 30-minute strategy call to find the best system for your business.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="/book"
                className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", color: "var(--navy-600)" }}
              >
                Book a Free Strategy Call <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import JsonLd from "@/app/components/JsonLd";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import { ESMI_PILOT_PAYMENT_LINK } from "@/app/lib/pilotPayment";

const SITE_URL = "https://www.orchelix.com";

/* CTA hrefs:
     - "Start a pilot" is the real $149 one-time payment — the live Stripe
       Payment Link (ESMI_PILOT_PAYMENT_LINK), which redirects to
       /book?pilot=success on completion (configured in Stripe).
     - "Book a walkthrough" / "Talk to us" are conversations, so they go to
       the existing Cal.com booking page (/book), same as every other CTA
       on the site. */
const PILOT_HREF = ESMI_PILOT_PAYMENT_LINK;
const WALKTHROUGH_HREF = "/book?intent=demo";
const SCALE_HREF = "/book?intent=scale";

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function PricingPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Nav />
      <main id="top">
        <PricingHero />
        <Plans />
        <PilotStrip />
        <HowItWorks />
        <Included />
        <AddOns />
        <FAQ />
        <PricingFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── shared bits ─────────────────────────────────────────────────────────── */

function Eyebrow({ children, color = "var(--teal-700)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
      style={{ fontFamily: "var(--font-mono)", color }}
    >
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
      {children}
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
    </span>
  );
}

function CheckIcon({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className="mt-0.5 shrink-0 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full"
      style={
        tone === "dark"
          ? { background: "rgba(20,184,166,0.22)", color: "#5EEAD4" }
          : { background: "var(--teal-50)", color: "var(--teal-700)" }
      }
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l5 5 9-11" />
      </svg>
    </span>
  );
}

const PRIMARY_BTN =
  "inline-flex h-12 items-center justify-center rounded-xl px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90";
const GHOST_BTN =
  "inline-flex h-12 items-center justify-center rounded-xl border px-7 text-[15px] font-medium transition-colors hover:bg-surface-2";

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
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--color-line) 30%, var(--color-line) 70%, transparent 100%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[760px]">
        <Eyebrow>Pricing</Eyebrow>

        <h1
          className="mt-6 mb-6 text-balance text-[38px] leading-[1.08] font-medium tracking-[-0.032em] sm:text-[54px] sm:leading-[1.05] lg:text-[64px] lg:tracking-[-0.036em]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          AI receptionist that answers, books, and{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
          >
            proves it
          </span>
          .
        </h1>

        <p
          className="mx-auto mb-10 max-w-[600px] text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Esmi handles the phone and web chat, books into your real calendars,
          and shows every call, appointment, and lead in one dashboard.
          White-glove setup included — you don&apos;t build anything.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={PILOT_HREF} className={PRIMARY_BTN} style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}>
            Start a 7-day pilot
          </a>
          <a
            href={WALKTHROUGH_HREF}
            className={GHOST_BTN}
            style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", background: "#fff", color: "var(--navy-600)" }}
          >
            Book a 15-min walkthrough
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Plans ───────────────────────────────────────────────────────────────── */

type PlanFeature = string;

interface PlanDef {
  id: string;
  name: string;
  price: string;
  /* One-time setup fee, shown as a secondary line under the monthly price
     on every plan card (Option B — explicit, not buried only in fine
     print). Scale's is genuinely "Custom" — never invent a dollar amount
     for work that hasn't been scoped. */
  setup: string;
  featured: boolean;
  features: PlanFeature[];
  ctaLabel: string;
  ctaHref: string;
}

const PLANS: PlanDef[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$299",
    setup: "$499 setup (one-time)",
    featured: false,
    features: [
      "300 minutes included, $0.25/min overage",
      "1 local number, Voice only",
      "Booking on 1 calendar",
      "Full dashboard — calls, recordings, appointments, leads, overview",
      "Standard knowledge base",
      "White-glove setup",
      "Email support",
    ],
    ctaLabel: "Start 7-day pilot",
    ctaHref: PILOT_HREF,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$599",
    setup: "$799 setup (one-time)",
    featured: true,
    features: [
      "800 minutes included, $0.20/min overage",
      "Up to 2 numbers, Voice + web chat",
      "Multi-location calendar booking & rescheduling",
      "Full dashboard, expanded knowledge base",
      "White-glove setup",
      "Priority support",
    ],
    ctaLabel: "Start 7-day pilot",
    ctaHref: PILOT_HREF,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$999",
    setup: "Custom setup",
    featured: false,
    features: [
      "1,500 minutes included, $0.15/min overage",
      "3+ numbers, Voice + chat + priority routing",
      "Multi-location + booking rules, multi-org dashboard",
      "Custom knowledge base + quarterly tuning",
      "White-glove setup + playbook",
      "Shared support channel",
    ],
    ctaLabel: "Talk to us",
    ctaHref: SCALE_HREF,
  },
];

function Plans() {
  return (
    <section id="plans" className="scroll-mt-20 px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 text-center">
          <Eyebrow color="var(--navy-500)">Plans</Eyebrow>
          <h2
            className="mx-auto mt-3 max-w-[640px] text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[34px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Every plan gets the full dashboard.
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
            Pick a starting point by call volume — every tier scales up when you do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[720px] text-center text-[12.5px] leading-[1.7]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}>
          Month-to-month available. Annual billing: 2 months free and setup waived.
          One-time setup covers number, calendar, knowledge base, and go-live onboarding.
          Pilot: $149 for 7 days includes setup; credited to your first invoice if you
          continue. Minutes are voice minutes; unused minutes do not roll over. Taxes
          extra where applicable.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: PlanDef }) {
  if (plan.featured) {
    return (
      <article
        className="relative flex flex-col overflow-hidden rounded-[22px] p-6 text-white sm:-mt-3 sm:mb-3 sm:p-7"
        aria-labelledby={`plan-${plan.id}`}
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
          style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.50), transparent)" }}
        />

        <div className="relative flex flex-1 flex-col">
          <span
            className="mb-5 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ background: "rgba(20,184,166,0.20)", color: "#5EEAD4", border: "1px solid rgba(20,184,166,0.25)" }}
          >
            Most popular
          </span>

          <div
            id={`plan-${plan.id}`}
            className="text-[19px] font-semibold tracking-[-0.018em] leading-snug text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {plan.name}
          </div>

          <div className="mb-6 mt-4 border-t border-white/[0.08] pt-5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[36px] font-semibold leading-none tracking-[-0.030em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                {plan.price}
              </span>
              <span className="text-[13px] text-white/50" style={{ fontFamily: "var(--font-display)" }}>
                / mo
              </span>
            </div>
            <div className="mt-1.5 text-[12px]" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.45)" }}>
              + {plan.setup}
            </div>
          </div>

          <a
            href={plan.ctaHref}
            className="mb-6 flex h-11 items-center justify-center rounded-xl bg-white text-[14px] font-medium transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", color: "var(--navy-700)" }}
          >
            {plan.ctaLabel} <span className="ml-1.5 opacity-70">→</span>
          </a>

          <ul className="flex flex-col gap-3">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckIcon tone="dark" />
                <span className="text-[13px] leading-[1.5] text-white/75" style={{ fontFamily: "var(--font-display)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex flex-col rounded-[22px] border p-6 sm:p-7"
      aria-labelledby={`plan-${plan.id}`}
      style={{ borderColor: "var(--line)", background: "#fff", boxShadow: "0 2px 8px rgba(10,37,64,0.06), 0 1px 2px rgba(10,37,64,0.04)" }}
    >
      <div id={`plan-${plan.id}`} className="text-[19px] font-semibold tracking-[-0.018em] leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        {plan.name}
      </div>

      <div className="mb-6 mt-4 border-t pt-5" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-semibold leading-none tracking-[-0.030em]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            {plan.price}
          </span>
          <span className="text-[13px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}>
            / mo
          </span>
        </div>
        <div className="mt-1.5 text-[12px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}>
          + {plan.setup}
        </div>
      </div>

      <a
        href={plan.ctaHref}
        className="mb-6 flex h-11 items-center justify-center rounded-xl border text-[14px] font-medium transition-colors hover:bg-surface-2"
        style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", background: "#fff", color: "var(--navy-600)" }}
      >
        {plan.ctaLabel}
      </a>

      <ul className="flex flex-col gap-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckIcon />
            <span className="text-[13px] leading-[1.5]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ─── Pilot strip ─────────────────────────────────────────────────────────── */

function PilotStrip() {
  return (
    <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-10" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
        <div>
          <Eyebrow>7-day pilot</Eyebrow>
          <h2 className="mt-3 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[28px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Try Esmi on your real line for 7 days.
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-[15px] leading-[1.6] lg:mx-0" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
            $149 for 7 days — includes white-glove setup. Credited to your first
            month if you continue. Includes one number, up to 75 minutes, one
            calendar, full dashboard, and an end-of-pilot review.
          </p>
        </div>
        <a href={PILOT_HREF} className={`${PRIMARY_BTN} shrink-0`} style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}>
          Start 7-day pilot
        </a>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

const STEPS = [
  { num: "01", title: "We learn your business", desc: "Hours, services, FAQs, and calendars." },
  { num: "02", title: "We go live", desc: "Number, agent, booking, and dashboard login." },
  { num: "03", title: "You see everything", desc: "After-hours calls, bookings, leads, and recordings." },
];

function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center">
          <Eyebrow color="var(--navy-500)">How it works</Eyebrow>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
          {STEPS.map((item) => (
            <div
              key={item.num}
              className="flex gap-5 rounded-[18px] border bg-white p-6 sm:p-7"
              style={{ borderColor: "var(--line)", boxShadow: "0 2px 8px rgba(10,37,64,0.05)" }}
            >
              <span className="shrink-0 text-[13px] font-bold tabular-nums" style={{ fontFamily: "var(--font-mono)", color: "var(--teal-500)" }}>
                {item.num}
              </span>
              <div>
                <div className="mb-1.5 text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {item.title}
                </div>
                <p className="text-[14px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
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

/* ─── Included on every plan ─────────────────────────────────────────────── */

const INCLUDED = [
  "Natural voice, 24/7",
  "Live calendar book & reschedule",
  "Human escalation",
  "Recordings & transcripts",
  "Appointments & leads inbox",
  "After-hours on Overview",
];

function Included() {
  return (
    <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-10" style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1000px] text-center">
        <Eyebrow>Included on every plan</Eyebrow>
        <div className="mx-auto mt-6 flex max-w-[820px] flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {INCLUDED.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 text-[13.5px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Add-ons ─────────────────────────────────────────────────────────────── */

const ADD_ONS = [
  { label: "Extra number", price: "$49/mo" },
  { label: "Extra 500 minutes", price: "$99" },
  { label: "Bilingual EN/ES", price: "$99/mo" },
  { label: "CRM / HighLevel wiring", price: "Custom" },
];

function AddOns() {
  return (
    <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-10" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1000px] text-center">
        <Eyebrow color="var(--navy-500)">Add-ons</Eyebrow>
        <div className="mx-auto mt-6 grid max-w-[820px] grid-cols-2 gap-3 sm:grid-cols-4">
          {ADD_ONS.map((a) => (
            <div key={a.label} className="rounded-[14px] border px-4 py-4" style={{ borderColor: "var(--line)", background: "#fff" }}>
              <div className="text-[13px] leading-[1.4]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
                {a.label}
              </div>
              <div className="mt-1.5 text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                {a.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "Do I need technical staff to set this up?",
    a: "No. Setup is white-glove — Orchelix configures your number, agent, knowledge base, and calendar for you. You review it before it goes live; you don't build anything.",
  },
  {
    q: "Does Esmi book real appointments, or just take messages?",
    a: "Real appointments. Esmi reads your live Google Calendar availability and books, reschedules, or cancels directly on it — no message gets left for someone to call back and manually enter.",
  },
  {
    q: "What happens when Esmi can't handle something?",
    a: "It escalates to a human — by call transfer or notification, depending on your setup — with the context of the conversation so far, so nobody has to repeat themselves.",
  },
  {
    q: "Can I keep my existing phone number?",
    a: "Each plan includes new local number(s) provisioned for Esmi. Forwarding your existing number to it (or porting it over) is usually possible — tell us your setup and we'll confirm during onboarding.",
  },
  {
    q: "Is there a contract?",
    a: "No. Every plan is month-to-month, cancel anytime — plus a one-time setup fee (covers your number, calendar, knowledge base, and go-live onboarding; Scale's is custom-scoped). Pay annually instead and get 2 months free, and that setup fee is waived entirely.",
  },
  {
    q: "What happens if I go over my included minutes?",
    a: "You're billed the plan's per-minute overage rate for the extra minutes. Esmi never stops answering calls because you've hit a limit — overage is a line on the invoice, not a service interruption.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24" style={{ borderTop: "1px solid var(--line)" }}>
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 text-center">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[560px] text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[34px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Answers, before you ask.
          </h2>
        </div>

        <div className="mx-auto max-w-[820px]">
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderColor: "var(--line)" }}>
                <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex w-full items-start justify-between gap-4 py-5 text-left">
                  <span className="text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                    {faq.q}
                  </span>
                  <span
                    className="mt-0.5 shrink-0 text-[18px] leading-none transition-transform"
                    style={{ color: "var(--ink-3)", transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {openIdx === i && (
                  <p className="pb-5 text-[14.5px] leading-[1.65]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
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
    <section className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div
          className="overflow-hidden rounded-[24px] p-10 sm:p-12 lg:p-16"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 100% 0%, rgba(20,184,166,0.18), transparent 60%),
              radial-gradient(ellipse 60% 80% at 0% 100%, rgba(20,184,166,0.10), transparent 60%),
              linear-gradient(180deg, #0D2238 0%, #061B33 100%)
            `,
            boxShadow: "0 40px 100px -30px rgba(10,37,64,0.55), 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-4 text-[28px] font-semibold leading-[1.1] tracking-[-0.022em] text-white sm:text-[34px] lg:text-[40px]" style={{ fontFamily: "var(--font-display)" }}>
                Stop losing after-hours revenue.
              </h2>
              <p className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]" style={{ fontFamily: "var(--font-display)" }}>
                Start a 7-day pilot on your real line, or talk it through with us first — either way, nothing goes live until you say so.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a href={PILOT_HREF} className={PRIMARY_BTN} style={{ fontFamily: "var(--font-display)", background: "#fff", color: "var(--navy-600)" }}>
                Start pilot <span className="ml-1.5 opacity-70">→</span>
              </a>
              <a
                href={WALKTHROUGH_HREF}
                className="inline-flex h-12 items-center justify-center rounded-xl border px-7 text-[15px] font-medium text-white/88 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)", borderColor: "rgba(255,255,255,0.18)" }}
              >
                Book walkthrough
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

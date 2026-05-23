import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "How It Works — Orchelix AI Consulting",
  description:
    "From first call to your first agent in 14 days. Map the workflow, deploy in two weeks, audit every action, and scale on your timeline — with a senior consultant on the line.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <HWHero />
        <StepMap />
        <StepDeploy />
        <StepAudit />
        <StepScale />
        <Guarantees />
        <HIWFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function HWHero() {
  const steps = [
    { num: "01", label: "Week 1 · Discovery", name: "Map the workflow", href: "#step-1" },
    { num: "02", label: "Days 8–14 · Build",  name: "Deploy in 14 days", href: "#step-2" },
    { num: "03", label: "From day 1 · Live",  name: "Audit every action", href: "#step-3" },
    { num: "04", label: "Day 31 onward",       name: "Scale on your timeline", href: "#step-4" },
  ];

  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-0 sm:px-8 sm:pt-28 lg:px-10 lg:pt-[132px]">
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

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="max-w-[720px] pb-16 sm:pb-20">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            How Orchelix works
          </span>

          <h1
            className="mt-6 mb-6 text-balance text-[40px] leading-[1.05] font-medium tracking-[-0.030em] sm:text-[56px] sm:leading-[1.03] lg:text-[68px] lg:leading-[1.02] lg:tracking-[-0.034em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            From first call to your first agent{" "}
            <span
              className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              in 14 days
            </span>
            .
          </h1>

          <p
            className="mb-10 max-w-[560px] text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            A senior consultant, a focused two-week pilot, and an audit trail
            your operators actually want to use. Add the next agent only when
            the first one has earned the room.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/book"
              className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(10,37,64,0.10)] transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
            >
              Book a demo <span className="ml-1.5 opacity-85">→</span>
            </a>
            <a
              href="#step-1"
              className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-surface-2"
              style={{
                fontFamily: "var(--font-display)",
                borderColor: "var(--line-strong)",
                background: "#fff",
                color: "var(--navy-600)",
              }}
            >
              See the process
            </a>
          </div>
        </div>

        {/* 4-step strip */}
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-t-[18px] border-x border-t lg:grid-cols-4"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}
        >
          {steps.map((s) => (
            <a
              key={s.num}
              href={s.href}
              className="group flex items-center gap-4 bg-white px-5 py-5 transition-colors hover:bg-surface-2"
              style={{ textDecoration: "none" }}
            >
              <span
                className="shrink-0 text-[13px] font-bold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--teal-500)" }}
              >
                {s.num}
              </span>
              <span>
                <span
                  className="block text-[10.5px] font-medium uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                >
                  {s.label}
                </span>
                <span
                  className="block text-[13.5px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {s.name}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Shared step components ─────────────────────────────────────────────── */

function StepNum({ big, label }: { big: string; label: string }) {
  return (
    <div
      className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span
        className="text-[13px] font-bold tabular-nums"
        style={{ color: "var(--teal-500)" }}
      >
        {big}
      </span>
      <span className="inline-block h-1 w-1 rounded-full" style={{ background: "var(--teal-400)" }} />
      <span style={{ color: "var(--ink-3)" }}>{label}</span>
    </div>
  );
}

function StepFeature({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  const content = parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p);
  return (
    <li className="flex gap-3">
      <span
        className="mt-0.5 shrink-0 inline-flex h-[20px] w-[20px] items-center justify-center rounded-full"
        style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l5 5 9-11" />
        </svg>
      </span>
      <span
        className="text-[14px] leading-[1.6]"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
      >
        {content}
      </span>
    </li>
  );
}

function StepMeta({ items }: { items: { k: string; v: string }[] }) {
  return (
    <div
      className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[12px] border px-5 py-4 text-[13px]"
      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.10em" }}>
            {item.k}
          </span>
          <span style={{ fontFamily: "var(--font-display)", color: "var(--ink)", fontWeight: 600, fontSize: 13 }}>
            {item.v}
          </span>
        </span>
      ))}
    </div>
  );
}

function FigurePanel({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-[22px] border border-white/[0.08] p-5 text-white sm:p-6"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 100% 0%, rgba(20,184,166,0.14), transparent 60%),
          radial-gradient(ellipse 70% 50% at 0% 100%, rgba(20,184,166,0.08), transparent 60%),
          linear-gradient(180deg, #102C44 0%, #061B33 100%)
        `,
        boxShadow: `
          0 1px 0 rgba(255,255,255,0.10) inset,
          0 0 0 1px rgba(20,184,166,0.08),
          0 40px 100px -30px rgba(10,37,64,0.55),
          0 24px 60px -20px rgba(20,184,166,0.18)
        `,
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-[20%] top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.45), transparent)" }}
      />
      <div className="relative">
        <div
          className="mb-4 flex items-center gap-2.5 border-b border-white/[0.06] pb-[14px] text-[11px] font-medium tracking-[0.02em] text-white/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_0_3px_rgba(20,184,166,0.20)]" />
            <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
            <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
          </div>
          <span>{title}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[10px] tracking-[0.04em] text-teal-200">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
            {tag}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── Step 01: Map the workflow ──────────────────────────────────────────── */

function StepMap() {
  return (
    <section id="step-1" className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <StepNum big="01" label="Week 1 · Discovery" />
            <div>
              <h2 className="mb-2 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                Map the workflow.
              </h2>
              <p className="text-[17px] font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}>
                A senior consultant. Your team. One workflow on the wall.
              </p>
            </div>
            <p className="text-[16px] leading-[1.65]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              We start in a room — physical or virtual — with the people who
              actually do the work. We trace the workflow end-to-end, document
              the rules that live in your team's heads, and write a one-page
              scope that we'll both hold ourselves to.
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                "**Workshop with your operators** — two 90-minute sessions, not a six-week discovery.",
                "**One workflow, end-to-end.** We resist scope creep so the pilot can prove itself.",
                "**A success scorecard** — the numbers we'll both grade the agent against on Monday morning.",
                "**Edge cases and exceptions** — the awkward 8% that breaks generic AI. Written down, mapped, and owned.",
              ].map((t) => <StepFeature key={t} text={t} />)}
            </ul>
            <StepMeta items={[{ k: "Duration", v: "~5 business days" }, { k: "Output", v: "Signed one-page scope" }]} />
          </div>

          {/* Workflow board — light-themed */}
          <div
            aria-hidden="true"
            className="rounded-[22px] border p-6"
            style={{
              borderColor: "var(--line)",
              background: "#fff",
              boxShadow: "0 8px 24px rgba(10,37,64,0.08), 0 2px 4px rgba(10,37,64,0.04)",
            }}
          >
            <div
              className="mb-4 flex items-center gap-2.5 border-b pb-4 text-[11px] font-medium tracking-[0.02em]"
              style={{ fontFamily: "var(--font-mono)", borderColor: "var(--line)", color: "var(--ink-3)" }}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--teal-400)" }} />
              <span>discovery · riverstone clinic · receptionist</span>
              <span
                className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-semibold"
                style={{ background: "var(--teal-50)", color: "var(--teal-700)", border: "1px solid var(--teal-100)" }}
              >
                scope draft
              </span>
            </div>

            {/* Flow nodes */}
            <div className="mb-5 flex items-center gap-2">
              {[
                { label: "Inbound call", icon: <path d="M21.5 16.5v2.6a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h2.6a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L7.3 9a16 16 0 0 0 6 6l1.13-1.14a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.7a2 2 0 0 1 1.72 2.03Z" />, teal: true },
                { label: "Intake & qualify", icon: <><path d="M3 5h18M3 12h18M3 19h12"/></>, teal: false },
                { label: "Book in calendar", icon: <><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>, teal: false },
              ].map((node, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                      <path d="M0 4h13M10 1l3 3-3 3" stroke="var(--line-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <div
                    className="flex flex-1 flex-col items-center gap-1.5 rounded-[12px] border p-3"
                    style={{
                      borderColor: node.teal ? "var(--teal-200)" : "var(--line)",
                      background: node.teal ? "var(--teal-50)" : "var(--surface-2)",
                      minWidth: 80,
                    }}
                  >
                    <span style={{ color: node.teal ? "var(--teal-600)" : "var(--ink-3)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {node.icon}
                      </svg>
                    </span>
                    <span className="text-center text-[11px] font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
                      {node.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky notes */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { k: "Scope · v1", v: <><strong>Esmi</strong> answers inbound calls and books new-patient appointments in EN/ES.</>, pinned: true },
                { k: "Rules", v: "Same-day urgent → page on-call. Spanish-only callers → keep ES through booking.", pinned: false },
                { k: "Success metric", v: <><strong>≥ 85%</strong> booked without human handoff at 30 days.</>, pinned: false },
              ].map((note) => (
                <div
                  key={note.k}
                  className="rounded-[10px] p-3.5"
                  style={{
                    background: note.pinned ? "rgba(20,184,166,0.06)" : "var(--surface-2)",
                    border: `1px solid ${note.pinned ? "var(--teal-100)" : "var(--line)"}`,
                  }}
                >
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)", color: note.pinned ? "var(--teal-600)" : "var(--ink-3)" }}>
                    {note.k}
                  </div>
                  <div className="text-[12.5px] leading-[1.55]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
                    {note.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Step 02: Deploy in 14 days ─────────────────────────────────────────── */

function StepDeploy() {
  const phases = [
    { n: "✓", name: "Discovery & scope", sub: "Workshops · success scorecard signed off", days: "Days 1 – 3", done: true, active: false },
    { n: "✓", name: "Integrations wired", sub: "Phone · Google Calendar · HubSpot", days: "Days 4 – 7", done: true, active: false },
    { n: "3", name: "Agent training & shadow mode", sub: "Real calls · draft-only · daily review", days: "Days 8 – 12", done: false, active: true },
    { n: "4", name: "Go-live & handover", sub: "Live line · first Monday scorecard", days: "Days 13 – 14", done: false, active: false },
  ];

  return (
    <section id="step-2" className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32" style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 lg:order-2">
            <StepNum big="02" label="Days 8–14 · Build" />
            <div>
              <h2 className="mb-2 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                Deploy in 14 days.
              </h2>
              <p className="text-[17px] font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}>
                Your first agent lives in your existing tools, not a new one.
              </p>
            </div>
            <p className="text-[16px] leading-[1.65]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              We wire the agent into the phone line, inbox, CRM, or ledger you
              already use. By day fourteen it's handling real work alongside
              your team — in shadow mode first, then on the live line — with a
              scorecard you can read on Monday morning.
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                "**Native integrations** — your CRM, calendar, phone, and ledger. No CSV exports, no parallel systems.",
                "**Trained in your voice.** The agent learns from real call transcripts, real emails, and real client notes.",
                "**Shadow mode before live.** The agent listens and drafts for two days. Your team reviews. Then we go live.",
                "**Daily standup with your consultant** during build week. Fifteen minutes. No status decks.",
              ].map((t) => <StepFeature key={t} text={t} />)}
            </ul>
            <StepMeta items={[{ k: "Duration", v: "14 calendar days" }, { k: "Outcome", v: "Agent in production" }]} />
          </div>

          <div className="lg:order-1">
            <FigurePanel title="deployment · 14-day plan" tag="on track · day 9">
              {/* Day grid */}
              <div className="mb-4">
                <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-400/80" style={{ fontFamily: "var(--font-mono)" }}>
                  Days 1 → 14
                </div>
                <div className="mb-1.5 grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
                  {Array.from({ length: 14 }, (_, i) => {
                    const done = i < 8;
                    const now = i === 8;
                    return (
                      <div key={i} className="h-3 rounded-sm"
                        style={{
                          background: now ? "#14B8A6" : done ? "rgba(20,184,166,0.50)" : "rgba(255,255,255,0.08)",
                          boxShadow: now ? "0 0 6px 2px rgba(20,184,166,0.40)" : "none",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="grid grid-cols-14 gap-1 text-[9px] text-white/25" style={{ gridTemplateColumns: "repeat(14, 1fr)", fontFamily: "var(--font-mono)" }}>
                  {Array.from({ length: 14 }, (_, i) => <span key={i} className="text-center">{i + 1}</span>)}
                </div>
              </div>

              {/* Phases */}
              <div className="flex flex-col gap-2">
                {phases.map((ph) => (
                  <div
                    key={ph.n}
                    className="flex items-start gap-3 rounded-[11px] px-3.5 py-3"
                    style={{
                      background: ph.active ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.04)",
                      border: ph.active ? "1px solid rgba(20,184,166,0.22)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        background: ph.done ? "rgba(20,184,166,0.25)" : ph.active ? "#14B8A6" : "rgba(255,255,255,0.08)",
                        color: ph.done || ph.active ? "#fff" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {ph.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: ph.active ? "rgba(255,255,255,0.95)" : ph.done ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.45)" }}>
                        {ph.name}
                      </div>
                      <div className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{ph.sub}</div>
                    </div>
                    <span className="shrink-0 text-[10px] text-white/30 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{ph.days}</span>
                  </div>
                ))}
              </div>
            </FigurePanel>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Step 03: Audit every action ────────────────────────────────────────── */

function StepAudit() {
  const rows = [
    {
      icon: <><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
      body: "Esmi booked appointment · Maria S.",
      sub: "EN/ES bilingual · Riverstone Clinic · auto-confirmed",
      time: "9:41a",
      pills: [{ label: "Approve", variant: "default" as const }],
      flag: false,
    },
    {
      icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>,
      body: "Revenue-Ops qualified lead · Acme HVAC",
      sub: "Score 92 · brief sent to rep · 3-touch sequence queued",
      time: "9:38a",
      pills: [{ label: "Brief sent", variant: "teal" as const }],
      flag: false,
    },
    {
      icon: <><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></>,
      body: "Finance flagged · Staples expense",
      sub: "New vendor · suggests acct 6310 · needs your call",
      time: "9:32a",
      pills: [{ label: "Approve", variant: "default" as const }, { label: "Override", variant: "default" as const }, { label: "Coach", variant: "warn" as const }],
      flag: true,
    },
    {
      icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>,
      body: "Esmi sent follow-up · Carolina M.",
      sub: "SMS confirm · ES · new patient intake form attached",
      time: "9:28a",
      pills: [{ label: "Approve", variant: "default" as const }],
      flag: false,
    },
  ];

  const pillStyle = (variant: "default" | "teal" | "warn") => {
    if (variant === "teal") return { background: "rgba(20,184,166,0.18)", color: "#5EEAD4", border: "1px solid rgba(20,184,166,0.22)" };
    if (variant === "warn") return { background: "rgba(234,179,8,0.14)", color: "#FDE68A", border: "1px solid rgba(234,179,8,0.18)" };
    return { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.10)" };
  };

  return (
    <section id="step-3" className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <StepNum big="03" label="From day 1 · Live" />
            <div>
              <h2 className="mb-2 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                Audit every action.
              </h2>
              <p className="text-[17px] font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}>
                Approve, override, or coach the agent in one click.
              </p>
            </div>
            <p className="text-[16px] leading-[1.65]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              Every call answered, email sent, and ledger line touched is logged
              with a timestamp and a reason. Your operators see what the agent
              did and why — and can correct it without writing a single rule.
              Coaching is a typed sentence, not a JIRA ticket.
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                "**One operator console.** One feed for every agent's actions, across every workflow.",
                "**Approve, override, or coach** — three buttons, every action. No engineer needed to change agent behaviour.",
                "**PIPEDA-aligned audit trail** — attributable, immutable, exportable. Auditors love it.",
                "**Monday-morning scorecard** — email + PDF, with the numbers that matter to your business, not vanity metrics.",
              ].map((t) => <StepFeature key={t} text={t} />)}
            </ul>
            <StepMeta items={[{ k: "Tools", v: "Operator console" }, { k: "SLA", v: "4-hour consultant response" }]} />
          </div>

          <FigurePanel title="operator console · activity" tag="live · 3 agents">
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-400/80" style={{ fontFamily: "var(--font-mono)" }}>
              Today · 247 actions
            </div>
            <div className="flex flex-col gap-2">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-start gap-2.5 rounded-[11px] px-3.5 py-3"
                  style={{
                    background: row.flag ? "rgba(234,179,8,0.05)" : "rgba(255,255,255,0.04)",
                    border: row.flag ? "1px solid rgba(234,179,8,0.14)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="mt-0.5 shrink-0" style={{ color: row.flag ? "#FDE68A" : "rgba(20,184,166,0.8)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {row.icon}
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-white/85" style={{ fontFamily: "var(--font-display)" }}>{row.body}</div>
                    <div className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{row.sub}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {row.pills.map((pill) => (
                        <span
                          key={pill.label}
                          className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                          style={pillStyle(pill.variant)}
                        >
                          {pill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-white/35" style={{ fontFamily: "var(--font-mono)" }}>{row.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.06] overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.02]">
              {[
                { l: "Auto-approved", v: "94", u: "%" },
                { l: "Overrides today", v: "4", u: "/ 247" },
                { l: "Coachings written", v: "2", u: "applied" },
              ].map((s) => (
                <div key={s.l} className="px-3 py-2.5">
                  <div className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>{s.l}</div>
                  <div className="mt-1 text-[14px] font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
                    {s.v} <span className="text-[11px] font-medium text-teal-400">{s.u}</span>
                  </div>
                </div>
              ))}
            </div>
          </FigurePanel>
        </div>
      </div>
    </section>
  );
}

/* ─── Step 04: Scale on your timeline ───────────────────────────────────── */

function StepScale() {
  return (
    <section id="step-4" className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32" style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 lg:order-2">
            <StepNum big="04" label="Day 31 onward" />
            <div>
              <h2 className="mb-2 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                Scale on your timeline.
              </h2>
              <p className="text-[17px] font-medium leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}>
                Add the next agent only when the first has earned the room.
              </p>
            </div>
            <p className="text-[16px] leading-[1.65]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
              No big-bang rollouts, no platform migrations. The second agent
              inherits the integrations, the audit trail, and the consultant
              who already knows your business. Most clients add their next
              agent in month four — not because we pushed, but because the
              first one made the case for itself.
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                "**Same console, same consultant.** Your senior contact carries the context forward — no re-onboarding.",
                "**One audit trail across agents.** Receptionist, Revenue-Ops, Finance — one operator pane of glass.",
                "**Pause anytime.** Monthly plans cancel end of cycle. No long contracts, no lock-in.",
                "**Multi-location ready.** When you're scoping more than three locations, Orchestrate plugs in without a rebuild.",
              ].map((t) => <StepFeature key={t} text={t} />)}
            </ul>
            <StepMeta items={[{ k: "Typical path", v: "+1 agent in month 4" }, { k: "Contract", v: "Monthly · cancel anytime" }]} />
          </div>

          <div className="lg:order-1">
            <FigurePanel title="orchelix · agent stack · month 5" tag="scaling · 2 live">
              <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-teal-400/80" style={{ fontFamily: "var(--font-mono)" }}>
                Your agent stack
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    tag: "Live · month 1", name: "Esmi · Virtual Receptionist",
                    meta: "412 calls · 87% auto-resolved", num: "412", delta: "↑ 18%",
                    live: true,
                    path: "M0 44 L20 40 L40 42 L60 32 L80 35 L100 26 L120 28 L140 18 L160 22 L180 12 L200 14",
                    fill: "M0 44 L20 40 L40 42 L60 32 L80 35 L100 26 L120 28 L140 18 L160 22 L180 12 L200 14 L200 56 L0 56 Z",
                    gradId: "sg1",
                  },
                  {
                    tag: "Live · month 4", name: "Revenue-Ops · Sales & Marketing",
                    meta: "312 leads · 11min response", num: "312", delta: "↑ 22%",
                    live: true,
                    path: "M0 48 L25 44 L50 46 L75 36 L100 32 L125 28 L150 22 L175 16 L200 10",
                    fill: "M0 48 L25 44 L50 46 L75 36 L100 32 L125 28 L150 22 L175 16 L200 10 L200 56 L0 56 Z",
                    gradId: "sg2",
                  },
                  {
                    tag: "Queued · planning month 6", name: "Accounting & Finance OS",
                    meta: "Discovery booked · 14-day deploy", num: "—", delta: "soon",
                    live: false,
                    path: "M0 40 L25 40 L50 40 L75 40 L100 40 L125 40 L150 40 L175 40 L200 40",
                    fill: null,
                    gradId: "sg3",
                  },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-4 rounded-[14px] p-4"
                    style={{
                      background: agent.live ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.03)",
                      border: agent.live ? "1px solid rgba(20,184,166,0.18)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={agent.live
                            ? { background: "rgba(20,184,166,0.20)", color: "#5EEAD4" }
                            : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.40)" }
                          }
                        >
                          {agent.tag}
                        </span>
                      </div>
                      <div className="text-[13px] font-semibold text-white/85 leading-snug" style={{ fontFamily: "var(--font-display)" }}>{agent.name}</div>
                      <div className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{agent.meta}</div>
                    </div>
                    <div className="shrink-0 w-[100px]">
                      <div className="text-[13px] font-semibold mb-1" style={{ fontFamily: "var(--font-display)", color: agent.live ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.30)" }}>
                        {agent.num} <span className="text-[11px] font-medium" style={{ color: agent.live ? "#5EEAD4" : "rgba(255,255,255,0.25)" }}>{agent.delta}</span>
                      </div>
                      <svg viewBox="0 0 200 56" preserveAspectRatio="none" className="h-8 w-full">
                        <defs>
                          <linearGradient id={agent.gradId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#14B8A6" stopOpacity={agent.live ? "0.40" : "0"} />
                            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {agent.fill && <path d={agent.fill} fill={`url(#${agent.gradId})`} />}
                        <path d={agent.path} fill="none"
                          stroke={agent.live ? "#5EEAD4" : "rgba(255,255,255,0.15)"}
                          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                          strokeDasharray={agent.live ? undefined : "3 4"}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.06] overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.02]">
                {[
                  { k: "Months live", v: "5" },
                  { k: "Same consultant", v: "D. Reyes" },
                  { k: "Contract", v: "Monthly" },
                ].map((s) => (
                  <div key={s.k} className="px-3 py-2.5">
                    <div className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>{s.k}</div>
                    <div className="mt-1 text-[13px] font-semibold text-white/85" style={{ fontFamily: "var(--font-display)" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </FigurePanel>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Guarantees ──────────────────────────────────────────────────────────── */

const GUARANTEES = [
  {
    h: "A senior consultant, by name.",
    p: "Every deployment is led by a senior operator you can call directly — no tier-one tickets, no 48-hour reply windows.",
    stat: { v: "4", u: "h", l: "Standard response SLA" },
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  },
  {
    h: "PIPEDA-aligned from day one.",
    p: "Operator-grade controls, retention rules, and an audit trail your clients' auditors will actually accept. Data residency by request.",
    stat: { v: "100", u: "%", l: "Of actions logged & attributable" },
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  },
  {
    h: "Human-in-the-loop, always.",
    p: "Approve, override, or coach any agent in one click. You decide what gets automated — and what still waits for you.",
    stat: { v: "3", u: "", l: "Buttons. One per action." },
    icon: <><path d="M11 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><path d="m17 8 2 2 4-4"/></>,
  },
  {
    h: "Bilingual from day one.",
    p: "Every agent speaks English and Spanish natively, with French available — the languages your North American customers actually use.",
    stat: { v: "EN", u: " · ES · FR", l: "Mid-call switching included" },
    icon: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  },
  {
    h: "No long contracts.",
    p: "Monthly plans cancel anytime. Annual plans cancel with 30 days' notice. You keep export access to every action and audit log.",
    stat: { v: "30", u: "d", l: "Export access after cancel" },
    icon: <><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/><path d="m12 7 0 5 4 2"/></>,
  },
  {
    h: "Works inside your stack.",
    p: "HubSpot, Salesforce, QuickBooks, Xero, Google Workspace, Microsoft 365, Twilio. Native — no CSV exports, no parallel sets of books.",
    stat: { v: "14", u: "d", l: "From first call to production" },
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/><path d="M3 9h6M3 15h6M15 3v6M15 15v6"/></>,
  },
];

function Guarantees() {
  return (
    <section className="border-t py-20 sm:py-24 lg:py-32" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-[620px]">
          <span className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--navy-500)" }}>
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Why this works
          </span>
          <h2 className="mb-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.024em] sm:text-[40px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Built like a consultancy. Priced like software.
          </h2>
          <p className="text-[16px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
            The reason a two-week pilot can work is because we say no to
            everything that doesn't belong in it. Here's what's on by default.
          </p>
        </div>

        <div
          className="grid grid-cols-1 overflow-hidden rounded-[20px] border sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}
        >
          {GUARANTEES.map((g, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 bg-white p-8"
              style={{ borderRight: "none", borderBottom: "none" }}
            >
              <div
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-[13px]"
                style={{
                  background: "linear-gradient(135deg, var(--teal-50) 0%, #FFFFFF 100%)",
                  color: "var(--teal-700)",
                  border: "1px solid var(--teal-100)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 12px -6px rgba(20,184,166,0.18)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {g.icon}
                </svg>
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full"
                  style={{ background: "var(--teal-500)", boxShadow: "0 0 0 3px rgba(20,184,166,0.18)" }}
                />
              </div>
              <div>
                <div className="mb-1.5 text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {g.h}
                </div>
                <p className="text-[13.5px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
                  {g.p}
                </p>
              </div>
              <div
                className="mt-auto flex items-baseline gap-1.5 rounded-[10px] border px-4 py-3"
                style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
              >
                <span className="text-[24px] font-semibold leading-none tracking-[-0.022em]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {g.stat.v}
                  <span className="text-[14px] font-medium" style={{ color: "var(--teal-600)" }}>{g.stat.u}</span>
                </span>
                <span className="text-[12px]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}>{g.stat.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────────────────────────── */

function HIWFinalCTA() {
  return (
    <section className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]"
      style={{ borderTop: "1px solid var(--line)" }}>
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
              <h2 className="mb-4 text-[28px] font-semibold leading-[1.1] tracking-[-0.022em] text-white sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-display)" }}>
                Start with one agent. Pay for itself in 30 days.
              </h2>
              <p className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}>
                A focused two-week pilot, a senior consultant on the line, and
                a scorecard you can read on Monday morning. Add the next agent
                only when the first one has earned the room.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a href="/book"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}>
                Talk to a consultant
              </a>
              <a href="/book"
                className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", color: "var(--navy-600)" }}>
                Book a demo <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

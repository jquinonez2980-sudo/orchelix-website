import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Solutions — Orchelix AI Consulting",
  description:
    "Three intelligent agents, one operator console. Esmi Virtual Receptionist, Revenue-Ops, and Accounting & Finance OS — built to run alongside your team.",
};

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <SolHero />
        <AgentEsmi />
        <AgentRevOps />
        <AgentFinance />
        <SolFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function SolHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-[120px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 88% 22%, rgba(20,184,166,0.08), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Copy */}
          <div>
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              The agent stack
            </span>

            <h1
              className="mt-7 mb-7 text-balance text-[40px] leading-[1.06] font-medium tracking-[-0.03em] sm:text-[56px] sm:leading-[1.04] lg:text-[68px] lg:leading-[1.02] lg:tracking-[-0.036em]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              One system.{" "}
              <span
                className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
                style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
              >
                Three
              </span>{" "}
              agents that earn their keep.
            </h1>

            <p
              className="mb-10 max-w-[560px] text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Orchelix deploys multi-agent systems that answer the calls, qualify
              the pipeline, and close the books — bilingually, around the clock,
              and with an audit trail your operators actually want to use.
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
                href="#agent-esmi"
                className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-surface-2"
                style={{
                  fontFamily: "var(--font-display)",
                  borderColor: "var(--line-strong)",
                  background: "#fff",
                  color: "var(--navy-600)",
                }}
              >
                See the agents
              </a>
            </div>
          </div>

          {/* Index card */}
          <IndexCard />
        </div>
      </div>
    </section>
  );
}

function IndexCard() {
  const items = [
    {
      num: "01",
      name: "Esmi · Virtual Receptionist",
      sub: "24/7 bilingual call handling and booking",
      href: "#agent-esmi",
    },
    {
      num: "02",
      name: "Revenue-Ops Agents",
      sub: "Pipeline qualification & close-the-loop follow-through",
      href: "#agent-revops",
    },
    {
      num: "03",
      name: "Accounting & Finance OS",
      sub: "Bookkeeping, reconciliation, and a reviewable close",
      href: "#agent-finance",
    },
  ];

  return (
    <aside
      className="rounded-[20px] border p-6 sm:p-7"
      style={{
        borderColor: "var(--line)",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(10,37,64,0.08), 0 2px 4px rgba(10,37,64,0.04)",
      }}
    >
      <div
        className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
      >
        In this page
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.num}
            href={item.href}
            className="group flex items-center gap-4 rounded-[12px] px-3 py-3.5 transition-colors hover:bg-surface-2"
            style={{ textDecoration: "none" }}
          >
            <span
              className="shrink-0 text-[12px] font-semibold tabular-nums"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-600)" }}
            >
              {item.num}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="block text-[14px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {item.name}
              </span>
              <span
                className="mt-0.5 block text-[12px] leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-3)" }}
              >
                {item.sub}
              </span>
            </span>
            <span
              className="shrink-0 text-[14px] transition-transform group-hover:translate-x-0.5"
              style={{ color: "var(--ink-4)" }}
            >
              →
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}

/* ─── Shared agent section components ───────────────────────────────────── */

function AgentMeta({ num, category }: { num: string; category: string }) {
  return (
    <div
      className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.16em]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span style={{ color: "var(--teal-600)" }}>{num}</span>
      <span
        className="inline-block h-1 w-1 rounded-full"
        style={{ background: "var(--teal-400)" }}
      />
      <span style={{ color: "var(--ink-3)" }}>{category}</span>
    </div>
  );
}

function Feature({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span
        className="mt-0.5 shrink-0 inline-flex h-[22px] w-[22px] items-center justify-center rounded-full"
        style={{ background: "var(--teal-50)", color: "var(--teal-700)" }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l5 5 9-11" />
        </svg>
      </span>
      <div>
        <div
          className="text-[14px] font-semibold leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {name}
        </div>
        <div
          className="mt-0.5 text-[13.5px] leading-[1.55]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

function OutcomeBar({
  outcomes,
}: {
  outcomes: { value: string; unit?: string; label: string }[];
}) {
  return (
    <div
      className="flex gap-5 rounded-[16px] border p-5 sm:gap-7"
      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
    >
      {outcomes.map((oc, i) => (
        <div
          key={i}
          className={i > 0 ? "border-l pl-5 sm:pl-7" : ""}
          style={i > 0 ? { borderColor: "var(--line)" } : undefined}
        >
          <div
            className="text-[28px] font-semibold leading-none tracking-[-0.025em] sm:text-[32px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {oc.value}
            {oc.unit && (
              <span
                className="text-[16px] font-medium"
                style={{ color: "var(--teal-600)" }}
              >
                {oc.unit}
              </span>
            )}
          </div>
          <div
            className="mt-1.5 text-[12px] leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            {oc.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function AgentButtons({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={primaryHref}
        className="inline-flex h-11 items-center rounded-xl px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
        style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
      >
        {primaryLabel} <span className="ml-1.5 opacity-80">→</span>
      </a>
      <a
        href={secondaryHref}
        className="inline-flex h-11 items-center rounded-xl border px-5 text-[14px] font-medium transition-colors hover:bg-surface-2"
        style={{
          fontFamily: "var(--font-display)",
          borderColor: "var(--line-strong)",
          background: "#fff",
          color: "var(--navy-600)",
        }}
      >
        {secondaryLabel}
      </a>
    </div>
  );
}

/* ─── Dark figure panel ──────────────────────────────────────────────────── */

function FigurePanel({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
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
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[20%] top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(20,184,166,0.45), transparent)",
        }}
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

/* ─── Agent 01: Revenue-Ops ──────────────────────────────────────────────── */

function AgentRevOps() {
  const features = [
    {
      name: "Multi-channel intake",
      desc: "Web forms, inbound calls, paid social, referral links — one pipeline.",
    },
    {
      name: "Real-time lead scoring",
      desc: "A defensible score based on fit, intent signals, and account history.",
    },
    {
      name: "Sequenced follow-up",
      desc: "Email, SMS, and call cadences written in your voice — not a template.",
    },
    {
      name: "Hand-off with full context",
      desc: "Your reps inherit a brief, not a blank record. Talking points included.",
    },
    {
      name: "Works inside your CRM",
      desc: "HubSpot, Salesforce, Pipedrive, Zoho — the agents read and write natively.",
    },
    {
      name: "Weekly revenue scorecard",
      desc: "A Monday-morning dashboard with what moved, what stalled, and why.",
    },
  ];

  return (
    <section
      id="agent-revops"
      className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32"
      style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-7 lg:order-2">
            <AgentMeta num="02 / Revenue" category="Sales & Marketing" />
            <div>
              <h2
                className="mb-3 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Revenue-Ops Agents
              </h2>
              <p
                className="text-[17px] font-medium leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
              >
                Qualify every lead. Follow up on time. Close more deals.
              </p>
            </div>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              A pair of sales and marketing agents that work the pipeline while
              your team runs the conversations that matter. Every lead is triaged,
              scored, sequenced, and handed off with the context a senior rep would
              have written themselves.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <Feature key={f.name} {...f} />
              ))}
            </div>
            <OutcomeBar
              outcomes={[
                { value: "94", unit: "%", label: "Qualified leads handed off with full context." },
                { value: "3.1", unit: "×", label: "More sales-accepted opportunities per rep." },
                { value: "11", unit: "min", label: "Median response time on inbound leads, 24/7." },
              ]}
            />
            <AgentButtons
              primaryHref="#book"
              primaryLabel="Book a demo"
              secondaryHref="#book"
              secondaryLabel="Learn more"
            />
          </div>

          <div className="lg:order-1">
            <FigurePanel title="orchelix · revenue-ops" tag="live · qualifying">
              <PipelineFigure />
            </FigurePanel>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineFigure() {
  const cols = [
    {
      label: "Inbound",
      count: 14,
      deals: [
        { name: "Acme HVAC", meta: "Webform · 9:41a", score: 92, hot: true },
        { name: "Riverbend Dental", meta: "Referral · 9:22a", score: 71, hot: false },
        { name: "Cardenas Auto", meta: "Inbound call", score: 64, hot: false },
      ],
    },
    {
      label: "Qualifying",
      count: 7,
      deals: [
        { name: "Northstar Books", meta: "2 touches · agent", score: 88, hot: true },
        { name: "Bloom & Co.", meta: "3 touches · agent", score: 76, hot: false },
      ],
    },
    {
      label: "To rep",
      count: 3,
      deals: [
        { name: "Maplewood HVAC", meta: "Brief sent · 8:14a", score: 95, hot: true },
        { name: "Pueblo Group", meta: "Brief queued", score: 81, hot: false },
      ],
    },
  ];

  return (
    <>
      <div
        className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-400/80"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Pipeline · today
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((col) => (
          <div key={col.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-0.5">
              <span
                className="text-[10px] font-medium text-white/55"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {col.label}
              </span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {col.count}
              </span>
            </div>
            {col.deals.map((deal) => (
              <div
                key={deal.name}
                className="rounded-[10px] p-2.5"
                style={{
                  background: deal.hot
                    ? "rgba(20,184,166,0.10)"
                    : "rgba(255,255,255,0.04)",
                  border: deal.hot
                    ? "1px solid rgba(20,184,166,0.20)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-1.5 truncate text-[11px] font-semibold text-white/90"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {deal.name}
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span
                    className="truncate text-[10px] text-white/40"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {deal.meta}
                  </span>
                  <span
                    className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                    style={{
                      background:
                        deal.score >= 85
                          ? "rgba(20,184,166,0.22)"
                          : "rgba(255,255,255,0.08)",
                      color:
                        deal.score >= 85 ? "#5EEAD4" : "rgba(255,255,255,0.50)",
                    }}
                  >
                    {deal.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.06] overflow-hidden rounded-[12px] border border-white/[0.06] bg-white/[0.02]">
        {[
          { l: "Leads · 7d", v: "312", u: "↑ 18%" },
          { l: "SQLs", v: "86", u: "↑ 11%" },
          { l: "Median respond", v: "11", u: "min" },
        ].map((s) => (
          <div key={s.l} className="px-3 py-2.5">
            <div
              className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/40"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {s.l}
            </div>
            <div
              className="mt-1 text-[14px] font-semibold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.v}{" "}
              <span className="text-[11px] font-medium text-teal-400">{s.u}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Agent 02: Esmi ─────────────────────────────────────────────────────── */

function AgentEsmi() {
  const features = [
    {
      name: "14-second pickup, 24/7",
      desc: "Nights, weekends, holidays — Esmi answers before the third ring.",
    },
    {
      name: "Native EN · ES (FR optional)",
      desc: "Switches mid-call if your caller does. No accent, no stilted phrasing.",
    },
    {
      name: "Books on your calendar",
      desc: "Google, Microsoft 365, Calendly, Acuity — confirmed with SMS reminder.",
    },
    {
      name: "Urgency routing",
      desc: "After-hours emergencies reach the on-call person within 60 seconds.",
    },
    {
      name: "Transcript & reason for every call",
      desc: "Every call ends with a structured summary in your inbox or CRM.",
    },
    {
      name: "Coachable in plain English",
      desc: "Update Esmi's script by editing a doc — no engineer needed.",
    },
  ];

  return (
    <section
      id="agent-esmi"
      className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-7">
            <AgentMeta num="01 / Voice" category="Virtual Receptionist · Esmi" />
            <div>
              <h2
                className="mb-3 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Esmi — Virtual Receptionist
              </h2>
              <p
                className="text-[17px] font-medium leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
              >
                Answers, qualifies, and books — bilingually, 24/7.
              </p>
            </div>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Esmi is the front desk that never closes. She picks up in under
              fifteen seconds, holds a real conversation in English or Spanish, and
              books the appointment, escalates the urgency, or files the voicemail
              — with a transcript and a reason for every call.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <Feature key={f.name} {...f} />
              ))}
            </div>
            <OutcomeBar
              outcomes={[
                { value: "412", label: "Calls handled in Esmi's first month of pilot." },
                { value: "14", unit: "s", label: "Median pickup, including nights and weekends." },
                { value: "87", unit: "%", label: "Resolved without ever paging a human." },
              ]}
            />
            <AgentButtons
              primaryHref="#book"
              primaryLabel="Book a demo"
              secondaryHref="#book"
              secondaryLabel="Meet Esmi"
            />
          </div>

          <FigurePanel title="esmi · live call" tag="recording · 01:42">
            <EsmiFigure />
          </FigurePanel>
        </div>
      </div>
    </section>
  );
}

function EsmiFigure() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-9 shrink-0 items-center justify-center rounded-xl px-2.5"
          style={{ background: "rgba(20,184,166,0.20)" }}
        >
          <img src="/esmi-logo.png" alt="Esmi" style={{ height: 16, width: "auto" }} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-[13px] font-semibold text-white/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Esmi · Riverstone Clinic
          </div>
          <div
            className="text-[11px] text-white/45"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Caller: Carolina M. · +1 (416) 555-0148
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="text-[10px] font-medium tracking-[0.08em] text-teal-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ES → EN
          </div>
          <div
            className="mt-0.5 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.06em]"
            style={{ background: "rgba(239,68,68,0.18)", color: "#FCA5A5" }}
          >
            LIVE
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-[14px] border border-white/[0.07] bg-white/[0.02] p-3.5">
        <div className="flex flex-col gap-1">
          <span
            className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Caller
          </span>
          <div
            className="rounded-[10px] rounded-tl-sm p-2.5 text-[12px] leading-[1.55] text-white/75"
            style={{
              background: "rgba(255,255,255,0.06)",
              fontFamily: "var(--font-display)",
            }}
          >
            Hola, llamo para reservar una cita con la doctora Patel. ¿Tienen algo
            esta semana en la tarde?
            <span className="mt-1 block text-[11px] italic text-white/35">
              &ldquo;Hi, I&apos;m calling to book an appt with Dr. Patel — anything
              afternoon this week?&rdquo;
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center">
            <img src="/esmi-logo.png" alt="Esmi" style={{ height: 10, width: "auto", opacity: 0.7 }} />
          </span>
          <div
            className="rounded-[10px] rounded-tr-sm p-2.5 text-[12px] leading-[1.55] text-white/90"
            style={{
              background: "rgba(20,184,166,0.14)",
              fontFamily: "var(--font-display)",
            }}
          >
            Claro que sí. Tengo un espacio el jueves a las 3:15 p.m. o el viernes a
            las 4:00 p.m. ¿Cuál prefiere?
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Caller
          </span>
          <div
            className="rounded-[10px] rounded-tl-sm p-2.5 text-[12px] leading-[1.55] text-white/75"
            style={{
              background: "rgba(255,255,255,0.06)",
              fontFamily: "var(--font-display)",
            }}
          >
            Thursday works — and switch to English if that&apos;s okay.
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center">
            <img src="/esmi-logo.png" alt="Esmi" style={{ height: 10, width: "auto", opacity: 0.7 }} />
          </span>
          <div
            className="rounded-[10px] rounded-tr-sm p-2.5 text-[12px] leading-[1.55] text-white/90"
            style={{
              background: "rgba(20,184,166,0.14)",
              fontFamily: "var(--font-display)",
            }}
          >
            Of course. Thursday, May 28th at 3:15 p.m. with Dr. Patel. I&apos;ll
            send a confirmation to the number you&apos;re calling from — does that
            work?
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          {
            k: "Intent",
            v: "Book — new patient",
            meta: "Confidence 0.94 · routed to Riverstone",
          },
          {
            k: "Next action",
            v: "Hold slot · send SMS confirm",
            meta: "Calendar: Google Workspace · auto",
          },
        ].map((card) => (
          <div
            key={card.k}
            className="rounded-[12px] p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="mb-1 text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {card.k}
            </div>
            <div
              className="text-[12px] font-semibold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.v}
            </div>
            <div
              className="mt-0.5 text-[10px] text-white/35"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {card.meta}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Agent 03: Accounting & Finance OS ──────────────────────────────────── */

function AgentFinance() {
  const features = [
    {
      name: "Daily transaction categorization",
      desc: "Bank, card, and AR feeds reconciled to your chart of accounts by 7:00a.",
    },
    {
      name: "Three-way invoice matching",
      desc: "PO, receipt, and invoice cross-checked. Mismatches sit in a review queue.",
    },
    {
      name: "AR follow-up that doesn't nag",
      desc: "Polite, on-brand reminders that escalate by aging — not by guesswork.",
    },
    {
      name: "Month-end close checklist",
      desc: "Every step logged with a name and a timestamp. Auditors love it.",
    },
    {
      name: "QuickBooks & Xero native",
      desc: "Writes back to your ledger. No CSV exports, no parallel sets of books.",
    },
    {
      name: "PIPEDA-aligned audit trail",
      desc: "Every action attributable. Data residency available on request.",
    },
  ];

  return (
    <section
      id="agent-finance"
      className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-32"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-7">
            <AgentMeta num="03 / Finance" category="Accounting & Bookkeeping" />
            <div>
              <h2
                className="mb-3 text-[34px] font-semibold leading-[1.06] tracking-[-0.024em] sm:text-[42px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                Accounting & Finance OS
              </h2>
              <p
                className="text-[17px] font-medium leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
              >
                A reviewable close, every morning.
              </p>
            </div>
            <p
              className="text-[16px] leading-[1.65]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Automated bookkeeping, reconciliations, and a month-end close you can
              defend to an auditor. The agent categorizes, matches, and flags — your
              bookkeeper opens to a triaged inbox of decisions worth a human&apos;s
              time.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <Feature key={f.name} {...f} />
              ))}
            </div>
            <OutcomeBar
              outcomes={[
                { value: "3.4", unit: "×", label: "Faster month-end close after one quarter." },
                { value: "$184", unit: "k", label: "Median AR collected in the first 30 days." },
                { value: "96", unit: "%", label: "Transactions categorized without human touch." },
              ]}
            />
            <AgentButtons
              primaryHref="#book"
              primaryLabel="Book a demo"
              secondaryHref="#book"
              secondaryLabel="See the Accounting OS"
            />
          </div>

          <FigurePanel title="orchelix · finance os · close" tag="closing · may 2026">
            <FinanceFigure />
          </FigurePanel>
        </div>
      </div>
    </section>
  );
}

function FinanceFigure() {
  const rows = [
    {
      desc: "Stripe payout · May 19",
      sub: "REF stripe_po_8821",
      amt: "+$24,318.50",
      status: "Matched",
      ok: true,
    },
    {
      desc: "Maplewood HVAC · INV-2014",
      sub: "AR auto-applied · paid in full",
      amt: "+$8,420.00",
      status: "Matched",
      ok: true,
    },
    {
      desc: "Office supplies · Staples",
      sub: "Vendor not on file · suggest 6310",
      amt: "−$184.22",
      status: "Review",
      ok: false,
    },
    {
      desc: "Northstar Books · INV-2018",
      sub: "Partial · $1,200 of $3,400 outstanding",
      amt: "+$1,200.00",
      status: "Matched",
      ok: true,
    },
    {
      desc: "Bell Mobility · auto-pay",
      sub: "Recurring · matched to vendor profile",
      amt: "−$248.40",
      status: "Matched",
      ok: true,
    },
  ];

  return (
    <>
      <div
        className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-400/80"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Reconciliation queue
      </div>

      <div className="overflow-hidden rounded-[12px] border border-white/[0.07]">
        <div
          className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/30"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="flex-1">Description</span>
          <span className="w-20 text-right">Amount</span>
          <span className="w-16 text-right">Status</span>
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 px-3 py-2.5 ${
              i < rows.length - 1 ? "border-b border-white/[0.05]" : ""
            } ${!row.ok ? "bg-yellow-400/[0.04]" : ""}`}
          >
            <div className="min-w-0 flex-1">
              <div
                className="truncate text-[11.5px] font-medium text-white/85"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {row.desc}
              </div>
              <div
                className="truncate text-[10px] text-white/35"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {row.sub}
              </div>
            </div>
            <div
              className="w-20 shrink-0 text-right text-[11.5px] font-semibold tabular-nums"
              style={{
                fontFamily: "var(--font-mono)",
                color: row.amt.startsWith("+") ? "#5EEAD4" : "rgba(255,255,255,0.60)",
              }}
            >
              {row.amt}
            </div>
            <div className="w-16 shrink-0 text-right">
              <span
                className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: row.ok ? "rgba(20,184,166,0.15)" : "rgba(234,179,8,0.15)",
                  color: row.ok ? "#5EEAD4" : "#FDE68A",
                }}
              >
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div
          className="rounded-[12px] p-3"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Close progress · May
          </div>
          <div
            className="mb-1.5 h-1.5 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "82%",
                background: "linear-gradient(90deg, #14B8A6, #5EEAD4)",
              }}
            />
          </div>
          <div
            className="flex items-center justify-between text-[10px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="font-bold text-teal-300">82%</span>
            <span className="text-white/35">14 of 17 steps</span>
          </div>
        </div>

        <div
          className="rounded-[12px] p-3"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/35"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Today&apos;s checklist
          </div>
          <div className="flex flex-col gap-1">
            {[
              { label: "Bank reconciliation", done: true },
              { label: "AR aging review", done: true },
              { label: "Payroll accrual", done: false },
              { label: "Owner review", done: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-[11px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span
                  className="shrink-0 text-[10px]"
                  style={{
                    color: item.done ? "#5EEAD4" : "rgba(255,255,255,0.20)",
                  }}
                >
                  {item.done ? "✓" : "○"}
                </span>
                <span
                  style={{
                    color: item.done
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.35)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function SolFinalCTA() {
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
                Start with one agent. Pay for itself in 30 days.
              </h2>
              <p
                className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A focused two-week pilot, a senior consultant on the line, and a
                scorecard you can read on Monday morning. Add the next agent only
                when the first one has earned the room.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href="/book"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Talk to a consultant
              </a>
              <a
                href="/book"
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

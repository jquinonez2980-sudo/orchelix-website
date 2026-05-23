"use client";

import { Button } from "@/components/ui/button";

/* ─── Hero ───────────────────────────────────────────────────────────────
   Two-column lockup: copy on the left, operator console on the right.
   Mobile (< lg): console stacks below copy; background glow hides.
   The H1 carries a gradient italic span with a solid navy fallback.       */

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-24 pb-28 sm:px-8 sm:pt-28 sm:pb-32 lg:px-10 lg:pt-[132px] lg:pb-[168px]"
    >
      {/* Dot-grid + brand halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 88% 22%, rgba(20,184,166,0.10), transparent 60%),
            radial-gradient(ellipse 45% 60% at 5% 88%, rgba(10,37,64,0.05), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.055) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, auto, 28px 28px",
          backgroundPosition: "center, center, 0 0",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
        }}
      />

      {/* Helix watermark (desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-40 hidden h-[720px] w-[720px] bg-contain bg-center bg-no-repeat opacity-[0.06] lg:block"
        style={{
          backgroundImage: "url('/orchelix-mark.png')",
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
        }}
      />

      {/* Teal aurora glow (desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 -right-44 hidden h-[520px] w-[720px] blur-[40px] lg:block"
        style={{
          background: `
            radial-gradient(ellipse 55% 60% at 50% 50%, rgba(20,184,166,0.20), transparent 65%),
            radial-gradient(ellipse 40% 70% at 30% 50%, rgba(10,37,64,0.18), transparent 65%)
          `,
        }}
      />

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-line) 30%, var(--color-line) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ── Left: copy ───────────────────────────────────────────── */}
          <div>
            <Eyebrow>Multi-agent revenue operations</Eyebrow>

            <h1
              className="mt-7 mb-8 text-balance text-[44px] leading-[1.04] font-medium tracking-[-0.032em] text-ink sm:text-[64px] sm:leading-[1.02] sm:tracking-[-0.035em] lg:text-[80px] lg:leading-[1.01] lg:tracking-[-0.038em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AI agents that{" "}
              <span
                className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic text-navy-600"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                actually run
              </span>{" "}
              your revenue operations.
            </h1>

            <p
              className="mb-10 max-w-[540px] text-[17px] leading-[1.6] text-ink-2 sm:text-[18px] lg:text-[19px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A multi-agent system that qualifies leads, handles calls, closes
              deals, and runs the financial close &mdash; so your team spends
              their time on the work that compounds.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 rounded-xl bg-navy-600 px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(10,37,64,0.10)] transition-colors hover:bg-navy-700"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <a href="#book">
                  Book a demo
                  <span className="ml-1.5 opacity-85">→</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-line-strong bg-white px-6 text-[15px] font-medium text-navy-600 hover:bg-surface-2 hover:text-navy-600"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <a href="#how">See how it works</a>
              </Button>
            </div>

            <ProofBar />
          </div>

          {/* ── Right: operator console ─────────────────────────────── */}
          <OperatorConsole />
        </div>
      </div>
    </section>
  );
}

/* ─── Eyebrow ─────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[11px] leading-none font-medium uppercase tracking-[0.18em] text-teal-700"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
      {children}
    </span>
  );
}

/* ─── Proof bar ───────────────────────────────────────────────────────── */

function ProofBar() {
  return (
    <div
      className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] leading-none font-medium tracking-[0.02em] text-ink-3"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span>EN&nbsp;·&nbsp;ES&nbsp;bilingual</span>
      <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
      <span>SOC&nbsp;2&nbsp;in-progress</span>
      <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
      <span>PIPEDA-aligned</span>
    </div>
  );
}

/* ─── Operator Console (right-side panel) ─────────────────────────────── */

function OperatorConsole() {
  return (
    <aside
      aria-hidden="true"
      className="relative overflow-hidden rounded-[22px] border border-white/[0.08] p-6 text-white sm:p-7"
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
          0 24px 60px -20px rgba(20,184,166,0.18),
          0 16px 32px -12px rgba(10,37,64,0.24)
        `,
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
        }}
      />
      {/* Top teal highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[20%] top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(20,184,166,0.45), transparent)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div
          className="mb-5 flex items-center gap-2.5 border-b border-white/[0.06] pb-[18px] text-[11.5px] leading-none font-medium tracking-[0.02em] text-white/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <div className="flex gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_0_3px_rgba(20,184,166,0.20)]" />
            <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
            <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
          </div>
          <span>orchelix&nbsp;·&nbsp;operator&nbsp;console</span>
          <span className="ml-auto inline-flex items-center gap-[7px] rounded-full border border-teal-500/20 bg-teal-500/10 px-[11px] py-[7px] text-[10.5px] tracking-[0.04em] text-teal-200">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_0_3px_rgba(20,184,166,0.22)]"
              style={{ animation: "pulse 2.4s ease-in-out infinite" }}
            />
            live · 3 agents
          </span>
        </div>

        {/* Metric panels */}
        <div className="grid grid-cols-2 gap-3">
          <MetricPanel
            label="Calls handled · today"
            value="128"
            sparkPath="M0 22 L12 19 L24 21 L36 14 L48 16 L60 12 L72 13 L84 7 L96 10 L108 5 L120 6"
            sparkFill="M0 22 L12 19 L24 21 L36 14 L48 16 L60 12 L72 13 L84 7 L96 10 L108 5 L120 6 L120 28 L0 28 Z"
            gradId="sg1"
            delta="▲ 22%"
            deltaLabel="vs. 7-day avg."
          />
          <MetricPanel
            label="AR collected · 30d"
            value="$184k"
            sparkPath="M0 18 L12 20 L24 14 L36 17 L48 11 L60 13 L72 8 L84 11 L96 6 L108 9 L120 4"
            sparkFill="M0 18 L12 20 L24 14 L36 17 L48 11 L60 13 L72 8 L84 11 L96 6 L108 9 L120 4 L120 28 L0 28 Z"
            gradId="sg2"
            delta="14 auto-cleared"
            deltaLabel="$11.2k pending"
          />
        </div>

        {/* Events */}
        <div
          className="relative mt-3 rounded-[14px] border border-white/[0.07] bg-white/[0.02] px-5 py-[18px]"
        >
          <div
            className="mb-4 flex items-center gap-2.5 text-[10px] leading-none font-medium uppercase tracking-[0.18em] text-teal-400/85"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Recent agent activity
            <span className="block h-px flex-1 bg-white/5" />
          </div>
          {[
            { text: "Receptionist booked appt · Maria S.", time: "9:41a", idle: false },
            { text: "Sales-Ops qualified lead · Acme HVAC", time: "9:38a", idle: false },
            { text: "Finance closed PO #2041", time: "9:30a", idle: false },
            { text: "Daily-close · queued for 5:00p", time: "queued", idle: true },
          ].map((ev, i) => (
            <ActivityRow
              key={ev.text}
              text={ev.text}
              time={ev.time}
              idle={ev.idle}
              first={i === 0}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ─── Metric panel (one of two inside the console) ────────────────────── */

function MetricPanel({
  label,
  value,
  sparkPath,
  sparkFill,
  gradId,
  delta,
  deltaLabel,
}: {
  label: string;
  value: string;
  sparkPath: string;
  sparkFill: string;
  gradId: string;
  delta: string;
  deltaLabel: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.025] p-[18px]">
      <div
        aria-hidden
        className="absolute inset-x-3 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      <div
        className="mb-3.5 text-[10px] leading-none font-medium uppercase tracking-[0.18em] text-teal-400/85"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </div>
      <div
        className="text-[30px] leading-none font-semibold tracking-[-0.025em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      <div className="mt-3 h-7">
        <svg
          viewBox="0 0 120 28"
          preserveAspectRatio="none"
          className="block h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={sparkFill} fill={`url(#${gradId})`} />
          <path
            d={sparkPath}
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className="mt-2.5 flex items-center justify-between gap-2 text-[11px] leading-tight font-medium text-white/50"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="text-teal-300">{delta}</span>
        <span>{deltaLabel}</span>
      </div>
    </div>
  );
}

/* ─── Activity row inside the events list ─────────────────────────────── */

function ActivityRow({
  text,
  time,
  idle,
  first,
}: {
  text: string;
  time: string;
  idle: boolean;
  first: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 py-[7px] text-[12.5px] leading-snug font-medium ${
        idle ? "text-white/45" : "text-white/85"
      } ${first ? "" : "border-t border-white/[0.04]"}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span
        className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
          idle ? "bg-white/20" : "bg-teal-400 shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
        }`}
      />
      <span className="truncate">{text}</span>
      <span
        className="ml-auto shrink-0 text-[11px] text-white/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {time}
      </span>
    </div>
  );
}

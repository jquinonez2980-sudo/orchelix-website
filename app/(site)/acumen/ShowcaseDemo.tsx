"use client";

import { useEffect, useRef, useState } from "react";
import demoRun from "./demo-run.json";

/* ───────────────────────────────────────────────────────────────────────────
   AcumenAI showcase — animates the baked pipeline run (demo-run.json) one beat
   at a time. No backend, no auth, no live data: the JSON is a deterministic
   offline capture generated in the vtx-os repo
   (scripts/export_demo_json.py → dashboard/demo.py). Re-run that to refresh it.

   Brand: AcumenAI inherits the Orchelix base (navy, Montserrat/JetBrains) and
   uses GOLD as its signature accent (teal is the shared house accent).
   ─────────────────────────────────────────────────────────────────────────── */

type DemoRun = typeof demoRun;
type Beats = DemoRun["beats"];

const GOLD = "#D9A21B";
const GOLD_SOFT = "#E3BC54";

const BEAT_ORDER = ["ingest", "verify", "categorize", "audit", "approve"] as const;
const STEP_MS = 950;

function money(s: string): string {
  const n = Number(s);
  return Number.isFinite(n) ? `$${Math.round(n).toLocaleString("en-CA")}` : s;
}

/** Count a number up to `value` once `active` flips true. */
function useCountUp(value: number, active: boolean, ms = 700): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      // easeOutCubic
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, active, ms]);
  return active ? n : 0;
}

export default function ShowcaseDemo() {
  const beats = demoRun.beats as Beats;
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(0); // # of beats shown
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const done = revealed >= BEAT_ORDER.length;

  function run() {
    if (timer.current) clearInterval(timer.current);
    setRevealed(0);
    setRunning(true);
    timer.current = setInterval(() => {
      setRevealed((r) => {
        if (r + 1 >= BEAT_ORDER.length) {
          if (timer.current) clearInterval(timer.current);
        }
        return r + 1;
      });
    }, STEP_MS);
  }

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      {/* Console */}
      <div
        className="relative overflow-hidden rounded-[22px] border border-white/[0.08] p-5 text-white sm:p-6"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 100% 0%, rgba(217,162,27,0.16), transparent 60%),
            radial-gradient(ellipse 70% 50% at 0% 100%, rgba(217,162,27,0.08), transparent 60%),
            linear-gradient(180deg, #102C44 0%, #061B33 100%)
          `,
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.10) inset,
            0 0 0 1px rgba(217,162,27,0.08),
            0 40px 100px -30px rgba(10,37,64,0.55),
            0 24px 60px -20px rgba(217,162,27,0.16)
          `,
        }}
      >
        {/* grid wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[20%] top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}73, transparent)` }}
        />

        <div className="relative">
          {/* title bar */}
          <div
            className="mb-4 flex min-w-0 items-center gap-2.5 border-b border-white/[0.06] pb-[14px] text-[11px] font-medium tracking-[0.02em] text-white/50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex shrink-0 gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: GOLD_SOFT, boxShadow: `0 0 0 3px rgba(217,162,27,0.20)` }} />
              <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
              <span className="inline-block h-2 w-2 rounded-full bg-white/[0.12]" />
            </div>
            <span className="min-w-0 truncate">acumenai · pipeline · {demoRun.client.toLowerCase()}</span>
            <span
              className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] tracking-[0.04em]"
              style={{ background: "rgba(217,162,27,0.10)", border: "1px solid rgba(217,162,27,0.20)", color: GOLD_SOFT }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD_SOFT }} />
              {demoRun.mode.split(" · ")[0]}
            </span>
          </div>

          {/* beats */}
          <div className="flex flex-col gap-2">
            <BeatIngest beat={beats.ingest} active={revealed >= 1} on={revealed >= 1} />
            <BeatVerify beat={beats.verify} active={revealed >= 2} on={revealed >= 2} />
            <BeatCategorize beat={beats.categorize} active={revealed >= 3} on={revealed >= 3} />
            <BeatAudit beat={beats.audit} on={revealed >= 4} />
            <BeatApprove beat={beats.approve} on={revealed >= 5} />
          </div>

          {/* recap */}
          <div
            className="mt-4 flex items-center gap-3 rounded-[12px] border px-4 py-3 transition-opacity duration-500"
            style={{
              borderColor: "rgba(217,162,27,0.20)",
              background: "rgba(217,162,27,0.06)",
              opacity: done ? 1 : 0.25,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_SOFT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l5 5 9-11" />
            </svg>
            <span className="text-[12.5px] leading-snug text-white/80" style={{ fontFamily: "var(--font-display)" }}>
              Reviewed, categorized, balance-verified books — with a full audit trail — in{" "}
              <strong style={{ color: GOLD_SOFT }}>{demoRun.recap.duration_ms} ms</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* Run control */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-semibold transition-opacity hover:opacity-90"
          style={{
            fontFamily: "var(--font-display)",
            background: GOLD,
            color: "#1A1206",
            boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 20px -8px rgba(217,162,27,0.55)",
          }}
        >
          {running && !done ? "Running…" : done ? "Run it again" : "Run the demo"}
          <span className="ml-2 opacity-70">→</span>
        </button>
        <span className="text-[12.5px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
          Offline · fictional data · runs in {demoRun.recap.duration_ms} ms
        </span>
      </div>
    </div>
  );
}

/* ─── beat wrapper ──────────────────────────────────────────────────────── */

function Row({ on, n, label, tone, children }: {
  on: boolean; n: string; label: string; tone?: "gold"; children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-[11px] px-3.5 py-3 transition-all duration-500"
      style={{
        background: on ? (tone === "gold" ? "rgba(217,162,27,0.10)" : "rgba(255,255,255,0.04)") : "rgba(255,255,255,0.02)",
        border: `1px solid ${on ? (tone === "gold" ? "rgba(217,162,27,0.22)" : "rgba(255,255,255,0.07)") : "rgba(255,255,255,0.04)"}`,
        opacity: on ? 1 : 0.28,
        transform: on ? "translateY(0)" : "translateY(4px)",
      }}
    >
      <span
        className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          background: on ? (tone === "gold" ? GOLD : "rgba(255,255,255,0.10)") : "rgba(255,255,255,0.06)",
          color: on ? (tone === "gold" ? "#1A1206" : "rgba(255,255,255,0.75)") : "rgba(255,255,255,0.30)",
        }}
      >
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
          {label}
        </div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function BeatIngest({ beat, on, active }: { beat: Beats["ingest"]; on: boolean; active: boolean }) {
  const txns = useCountUp(beat.transactions, active);
  return (
    <Row on={on} n="1" label="Ingest — a statement arrives">
      <div className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
        {txns} transactions parsed
        <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium align-middle" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}>
          {beat.bank_code} auto-detected
        </span>
      </div>
      <div className="mt-1 text-[11.5px] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
        in {money(beat.money_in)} · out {money(beat.money_out)} · {beat.deposits} deposits · {beat.payments} payments
      </div>
    </Row>
  );
}

function BeatVerify({ beat, on, active }: { beat: Beats["verify"]; on: boolean; active: boolean }) {
  const rec = useCountUp(beat.reconciled, active);
  return (
    <Row on={on} n="2" label="Verify — checked against the bank's own balance" tone="gold">
      <div className="flex items-baseline gap-2">
        <span className="text-[20px] font-semibold leading-none" style={{ fontFamily: "var(--font-display)", color: GOLD_SOFT }}>
          {rec}/{beat.total}
        </span>
        <span className="text-[12.5px] font-medium text-white/85" style={{ fontFamily: "var(--font-display)" }}>
          transactions reconciled to the cent
        </span>
      </div>
      <div className="mt-1 text-[11.5px] text-white/45" style={{ fontFamily: "var(--font-display)" }}>
        The running balance is ground truth — math, not guesswork. Catches the sign-flips and dropped rows manual entry misses.
      </div>
    </Row>
  );
}

function BeatCategorize({ beat, on, active }: { beat: Beats["categorize"]; on: boolean; active: boolean }) {
  const pct = useCountUp(beat.auto_pct, active);
  return (
    <Row on={on} n="3" label="Categorize & queue — the multi-agent pipeline runs">
      <div className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
        {beat.auto_categorized}/{beat.total} auto-categorized
        <span className="ml-1.5 text-[12px] font-medium" style={{ color: GOLD_SOFT }}>({pct}% hands-off)</span>
      </div>
      <div className="mt-1 text-[11.5px] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
        {beat.needs_review} flagged for review · {beat.queued} queued for one-click approval
      </div>
    </Row>
  );
}

function BeatAudit({ beat, on }: { beat: Beats["audit"]; on: boolean }) {
  return (
    <Row on={on} n="4" label="Audit — nothing fails silently">
      <div className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
        {beat.event_count} immutable audit events written
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {beat.event_types.map((t) => (
          <span key={t} className="rounded-full px-2 py-0.5 text-[9.5px] font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)" }}>
            {t}
          </span>
        ))}
      </div>
    </Row>
  );
}

function BeatApprove({ beat, on }: { beat: Beats["approve"]; on: boolean }) {
  return (
    <Row on={on} n="5" label="Approve — the human stays in control" tone="gold">
      <div className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
        Bookkeeper approved 1 exception
        <span className="ml-2 text-[12px] font-medium text-white/55" style={{ fontFamily: "var(--font-mono)" }}>
          queue {beat.pending_before} → {beat.pending_after}
        </span>
      </div>
      <div className="mt-1 truncate text-[11.5px] text-white/45" style={{ fontFamily: "var(--font-mono)" }}>
        {beat.approved ? `${beat.approved.txn_date} · ${beat.approved.description} → GL ${beat.approved.final_gl_no}` : "—"}
      </div>
    </Row>
  );
}

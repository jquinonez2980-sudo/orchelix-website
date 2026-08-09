"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import {
  acumenApi,
  ApiError,
  type ApprovalItem,
  type ClientConfig,
  type DemoRun,
  type Summary,
  type Txn,
} from "@/app/lib/acumenApi";
import { useAcumenToken } from "./useAcumenToken";

const GOLD = "#B7791F";
const GOLD_BG = "#FBF3DD";
const GOLD_BORDER = "#F6E4B8";

function money(s: string | null): string {
  if (s == null) return "—";
  const n = Number(s);
  return Number.isFinite(n)
    ? n.toLocaleString("en-CA", { style: "currency", currency: "CAD" })
    : s;
}

function monthOptions(count = 24): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i < count; i++) {
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    d.setMonth(d.getMonth() - 1);
  }
  return out;
}

// ── Demo mode state ───────────────────────────────────────────────────────────

type DemoPhase = "idle" | "loading" | "active";

export default function AcumenDashboard() {
  const { token, ready, signedIn } = useAcumenToken();
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [demoData, setDemoData] = useState<DemoRun | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);

  async function startDemo() {
    setDemoPhase("loading");
    setDemoError(null);
    try {
      const data = await acumenApi.demoRun();
      setDemoData(data);
      setDemoPhase("active");
    } catch (e) {
      setDemoError(e instanceof ApiError ? `API ${e.status}: ${e.message}` : String(e));
      setDemoPhase("idle");
    }
  }

  // Not signed in and no demo active → gated sign-in screen
  if (ready && !signedIn && demoPhase === "idle") {
    return <Gated onDemo={startDemo} error={demoError} />;
  }

  // Demo loading spinner
  if (demoPhase === "loading") {
    return (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid var(--gold-100)",
            borderTopColor: "var(--gold-500)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--ink-3)",
          }}
        >
          Loading demo workspace…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Demo active (not signed in, demo data loaded)
  if (demoPhase === "active" && demoData) {
    return <DemoConsole data={demoData} onExitDemo={() => setDemoPhase("idle")} />;
  }

  // Signed in — live console
  return <LiveConsole token={token} />;
}

// ── Gated sign-in card ────────────────────────────────────────────────────────

/* Shipping status, stated on the surface itself.

   PRODUCT.md lists AcumenAI as in development and requires that the site
   "must not present all three as equally shipped" — Esmi carries the proof,
   the other two are roadmap and must read as such. This is a working console
   headlined in the present tense ("Your live books, every period"), so
   without a marker it reads as a shipped product and contradicts /solutions,
   which says plainly that AcumenAI is in development.

   Rendered on all three entry screens rather than only the gated one: the
   gated screen sits behind Clerk, so signed-in operators and the demo
   workspace would otherwise never see it. Remove only when the status in
   PRODUCT.md changes. */
function DevelopmentNote({ className = "" }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 7,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ink-2)",
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 14, height: 2, background: GOLD, transform: "translateY(-0.25em)" }}
      />
      In development — not yet generally available
    </span>
  );
}

function Gated({ onDemo, error }: { onDemo: () => void; error: string | null }) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 8px 48px -16px rgba(10,37,64,0.14), 0 2px 8px -4px rgba(10,37,64,0.06)",
          textAlign: "center",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${GOLD_BG} 0%, #fff 100%)`,
            border: `1px solid ${GOLD_BORDER}`,
            boxShadow: `0 0 0 4px ${GOLD_BG}`,
            marginBottom: 24,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>

        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 12,
          }}
        >
          AcumenAI · Operator Console
        </span>

        <DevelopmentNote className="mt-2.5 mb-3.5" />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.022em",
            lineHeight: 1.15,
            color: "var(--ink)",
            marginBottom: 12,
          }}
        >
          Your live books,
          <br />
          every period.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            marginBottom: 32,
          }}
        >
          Sign in with Google to see your clients, approval queue, and
          transaction history — or explore with demo data first.
        </p>

        {error && (
          <div
            style={{
              marginBottom: 20,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #E7B8B8",
              background: "#FBEEEE",
              color: "#9A3434",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textAlign: "left",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Google sign-in */}
          <SignInButton mode="modal">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                height: 48,
                borderRadius: 12,
                border: "1px solid var(--line-strong)",
                background: "#fff",
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(10,37,64,0.07)",
                transition: "box-shadow 180ms, background 180ms",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 3px 10px rgba(10,37,64,0.10)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 1px 3px rgba(10,37,64,0.07)";
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </SignInButton>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.06em",
              }}
            >
              OR
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          {/* Demo */}
          <button
            onClick={onDemo}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              height: 48,
              borderRadius: 12,
              border: `1px solid ${GOLD_BORDER}`,
              background: GOLD_BG,
              color: GOLD,
              fontFamily: "var(--font-display)",
              fontSize: 14.5,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 180ms",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#F6E4B8";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = GOLD_BG;
            }}
          >
            <span style={{ opacity: 0.7 }}>◈</span>
            Try Demo — Northview Consulting
            <span style={{ opacity: 0.6 }}>→</span>
          </button>
        </div>

        <p
          style={{
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            lineHeight: 1.6,
          }}
        >
          Restricted to authorized bookkeeping teams.
          <br />
          Questions?{" "}
          <a
            href="tel:+15615661066"
            style={{ color: GOLD, textDecoration: "none" }}
          >
            (561) 566-1066
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Demo console ──────────────────────────────────────────────────────────────

function DemoConsole({
  data,
  onExitDemo,
}: {
  data: DemoRun;
  onExitDemo: () => void;
}) {
  const { ingest, categorize, verify, approve } = data.beats;
  const netMovement = (
    Number(ingest.money_in) - Number(ingest.money_out)
  ).toFixed(2);

  // Synthetic approval items from demo data
  const demoApprovals: ApprovalItem[] = [
    {
      queue_id: "demo-1",
      txn_date: approve.approved.txn_date,
      description: approve.approved.description,
      amount: "8420.00",
      suggested_gl_no: approve.approved.final_gl_no,
      suggested_gl_name: "Revenue",
      confidence: 0.97,
      status: "PENDING",
      period: data.period,
    },
    {
      queue_id: "demo-2",
      txn_date: "2025-12-05",
      description: "TD MASTERCARD — NOV STATEMENT",
      amount: "-3312.88",
      suggested_gl_no: "9999",
      suggested_gl_name: "Mixed — needs split",
      confidence: 0.72,
      status: "PENDING",
      period: data.period,
    },
    {
      queue_id: "demo-3",
      txn_date: "2025-12-08",
      description: "GOOGLE WORKSPACE MONTHLY",
      amount: "-86.24",
      suggested_gl_no: "5800",
      suggested_gl_name: "Software & IT",
      confidence: 0.99,
      status: "PENDING",
      period: data.period,
    },
  ];

  return (
    <div
      className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10"
      style={{ paddingTop: 0 }}
    >
      {/* Demo banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "12px 20px",
          background: GOLD_BG,
          border: `1px solid ${GOLD_BORDER}`,
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: GOLD,
              boxShadow: `0 0 0 3px ${GOLD_BORDER}`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: GOLD,
              fontWeight: 600,
            }}
          >
            Demo Workspace — {data.client}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: `${GOLD}99`,
            }}
          >
            · fictional data · {data.mode}
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <SignInButton mode="modal">
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 34,
                padding: "0 16px",
                borderRadius: 9,
                border: `1px solid ${GOLD_BORDER}`,
                background: "#fff",
                color: GOLD,
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <GoogleIcon size={14} />
              Sign in for live data
            </button>
          </SignInButton>
          <button
            onClick={onExitDemo}
            style={{
              height: 34,
              padding: "0 14px",
              borderRadius: 9,
              border: `1px solid ${GOLD_BORDER}`,
              background: "transparent",
              color: `${GOLD}aa`,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Exit demo
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: GOLD,
            }}
          >
            AcumenAI · Demo Console
          </span>
          <DevelopmentNote className="mt-2 block" />
          <h1
            className="mt-2 text-[30px] font-semibold tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Books for {data.period}
          </h1>
        </div>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Kpi label="Transactions" value={String(ingest.transactions)} />
        <Kpi label="Verified" value={`${verify.reconciled}/${verify.total}`} gold />
        <Kpi label="Auto-categorized" value={`${categorize.auto_pct}%`} gold />
        <Kpi label="Net movement" value={money(netMovement)} />
      </div>

      {/* Pipeline beats */}
      <section className="mt-10">
        <h2
          className="mb-3 text-[18px] font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Pipeline run
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {[
            {
              step: "1 · Ingest",
              detail: `${ingest.bank_code} detected · ${ingest.transactions} txns`,
              sub: `in ${money(ingest.money_in)} · out ${money(ingest.money_out)}`,
              ok: true,
            },
            {
              step: "2 · Verify",
              detail: `${verify.reconciled}/${verify.total} reconciled to the cent`,
              sub: verify.all_reconciled ? "Balance chain intact" : "Gaps found",
              ok: verify.all_reconciled,
            },
            {
              step: "3 · Categorize",
              detail: `${categorize.auto_categorized} auto · ${categorize.needs_review} for review`,
              sub: `${categorize.auto_pct}% hands-off`,
              ok: true,
            },
            {
              step: "4 · Audit",
              detail: `${data.beats.audit.event_count} events written`,
              sub: "Immutable trail",
              ok: true,
            },
            {
              step: "5 · Approve",
              detail: `Queue: ${approve.pending_before} → ${approve.pending_after}`,
              sub: `1 approved to GL ${approve.approved.final_gl_no}`,
              ok: true,
            },
          ].map((b) => (
            <div
              key={b.step}
              className="rounded-[14px] border bg-white p-4"
              style={{ borderColor: "var(--line)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: b.ok ? "#16A34A" : GOLD,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase" as const,
                    color: "var(--ink-3)",
                  }}
                >
                  {b.step}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                {b.detail}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  marginTop: 3,
                }}
              >
                {b.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approval queue (demo) */}
      <Section title="Approval queue" count={demoApprovals.length}>
        <ul className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
          {demoApprovals.map((a) => (
            <li
              key={a.queue_id}
              className="flex flex-wrap items-center gap-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <div
                  className="truncate text-[14px] font-semibold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {a.description}
                </div>
                <div
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                >
                  {a.txn_date} · {money(a.amount)} · GL {a.suggested_gl_no ?? "—"}{" "}
                  {a.suggested_gl_name ? `(${a.suggested_gl_name})` : ""} ·{" "}
                  {a.confidence != null ? `${Math.round(a.confidence * 100)}% conf.` : ""}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    alert("Sign in to approve — demo mode is read-only.")
                  }
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                  style={{
                    background: GOLD_BG,
                    color: GOLD,
                    border: `1px solid ${GOLD_BORDER}`,
                    fontFamily: "var(--font-display)",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Recap */}
      <div
        style={{
          marginTop: 32,
          padding: "20px 24px",
          borderRadius: 16,
          background: "var(--surface-2)",
          border: "1px solid var(--line)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-3)",
          lineHeight: 1.7,
        }}
      >
        <span style={{ fontWeight: 600, color: "var(--ink-2)" }}>Recap: </span>
        {data.recap.headline}
      </div>
    </div>
  );
}

// ── Live console (signed-in users) ────────────────────────────────────────────

function LiveConsole({ token }: { token: string | null }) {
  const [period, setPeriod] = useState(() => monthOptions()[0]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientConfig[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);

  const periods = useMemo(() => {
    const base = monthOptions();
    return base.includes(period) ? base : [period, ...base];
  }, [period]);

  // Pending items only (for approve/reject actions)
  const pending = useMemo(
    () => approvals.filter((a) => a.status === "PENDING"),
    [approvals],
  );
  const approved = useMemo(
    () => approvals.filter((a) => a.status === "APPROVED"),
    [approvals],
  );
  const highConf = useMemo(
    () => pending.filter((a) => (a.confidence ?? 0) >= 0.8),
    [pending],
  );

  // Load client list once on mount
  useEffect(() => {
    if (!token) return;
    acumenApi.clients(token).then(setClients).catch(() => {});
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let active = true;
    queueMicrotask(() => {
      if (active) {
        setLoading(true);
        setError(null);
      }
    });
    const acct = selectedClient ?? undefined;
    Promise.all([
      acumenApi.summary(token, period, acct),
      acumenApi.approvals(token, acct, true, period),
      acumenApi.transactions(token, period, acct, 200),
    ])
      .then(([s, a, t]) => {
        if (active) {
          setSummary(s);
          setApprovals(a);
          setTxns(t);
        }
      })
      .catch((e) => {
        if (active)
          setError(
            e instanceof ApiError ? `API ${e.status}: ${e.message}` : String(e),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token, period, selectedClient]);

  async function act(
    queueId: string,
    kind: "approve" | "reject",
    glNo: string | null,
  ) {
    if (!token) return;
    try {
      if (kind === "approve")
        await acumenApi.approve(token, queueId, glNo ?? "9999");
      else await acumenApi.reject(token, queueId);
      setApprovals((prev) => prev.filter((p) => p.queue_id !== queueId));
    } catch (e) {
      setError(
        e instanceof ApiError ? `API ${e.status}: ${e.message}` : String(e),
      );
    }
  }

  async function approveAll() {
    if (!token || highConf.length === 0) return;
    if (
      !window.confirm(
        `Approve ${highConf.length} high-confidence item(s) (≥ 80%)? Each books to its suggested GL.`,
      )
    )
      return;
    setBulkBusy(true);
    setError(null);
    const failed: string[] = [];
    for (const a of highConf) {
      try {
        await acumenApi.approve(token, a.queue_id, a.suggested_gl_no ?? "9999");
      } catch {
        failed.push(a.queue_id);
      }
    }
    const approvedIds = new Set(
      highConf
        .filter((a) => !failed.includes(a.queue_id))
        .map((a) => a.queue_id),
    );
    setApprovals((prev) => prev.filter((p) => !approvedIds.has(p.queue_id)));
    if (failed.length) setError(`${failed.length} item(s) could not be approved.`);
    setBulkBusy(false);
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: GOLD,
            }}
          >
            AcumenAI · Operator console
          </span>
          <DevelopmentNote className="mt-2 block" />
          <h1
            className="mt-2 text-[30px] font-semibold tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Books for {period}
          </h1>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {clients.length > 0 && (
            <label
              className="flex items-center gap-2 text-[13px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
            >
              Client
              <select
                value={selectedClient ?? ""}
                onChange={(e) => setSelectedClient(e.target.value || null)}
                className="rounded-lg border px-3 py-2 text-[14px]"
                style={{
                  borderColor: "var(--line-strong)",
                  color: "var(--ink)",
                  fontFamily: "var(--font-mono)",
                  background: "#fff",
                }}
              >
                <option value="">All</option>
                {clients.map((c) => (
                  <option key={c.account_masked} value={c.account_masked ?? ""}>
                    {c.client_id || c.account_masked}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label
            className="flex items-center gap-2 text-[13px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
          >
            Period
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border px-3 py-2 text-[14px]"
              style={{
                borderColor: "var(--line-strong)",
                color: "var(--ink)",
                fontFamily: "var(--font-mono)",
                background: "#fff",
              }}
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <UserButton />
        </div>
      </header>

      {error && (
        <div
          className="mb-6 rounded-xl border px-4 py-3 text-[13px]"
          style={{
            borderColor: "#E7B8B8",
            background: "#FBEEEE",
            color: "#9A3434",
            fontFamily: "var(--font-mono)",
          }}
        >
          {error}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Kpi
          label="Transactions"
          value={
            summary ? String(summary.total_transactions) : loading ? "…" : "—"
          }
        />
        <Kpi
          label="Auto-categorized"
          value={summary ? `${summary.auto_pct}%` : loading ? "…" : "—"}
          gold
        />
        <Kpi
          label="Needs review"
          value={pending.length > 0 ? String(pending.length) : loading ? "…" : "—"}
          gold
        />
        <Kpi
          label="Net movement"
          value={summary ? money(summary.net_movement) : loading ? "…" : "—"}
        />
      </div>

      {/* Approval queue */}
      <Section
        title="Needs review"
        count={pending.length}
        action={
          highConf.length > 0 ? (
            <button
              onClick={approveAll}
              disabled={bulkBusy}
              title="Approves only items with ≥ 80% confidence"
              className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
              style={{
                background: "var(--gold-500)",
                color: "#1A1206",
                fontFamily: "var(--font-display)",
                opacity: bulkBusy ? 0.6 : 1,
                cursor: bulkBusy ? "default" : "pointer",
              }}
            >
              {bulkBusy
                ? "Approving…"
                : `Approve high-confidence (${highConf.length})`}
            </button>
          ) : null
        }
      >
        {pending.length === 0 ? (
          <Empty text={loading ? "Loading…" : "Nothing awaiting review."} />
        ) : (
          <ul
            className="flex flex-col divide-y"
            style={{ borderColor: "var(--line)" }}
          >
            {pending.map((a) => (
              <li
                key={a.queue_id}
                className="flex flex-wrap items-center gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div
                    className="truncate text-[14px] font-semibold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    {a.description}
                  </div>
                  <div
                    className="text-[12px]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                  >
                    {a.txn_date} · {money(a.amount)} · suggests GL{" "}
                    {a.suggested_gl_no ?? "—"}{" "}
                    {a.suggested_gl_name ? `(${a.suggested_gl_name})` : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      act(a.queue_id, "approve", a.suggested_gl_no)
                    }
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{
                      background: "var(--gold-500)",
                      color: "#1A1206",
                      fontFamily: "var(--font-display)",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => act(a.queue_id, "reject", null)}
                    className="rounded-lg border px-3 py-1.5 text-[13px] font-medium"
                    style={{
                      borderColor: "var(--line-strong)",
                      color: "var(--ink-2)",
                      fontFamily: "var(--font-display)",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Auto-approved (read-only) */}
      {approved.length > 0 && (
        <Section title="Auto-approved" count={approved.length}>
          <ul
            className="flex flex-col divide-y"
            style={{ borderColor: "var(--line)" }}
          >
            {approved.map((a) => (
              <li
                key={a.queue_id}
                className="flex flex-wrap items-center gap-3 py-3"
                style={{ opacity: 0.7 }}
              >
                <div className="min-w-0 flex-1">
                  <div
                    className="truncate text-[14px] font-medium"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                  >
                    {a.description}
                  </div>
                  <div
                    className="text-[12px]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                  >
                    {a.txn_date} · {money(a.amount)} · GL {a.suggested_gl_no ?? "—"}{" "}
                    {a.suggested_gl_name ? `(${a.suggested_gl_name})` : ""}
                  </div>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={{
                    background: "#ECFDF5",
                    color: "#16A34A",
                    fontFamily: "var(--font-mono)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ auto-approved
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Transactions */}
      <Section title="Transactions" count={txns.length}>
        {txns.length === 0 ? (
          <Empty
            text={loading ? "Loading…" : "No transactions for this period."}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink-3)",
                  }}
                >
                  {["Date", "Description", "Amount", "GL", "Conf.", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.1em]"
                        style={{ borderColor: "var(--line)" }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {txns.map((t, i) => (
                  <tr key={i} style={{ fontFamily: "var(--font-display)" }}>
                    <td
                      className="border-b px-3 py-2 whitespace-nowrap"
                      style={{
                        borderColor: "var(--line)",
                        color: "var(--ink-2)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t.txn_date}
                    </td>
                    <td
                      className="border-b px-3 py-2"
                      style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                    >
                      {t.description}
                    </td>
                    <td
                      className="border-b px-3 py-2 whitespace-nowrap text-right tabular-nums"
                      style={{
                        borderColor: "var(--line)",
                        color: Number(t.amount) < 0 ? "var(--ink-2)" : GOLD,
                      }}
                    >
                      {money(t.amount)}
                    </td>
                    <td
                      className="border-b px-3 py-2 whitespace-nowrap"
                      style={{
                        borderColor: "var(--line)",
                        color: "var(--ink-3)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t.gl_account_no ?? "—"}
                    </td>
                    <td
                      className="border-b px-3 py-2 whitespace-nowrap"
                      style={{
                        borderColor: "var(--line)",
                        color: "var(--ink-3)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t.confidence != null
                        ? `${Math.round(t.confidence * 100)}%`
                        : "—"}
                    </td>
                    <td
                      className="border-b px-3 py-2"
                      style={{ borderColor: "var(--line)" }}
                    >
                      {t.needs_review && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: GOLD_BG,
                            color: GOLD,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          review
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function Kpi({
  label,
  value,
  gold,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div
      className="rounded-[14px] border bg-white p-5"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="text-[11px] font-medium uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
      >
        {label}
      </div>
      <div
        className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-display)",
          color: gold ? GOLD : "var(--ink)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Section({
  title,
  count,
  action,
  children,
}: {
  title: string;
  count: number;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          className="flex items-baseline gap-2 text-[18px] font-semibold"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {title}
          <span
            className="text-[13px] font-medium"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
          >
            {count}
          </span>
        </h2>
        {action}
      </div>
      <div
        className="rounded-[16px] border bg-white p-5"
        style={{ borderColor: "var(--line)" }}
      >
        {children}
      </div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      className="py-8 text-center text-[13px]"
      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
    >
      {text}
    </div>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

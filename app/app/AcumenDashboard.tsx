"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import {
  acumenApi,
  ApiError,
  type ApprovalItem,
  type Summary,
  type Txn,
} from "@/app/lib/acumenApi";
import { useAcumenToken } from "./useAcumenToken";

/* AcumenAI ops dashboard — live KPI cards, approval queue, and transactions from
   the Cloud Run API (vtx-os). Auth token comes from useAcumenToken (Clerk once
   wired). Renders a clear gated/empty/error state so it is safe before wiring. */

const GOLD = "#B7791F";

function money(s: string | null): string {
  if (s == null) return "—";
  const n = Number(s);
  return Number.isFinite(n)
    ? n.toLocaleString("en-CA", { style: "currency", currency: "CAD" })
    : s;
}

/** The current month and the previous `count-1` months as YYYY-MM, newest first. */
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

export default function AcumenDashboard() {
  const { token, ready, signedIn } = useAcumenToken();
  const [period, setPeriod] = useState("2026-04");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);

  // Period dropdown options — always includes the current selection.
  const periods = useMemo(() => {
    const base = monthOptions();
    return base.includes(period) ? base : [period, ...base];
  }, [period]);

  // Fetch when token/period change. All setState happens in async callbacks (never
  // synchronously in the effect body) to satisfy react-hooks/set-state-in-effect.
  useEffect(() => {
    if (!token) return;
    let active = true;
    queueMicrotask(() => { if (active) { setLoading(true); setError(null); } });
    Promise.all([
      acumenApi.summary(token, period),
      acumenApi.approvals(token),
      acumenApi.transactions(token, period, undefined, 100),
    ])
      .then(([s, a, t]) => { if (active) { setSummary(s); setApprovals(a); setTxns(t); } })
      .catch((e) => { if (active) setError(e instanceof ApiError ? `API ${e.status}: ${e.message}` : String(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [token, period]);

  async function act(queueId: string, kind: "approve" | "reject", glNo: string | null) {
    if (!token) return;
    try {
      if (kind === "approve") await acumenApi.approve(token, queueId, glNo ?? "9999");
      else await acumenApi.reject(token, queueId);
      setApprovals((prev) => prev.filter((p) => p.queue_id !== queueId));
    } catch (e) {
      setError(e instanceof ApiError ? `API ${e.status}: ${e.message}` : String(e));
    }
  }

  // Approve every pending item to its suggested GL. Items that fail stay in the
  // queue. Guarded by a confirm — this books real entries in bulk.
  async function approveAll() {
    if (!token || approvals.length === 0) return;
    if (!window.confirm(`Approve all ${approvals.length} item(s)? Each books to its suggested GL.`)) return;
    setBulkBusy(true);
    setError(null);
    const failures: ApprovalItem[] = [];
    for (const a of approvals) {
      try {
        await acumenApi.approve(token, a.queue_id, a.suggested_gl_no ?? "9999");
      } catch {
        failures.push(a);
      }
    }
    setApprovals(failures);
    if (failures.length) setError(`${failures.length} item(s) could not be approved.`);
    setBulkBusy(false);
  }

  if (ready && !signedIn) return <Gated />;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)", color: GOLD }}>
            AcumenAI · Operator console
          </span>
          <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Books for {period}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-[13px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
            Period
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border px-3 py-2 text-[14px]"
              style={{ borderColor: "var(--line-strong)", color: "var(--ink)", fontFamily: "var(--font-mono)", background: "#fff" }}
            >
              {periods.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
          <UserButton />
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border px-4 py-3 text-[13px]" style={{ borderColor: "#E7B8B8", background: "#FBEEEE", color: "#9A3434", fontFamily: "var(--font-mono)" }}>
          {error}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Kpi label="Transactions" value={summary ? String(summary.total_transactions) : (loading ? "…" : "—")} />
        <Kpi label="Auto-categorized" value={summary ? `${summary.auto_pct}%` : (loading ? "…" : "—")} gold />
        <Kpi label="Pending approvals" value={summary ? String(summary.pending_approvals) : (loading ? "…" : "—")} gold />
        <Kpi label="Net movement" value={summary ? money(summary.net_movement) : (loading ? "…" : "—")} />
      </div>

      {/* Approval queue */}
      <Section
        title="Approval queue"
        count={approvals.length}
        action={approvals.length > 0 ? (
          <button
            onClick={approveAll}
            disabled={bulkBusy}
            className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
            style={{ background: "var(--gold-500)", color: "#1A1206", fontFamily: "var(--font-display)", opacity: bulkBusy ? 0.6 : 1, cursor: bulkBusy ? "default" : "pointer" }}
          >
            {bulkBusy ? "Approving…" : `Approve all (${approvals.length})`}
          </button>
        ) : null}
      >
        {approvals.length === 0 ? (
          <Empty text={loading ? "Loading…" : "Nothing awaiting review."} />
        ) : (
          <ul className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
            {approvals.map((a) => (
              <li key={a.queue_id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>{a.description}</div>
                  <div className="text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
                    {a.txn_date} · {money(a.amount)} · suggests GL {a.suggested_gl_no ?? "—"} {a.suggested_gl_name ? `(${a.suggested_gl_name})` : ""}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => act(a.queue_id, "approve", a.suggested_gl_no)}
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ background: "var(--gold-500)", color: "#1A1206", fontFamily: "var(--font-display)" }}>
                    Approve
                  </button>
                  <button onClick={() => act(a.queue_id, "reject", null)}
                    className="rounded-lg border px-3 py-1.5 text-[13px] font-medium"
                    style={{ borderColor: "var(--line-strong)", color: "var(--ink-2)", fontFamily: "var(--font-display)" }}>
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Transactions */}
      <Section title="Transactions" count={txns.length}>
        {txns.length === 0 ? (
          <Empty text={loading ? "Loading…" : "No transactions for this period."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
                  {["Date", "Description", "Amount", "GL", "Conf.", ""].map((h) => (
                    <th key={h} className="border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.1em]" style={{ borderColor: "var(--line)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {txns.map((t, i) => (
                  <tr key={i} style={{ fontFamily: "var(--font-display)" }}>
                    <td className="border-b px-3 py-2 whitespace-nowrap" style={{ borderColor: "var(--line)", color: "var(--ink-2)", fontFamily: "var(--font-mono)" }}>{t.txn_date}</td>
                    <td className="border-b px-3 py-2" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>{t.description}</td>
                    <td className="border-b px-3 py-2 whitespace-nowrap text-right tabular-nums" style={{ borderColor: "var(--line)", color: Number(t.amount) < 0 ? "var(--ink-2)" : GOLD }}>{money(t.amount)}</td>
                    <td className="border-b px-3 py-2 whitespace-nowrap" style={{ borderColor: "var(--line)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{t.gl_account_no ?? "—"}</td>
                    <td className="border-b px-3 py-2 whitespace-nowrap" style={{ borderColor: "var(--line)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{t.confidence != null ? `${Math.round(t.confidence * 100)}%` : "—"}</td>
                    <td className="border-b px-3 py-2" style={{ borderColor: "var(--line)" }}>
                      {t.needs_review && <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "var(--gold-50)", color: GOLD, fontFamily: "var(--font-mono)" }}>review</span>}
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

function Kpi({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="rounded-[14px] border bg-white p-5" style={{ borderColor: "var(--line)" }}>
      <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{label}</div>
      <div className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)", color: gold ? GOLD : "var(--ink)" }}>{value}</div>
    </div>
  );
}

function Section({ title, count, action, children }: { title: string; count: number; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="flex items-baseline gap-2 text-[18px] font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          {title}
          <span className="text-[13px] font-medium" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{count}</span>
        </h2>
        {action}
      </div>
      <div className="rounded-[16px] border bg-white p-5" style={{ borderColor: "var(--line)" }}>{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="py-8 text-center text-[13px]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{text}</div>;
}

function Gated() {
  return (
    <div className="mx-auto max-w-[560px] px-6 py-24 text-center">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-mono)", color: GOLD }}>AcumenAI · Operator console</span>
      <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>Sign in to view live books</h1>
      <p className="mt-3 text-[15px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
        The operator console shows live BigQuery data and is restricted to your team.
        Connect an identity provider (Clerk) to enable sign-in — see app/app/README.md.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <SignInButton mode="modal">
          <button className="inline-flex h-11 items-center rounded-xl px-5 text-[14px] font-semibold" style={{ fontFamily: "var(--font-display)", background: "var(--gold-500)", color: "#1A1206" }}>
            Sign in →
          </button>
        </SignInButton>
        <a href="/acumen" className="inline-flex h-11 items-center rounded-xl border px-5 text-[14px] font-medium" style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", color: "var(--ink-2)" }}>
          See the showcase
        </a>
      </div>
    </div>
  );
}

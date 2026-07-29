"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CALL_OUTCOMES,
  fetchCalls,
  type CallOutcome,
  type CallsResponse,
  type PlatformCall,
} from "../../lib/esmiPlatform";

const PAGE_SIZE = 25;

/* ── formatting ──────────────────────────────────────────────────────────── */

const dateFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

function fmtWhen(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "—", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "" };
  return { date: dateFmt.format(d), time: timeFmt.format(d) };
}

function fmtDuration(sec: number | null): string {
  if (sec == null) return "—";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtCaller(e164: string | null): string {
  if (!e164) return "No caller ID";
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

/* ── outcome badge ───────────────────────────────────────────────────────── */

const OUTCOME_STYLE: Record<string, { label: string; cls: string }> = {
  booked: { label: "Booked", cls: "bg-teal-50 text-teal-800 ring-teal-200" },
  escalated: { label: "Escalated", cls: "bg-gold-50 text-gold-800 ring-gold-200" },
  info: { label: "Info", cls: "bg-navy-50 text-navy-500 ring-navy-200" },
  voicemail: { label: "Voicemail", cls: "bg-violet-50 text-violet-700 ring-violet-200" },
  abandoned: { label: "Abandoned", cls: "bg-surface-2 text-ink-3 ring-line" },
  other: { label: "Other", cls: "bg-surface-2 text-ink-3 ring-line" },
};

function OutcomeBadge({ outcome }: { outcome: CallOutcome | null }) {
  const s = OUTCOME_STYLE[outcome ?? "other"] ?? OUTCOME_STYLE.other;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

/* ── transcript ──────────────────────────────────────────────────────────── */

function TranscriptView({ call }: { call: PlatformCall }) {
  const t = call.transcript;
  const text = t?.text?.trim();

  if (text) {
    return (
      <div className="max-h-80 space-y-2 overflow-y-auto pr-2 text-sm leading-6">
        {text.split("\n").map((line, i) => {
          const m = line.match(/^(AI|Bot|Assistant|User|Customer)\s*:\s*(.*)$/i);
          if (!m) {
            return (
              <p key={i} className="text-ink-2">
                {line}
              </p>
            );
          }
          const isAgent = /^(ai|bot|assistant)$/i.test(m[1]);
          return (
            <p key={i} className="text-ink-2">
              <span
                className={`mr-1.5 font-semibold ${isAgent ? "text-teal-700" : "text-navy-500"}`}
              >
                {isAgent ? "Esmi" : "Caller"}
              </span>
              {m[2]}
            </p>
          );
        })}
      </div>
    );
  }

  const turns = (t?.messages ?? []).filter((m) => {
    const role = String(m.role ?? "").toLowerCase();
    return (role === "bot" || role === "user" || role === "assistant") && m.message;
  });
  if (turns.length === 0) {
    return <p className="text-sm text-ink-3">No transcript was captured for this call.</p>;
  }
  return (
    <div className="max-h-80 space-y-2 overflow-y-auto pr-2 text-sm leading-6">
      {turns.map((m, i) => {
        const isAgent = String(m.role).toLowerCase() !== "user";
        return (
          <p key={i} className="text-ink-2">
            <span
              className={`mr-1.5 font-semibold ${isAgent ? "text-teal-700" : "text-navy-500"}`}
            >
              {isAgent ? "Esmi" : "Caller"}
            </span>
            {String(m.message)}
          </p>
        );
      })}
    </div>
  );
}

function CallDetail({ call }: { call: PlatformCall }) {
  return (
    <div className="space-y-4 border-t border-line bg-surface-2/60 px-4 py-4 sm:px-6">
      {call.recording_url && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
            Recording
          </p>
          {/* Recording links are served by the voice provider and can expire —
              the transcript below is the permanent record. */}
          <audio controls preload="none" src={call.recording_url} className="h-10 w-full max-w-md">
            Your browser can&apos;t play this recording.{" "}
            <a href={call.recording_url} className="text-teal-700 underline">
              Download it instead.
            </a>
          </audio>
        </div>
      )}
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
          Transcript
        </p>
        <TranscriptView call={call} />
      </div>
    </div>
  );
}

/* ── rows / cards ────────────────────────────────────────────────────────── */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={`h-4 w-4 text-ink-4 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CallRow({ call }: { call: PlatformCall }) {
  const [open, setOpen] = useState(false);
  const when = fmtWhen(call.started_at);
  return (
    <>
      {/* Desktop row */}
      <tbody className="hidden md:table-row-group">
        <tr
          className="cursor-pointer border-t border-line transition-colors hover:bg-surface-2/60"
          onClick={() => setOpen((v) => !v)}
        >
          <td className="whitespace-nowrap px-4 py-3 text-sm sm:px-6">
            <span className="font-medium text-ink">{when.date}</span>
            <span className="ml-2 text-ink-3">{when.time}</span>
          </td>
          <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-ink-2">
            {fmtCaller(call.caller)}
          </td>
          <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-ink-2">
            {fmtDuration(call.duration_sec)}
          </td>
          <td className="whitespace-nowrap px-4 py-3">
            <OutcomeBadge outcome={call.outcome} />
          </td>
          <td className="max-w-md px-4 py-3 text-sm text-ink-2">
            <span className="line-clamp-2">{call.summary || "—"}</span>
          </td>
          <td className="px-4 py-3 text-right">
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Hide call details" : "Show call details"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className="rounded-md p-1.5 hover:bg-surface-2"
            >
              <Chevron open={open} />
            </button>
          </td>
        </tr>
        {open && (
          <tr className="hidden md:table-row">
            <td colSpan={6} className="p-0">
              <CallDetail call={call} />
            </td>
          </tr>
        )}
      </tbody>

      {/* Mobile card */}
      <tbody className="md:hidden">
        <tr>
          <td colSpan={6} className="border-t border-line p-0">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-ink">{when.date}</span>
                  <span className="text-sm text-ink-3">{when.time}</span>
                  <OutcomeBadge outcome={call.outcome} />
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-ink-2">
                  <span className="font-mono">{fmtCaller(call.caller)}</span>
                  <span className="tabular-nums">{fmtDuration(call.duration_sec)}</span>
                </div>
                {call.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-ink-2">{call.summary}</p>
                )}
              </div>
              <span className="mt-1 shrink-0">
                <Chevron open={open} />
              </span>
            </button>
            {open && <CallDetail call={call} />}
          </td>
        </tr>
      </tbody>
    </>
  );
}

/* ── states ──────────────────────────────────────────────────────────────── */

function SkeletonRows() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-t border-line">
          <td colSpan={6} className="px-4 py-3 sm:px-6">
            <div className="flex animate-pulse items-center gap-4">
              <div className="h-4 w-32 rounded bg-surface-2" />
              <div className="h-4 w-28 rounded bg-surface-2" />
              <div className="h-4 w-12 rounded bg-surface-2" />
              <div className="h-5 w-20 rounded-full bg-surface-2" />
              <div className="h-4 flex-1 rounded bg-surface-2" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={6}>
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {filtered ? "No calls match these filters" : "No calls yet"}
            </p>
            <p className="max-w-sm text-sm text-ink-3">
              {filtered
                ? "Try widening the date range or clearing the outcome filter."
                : "When Esmi answers your phone line, every call will show up here with its outcome, summary, and recording."}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={6}>
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              Couldn&apos;t load calls
            </p>
            <p className="max-w-sm text-sm text-ink-3">{message}</p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
            >
              Try again
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

/* ── main component ──────────────────────────────────────────────────────── */

export default function CallLog() {
  const [outcome, setOutcome] = useState<CallOutcome | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(0);

  const [data, setData] = useState<CallsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const filtered = Boolean(outcome || fromDate || toDate);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchCalls({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      outcome,
      from_date: fromDate,
      to_date: toDate,
    })
      .then((d) => {
        if (!active) return;
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [outcome, fromDate, toDate, page, reloadKey]);

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1),
    [data],
  );

  const resetFilters = useCallback(() => {
    setOutcome("");
    setFromDate("");
    setToDate("");
    setPage(0);
  }, []);

  const inputCls =
    "h-9 rounded-md border border-line bg-surface px-2.5 text-sm text-ink " +
    "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          Outcome
          <select
            value={outcome}
            onChange={(e) => {
              setOutcome(e.target.value as CallOutcome | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">All outcomes</option>
            {CALL_OUTCOMES.map((o) => (
              <option key={o} value={o}>
                {OUTCOME_STYLE[o].label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          From
          <input
            type="date"
            value={fromDate}
            max={toDate || undefined}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(0);
            }}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          To
          <input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(0);
            }}
            className={inputCls}
          />
        </label>
        {filtered && (
          <button
            type="button"
            onClick={resetFilters}
            className="h-9 rounded-md px-3 text-sm font-medium text-teal-700 hover:bg-teal-50"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-3">
              <th className="px-4 py-3 sm:px-6">Time</th>
              <th className="px-4 py-3">Caller</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Outcome</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          {loading ? (
            <SkeletonRows />
          ) : error ? (
            <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
          ) : !data || data.calls.length === 0 ? (
            <EmptyState filtered={filtered} />
          ) : (
            data.calls.map((c) => <CallRow key={c.id} call={c} />)
          )}
        </table>
      </div>

      {/* Pagination */}
      {data && !error && data.total > 0 && (
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink-2 sm:px-6">
          <span className="tabular-nums">
            {data.offset + 1}–{Math.min(data.offset + PAGE_SIZE, data.total)} of{" "}
            {data.total}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0 || loading}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-md border border-line px-3 py-1.5 font-medium text-ink enabled:hover:bg-surface-2 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="tabular-nums text-ink-3">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page + 1 >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-line px-3 py-1.5 font-medium text-ink enabled:hover:bg-surface-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CHAT_OUTCOMES,
  fetchChats,
  type ChatOutcome,
  type ChatsResponse,
  type PlatformChat,
} from "../../lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";

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

/* ── outcome badge ───────────────────────────────────────────────────────── */

// escalated is amber, not gold — gold is AcumenAI's reserved signature accent
// (see globals.css / CallLog.tsx's identical note).
const OUTCOME_STYLE: Record<string, { label: string; tone: BadgeTone }> = {
  booked: { label: "Booked", tone: "positive" },
  escalated: { label: "Escalated", tone: "warning" },
};

function OutcomeBadge({ outcome }: { outcome: ChatOutcome | null }) {
  if (!outcome) return <Badge tone="neutral">In progress</Badge>;
  const s = OUTCOME_STYLE[outcome];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

/* ── rows / cards ────────────────────────────────────────────────────────── */

function ChatRow({ chat }: { chat: PlatformChat }) {
  const started = fmtWhen(chat.started_at);
  const last = fmtWhen(chat.last_at);
  return (
    <>
      {/* Desktop row */}
      <tr className="hidden border-t border-line md:table-row">
        <td className="whitespace-nowrap px-4 py-3 text-sm sm:px-6">
          <span className="font-medium text-ink">{started.date}</span>
          <span className="ml-2 text-ink-3">{started.time}</span>
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-2">
          <span className="font-medium text-ink">{last.date}</span>
          <span className="ml-2 text-ink-3">{last.time}</span>
        </td>
        <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-ink-2">
          {chat.message_count}
        </td>
        <td className="whitespace-nowrap px-4 py-3">
          <OutcomeBadge outcome={chat.outcome} />
        </td>
        <td className="max-w-md px-4 py-3 text-sm text-ink-2">
          <span className="line-clamp-2">{chat.summary || "—"}</span>
        </td>
      </tr>

      {/* Mobile card */}
      <tr className="md:hidden">
        <td colSpan={5} className="border-t border-line px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-ink">{started.date}</span>
            <span className="text-sm text-ink-3">{started.time}</span>
            <OutcomeBadge outcome={chat.outcome} />
          </div>
          <div className="mt-1 text-sm text-ink-2">
            {chat.message_count} message{chat.message_count === 1 ? "" : "s"} · last active{" "}
            {last.date} {last.time}
          </div>
          {chat.summary && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-2">{chat.summary}</p>
          )}
        </td>
      </tr>
    </>
  );
}

/* ── states ──────────────────────────────────────────────────────────────── */

function SkeletonRows() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-t border-line">
          <td colSpan={5} className="px-4 py-3 sm:px-6">
            <div className="flex animate-pulse items-center gap-4">
              <div className="h-4 w-32 rounded bg-surface-2" />
              <div className="h-4 w-28 rounded bg-surface-2" />
              <div className="h-4 w-10 rounded bg-surface-2" />
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
        <td colSpan={5}>
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {filtered ? "No chats match these filters" : "No chats yet"}
            </p>
            <p className="max-w-sm text-sm text-ink-3">
              {filtered
                ? "Try widening the date range or clearing the outcome filter."
                : "When a visitor chats with Esmi on your website, every conversation will show up here with its outcome and message count."}
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
        <td colSpan={5}>
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              Couldn&apos;t load chats
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

export default function ChatLog() {
  const [outcome, setOutcome] = useState<ChatOutcome | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(0);

  const [data, setData] = useState<ChatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const filtered = Boolean(outcome || fromDate || toDate);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchChats({
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
              setOutcome(e.target.value as ChatOutcome | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">All outcomes</option>
            {CHAT_OUTCOMES.map((o) => (
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
              <th className="px-4 py-3 sm:px-6">Started</th>
              <th className="px-4 py-3">Last active</th>
              <th className="px-4 py-3">Messages</th>
              <th className="px-4 py-3">Outcome</th>
              <th className="px-4 py-3">Summary</th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonRows />
          ) : error ? (
            <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
          ) : !data || data.chats.length === 0 ? (
            <EmptyState filtered={filtered} />
          ) : (
            <tbody>
              {data.chats.map((c) => (
                <ChatRow key={c.id} chat={c} />
              ))}
            </tbody>
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

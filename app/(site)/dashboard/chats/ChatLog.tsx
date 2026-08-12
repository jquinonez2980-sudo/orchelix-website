"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CHAT_OUTCOMES,
  fetchChatDetail,
  fetchChats,
  type ChatAttribution,
  type ChatDetail,
  type ChatOutcome,
  type ChatsResponse,
  type PlatformChat,
} from "@/app/lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";
import { useDashI18n } from "../i18n";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

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

/* Same disposition bridge as CallLog — foil only for booked. */
const OUTCOME_STYLE: Record<string, { label: string; tone: BadgeTone }> = {
  booked: { label: "Booked", tone: "warning" },
  escalated: { label: "Routed", tone: "info" },
  // Idle thread aged out by scripts/close_chat_sessions.py — a real ending, but
  // an uneventful one, so it stays neutral rather than reading as a failure.
  closed: { label: "Closed", tone: "neutral" },
};

function OutcomeBadge({ outcome }: { outcome: ChatOutcome | null }) {
  const { t } = useDashI18n();
  if (!outcome) return <Badge tone="neutral">{t.ui.inProgress}</Badge>;
  const labels: Record<string, string> = {
    booked: OUTCOME_STYLE.booked.label,
    escalated: OUTCOME_STYLE.escalated.label,
    closed: t.ui.closed,
  };
  const s = OUTCOME_STYLE[outcome] ?? { label: outcome, tone: "neutral" as BadgeTone };
  return <Badge tone={s.tone}>{labels[outcome] ?? s.label}</Badge>;
}

/* ── transcript ──────────────────────────────────────────────────────────── */

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

function TranscriptView({ detail }: { detail: ChatDetail }) {
  const { t } = useDashI18n();
  if (detail.messages.length === 0) {
    return <p className="text-sm text-ink-3">{t.ui.noTranscript}</p>;
  }
  return (
    <div className="max-h-80 space-y-2 overflow-y-auto pr-2 text-sm leading-6">
      {detail.messages.map((m, i) => {
        const isAgent = m.role === "assistant";
        const when = fmtWhen(m.timestamp);
        return (
          <p key={i} className="text-ink-2">
            <span
              className={`mr-1.5 font-semibold ${isAgent ? "text-teal-700" : "text-navy-500"}`}
            >
              {isAgent ? "Esmi" : t.ui.visitor}
            </span>
            {m.content}
            {when.date && (
              <span className="ml-1.5 text-xs text-ink-4">
                {when.date} {when.time}
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}

/* ── attribution ─────────────────────────────────────────────────────────── */

/** Bare hostname for display — a full referrer URL is too long for the grid. */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Where this visitor came from. Rows stay blank for conversations that started
 * before attribution capture shipped, so say that explicitly rather than
 * rendering a grid of dashes that looks like a bug.
 */
function AttributionView({ a }: { a: ChatAttribution }) {
  const { t, locale } = useDashI18n();
  const campaign =
    [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" · ") || null;
  const hasAny = Boolean(
    a.referrer || campaign || a.landing_path || a.user_agent || a.ip_address,
  );

  if (!hasAny) {
    return (
      <p className="text-sm text-ink-3">
        {locale === "es"
          ? "Sin origen registrado — esta conversación empezó antes del seguimiento de atribución."
          : "No source recorded — this conversation started before attribution tracking."}
      </p>
    );
  }

  // A recorded chat with no referrer arrived without one: typed the URL, a
  // bookmark, or a stripped referer. That is "Direct", not missing data.
  const rows: Array<[string, string | null]> = [
    [t.ui.source, a.referrer ? hostOf(a.referrer) : t.ui.direct],
    [t.ui.campaign, campaign],
    [t.ui.landingPage, a.landing_path],
    [t.ui.device, a.user_agent],
    ["IP", a.ip_address],
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex min-w-0 items-baseline gap-2 text-sm">
          <dt className="shrink-0 text-ink-3">{label}</dt>
          <dd className="min-w-0 truncate text-ink" title={value ?? undefined}>
            {value ?? "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ChatDetailPanel({ chatId }: { chatId: string }) {
  const { t } = useDashI18n();
  const [detail, setDetail] = useState<ChatDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchChatDetail(chatId)
      .then((d) => {
        if (!active) return;
        setDetail(d);
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
  }, [chatId, reloadKey]);

  return (
    <div className="space-y-4 border-t border-line bg-surface-2 px-4 py-4 sm:px-6">
      {detail && !loading && !error && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
            {t.ui.attribution}
          </p>
          <AttributionView a={detail.attribution} />
        </div>
      )}
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
          {t.ui.transcript}
        </p>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-2/3 rounded bg-surface-2" />
            <div className="h-4 w-1/2 rounded bg-surface-2" />
            <div className="h-4 w-3/5 rounded bg-surface-2" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setReloadKey((k) => k + 1);
              }}
              className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-2"
            >
              {t.ui.tryAgain}
            </button>
          </div>
        ) : detail ? (
          <TranscriptView detail={detail} />
        ) : null}
      </div>
    </div>
  );
}

/* ── rows / cards ────────────────────────────────────────────────────────── */

function ChatRow({ chat }: { chat: PlatformChat }) {
  const { t } = useDashI18n();
  const [open, setOpen] = useState(false);
  const started = fmtWhen(chat.started_at);
  const last = fmtWhen(chat.last_at);
  return (
    <>
      {/* Desktop row */}
      <tr
        className="hidden cursor-pointer border-t border-line transition-colors hover:bg-surface-2 md:table-row"
        onClick={() => setOpen((v) => !v)}
      >
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
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? t.ui.hideTranscript : t.ui.showTranscript}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface-2"
          >
            <Chevron open={open} />
          </button>
        </td>
      </tr>
      {open && (
        <tr className="hidden md:table-row">
          <td colSpan={6} className="p-0">
            <ChatDetailPanel chatId={chat.id} />
          </td>
        </tr>
      )}

      {/* Mobile card */}
      <tr className="md:hidden">
        <td colSpan={6} className="border-t border-line p-0">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
          >
            <div className="min-w-0">
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
            </div>
            <span className="mt-1 shrink-0">
              <Chevron open={open} />
            </span>
          </button>
          {open && <ChatDetailPanel chatId={chat.id} />}
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
          <td colSpan={6} className="px-4 py-3 sm:px-6">
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
  const { t } = useDashI18n();
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={6}>
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {filtered ? t.ui.noChatsFilter : t.ui.noChats}
            </p>
            <p className="max-w-sm text-sm text-ink-3">
              {filtered ? t.ui.noLeadsFilterHint : t.ui.noLeadsHint}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { t } = useDashI18n();
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={6}>
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {t.ui.loadChatsFail}
            </p>
            <p className="max-w-sm text-sm text-ink-3">{message}</p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
            >
              {t.ui.tryAgain}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

/* ── main component ──────────────────────────────────────────────────────── */

export default function ChatLog() {
  const { t } = useDashI18n();
  const [outcome, setOutcome] = useState<ChatOutcome | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(0);

  const [data, setData] = useState<ChatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

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
  }, [orgSlug, outcome, fromDate, toDate, page, reloadKey]);

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
          {t.ui.outcome}
          <select
            value={outcome}
            onChange={(e) => {
              setOutcome(e.target.value as ChatOutcome | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">{t.ui.allOutcomes}</option>
            {CHAT_OUTCOMES.map((o) => (
              <option key={o} value={o}>
                {o === "closed" ? t.ui.closed : OUTCOME_STYLE[o].label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          {t.ui.from}
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
          {t.ui.to}
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
            {t.ui.clearFilters}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-3">
              <th className="px-4 py-3 sm:px-6">{t.ui.started}</th>
              <th className="px-4 py-3">{t.ui.lastActive}</th>
              <th className="px-4 py-3">{t.ui.messages}</th>
              <th className="px-4 py-3">{t.ui.outcome}</th>
              <th className="px-4 py-3">{t.ui.summary}</th>
              <th className="px-4 py-3" />
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
              {t.ui.previous}
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
              {t.ui.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  CALL_OUTCOMES,
  fetchCallRecordingExport,
  fetchCallReviews,
  fetchCalls,
  type CallLanguage,
  type CallOutcome,
  type CallReview,
  type CallsResponse,
  type PlatformCall,
  type ReviewStatus,
} from "@/app/lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";
import CallReviewControls from "../CallReviewControls";
import CoachFromCall from "../CoachFromCall";
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

/* Bridge to the marketing call-register dispositions (BOOKED / ROUTED /
   ANSWERED / CLOSED). Platform API still returns booked | escalated | info |
   voicemail | abandoned | other — labels here are what the operator reads;
   tones follow the single-accent Status Scale (foil only for booked). */
export const OUTCOME_STYLE: Record<
  string,
  { label: string; tone: BadgeTone; disposition: string }
> = {
  booked: { label: "Booked", tone: "warning", disposition: "BOOKED" },
  escalated: { label: "Routed", tone: "info", disposition: "ROUTED" },
  info: { label: "Answered", tone: "positive", disposition: "ANSWERED" },
  voicemail: { label: "Voicemail", tone: "violet", disposition: "CLOSED" },
  abandoned: { label: "Missed", tone: "negative", disposition: "CLOSED" },
  other: { label: "Other", tone: "neutral", disposition: "CLOSED" },
};

function OutcomeBadge({ outcome }: { outcome: CallOutcome | null }) {
  const s = OUTCOME_STYLE[outcome ?? "other"] ?? OUTCOME_STYLE.other;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

/* ── language ────────────────────────────────────────────────────────────── */

const LANGUAGE_LABEL: Record<string, string> = { en: "English", es: "Spanish" };

function fmtLanguage(lang: CallLanguage | null): string {
  return lang ? (LANGUAGE_LABEL[lang] ?? lang) : "Unknown";
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
                className={`mr-1.5 font-semibold ${isAgent ? "text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]" : "text-navy-500"}`}
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
              className={`mr-1.5 font-semibold ${isAgent ? "text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]" : "text-navy-500"}`}
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

function triggerMp3Download(url: string, filename: string) {
  /* Presigned R2 URLs are cross-origin; the download attribute is often
     ignored, so open in a new tab as a reliable mobile fallback. */
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function WhatsAppDownloadButton({ callId }: { callId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    // Don't toggle the parent row open/closed.
    e.stopPropagation();
    setBusy(true);
    setError(null);
    try {
      const exp = await fetchCallRecordingExport(callId, "mp3");
      triggerMp3Download(exp.url, exp.filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not prepare the MP3.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 max-w-md rounded-lg border border-teal-200 bg-teal-50 p-3">
      <p className="mb-2 text-xs leading-5 text-ink-2">
        Need to send this to the owner on WhatsApp? Use this — it downloads a small{" "}
        <span className="font-semibold text-ink">MP3</span>. The player above is for
        listening only (browser download there is a large WAV).
      </p>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className={
          "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md " +
          "bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm " +
          "hover:bg-[var(--lg-field-2)]0 enabled:active:bg-teal-700 " +
          "disabled:cursor-wait disabled:opacity-60"
        }
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className="h-4 w-4 shrink-0"
        >
          <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        {busy ? "Preparing MP3…" : "Download MP3 for WhatsApp"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function CallDetail({
  call,
  review,
  onReviewChange,
}: {
  call: PlatformCall;
  review?: CallReview | null;
  onReviewChange?: (r: CallReview) => void;
}) {
  return (
    <div className="space-y-4 border-t border-line bg-surface-2 px-4 py-4 sm:px-6">
      <CallReviewControls
        callId={call.id}
        initial={review}
        onChange={onReviewChange}
      />
      <CoachFromCall
        call={call}
        onCoached={() =>
          onReviewChange?.({
            status: "reviewed",
            note: review?.note ?? null,
            reviewed_at: new Date().toISOString(),
            reviewed_by: null,
            updated_at: new Date().toISOString(),
          })
        }
      />

      {call.recording_url && (
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
            Recording
          </p>
          {/* In-dashboard playback uses the short-lived WAV/presigned URL.
              WhatsApp export is a separate MP3 path (lazy R2 sidecar). */}
          <audio
            controls
            preload="none"
            controlsList="nodownload"
            src={call.recording_url}
            className="h-10 w-full max-w-md"
          >
            Your browser can&apos;t play this recording.
          </audio>
          <WhatsAppDownloadButton callId={call.id} />
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

function CallRow({
  call,
  review,
  defaultOpen,
  onReviewChange,
}: {
  call: PlatformCall;
  review?: CallReview | null;
  defaultOpen?: boolean;
  onReviewChange?: (callId: string, r: CallReview) => void;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const when = fmtWhen(call.started_at);
  const reviewStatus = review?.status;
  return (
    <>
      {/* Desktop row */}
      <tbody className="hidden md:table-row-group" id={`call-${call.id}`}>
        <tr
          className="cursor-pointer border-t border-line transition-colors hover:bg-surface-2"
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
          <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-2">
            {fmtLanguage(call.language)}
          </td>
          <td className="whitespace-nowrap px-4 py-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <OutcomeBadge outcome={call.outcome} />
              {reviewStatus && reviewStatus !== "reviewed" && (
                <Badge tone={reviewStatus === "needs_followup" ? "warning" : "info"}>
                  {reviewStatus === "needs_followup" ? "Follow-up" : "Open"}
                </Badge>
              )}
            </div>
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
              className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface-2"
            >
              <Chevron open={open} />
            </button>
          </td>
        </tr>
        {open && (
          <tr className="hidden md:table-row">
            <td colSpan={7} className="p-0">
              <CallDetail
                call={call}
                review={review}
                onReviewChange={(r) => onReviewChange?.(call.id, r)}
              />
            </td>
          </tr>
        )}
      </tbody>

      {/* Mobile card */}
      <tbody className="md:hidden">
        <tr>
          <td colSpan={7} className="border-t border-line p-0">
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
                  {reviewStatus && reviewStatus !== "reviewed" && (
                    <Badge tone={reviewStatus === "needs_followup" ? "warning" : "info"}>
                      {reviewStatus === "needs_followup" ? "Follow-up" : "Open"}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-ink-2">
                  <span className="font-mono">{fmtCaller(call.caller)}</span>
                  <span className="tabular-nums">{fmtDuration(call.duration_sec)}</span>
                  <span>{fmtLanguage(call.language)}</span>
                </div>
                {call.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-ink-2">{call.summary}</p>
                )}
              </div>
              <span className="mt-1 shrink-0">
                <Chevron open={open} />
              </span>
            </button>
            {open && (
              <CallDetail
                call={call}
                review={review}
                onReviewChange={(r) => onReviewChange?.(call.id, r)}
              />
            )}
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
          <td colSpan={7} className="px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
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
  const { t } = useDashI18n();
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={7}>
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {filtered ? t.ui.noCallsFilter : t.ui.noCalls}
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
        <td colSpan={7}>
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {t.ui.loadCallsFail}
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

function readSearchParam(key: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

export default function CallLog() {
  const [outcome, setOutcome] = useState<CallOutcome | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [language, setLanguage] = useState<CallLanguage | "">("");
  const [hasRecording, setHasRecording] = useState<"" | "true" | "false">("");
  const [reviewFilter, setReviewFilter] = useState<"" | "open" | "reviewed" | "needs_followup">("");
  const [deepCallId, setDeepCallId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const [data, setData] = useState<CallsResponse | null>(null);
  const [reviews, setReviews] = useState<Record<string, CallReview>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  /* Hydrate filters + deep link from URL (shareable consultant links). */
  useEffect(() => {
    const o = readSearchParam("outcome");
    const lang = readSearchParam("language");
    const rev = readSearchParam("review");
    const call = readSearchParam("call");
    if (o && CALL_OUTCOMES.includes(o as CallOutcome)) setOutcome(o as CallOutcome);
    if (lang === "en" || lang === "es") setLanguage(lang);
    if (rev === "open" || rev === "reviewed" || rev === "needs_followup") setReviewFilter(rev);
    if (call) setDeepCallId(call);
    const from = readSearchParam("from");
    const to = readSearchParam("to");
    if (from) setFromDate(from);
    if (to) setToDate(to);
  }, []);

  /* Keep URL in sync for filters (not every keystroke on dates — on state). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (outcome) params.set("outcome", outcome);
    if (language) params.set("language", language);
    if (reviewFilter) params.set("review", reviewFilter);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    if (deepCallId) params.set("call", deepCallId);
    const qs = params.toString();
    const next = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [outcome, language, reviewFilter, fromDate, toDate, deepCallId]);

  const filtered = Boolean(
    outcome || fromDate || toDate || language || hasRecording || reviewFilter,
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchCalls({
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
        outcome,
        from_date: fromDate,
        to_date: toDate,
        language,
        has_recording: hasRecording === "" ? undefined : hasRecording === "true",
      }),
      fetchCallReviews().catch(() => ({ tenant_id: "", reviews: {} as Record<string, CallReview> })),
    ])
      .then(([d, rev]) => {
        if (!active) return;
        setData(d);
        setReviews(rev.reviews);
        setLoading(false);
        if (deepCallId) {
          requestAnimationFrame(() => {
            document.getElementById(`call-${deepCallId}`)?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          });
        }
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [orgSlug, outcome, fromDate, toDate, language, hasRecording, page, reloadKey, deepCallId]);

  const visibleCalls = useMemo(() => {
    if (!data) return [];
    if (!reviewFilter) return data.calls;
    return data.calls.filter((c) => {
      const r = reviews[c.id];
      if (reviewFilter === "open") {
        return !r || r.status === "open" || r.status === "needs_followup";
      }
      return r?.status === reviewFilter;
    });
  }, [data, reviews, reviewFilter]);

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1),
    [data],
  );

  const onReviewChange = useCallback((callId: string, r: CallReview) => {
    setReviews((prev) => ({ ...prev, [callId]: r }));
  }, []);

  const resetFilters = useCallback(() => {
    setOutcome("");
    setFromDate("");
    setToDate("");
    setLanguage("");
    setHasRecording("");
    setReviewFilter("");
    setDeepCallId(null);
    setPage(0);
  }, []);

  const { t } = useDashI18n();
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
              setOutcome(e.target.value as CallOutcome | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">{t.ui.allOutcomes}</option>
            {CALL_OUTCOMES.map((o) => (
              <option key={o} value={o}>
                {OUTCOME_STYLE[o].label}
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
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          {t.ui.language}
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value as CallLanguage | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">{t.ui.allLanguages}</option>
            <option value="en">{t.ui.english}</option>
            <option value="es">{t.ui.spanish}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          {t.ui.recording}
          <select
            value={hasRecording}
            onChange={(e) => {
              setHasRecording(e.target.value as "" | "true" | "false");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">{t.ui.any}</option>
            <option value="true">{t.ui.hasRecording}</option>
            <option value="false">{t.ui.noRecording}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          {t.ui.review}
          <select
            value={reviewFilter}
            onChange={(e) => {
              setReviewFilter(
                e.target.value as "" | "open" | "reviewed" | "needs_followup",
              );
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">{t.ui.allReviews}</option>
            <option value="open">{t.ui.needsReview}</option>
            <option value="needs_followup">{t.ui.needsFollowup}</option>
            <option value="reviewed">{t.ui.reviewed}</option>
          </select>
        </label>
        {filtered && (
          <button
            type="button"
            onClick={resetFilters}
            className="h-9 rounded-md px-3 text-sm font-medium text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)] hover:bg-[var(--lg-field-2)]"
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
              <th className="px-4 py-3 sm:px-6">{t.ui.time}</th>
              <th className="px-4 py-3">{t.ui.caller}</th>
              <th className="px-4 py-3">{t.ui.duration}</th>
              <th className="px-4 py-3">{t.ui.language}</th>
              <th className="px-4 py-3">{t.ui.outcome}</th>
              <th className="px-4 py-3">{t.ui.summary}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          {loading ? (
            <SkeletonRows />
          ) : error ? (
            <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
          ) : !data || visibleCalls.length === 0 ? (
            <EmptyState filtered={filtered} />
          ) : (
            visibleCalls.map((c) => (
              <CallRow
                key={c.id}
                call={c}
                review={reviews[c.id]}
                defaultOpen={deepCallId === c.id}
                onReviewChange={onReviewChange}
              />
            ))
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

"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  fetchAppointments,
  type Appointment,
  type AppointmentsResponse,
} from "@/app/lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";
import { useDashI18n } from "../i18n";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const PAGE_SIZE = 25;

/* ── formatting ──────────────────────────────────────────────────────────── */

const dayFmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const yearFmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

function fmtDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return (sameYear ? dayFmt : yearFmt).format(d);
}

function fmtTimeRange(start: string, end: string | null): string {
  const s = new Date(start);
  if (Number.isNaN(s.getTime())) return "";
  const from = timeFmt.format(s);
  if (!end) return from;
  const e = new Date(end);
  return Number.isNaN(e.getTime()) ? from : `${from} – ${timeFmt.format(e)}`;
}

function fmtPhone(e164: string | null): string | null {
  if (!e164) return null;
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

/* ── source chip ─────────────────────────────────────────────────────────── */

// website was gold (AcumenAI's reserved accent, not Esmi/Orchelix) — same
// branding leak fixed on Team/Calls/Leads' badges. voice/chat/website are
// all Esmi-facilitated bookings (voice or chat conversation, or the
// website's own booking widget hitting the same booking API); manual is
// the one channel that's genuinely different — a human typed it in.
const SOURCE_TONE: Record<string, BadgeTone> = {
  voice: "positive",
  chat: "info",
  website: "info",
  manual: "neutral",
};

function SourceChip({ appt }: { appt: Appointment }) {
  const { t } = useDashI18n();
  const raw = (appt.source || "").toLowerCase();
  const key =
    raw === "voice" || raw === "phone" || raw === "call"
      ? "voice"
      : raw === "chat"
        ? "chat"
        : raw === "website" || raw === "web"
          ? "website"
          : "manual";
  const label =
    key === "voice"
      ? t.ui.phoneCall
      : key === "chat"
        ? t.ui.webChat
        : key === "website"
          ? t.ui.websiteBooking
          : t.ui.addedManually;
  return <Badge tone={SOURCE_TONE[key]}>{label}</Badge>;
}

/* ── appointment card ────────────────────────────────────────────────────── */

function AppointmentCard({ appt }: { appt: Appointment }) {
  const upcoming = appt.status === "upcoming";
  const phone = fmtPhone(appt.contact_phone);
  return (
    <li
      /* A 4px coloured left border is the craft floor's side-tab ban. An
         upcoming appointment is now marked by a 1px foil rule at the same
         weight the rest of the world rules with, plus full-strength ink on
         its text (already handled below) — the row reads as active without a
         tab stuck to its edge. */
      className={`flex flex-col gap-3 border p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-4 ${
        upcoming
          ? "border-line border-l border-l-teal-500 bg-surface"
          : "border-line bg-surface"
      }`}
    >
      {/* Date/time + (mobile-only) source badge */}
      <div className="flex items-center justify-between gap-3 sm:block sm:w-40 sm:shrink-0">
        <div>
          <p className={`text-sm font-semibold ${upcoming ? "text-ink" : "text-ink-3"}`}>
            {fmtDay(appt.starts_at)}
          </p>
          <p className={`text-sm tabular-nums ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
            {fmtTimeRange(appt.starts_at, appt.ends_at)}
          </p>
        </div>
        <div className="sm:hidden">
          <SourceChip appt={appt} />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${upcoming ? "text-ink" : "text-ink-3"}`}>
          {appt.customer_name}
        </p>
        <p className={`truncate text-sm ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
          {[appt.service, appt.location].filter(Boolean).join(" · ")}
        </p>
      </div>

      <div className="min-w-0 sm:w-52 sm:shrink-0">
        {phone && (
          <p className={`truncate font-mono text-sm ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
            {phone}
          </p>
        )}
        {appt.contact_email && (
          <p className={`truncate text-sm ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
            {appt.contact_email}
          </p>
        )}
        {!phone && !appt.contact_email && (
          <p className="text-sm text-ink-4">No contact on file</p>
        )}
      </div>

      {/* Desktop-only source badge — mobile shows it up in the header row */}
      <div className="hidden shrink-0 sm:block">
        <SourceChip appt={appt} />
      </div>
    </li>
  );
}

/* ── states ──────────────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <ul className="space-y-2 bg-surface-2 p-3 sm:p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="h-20 rounded-lg bg-surface-2" />
      ))}
    </ul>
  );
}

/* ── main ────────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "upcoming" | "past";

export default function Appointments() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [data, setData] = useState<AppointmentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  // Debounce the search box → server-side search param.
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchAppointments({ status, search, limit: PAGE_SIZE, offset: page * PAGE_SIZE })
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
  }, [orgSlug, status, search, page, reloadKey]);

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1),
    [data],
  );

  // Section boundary for the "all" view: upcoming block, then past block.
  const firstPastIdx = useMemo(() => {
    if (!data) return -1;
    return data.appointments.findIndex((a) => a.status === "past");
  }, [data]);

  const filtered = Boolean(search || status !== "all");

  const { t } = useDashI18n();
  const statusLabel = (s: "all" | "upcoming" | "past") =>
    s === "all" ? t.ui.all : s === "upcoming" ? t.ui.upcoming : t.ui.past;

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
        <div className="flex rounded-md border border-line p-0.5">
          {(["all", "upcoming", "past"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setStatus(s);
                setPage(0);
              }}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                status === s ? "bg-navy-600 text-white" : "text-ink-2 hover:bg-surface-2"
              }`}
            >
              {statusLabel(s)}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t.ui.searchNamePhone}
          className="h-9 w-full max-w-xs rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* List */}
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="font-display text-base font-semibold text-ink">
            {t.ui.loadApptsFail}
          </p>
          <p className="max-w-sm text-sm text-ink-3">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
          >
            {t.ui.tryAgain}
          </button>
        </div>
      ) : !data || data.appointments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="font-display text-base font-semibold text-ink">
            {filtered ? t.ui.noApptsFilter : t.ui.noAppts}
          </p>
          <p className="max-w-sm text-sm text-ink-3">
            {filtered ? t.ui.noApptsFilterHint : t.ui.noApptsHint}
          </p>
        </div>
      ) : (
        <ul className="space-y-2 bg-surface-2 p-3 sm:p-4">
          {data.appointments.map((a, i) => (
            <Fragment key={a.id}>
              {status === "all" && i === 0 && a.status === "upcoming" && (
                <li className="pb-0.5 text-xs font-semibold uppercase tracking-wide text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]">
                  {t.ui.upcoming}
                </li>
              )}
              {status === "all" && i === firstPastIdx && (
                <li className="pb-0.5 text-xs font-semibold uppercase tracking-wide text-ink-4">
                  {t.ui.past}
                </li>
              )}
              <AppointmentCard appt={a} />
            </Fragment>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {data && !error && data.total > 0 && (
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink-2 sm:px-6">
          <span className="tabular-nums">
            {data.offset + 1}–{Math.min(data.offset + PAGE_SIZE, data.total)} of{" "}
            {data.total}
            {status === "all" && ` · ${data.upcoming_count} upcoming`}
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

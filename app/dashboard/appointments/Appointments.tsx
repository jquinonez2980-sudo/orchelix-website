"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  fetchAppointments,
  type Appointment,
  type AppointmentsResponse,
} from "../../lib/esmiPlatform";

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

const SOURCE_STYLE: Record<string, { label: string; cls: string }> = {
  voice: { label: "Phone", cls: "bg-teal-50 text-teal-800 ring-teal-200" },
  chat: { label: "Web chat", cls: "bg-navy-50 text-navy-500 ring-navy-200" },
  website: { label: "Website", cls: "bg-gold-50 text-gold-800 ring-gold-200" },
  manual: { label: "Added manually", cls: "bg-surface-2 text-ink-3 ring-line" },
};

function SourceChip({ appt }: { appt: Appointment }) {
  const key = appt.source && SOURCE_STYLE[appt.source] ? appt.source : "manual";
  const s = SOURCE_STYLE[key];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${s.cls}`}
    >
      {s.label}
    </span>
  );
}

/* ── appointment card ────────────────────────────────────────────────────── */

function AppointmentCard({ appt }: { appt: Appointment }) {
  const upcoming = appt.status === "upcoming";
  const phone = fmtPhone(appt.contact_phone);
  return (
    <li
      className={`flex flex-col gap-2 border-t border-line px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-6 ${
        upcoming ? "border-l-2 border-l-teal-500 bg-surface" : "bg-surface-2/40"
      }`}
    >
      <div className="w-44 shrink-0">
        <p className={`text-sm font-semibold ${upcoming ? "text-ink" : "text-ink-3"}`}>
          {fmtDay(appt.starts_at)}
        </p>
        <p className={`text-sm tabular-nums ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
          {fmtTimeRange(appt.starts_at, appt.ends_at)}
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${upcoming ? "text-ink" : "text-ink-3"}`}>
          {appt.customer_name}
        </p>
        <p className={`truncate text-sm ${upcoming ? "text-ink-2" : "text-ink-4"}`}>
          {[appt.service, appt.location].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="min-w-0 sm:w-52">
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
      <div className="shrink-0">
        <SourceChip appt={appt} />
      </div>
    </li>
  );
}

/* ── states ──────────────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="border-t border-line px-4 py-4 sm:px-6">
          <div className="flex animate-pulse items-center gap-4">
            <div className="h-4 w-40 rounded bg-surface-2" />
            <div className="h-4 w-48 rounded bg-surface-2" />
            <div className="h-4 flex-1 rounded bg-surface-2" />
            <div className="h-5 w-20 rounded-full bg-surface-2" />
          </div>
        </li>
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
  }, [status, search, page, reloadKey]);

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
              className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                status === s ? "bg-navy-600 text-white" : "text-ink-2 hover:bg-surface-2"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name or phone…"
          className="h-9 w-full max-w-xs rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-4 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* List */}
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="font-display text-base font-semibold text-ink">
            Couldn&apos;t load appointments
          </p>
          <p className="max-w-sm text-sm text-ink-3">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
          >
            Try again
          </button>
        </div>
      ) : !data || data.appointments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="font-display text-base font-semibold text-ink">
            {filtered ? "No appointments match" : "No appointments booked yet"}
          </p>
          <p className="max-w-sm text-sm text-ink-3">
            {filtered
              ? "Try a different search or switch the filter back to All."
              : "The first time Esmi books a customer in — by phone or from your website — it appears right here."}
          </p>
        </div>
      ) : (
        <ul>
          {data.appointments.map((a, i) => (
            <Fragment key={a.id}>
              {status === "all" && i === 0 && a.status === "upcoming" && (
                <li className="bg-surface px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-teal-700 sm:px-6">
                  Upcoming
                </li>
              )}
              {status === "all" && i === firstPastIdx && (
                <li className="bg-surface px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-4 sm:px-6">
                  Past
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

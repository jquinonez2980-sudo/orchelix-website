"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOverview, type OverviewResponse } from "../lib/esmiPlatform";
import { Tile } from "./PlanUsageWidgets";

/* KPI tiles per the stat-tile contract: sentence-case label, semibold value in
   proportional figures (no tabular-nums at display size), signed delta vs a
   named period with an arrow glyph so direction is never color-alone.
   Exactly ONE hero figure per view: the after-hours number. */

type Delta =
  | { kind: "pct"; value: number }
  | { kind: "new" }
  | { kind: "flat" };

function computeDelta(cur: number, prev: number): Delta {
  if (prev === 0 && cur === 0) return { kind: "flat" };
  if (prev === 0) return { kind: "new" };
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) return { kind: "flat" };
  return { kind: "pct", value: pct };
}

function DeltaLine({ delta, invert = false }: { delta: Delta; invert?: boolean }) {
  const period = "vs prior 7 days";
  if (delta.kind === "flat") {
    return <p className={`text-xs ${invert ? "text-navy-200" : "text-ink-4"}`}>— {period}</p>;
  }
  if (delta.kind === "new") {
    return (
      <p className={`text-xs font-medium ${invert ? "text-teal-300" : "text-teal-700"}`}>
        New {period}
      </p>
    );
  }
  const up = delta.value > 0;
  const cls = invert
    ? up
      ? "text-teal-300"
      : "text-navy-200"
    : up
      ? "text-teal-700"
      : "text-rose-600";
  return (
    <p className={`text-xs font-medium ${cls}`}>
      {up ? "↑" : "↓"} {Math.abs(delta.value)}% {period}
    </p>
  );
}

function DeltaTile({
  label,
  value,
  delta,
  note,
}: {
  label: string;
  value: string;
  delta: Delta;
  note?: string;
}) {
  return (
    <Tile label={label} value={value} note={note}>
      <div className="mt-1.5">
        <DeltaLine delta={delta} />
      </div>
    </Tile>
  );
}

function SkeletonTiles() {
  return (
    <div className="space-y-4">
      <div className="h-44 animate-pulse rounded-lg bg-surface-2" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-surface-2" />
        ))}
      </div>
    </div>
  );
}

// True when the error means "this organization isn't a real Esmi client" —
// e.g. an admin's own org, or an org whose Clerk slug doesn't match a
// tenant — rather than a transient backend/network problem. Retrying can't
// fix this; switching organizations can.
function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("unknown tenant") ||
    m.includes("no active organization") ||
    m.includes("x-tenant-id header is required")
  );
}

export default function Overview() {
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchOverview()
      .then((d) => active && setData(d))
      .catch((e: Error) => active && setError(e.message));
    return () => {
      active = false;
    };
  }, [reloadKey]);

  if (error) {
    const orgIssue = isUnknownOrgError(error);
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface px-6 py-16 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          {orgIssue ? "No client selected" : "Couldn't load your overview"}
        </p>
        <p className="max-w-sm text-sm text-ink-3">
          {orgIssue
            ? "This organization isn't set up as an Esmi client yet. Switch to a client organization using the switcher above."
            : error}
        </p>
        {!orgIssue && (
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!data) return <SkeletonTiles />;

  const { current: cur, previous: prev } = data;
  const quiet = cur.calls_answered === 0 && prev.calls_answered === 0;

  return (
    <div className="space-y-4">
      {/* Hero: after-hours calls — the money-you-didn't-lose number */}
      <section className="rounded-lg bg-navy-600 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium text-teal-300">After-hours calls answered</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-2">
          <p className="text-4xl font-semibold leading-none text-white sm:text-5xl">
            {cur.after_hours_calls}
          </p>
          <div className="pb-1">
            <DeltaLine
              delta={computeDelta(cur.after_hours_calls, prev.after_hours_calls)}
              invert
            />
          </div>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-6 text-navy-100">
          {quiet
            ? "Esmi is on duty around the clock. The moment someone calls while you're closed, it's answered — and counted here."
            : cur.after_hours_calls > 0
              ? "Calls Esmi picked up while your doors were closed — customers who would otherwise have reached voicemail or a competitor."
              : "No after-hours calls this week — and if one comes in at 2am, Esmi has it covered."}
        </p>
      </section>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DeltaTile
          label="Calls answered"
          value={String(cur.calls_answered)}
          delta={computeDelta(cur.calls_answered, prev.calls_answered)}
        />
        <DeltaTile
          label="Appointments booked"
          value={String(cur.appointments_booked)}
          delta={computeDelta(cur.appointments_booked, prev.appointments_booked)}
        />
        <DeltaTile
          label="Leads escalated to you"
          value={String(cur.leads_escalated)}
          delta={computeDelta(cur.leads_escalated, prev.leads_escalated)}
          note="Callers Esmi flagged for a human follow-up"
        />
        <DeltaTile
          label="Minutes used"
          value={`${cur.minutes_used.toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })} min`}
          delta={computeDelta(cur.minutes_used, prev.minutes_used)}
        />
        <DeltaTile
          label="Web chats"
          value={String(cur.web_chats)}
          delta={computeDelta(cur.web_chats, prev.web_chats)}
          note={
            cur.web_chats === 0 && prev.web_chats === 0
              ? "Conversations from your website chat will show up here"
              : undefined
          }
        />
        {cur.est_revenue_booked != null && (
          <DeltaTile
            label="Estimated revenue booked"
            value={`$${cur.est_revenue_booked.toLocaleString()}`}
            delta={computeDelta(
              cur.est_revenue_booked,
              prev.est_revenue_booked ?? 0,
            )}
            note="Bookings × your average service price"
          />
        )}
      </div>

      <p className="text-xs text-ink-4">
        Last 7 days vs the 7 days before, in your business timezone ({data.business_tz}).
        Phone calls and web chats — other channels aren&apos;t counted yet.{" "}
        <Link href="/dashboard/calls" className="text-teal-700 hover:underline">
          See every call →
        </Link>{" "}
        <Link href="/dashboard/chats" className="text-teal-700 hover:underline">
          See every chat →
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  fetchUsage,
  type UsageResponse,
  type WeeklyCallOutcome,
  type WeeklyUsageBucket,
} from "@/app/lib/esmiPlatform";
import { LimitBanner, MinutesProgress, Tile } from "../PlanUsageWidgets";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

/* Phase 3 ticket 3.1 (usage rollup) + ticket 3.2 (plan tiers + SOFT limits).
   Read-only, no Stripe, no hard blocking — a plan's included minutes are a
   warning threshold shown here, never something that stops a call. */

/* This-week-vs-last-week delta + outcome-mix sections (feat/usage). Kept
   local to this file rather than importing from Overview.tsx, which has its
   own KPI set (bookings/escalations/after-hours/revenue) this page doesn't
   need — duplicating the small delta helper avoids coupling the two pages. */

type Delta = { kind: "pct"; value: number } | { kind: "new" } | { kind: "flat" };

function computeDelta(cur: number, prev: number): Delta {
  if (prev === 0 && cur === 0) return { kind: "flat" };
  if (prev === 0) return { kind: "new" };
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) return { kind: "flat" };
  return { kind: "pct", value: pct };
}

function DeltaLine({ delta }: { delta: Delta }) {
  const period = "vs prior 7 days";
  if (delta.kind === "flat") {
    return <p className="text-xs text-ink-4">— {period}</p>;
  }
  if (delta.kind === "new") {
    return <p className="text-xs font-medium text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]">New {period}</p>;
  }
  const up = delta.value > 0;
  return (
    <p className={`text-xs font-medium ${up ? "text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]" : "text-rose-600"}`}>
      {up ? "↑" : "↓"} {Math.abs(delta.value)}% {period}
    </p>
  );
}

const OUTCOME_LABELS: Record<WeeklyCallOutcome, string> = {
  booked: "Booked",
  info: "Info only",
  escalated: "Escalated",
  voicemail: "Voicemail",
  abandoned: "Abandoned",
  other: "Other",
  unclassified: "Unclassified",
};

const OUTCOME_ORDER: WeeklyCallOutcome[] = [
  "booked",
  "escalated",
  "info",
  "voicemail",
  "abandoned",
  "other",
  "unclassified",
];

function WeeklyDeltaSection({
  current,
  previous,
}: {
  current: WeeklyUsageBucket;
  previous: WeeklyUsageBucket;
}) {
  return (
    <section>
      <h2 className="font-display text-base font-semibold text-ink">
        This week vs last week
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <Tile label="Calls answered" value={String(current.calls_answered)}>
          <div className="mt-1.5">
            <DeltaLine delta={computeDelta(current.calls_answered, previous.calls_answered)} />
          </div>
        </Tile>
        <Tile
          label="Minutes used"
          value={`${current.minutes_used.toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })} min`}
        >
          <div className="mt-1.5">
            <DeltaLine delta={computeDelta(current.minutes_used, previous.minutes_used)} />
          </div>
        </Tile>
      </div>
    </section>
  );
}

function OutcomeBreakdownSection({ bucket }: { bucket: WeeklyUsageBucket }) {
  const total = bucket.calls_answered;
  const rows = OUTCOME_ORDER.filter((o) => bucket.by_outcome[o] > 0);

  return (
    <section>
      <h2 className="font-display text-base font-semibold text-ink">
        Calls by outcome (last 7 days)
      </h2>
      <div className="mt-3 rounded-lg border border-line bg-surface p-5 shadow-sm">
        {total === 0 ? (
          <p className="text-sm text-ink-3">No calls in the last 7 days.</p>
        ) : (
          <ul className="space-y-2.5">
            {rows.map((outcome) => {
              const count = bucket.by_outcome[outcome];
              const pct = Math.round((count / total) * 100);
              return (
                <li key={outcome}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-2">{OUTCOME_LABELS[outcome]}</span>
                    <span className="text-ink-3">
                      {count} <span className="text-ink-4">({pct}%)</span>
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-navy-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function SkeletonTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 rounded-lg bg-surface-2" />
      ))}
    </div>
  );
}

function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("unknown tenant") ||
    m.includes("no active organization") ||
    m.includes("x-tenant-id header is required")
  );
}

function formatMonth(dateStr: string): string {
  // period_start is YYYY-MM-DD; render as e.g. "July 2026" without a TZ shift.
  const [y, m] = dateStr.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export default function Usage() {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchUsage()
      .then((d) => active && setData(d))
      .catch((e: Error) => active && setError(e.message));
    return () => {
      active = false;
    };
  }, [orgSlug, reloadKey]);

  if (error) {
    const orgIssue = isUnknownOrgError(error);
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface px-6 py-16 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          {orgIssue ? "No client selected" : "Couldn't load your usage"}
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

  return (
    <div className="space-y-4">
      {data.plan.status && data.plan.status !== "ok" && <LimitBanner plan={data.plan} />}
      {/* Three tiles, not four: the "Estimated cost" tile showed Orchelix's
          VAPI + LLM spend, which is our supplier cost, not the client's bill.
          It now lives on the super-admin economics view instead. */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Tile label="Plan" value={data.plan.label} />
        <Tile label="Calls" value={data.calls.toLocaleString()} />
        <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
          <p className="text-sm text-ink-3">Voice minutes used</p>
          <MinutesProgress minutes={data.minutes} plan={data.plan} />
        </div>
      </div>
      <p className="text-xs text-ink-4">
        {formatMonth(data.period_start)} so far ({data.period_start} through today, in
        your business timezone — {data.business_tz}).{" "}
        {data.plan.included_minutes == null
          ? "Your plan has no monthly minute limit."
          : "Included minutes are a soft limit — a heads-up only, calls are never blocked."}
      </p>

      <WeeklyDeltaSection current={data.weekly.current} previous={data.weekly.previous} />
      <OutcomeBreakdownSection bucket={data.weekly.current} />
    </div>
  );
}

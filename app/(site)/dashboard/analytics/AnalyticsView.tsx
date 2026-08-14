"use client";

import { useEffect, useState } from "react";
import {
  fetchAnalytics,
  type AnalyticsDayCount,
  type AnalyticsResponse,
  type LanguageMix,
} from "@/app/lib/esmiPlatform";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const dayFmt = new Intl.DateTimeFormat(undefined, { day: "numeric" });

// True when the error means "this organization isn't a real Esmi client" —
// same distinction Overview/Usage/Scheduling already make; retrying can't
// fix it.
function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("unknown tenant") ||
    m.includes("no active organization") ||
    m.includes("x-tenant-id header is required")
  );
}

/* ── call volume (simple CSS bars — no chart library) ───────────────────── */

function VolumeChart({ days }: { days: AnalyticsDayCount[] }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-base font-semibold text-ink">
          Call volume (last {days.length} days)
        </h2>
        <span className="text-sm text-ink-3">{total} calls</span>
      </div>
      <div className="mt-3 rounded-lg border border-line bg-surface p-5 shadow-sm">
        {total === 0 ? (
          <p className="text-sm text-ink-3">No calls in the last {days.length} days.</p>
        ) : (
          <div className="flex h-28 items-end gap-1">
            {days.map((d) => (
              <div key={d.date} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                <div
                  title={`${d.date}: ${d.count} call${d.count === 1 ? "" : "s"}`}
                  className="w-full rounded-t bg-navy-600"
                  style={{
                    height: d.count === 0 ? "2px" : `${Math.max(6, (d.count / max) * 100)}%`,
                    opacity: d.count === 0 ? 0.2 : 1,
                  }}
                />
                <span className="text-[10px] text-ink-4">
                  {dayFmt.format(new Date(`${d.date}T00:00:00`))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── language mix (same bar-list style as Usage's outcome breakdown) ────── */

const LANGUAGE_MIX_LABEL: Record<"en" | "es" | "unknown", string> = {
  en: "English",
  es: "Spanish",
  unknown: "Unknown",
};

function LanguageMixSection({ mix }: { mix: LanguageMix }) {
  const total = mix.en + mix.es + mix.unknown;
  const rows = (["en", "es", "unknown"] as const).filter((k) => mix[k] > 0);

  return (
    <section>
      <h2 className="font-display text-base font-semibold text-ink">Language mix</h2>
      <div className="mt-3 rounded-lg border border-line bg-surface p-5 shadow-sm">
        {total === 0 ? (
          <p className="text-sm text-ink-3">No calls in this window.</p>
        ) : (
          <ul className="space-y-2.5">
            {rows.map((key) => {
              const count = mix[key];
              const pct = Math.round((count / total) * 100);
              return (
                <li key={key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-2">{LANGUAGE_MIX_LABEL[key]}</span>
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

/* ── coming soon ─────────────────────────────────────────────────────────── */

const COMING_SOON = [
  { title: "Peak hours heatmap", body: "When your callers actually call, by hour and day of week." },
  { title: "Booking conversion rate", body: "What share of calls turn into a booked appointment." },
  { title: "Lead quality score", body: "How promising the leads Esmi escalates to you tend to be." },
];

function ComingSoonSection() {
  return (
    <section>
      <h2 className="font-display text-base font-semibold text-ink">Coming soon</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COMING_SOON.map((c) => (
          <div key={c.title} className="rounded-lg border border-dashed border-line bg-surface p-4">
            <p className="text-sm font-medium text-ink-2">{c.title}</p>
            <p className="mt-1 text-xs leading-5 text-ink-4">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── skeleton / error / main ─────────────────────────────────────────────── */

function SkeletonCards() {
  return (
    <div className="space-y-4">
      <div className="h-44 rounded-lg bg-surface-2" />
      <div className="h-32 rounded-lg bg-surface-2" />
    </div>
  );
}

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchAnalytics()
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
          {orgIssue ? "No client selected" : "Couldn't load analytics"}
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

  if (!data) return <SkeletonCards />;

  return (
    <div className="space-y-6">
      <VolumeChart days={data.volume_by_day} />
      <LanguageMixSection mix={data.language_mix} />
      <ComingSoonSection />
      <p className="text-xs text-ink-4">
        Last {data.window_days} days, in your business timezone ({data.business_tz}). For
        plan usage and cost, see Usage.
      </p>
    </div>
  );
}

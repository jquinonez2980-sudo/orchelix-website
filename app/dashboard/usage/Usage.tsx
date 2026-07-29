"use client";

import { useEffect, useState } from "react";
import { fetchUsage, type UsageResponse } from "../../lib/esmiPlatform";

/* Phase 3 ticket 3.1: read-only usage view. No plan limits, no Stripe —
   just the current-calendar-month rollup from the calls table so usage is
   visible before any billing enforcement is built on top of it. */

function Tile({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
      <p className="text-sm text-ink-3">{label}</p>
      <p className="mt-1.5 text-3xl font-semibold text-ink">{value}</p>
      {note && <p className="mt-1 text-xs text-ink-4">{note}</p>}
    </div>
  );
}

function SkeletonTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-surface-2" />
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
  }, [reloadKey]);

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

  const totalCost =
    data.cost_vapi != null || data.cost_llm != null
      ? (data.cost_vapi ?? 0) + (data.cost_llm ?? 0)
      : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Tile label="Calls" value={data.calls.toLocaleString()} />
        <Tile
          label="Voice minutes used"
          value={data.minutes.toLocaleString(undefined, {
            maximumFractionDigits: 1,
          })}
        />
        <Tile
          label="Estimated cost"
          value={totalCost != null ? `$${totalCost.toFixed(2)}` : "—"}
          note="VAPI + LLM, not what you're billed"
        />
        <Tile label="Business timezone" value={data.business_tz} />
      </div>
      <p className="text-xs text-ink-4">
        {formatMonth(data.period_start)} so far ({data.period_start} through
        today, in your business timezone). This is a usage view only — no
        plan limits are enforced yet.
      </p>
    </div>
  );
}

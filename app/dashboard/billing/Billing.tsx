"use client";

import { useEffect, useState } from "react";
import { fetchBilling, type AccountStatus, type BillingResponse } from "../../lib/esmiPlatform";
import { LimitBanner, MinutesProgress, Tile } from "../PlanUsageWidgets";

/* Phase 3 ticket 3.3: read-only billing snapshot. No Stripe subscription
   sync yet — every tenant is billed manually today, so this page's job is
   to show plan + usage-vs-limit clearly and point to a human for changes,
   not to manage billing itself. */

const STATUS_STYLE: Record<AccountStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-teal-50 text-teal-700 border-teal-200" },
  trial: { label: "Trial", className: "bg-navy-50 text-navy-600 border-navy-200" },
  past_due: { label: "Past due", className: "bg-amber-50 text-amber-800 border-amber-200" },
  suspended: { label: "Suspended", className: "bg-rose-50 text-rose-700 border-rose-200" },
  archived: { label: "Archived", className: "bg-surface-2 text-ink-3 border-line" },
};

function StatusBadge({ status }: { status: AccountStatus }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.live;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function SkeletonTiles() {
  return (
    <div className="space-y-4">
      <div className="h-20 animate-pulse rounded-lg bg-surface-2" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-surface-2" />
        ))}
      </div>
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
  const [y, m] = dateStr.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export default function Billing() {
  const [data, setData] = useState<BillingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchBilling()
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
          {orgIssue ? "No client selected" : "Couldn't load your billing info"}
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

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface p-5 shadow-sm">
        <div>
          <p className="text-sm text-ink-3">Account status</p>
          <div className="mt-1.5">
            <StatusBadge status={data.account_status} />
          </div>
        </div>
        <a
          href="mailto:info@orchelix.com?subject=Billing%20question"
          className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
        >
          Manage billing
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Tile label="Plan" value={data.plan.label} />
        <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
          <p className="text-sm text-ink-3">Voice minutes used</p>
          <MinutesProgress minutes={data.minutes} plan={data.plan} />
        </div>
        <Tile label="Calls this month" value={data.calls.toLocaleString()} />
      </div>

      <div className="rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink-2">
        Billing is currently managed manually — invoices and plan changes go through your
        Orchelix contact, not self-serve here yet. Use the button above to reach us.
      </div>

      <p className="text-xs text-ink-4">
        {formatMonth(data.period_start)} so far ({data.period_start} through today).{" "}
        {data.plan.included_minutes == null
          ? "Your plan has no monthly minute limit."
          : "Included minutes are a soft limit — a heads-up only, calls are never blocked."}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Action from "../Action";
import {
  fetchBilling,
  type AccountStatus,
  type BillingMode,
  type BillingResponse,
} from "@/app/lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";
import { LimitBanner, MinutesProgress, Tile } from "../PlanUsageWidgets";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

/* Phase 3 tickets 3.3 + 3.6: read-only billing snapshot. billing_mode is
   "stripe" once a real Stripe subscription is linked server-side, "managed"
   otherwise — this page never sees or renders the raw Stripe IDs
   (GET /platform/billing deliberately omits them; only the internal admin
   endpoints return those). Either way there's no self-serve portal yet —
   "Manage billing" always routes to a human, not a Stripe customer portal. */

const ACCOUNT_STATUS_STYLE: Record<AccountStatus, { label: string; tone: BadgeTone }> = {
  live: { label: "Live", tone: "positive" },
  trial: { label: "Trial", tone: "info" },
  past_due: { label: "Past due", tone: "warning" },
  suspended: { label: "Suspended", tone: "negative" },
  archived: { label: "Archived", tone: "neutral" },
};

function AccountStatusBadge({ status }: { status: AccountStatus }) {
  const s = ACCOUNT_STATUS_STYLE[status] ?? ACCOUNT_STATUS_STYLE.live;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

const BILLING_MODE_STYLE: Record<BillingMode, { label: string; tone: BadgeTone }> = {
  stripe: { label: "Stripe-backed", tone: "positive" },
  managed: { label: "Managed manually", tone: "neutral" },
};

function BillingModeBadge({ mode }: { mode: BillingMode }) {
  const s = BILLING_MODE_STYLE[mode];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

function SkeletonTiles() {
  return (
    <div className="space-y-4">
      <div className="h-20 rounded-lg bg-surface-2" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-lg bg-surface-2" />
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
  const orgSlug = useActiveOrgSlug();

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
  }, [orgSlug, reloadKey]);

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
          <Action
            weight="secondary"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            Try again
          </Action>
        )}
      </div>
    );
  }

  if (!data) return <SkeletonTiles />;

  return (
    <div className="space-y-4">
      {data.plan.status && data.plan.status !== "ok" && <LimitBanner plan={data.plan} />}

      <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-ink-3">Account status</p>
            <div className="mt-1.5">
              <AccountStatusBadge status={data.account_status} />
            </div>
          </div>
          <div>
            <p className="text-sm text-ink-3">Billing</p>
            <div className="mt-1.5">
              <BillingModeBadge mode={data.billing_mode} />
            </div>
          </div>
        </div>
        <a
          href="mailto:info@orchelix.com?subject=Billing%20question"
          className="w-full rounded-md bg-navy-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-navy-500 sm:w-auto"
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
        {data.billing_mode === "stripe"
          ? "Your billing is tracked through Stripe. Self-serve invoice and payment-method management isn't available here yet — use the button above to reach us."
          : "Billing is currently managed manually — invoices and plan changes go through your Orchelix contact, not self-serve here yet. Use the button above to reach us."}
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

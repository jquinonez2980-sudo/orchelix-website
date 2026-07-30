"use client";

import { useEffect, useState } from "react";
import {
  ACCOUNT_STATUSES,
  PLAN_KEYS,
  fetchAdminTenants,
  updateTenantPlan,
  updateTenantStripe,
  type AccountStatus,
  type AdminTenantRow,
  type PlanKey,
} from "../../../lib/esmiPlatform";
import { Badge } from "../../Badge";

/* Phase 3 ticket 3.5: internal-only plan assignment. Orchelix-staff-only
   (this page only renders for the "default" org — see page.tsx / layout.tsx)
   and the API calls it makes are additionally gated server-side on a
   separate admin secret (platformProxy.ts). Not self-serve — a client
   tenant never sees this page or these controls. */

function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return m.includes("admin access requires") || m.includes("not signed in");
}

function StatusPill({ status }: { status: AdminTenantRow["plan"]["status"] }) {
  if (!status || status === "ok") return null;
  return (
    <span className="ml-2">
      <Badge tone={status === "over" ? "negative" : "warning"}>
        {status === "over" ? "Over" : "Approaching"}
      </Badge>
    </span>
  );
}

function TenantRow({
  row,
  onSaved,
}: {
  row: AdminTenantRow;
  onSaved: (updated: AdminTenantRow) => void;
}) {
  const [plan, setPlan] = useState<PlanKey>(row.plan.key as PlanKey);
  const [status, setStatus] = useState<AccountStatus>(row.account_status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = plan !== row.plan.key || status !== row.account_status;

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateTenantPlan(row.tenant_id, { plan, status });
      onSaved(updated);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  // Independent from plan/status on purpose — a separate save action, its
  // own dirty flag, its own error. Empty input clears that field (sent as
  // null); the backend distinguishes omitted-vs-null too, but this UI
  // always sends both, so it never needs that distinction itself.
  const [customerId, setCustomerId] = useState(row.stripe_customer_id ?? "");
  const [subscriptionId, setSubscriptionId] = useState(row.stripe_subscription_id ?? "");
  const [stripeSaving, setStripeSaving] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const stripeDirty =
    customerId !== (row.stripe_customer_id ?? "") ||
    subscriptionId !== (row.stripe_subscription_id ?? "");

  async function handleSaveStripe() {
    setStripeSaving(true);
    setStripeError(null);
    try {
      const updated = await updateTenantStripe(row.tenant_id, {
        stripe_customer_id: customerId.trim() || null,
        stripe_subscription_id: subscriptionId.trim() || null,
      });
      onSaved(updated);
    } catch (e) {
      setStripeError((e as Error).message);
    } finally {
      setStripeSaving(false);
    }
  }

  const planSelectCls = "h-9 rounded-md border border-line bg-surface px-2 text-sm text-ink";
  const stripeInputCls =
    "h-8 w-full rounded-md border border-line bg-surface px-2 font-mono text-xs text-ink";
  const stripeSaveBtnCls =
    "shrink-0 rounded-md border border-line px-3 text-xs font-medium text-ink-2 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <>
      {/* Desktop row */}
      <tbody className="hidden md:table-row-group">
        <tr className="border-b border-line last:border-0">
          <td className="px-4 py-3 font-medium text-ink">{row.tenant_id}</td>
          <td className="px-4 py-3">
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as PlanKey)}
              className={planSelectCls}
            >
              {PLAN_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 py-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AccountStatus)}
              className={planSelectCls}
            >
              {ACCOUNT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 py-3 text-sm text-ink-2">
            {row.minutes.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            {row.plan.included_minutes != null ? ` / ${row.plan.included_minutes}` : ""} min
            <StatusPill status={row.plan.status} />
          </td>
          <td className="px-4 py-3 text-sm text-ink-2">{row.calls}</td>
          <td className="px-4 py-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty || saving}
              className="rounded-md bg-navy-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-navy-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
          </td>
        </tr>
        <tr className="border-b border-line bg-surface-2/30 last:border-0">
          <td colSpan={6} className="px-4 py-2.5">
            <div className="flex flex-wrap items-end gap-2">
              <label className="flex flex-col gap-1 text-xs font-medium text-ink-4">
                Stripe customer ID
                <input
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="cus_…"
                  className={`${stripeInputCls} w-40`}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-ink-4">
                Stripe subscription ID
                <input
                  value={subscriptionId}
                  onChange={(e) => setSubscriptionId(e.target.value)}
                  placeholder="sub_…"
                  className={`${stripeInputCls} w-40`}
                />
              </label>
              <span className="pb-1.5 text-xs text-ink-4">
                {row.billing_mode === "stripe" ? "Stripe-backed" : "Managed"}
              </span>
              <button
                type="button"
                onClick={handleSaveStripe}
                disabled={!stripeDirty || stripeSaving}
                className={`h-8 ${stripeSaveBtnCls}`}
              >
                {stripeSaving ? "Saving…" : "Save Stripe IDs"}
              </button>
              {stripeError && <span className="text-xs text-rose-600">{stripeError}</span>}
            </div>
          </td>
        </tr>
      </tbody>

      {/* Mobile card — quieter than the client-facing pages on purpose:
          plain stacked controls, no accent bars or shadow treatment. */}
      <tbody className="md:hidden">
        <tr>
          <td colSpan={6} className="border-b border-line px-4 py-4 last:border-0">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-medium text-ink">{row.tenant_id}</p>
              <p className="text-xs text-ink-3">
                {row.minutes.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                {row.plan.included_minutes != null ? ` / ${row.plan.included_minutes}` : ""} min
                {" · "}
                {row.calls} calls
              </p>
            </div>
            <StatusPill status={row.plan.status} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
                Plan
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as PlanKey)}
                  className={planSelectCls}
                >
                  {PLAN_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AccountStatus)}
                  className={planSelectCls}
                >
                  {ACCOUNT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty || saving}
              className="mt-3 w-full rounded-md bg-navy-600 px-3 py-2 text-sm font-medium text-white hover:bg-navy-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}

            <div className="mt-3 border-t border-line pt-3">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-4">
                Stripe — {row.billing_mode === "stripe" ? "Stripe-backed" : "Managed"}
              </p>
              <div className="space-y-2">
                <label className="flex flex-col gap-1 text-xs font-medium text-ink-4">
                  Customer ID
                  <input
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="cus_…"
                    className={stripeInputCls}
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-ink-4">
                  Subscription ID
                  <input
                    value={subscriptionId}
                    onChange={(e) => setSubscriptionId(e.target.value)}
                    placeholder="sub_…"
                    className={stripeInputCls}
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={handleSaveStripe}
                disabled={!stripeDirty || stripeSaving}
                className={`mt-2 w-full py-2 ${stripeSaveBtnCls}`}
              >
                {stripeSaving ? "Saving…" : "Save Stripe IDs"}
              </button>
              {stripeError && <p className="mt-1 text-xs text-rose-600">{stripeError}</p>}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default function AdminTenants() {
  const [rows, setRows] = useState<AdminTenantRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setError(null);
    setRows(null);
    fetchAdminTenants()
      .then((d) => active && setRows(d.tenants))
      .catch((e: Error) => active && setError(e.message));
    return () => {
      active = false;
    };
  }, [reloadKey]);

  function handleSaved(updated: AdminTenantRow) {
    setRows((prev) =>
      prev ? prev.map((r) => (r.tenant_id === updated.tenant_id ? updated : r)) : prev,
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface px-6 py-16 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          {isUnknownOrgError(error) ? "Admin access required" : "Couldn't load tenants"}
        </p>
        <p className="max-w-sm text-sm text-ink-3">{error}</p>
        {!isUnknownOrgError(error) && (
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

  if (!rows) {
    return <div className="h-64 animate-pulse rounded-lg bg-surface-2" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
      <table className="w-full text-left md:min-w-[720px]">
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
            <th className="px-4 py-3">Tenant</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Minutes this month</th>
            <th className="px-4 py-3">Calls</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        {rows.map((row) => (
          <TenantRow key={row.tenant_id} row={row} onSaved={handleSaved} />
        ))}
      </table>
    </div>
  );
}

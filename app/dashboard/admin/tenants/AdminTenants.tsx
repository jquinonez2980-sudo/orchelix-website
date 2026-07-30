"use client";

import { useEffect, useState } from "react";
import {
  ACCOUNT_STATUSES,
  PLAN_KEYS,
  fetchAdminTenants,
  updateTenantPlan,
  type AccountStatus,
  type AdminTenantRow,
  type PlanKey,
} from "../../../lib/esmiPlatform";

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
  const cls =
    status === "over"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-amber-50 text-amber-800 border-amber-200";
  const label = status === "over" ? "Over" : "Approaching";
  return (
    <span className={`ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {label}
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

  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-3 font-medium text-ink">{row.tenant_id}</td>
      <td className="px-4 py-3">
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value as PlanKey)}
          className="rounded-md border border-line bg-surface px-2 py-1 text-sm text-ink"
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
          className="rounded-md border border-line bg-surface px-2 py-1 text-sm text-ink"
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
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
            <th className="px-4 py-3">Tenant</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Minutes this month</th>
            <th className="px-4 py-3">Calls</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TenantRow key={row.tenant_id} row={row} onSaved={handleSaved} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

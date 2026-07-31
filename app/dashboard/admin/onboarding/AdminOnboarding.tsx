"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ACCOUNT_STATUSES,
  PLAN_KEYS,
  approveTenant,
  fetchOnboarding,
  rejectTenant,
  updateProvisioningStep,
  type AccountStatus,
  type OnboardingStatus,
  type OnboardingTenant,
  type PlanKey,
  type ProvisioningStep,
  type StepStatus,
} from "../../../lib/esmiPlatform";
import { Badge, type BadgeTone } from "../../Badge";

/* Phase 4 ticket 4.1 — approve-to-activate queue. Orchelix-staff-only: the
   page shell checks the Clerk org (page.tsx) and every API call additionally
   carries the separate admin secret, injected server-side (platformProxy.ts).

   A tenant reaches 'active' — the state tenants.tenant_is_active() gates all
   production voice/chat/booking traffic on — ONLY through the Approve action
   here, and only once every provisioning step is resolved. */

const ONBOARDING_TONES: Record<OnboardingStatus, BadgeTone> = {
  draft: "neutral",
  submitted: "info",
  provisioning: "info",
  review: "warning",
  active: "positive",
  rejected: "negative",
};

const STEP_TONES: Record<StepStatus, BadgeTone> = {
  pending: "neutral",
  running: "info",
  done: "positive",
  skipped: "neutral",
  failed: "negative",
  manual: "warning",
};

/* Which extra identifier a manual step wants recorded when it's marked done.
   Keyed to the backend's step names (platform_api/provisioning.py STEPS). */
const STEP_DETAIL_FIELDS: Record<string, { key: string; label: string; placeholder: string }> = {
  vapi_assistant: {
    key: "assistant_id",
    label: "VAPI assistant id",
    placeholder: "e.g. 8f2c…",
  },
  phone_number: { key: "e164", label: "Phone number", placeholder: "+1 416 555 0110" },
  calendar: { key: "calendar_id", label: "Calendar id", placeholder: "…@group.calendar.google.com" },
  kb_seed: { key: "note", label: "What was added", placeholder: "e.g. 6 FAQ entries + services PDF" },
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const inputCls =
  "h-9 w-full rounded-md border border-line bg-surface px-2 text-sm text-ink placeholder:text-ink-3";
const selectCls = "h-9 rounded-md border border-line bg-surface px-2 text-sm text-ink";
const btnCls =
  "rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40";

/* ── one provisioning step row ─────────────────────────────────────────── */

function StepRow({
  tenantId,
  step,
  onUpdated,
}: {
  tenantId: string;
  step: ProvisioningStep;
  onUpdated: (t: OnboardingTenant) => void;
}) {
  const field = STEP_DETAIL_FIELDS[step.step];
  const existing = field ? (step.detail?.[field.key] as string | undefined) : undefined;
  const [value, setValue] = useState(existing ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolved = step.status === "done" || step.status === "skipped";
  const note = typeof step.detail?.note === "string" ? step.detail.note : null;

  async function send(status: StepStatus) {
    setBusy(true);
    setError(null);
    try {
      const detail = field && value.trim() ? { [field.key]: value.trim() } : undefined;
      onUpdated(await updateProvisioningStep(tenantId, step.step, { status, detail }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="border-b border-line py-3 last:border-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-[9.5rem] text-sm font-medium text-ink">{step.label}</span>
        <Badge tone={STEP_TONES[step.status]}>{step.status}</Badge>
        {step.automated && (
          <span className="text-[11px] uppercase tracking-wide text-ink-3">auto</span>
        )}
      </div>

      {note && !resolved && <p className="mt-1 text-xs text-ink-3">{note}</p>}
      {step.error && <p className="mt-1 text-xs text-rose-700">{step.error}</p>}

      {!step.automated && (
        <div className="mt-2 flex flex-wrap items-end gap-2">
          {field && (
            <label className="flex-1 min-w-[14rem] text-xs text-ink-2">
              {field.label}
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={field.placeholder}
                className={`${inputCls} mt-1`}
                disabled={busy}
              />
            </label>
          )}
          <button onClick={() => send("done")} disabled={busy} className={btnCls}>
            {resolved ? "Update" : "Mark done"}
          </button>
          <button onClick={() => send("skipped")} disabled={busy} className={btnCls}>
            Skip
          </button>
          {resolved && (
            <button onClick={() => send("manual")} disabled={busy} className={btnCls}>
              Reopen
            </button>
          )}
        </div>
      )}

      {resolved && field && existing && (
        <p className="mt-1 font-mono text-xs text-ink-3">
          {field.label}: {existing}
        </p>
      )}
      {error && <p className="mt-1 text-xs text-rose-700">{error}</p>}
    </li>
  );
}

/* ── detail panel ──────────────────────────────────────────────────────── */

function Detail({
  tenant,
  onUpdated,
}: {
  tenant: OnboardingTenant;
  onUpdated: (t: OnboardingTenant) => void;
}) {
  /* Pre-select what they asked for, so the common case is one click — but it
     stays a deliberate choice: requested_plan is never what gets assigned
     without staff confirming it here. */
  const [plan, setPlan] = useState<PlanKey>(
    (PLAN_KEYS as readonly string[]).includes(tenant.requested_plan ?? "")
      ? (tenant.requested_plan as PlanKey)
      : "managed",
  );
  const [status, setStatus] = useState<AccountStatus>("live");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = tenant.job?.steps ?? [];

  async function doApprove() {
    setBusy("approve");
    setError(null);
    try {
      onUpdated(await approveTenant(tenant.tenant_id, { plan, status }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function doReject() {
    setBusy("reject");
    setError(null);
    try {
      onUpdated(await rejectTenant(tenant.tenant_id, reason.trim()));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="border-t border-line bg-surface-2/40 px-4 py-4">
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Contact" value={tenant.contact_name} />
        <Field label="Email" value={tenant.contact_email} />
        <Field label="Phone" value={tenant.contact_phone} />
        <Field label="Timezone" value={tenant.business_tz} />
        <Field label="Requested plan" value={tenant.requested_plan ?? "— none —"} />
        <Field label="Clerk org" value={tenant.clerk_org_id} mono />
        <Field label="Submitted" value={fmtDate(tenant.submitted_at)} />
        {tenant.approved_at && <Field label="Approved" value={fmtDate(tenant.approved_at)} />}
        {tenant.approved_by && <Field label="Approved by" value={tenant.approved_by} mono />}
      </dl>

      {tenant.rejected_reason && (
        <p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          Rejected: {tenant.rejected_reason}
        </p>
      )}

      <h3 className="mt-5 font-display text-sm font-semibold text-ink">
        Provisioning checklist{" "}
        <span className="font-normal text-ink-3">
          ({tenant.steps_resolved}/{tenant.steps_total} resolved)
        </span>
      </h3>
      {steps.length === 0 ? (
        <p className="mt-1 text-sm text-ink-3">
          No provisioning job — this tenant predates self-serve onboarding.
        </p>
      ) : (
        <ul className="mt-1">
          {steps.map((s) => (
            <StepRow
              key={s.step}
              tenantId={tenant.tenant_id}
              step={s}
              onUpdated={onUpdated}
            />
          ))}
        </ul>
      )}

      {tenant.onboarding_status !== "active" && (
        <div className="mt-5 flex flex-col gap-4 border-t border-line pt-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-ink">Approve &amp; activate</p>
            <p className="mt-0.5 max-w-md text-xs text-ink-3">
              Assigns the real plan and lets this tenant serve live calls and chats.
              {!tenant.can_approve && tenant.unresolved_steps.length > 0 && (
                <> Blocked until every checklist step is done or skipped.</>
              )}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as PlanKey)}
                className={selectCls}
                aria-label="Plan"
              >
                {PLAN_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AccountStatus)}
                className={selectCls}
                aria-label="Account status"
              >
                {ACCOUNT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={doApprove}
                disabled={!tenant.can_approve || busy !== null}
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {busy === "approve" ? "Approving…" : "Approve & activate"}
              </button>
            </div>
          </div>

          <div className="lg:max-w-xs lg:text-right">
            <p className="text-sm font-medium text-ink">Reject</p>
            <p className="mt-0.5 text-xs text-ink-3">
              Keeps the record and the slug. Reason is required.
            </p>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this being declined?"
              className={`${inputCls} mt-2`}
            />
            <button
              onClick={doReject}
              disabled={!reason.trim() || busy !== null}
              className="mt-2 rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy === "reject" ? "Rejecting…" : "Reject"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | null;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-3">{label}</dt>
      <dd className={`text-ink ${mono ? "font-mono text-xs" : ""}`}>{value || "—"}</dd>
    </div>
  );
}

/* ── list ──────────────────────────────────────────────────────────────── */

export default function AdminOnboarding() {
  const [tenants, setTenants] = useState<OnboardingTenant[] | null>(null);
  const [include, setInclude] = useState<"pending" | "all">("pending");
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Same shape as AdminTenants.tsx's loader: an `active` flag so a scope
     switch in flight can't land its result after a newer one. */
  useEffect(() => {
    let active = true;
    setError(null);
    setTenants(null);
    fetchOnboarding(include)
      .then((d) => {
        if (active) setTenants(d.tenants);
      })
      .catch((e: Error) => {
        if (!active) return;
        setTenants([]);
        setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [include]);

  /* Splice the server's updated row back in rather than refetching the list:
     the response from every action is the same full tenant shape. */
  const onUpdated = useCallback((updated: OnboardingTenant) => {
    setTenants((prev) =>
      prev
        ? prev.map((t) => (t.tenant_id === updated.tenant_id ? updated : t))
        : prev,
    );
  }, []);

  if (tenants === null) {
    return <p className="text-sm text-ink-3">Loading…</p>;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {(["pending", "all"] as const).map((scope) => (
          <button
            key={scope}
            onClick={() => setInclude(scope)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium ${
              include === scope
                ? "bg-navy-50 text-navy-600"
                : "text-ink-3 hover:bg-surface-2"
            }`}
          >
            {scope === "pending" ? "Pending" : "All"}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {tenants.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface px-6 py-16 text-center">
          <p className="text-sm text-ink-3">
            {include === "pending"
              ? "Nothing waiting for approval."
              : "No tenants yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
          {tenants.map((t) => {
            const open = openId === t.tenant_id;
            return (
              <div key={t.tenant_id} className="border-b border-line last:border-0">
                <button
                  onClick={() => setOpenId(open ? null : t.tenant_id)}
                  className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-left hover:bg-surface-2"
                  aria-expanded={open}
                >
                  <span className="font-medium text-ink">
                    {t.company_name || t.tenant_id}
                  </span>
                  <span className="font-mono text-xs text-ink-3">{t.tenant_id}</span>
                  <Badge tone={ONBOARDING_TONES[t.onboarding_status]}>
                    {t.onboarding_status}
                  </Badge>
                  {t.steps_total > 0 && (
                    <span className="text-xs text-ink-3">
                      {t.steps_resolved}/{t.steps_total} steps
                    </span>
                  )}
                  <span className="ml-auto text-xs text-ink-3">
                    {fmtDate(t.submitted_at)}
                  </span>
                </button>
                {open && <Detail tenant={t} onUpdated={onUpdated} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

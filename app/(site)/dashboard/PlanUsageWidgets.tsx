import type { PlanUsage } from "@/app/lib/esmiPlatform";

/* Shared plan/soft-limit UI pieces (Phase 3 tickets 3.1–3.3) — used by both
   the Usage page and the Billing page so the two views stay visually and
   behaviorally identical rather than drifting apart as separate copies. */

export function Tile({
  label,
  value,
  note,
  children,
}: {
  label: string;
  value: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
      <p className="text-sm text-ink-3">{label}</p>
      <p className="mt-1.5 text-3xl font-semibold text-ink">{value}</p>
      {children}
      {note && <p className="mt-1 text-xs text-ink-4">{note}</p>}
    </div>
  );
}

/* Single-accent status: ok = ink hair, approaching = foil, over = heavy rule
   (remapped under .lg-app). No green/amber/rose rainbow. */
const STATUS_BAR_COLOR: Record<"ok" | "approaching" | "over", string> = {
  ok: "bg-navy-600",
  approaching: "bg-navy-500",
  over: "bg-ink",
};

export function MinutesProgress({ minutes, plan }: { minutes: number; plan: PlanUsage }) {
  if (plan.included_minutes == null || plan.status == null) {
    return (
      <p className="mt-1.5 text-3xl font-semibold text-ink">
        {minutes.toLocaleString(undefined, { maximumFractionDigits: 1 })}
        <span className="ml-1 text-base font-normal text-ink-3">min</span>
      </p>
    );
  }
  const pct = Math.min(100, plan.percent_used ?? 0);
  return (
    <>
      <p className="mt-1.5 text-3xl font-semibold text-ink">
        {minutes.toLocaleString(undefined, { maximumFractionDigits: 1 })}
        <span className="text-base font-normal text-ink-3">
          {" "}
          / {plan.included_minutes.toLocaleString()} min
        </span>
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className={`h-full rounded-full ${STATUS_BAR_COLOR[plan.status]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </>
  );
}

export function LimitBanner({ plan }: { plan: PlanUsage }) {
  if (plan.status === "over") {
    return (
      <div
        className="border border-line bg-surface-2 px-4 py-3 text-sm text-ink"
        style={{ borderLeft: "2px solid var(--lg-ink)" }}
      >
        <span className="font-medium">Over included minutes</span> — you&apos;ve used{" "}
        {plan.percent_used}% of the {plan.included_minutes?.toLocaleString()} minutes
        included in your {plan.label} plan this month. This is a heads-up only — Esmi
        keeps answering every call.
      </div>
    );
  }
  if (plan.status === "approaching") {
    return (
      <div
        className="border border-line bg-surface-2 px-4 py-3 text-sm text-ink"
        style={{ borderLeft: "2px solid var(--lg-foil)" }}
      >
        <span className="font-medium">Approaching your included minutes</span> —{" "}
        {plan.percent_used}% used of {plan.included_minutes?.toLocaleString()} min/mo on
        the {plan.label} plan.
      </div>
    );
  }
  return null;
}

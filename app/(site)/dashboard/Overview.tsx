"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  type OverviewBucket,
  fetchOverview,
  fetchUsage,
  type OverviewResponse,
  type UsageResponse,
} from "@/app/lib/esmiPlatform";
import NightRegister from "./NightRegister";
import TonightWork from "./TonightWork";
import { LimitBanner, MinutesProgress, Tile } from "./PlanUsageWidgets";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import { useDashI18n } from "./i18n";

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
      <p className={`text-xs font-medium ${invert ? "text-teal-300" : "text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]"}`}>
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
      ? "text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)]"
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

/* ── setup checklist (while onboarding is incomplete) ─────────────────────── */

function ChecklistRow({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          done
            ? "bg-[var(--lg-ink)] text-[var(--lg-field)]"
            : "border border-[var(--lg-rule-quiet)] bg-[var(--lg-field)] text-transparent"
        }`}
      >
        {done ? "✓" : "•"}
      </span>
      <span className={`text-sm ${done ? "text-ink-3 line-through" : "text-ink"}`}>{label}</span>
    </li>
  );
}

function SetupChecklistSection({ checklist }: { checklist: OverviewResponse["setup_checklist"] }) {
  const { t } = useDashI18n();
  if (!checklist) return null;
  return (
    <section
      className="border border-line bg-surface p-5"
      style={{ borderLeft: "2px solid var(--lg-foil)" }}
    >
      <h2 className="font-display text-base font-semibold uppercase tracking-tight text-ink">
        {t.overview.setupTitle}
      </h2>
      <p className="mt-1 text-xs text-ink-3">{t.overview.setupLede}</p>
      <ul className="mt-3 space-y-2.5">
        {checklist.items.map((item) => (
          <ChecklistRow key={item.key} done={item.done} label={item.label} />
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        <Link href="/dashboard/knowledge" className="text-navy-600 hover:underline">
          Knowledge →
        </Link>
        <Link href="/dashboard/onboarding/voice" className="text-navy-600 hover:underline">
          Voice preview →
        </Link>
        <Link href="/dashboard/settings" className="text-navy-600 hover:underline">
          Hours &amp; routing →
        </Link>
      </div>
    </section>
  );
}

/* ── language mix (current 7-day window) ───────────────────────────────────── */

const LANGUAGE_MIX_LABEL: Record<"en" | "es" | "unknown", string> = {
  en: "English",
  es: "Spanish",
  unknown: "Unknown",
};

function LanguageMixSection({ mix }: { mix: OverviewResponse["current"]["language_mix"] }) {
  const { t } = useDashI18n();
  const total = mix.en + mix.es + mix.unknown;
  const rows = (["en", "es", "unknown"] as const).filter((k) => mix[k] > 0);

  return (
    <section>
      <h2 className="font-display text-base font-semibold text-ink">
        {t.overview.languageMix}
      </h2>
      <div className="mt-3 border border-line bg-surface p-5">
        {total === 0 ? (
          <p className="text-sm text-ink-3">{t.overview.noCallsWeek}</p>
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
                      className="h-full bg-[var(--lg-ink)]"
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

/* ── usage meter ────────────────────────────────────────────────────────────── */

function UsageMeterSection({ usage }: { usage: UsageResponse }) {
  return (
    <section className="space-y-3">
      <LimitBanner plan={usage.plan} />
      <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
        <p className="text-sm text-ink-3">Voice minutes used ({usage.plan.label} plan, this month)</p>
        <MinutesProgress minutes={usage.minutes} plan={usage.plan} />
      </div>
    </section>
  );
}

function AfterHoursHero({
  value,
  prev,
  quiet,
}: {
  value: number;
  prev: number;
  quiet: boolean;
}) {
  const { t } = useDashI18n();
  return (
    <section
      className="border-t-2 bg-[var(--lg-field-2)] p-6 sm:p-8"
      style={{ borderTopColor: "var(--lg-rule)" }}
    >
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.13em] text-[var(--lg-ink-3)]">
        {t.overview.afterHours}
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
        <p className="font-display text-[3.25rem] font-bold leading-[0.94] tracking-[-0.028em] text-[var(--lg-ink)] tabular-nums sm:text-[4rem]">
          {value}
        </p>
        <div className="pb-2">
          <DeltaLine delta={computeDelta(value, prev)} />
        </div>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--lg-ink-2)]">
        {quiet
          ? "Esmi is on duty around the clock. The moment someone calls while you're closed, it's answered — and counted here."
          : value > 0
            ? "Calls Esmi picked up while your doors were closed — customers who would otherwise have reached voicemail or a competitor."
            : "No after-hours calls this week — and if one comes in at 2am, Esmi has it covered."}
      </p>
    </section>
  );
}

/* The week, ruled. Rows are close-set, the figure is tabular and right-set
   against its own column, and a quiet week reads as a legible zero rather
   than an empty box. */
function WeekRegister({ cur, prev }: { cur: OverviewBucket; prev: OverviewBucket }) {
  const rows = [
    {
      label: "Calls answered",
      value: cur.calls_answered,
      delta: computeDelta(cur.calls_answered, prev.calls_answered),
      note: "Picked up by Esmi on your line",
    },
    {
      label: "Appointments booked",
      value: cur.appointments_booked,
      delta: computeDelta(cur.appointments_booked, prev.appointments_booked),
      note: "Written straight to your calendar",
    },
    {
      label: "Leads routed to you",
      value: cur.leads_escalated,
      delta: computeDelta(cur.leads_escalated, prev.leads_escalated),
      note: "Callers Esmi flagged for a person",
    },
    {
      label: "Web chats",
      value: cur.web_chats,
      delta: computeDelta(cur.web_chats, prev.web_chats),
      note: "Conversations from your website",
    },
  ];
  const quiet = rows.every((r) => r.value === 0);

  return (
    <section
      className="border border-[var(--lg-hair)] bg-[var(--lg-field)]"
      style={{ borderTop: "2px solid var(--lg-rule)" }}
    >
      <div className="flex items-baseline justify-between px-5 pt-4">
        <h2 className="font-display text-base font-semibold uppercase tracking-tight text-[var(--lg-ink)]">
          This week
        </h2>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.13em] text-[var(--lg-ink-3)]">
          vs prior 7 days
        </p>
      </div>

      <dl className="mt-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-4 border-t border-[var(--lg-hair-2)] px-5 py-3"
          >
            <dt className="min-w-0 flex-1">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.13em] text-[var(--lg-ink-2)]">
                {row.label}
              </span>
              <span className="ml-3 hidden text-xs text-[var(--lg-ink-3)] sm:inline">
                {row.note}
              </span>
            </dt>
            <dd className="shrink-0 text-right">
              <span className="font-display text-[1.5rem] font-bold leading-none tabular-nums text-[var(--lg-ink)]">
                {row.value}
              </span>
            </dd>
            <dd className="w-28 shrink-0 text-right">
              <DeltaLine delta={row.delta} />
            </dd>
          </div>
        ))}
      </dl>

      {quiet && (
        <p
          className="border-t px-5 py-3 text-xs text-[var(--lg-ink-2)]"
          style={{ borderTopColor: "var(--lg-rule)" }}
        >
          A quiet week on the line. Esmi is answering — these fill in as calls
          and chats come through.
        </p>
      )}
    </section>
  );
}

function SkeletonTiles() {
  return (
    <div className="space-y-4">
      <div className="h-44 bg-[var(--lg-field-2)]" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-[var(--lg-field-2)]" />
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
  // Usage is a supplementary widget here (the Usage page is its real home) —
  // fail-soft: if it errors, the meter section just doesn't render rather
  // than blocking the whole Overview the way a core `data` error does.
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    setUsage(null);
    fetchOverview()
      .then((d) => active && setData(d))
      .catch((e: Error) => active && setError(e.message));
    fetchUsage()
      .then((u) => active && setUsage(u))
      .catch(() => {
        /* fail-quiet — see the note above */
      });
    return () => {
      active = false;
    };
  }, [orgSlug, reloadKey]);

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
            className="border border-[var(--lg-rule)] px-4 py-2 font-display text-[0.75rem] uppercase tracking-[0.08em] text-[var(--lg-ink)] transition-colors duration-150 hover:bg-[var(--lg-field-2)]"
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
      <SetupChecklistSection checklist={data.setup_checklist} />

      <AfterHoursHero
        value={cur.after_hours_calls}
        prev={prev.after_hours_calls}
        quiet={quiet}
      />

      <TonightWork
        afterHours={cur.after_hours_calls}
        leadsEscalated={cur.leads_escalated}
      />

      {/* Primary surface: dense live register from calls + chats APIs */}
      <NightRegister />

      {/* The week's figures as a ruled register, not a tile row. Four
          identical boxes of label-number-caption is the card farm the whole
          world refuses — and on a quiet week it renders as four zeros in
          four boxes, which reads as broken rather than ready. A ledger rules
          its figures into a column and tallies at the foot. */}
      <WeekRegister cur={cur} prev={prev} />

      <div className="grid gap-4 lg:grid-cols-2">
        <LanguageMixSection mix={cur.language_mix} />
        {usage ? (
          <UsageMeterSection usage={usage} />
        ) : (
          <section className="space-y-3">
            <div className="border border-line bg-surface p-5">
              <p className="text-sm text-ink-3">Minutes used this month</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">
                {cur.minutes_used.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                <span className="text-base font-medium text-ink-3">min</span>
              </p>
              <Link
                href="/dashboard/usage"
                className="mt-2 inline-block text-xs font-medium text-navy-600 hover:underline"
              >
                Full usage →
              </Link>
            </div>
          </section>
        )}
      </div>

      <p className="text-xs text-ink-4">
        Last 7 days vs the 7 days before, in your business timezone ({data.business_tz}).
        Phone calls and web chats — other channels aren&apos;t counted yet.
      </p>
    </div>
  );
}

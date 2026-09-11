"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "./PageTitle";
import Action from "./Action";
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
      <SectionTitle>
        {t.overview.setupTitle}
      </SectionTitle>
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
      <SectionTitle>
        {t.overview.languageMix}
      </SectionTitle>
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
                  <div className="mt-1 h-1.5 w-full overflow-hidden bg-surface-2">
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

/* THE LINE — the console's centre-stage object, and the first thing on the
   screen. State on the left, the view's one hero figure on the right.

   What it deliberately does NOT carry: a 24-hour "who has the phone" bar.
   That needs the tenant's business hours per weekday and `/overview` returns
   only `business_tz`, so the bar would have been decoration shaped like
   information. It comes back when settings hours reach this view. */
function LineBlock({
  value,
  prev,
  quiet,
}: {
  value: number;
  prev: number;
  quiet: boolean;
}) {
  const { t, locale } = useDashI18n();
  return (
    <section className="esmi-line">
      <div className="flex flex-col justify-center gap-3">
        {/* A held mark, not a pulsing dot — see the Nothing Loops Rule. */}
        <span
          className="esmi-key lg-fig text-[10.5px] font-semibold uppercase"
          style={{ color: "var(--lg-foil)", letterSpacing: "0.12em" }}
        >
          {locale === "es" ? "Línea activa" : "Line live"}
        </span>
        <h2 className="esmi-line-state">
          {locale === "es" ? (
            <>
              La línea está <em>cubierta</em>
            </>
          ) : (
            <>
              The line is <em>covered</em>
            </>
          )}
        </h2>
        <p className="max-w-[46ch] text-sm leading-6 text-ink-2">
          {t.overview.lede}
        </p>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <p className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
          {t.overview.afterHours}
        </p>
        <p className="esmi-hero-figure">{value}</p>
        <DeltaLine delta={computeDelta(value, prev)} />
        <p className="mt-1 max-w-[42ch] text-xs leading-5 text-ink-2">
          {quiet
            ? "Esmi is on duty around the clock. The moment someone calls while you're closed, it's answered — and counted here."
            : value > 0
              ? "Calls Esmi picked up while your doors were closed — customers who would otherwise have reached voicemail or a competitor."
              : "No after-hours calls this week — and if one comes in at 2am, Esmi has it covered."}
        </p>
      </div>
    </section>
  );
}

/* The week's four figures as a Band — label above value, `rule-quiet`
   verticals between columns only, reading across the page.

   NO SPARKLINES, and the absence is the honest answer rather than an
   oversight: `/overview` returns `current` and `previous`, two points. A
   ten-point trend line drawn from two numbers is a fabricated picture of
   someone's business. The figure carries the delta and a plain sentence
   instead; a daily series on the overview endpoint is what would light a
   real one up.

   `esmi-lift` marks the one tile that carries money. One lifted thing on a
   screen is a hierarchy; two is a card deck. */
function WeekBand({ cur, prev }: { cur: OverviewBucket; prev: OverviewBucket }) {
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
    <section>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <SectionTitle>This week</SectionTitle>
        <p className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
          vs prior 7 days
        </p>
      </div>

      <div className="esmi-band">
        {rows.map((row, i) => (
          <div key={row.label} className={i === 1 ? "esmi-lift" : undefined}>
            <span className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
              {row.label}
            </span>
            <span className="esmi-band-value">{row.value}</span>
            <DeltaLine delta={row.delta} />
            <span className="text-xs leading-5 text-ink-3">{row.note}</span>
          </div>
        ))}
      </div>

      {quiet && (
        <p className="mt-2 text-xs leading-5 text-ink-2">
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

  const { current: cur, previous: prev } = data;
  const quiet = cur.calls_answered === 0 && prev.calls_answered === 0;

  return (
    <div className="space-y-5">
      <SetupChecklistSection checklist={data.setup_checklist} />

      {/* The line first — the console's whole argument is that an operator
          opens this at 6am to ask one question, and it is answered above
          the fold. */}
      <LineBlock
        value={cur.after_hours_calls}
        prev={prev.after_hours_calls}
        quiet={quiet}
      />

      <WeekBand cur={cur} prev={prev} />

      <TonightWork
        afterHours={cur.after_hours_calls}
        leadsEscalated={cur.leads_escalated}
      />

      {/* Primary surface: dense live register from calls + chats APIs */}
      <NightRegister />

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

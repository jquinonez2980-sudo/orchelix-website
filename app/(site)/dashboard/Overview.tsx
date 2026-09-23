"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "./PageTitle";
import Action from "./Action";
import Link from "next/link";
import {
  type OverviewBucket,
  type OverviewDay,
  fetchOverview,
  fetchUsage,
  type OverviewResponse,
  type UsageResponse,
} from "@/app/lib/esmiPlatform";
import NightRegister from "./NightRegister";
import TonightWork from "./TonightWork";
import { LimitBanner, MinutesProgress } from "./PlanUsageWidgets";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import { useDashI18n } from "./i18n";
import { computeWeekDelta } from "./weekDelta";

/* KPI tiles per the stat-tile contract: sentence-case label, semibold value in
   proportional figures (no tabular-nums at display size), signed change vs a
   named period with an arrow glyph so direction is never color-alone.
   Exactly ONE hero figure per view: the after-hours number.

   Small counts state their change as a count, in a neutral tone; only a
   real drop on real volume goes red — see weekDelta.ts. */
function DeltaLine({ cur, prev }: { cur: number; prev: number }) {
  const { t } = useDashI18n();
  const d = t.overview.delta;
  const { delta, tone } = computeWeekDelta(cur, prev);
  const cls = tone === "drop" ? "text-rose-600" : "text-ink-2";

  if (delta.kind === "count") {
    return (
      <p className={`text-xs font-medium ${cls}`}>
        {delta.diff === 0
          ? d.same
          : delta.diff > 0
            ? d.more(delta.diff)
            : d.fewer(-delta.diff)}
      </p>
    );
  }
  const up = delta.value > 0;
  return (
    <p className={`text-xs font-medium ${cls}`}>
      {up ? "↑" : "↓"} {Math.abs(delta.value)}% {d.pct}
    </p>
  );
}

/* Seven daily counts as a bare line — no axes, no dots, no fill. Drawn in
   brass, not cyan: this is history, and cyan is reserved for what the line
   is doing right now (see the console notes in globals.css). The stroke is
   non-scaling so the SVG can stretch to the tile at any width. */
function Sparkline({ counts, label }: { counts: number[]; label: string }) {
  const { t } = useDashI18n();
  if (counts.length < 2) return null;
  const W = 100;
  const H = 24;
  const PAD = 2;
  const max = Math.max(...counts, 1);
  const step = W / (counts.length - 1);
  const points = counts
    .map((c, i) => {
      const x = i * step;
      const y = H - PAD - (c / max) * (H - PAD * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      className="esmi-spark"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={t.overview.week.trend(label, counts.join(", "))}
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--esmi-brass)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
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
          {t.overview.text.linkKnowledge}
        </Link>
        <Link href="/dashboard/onboarding/voice" className="text-navy-600 hover:underline">
          {t.overview.text.linkVoice}
        </Link>
        <Link href="/dashboard/settings" className="text-navy-600 hover:underline">
          {t.overview.text.linkHours}
        </Link>
      </div>
    </section>
  );
}

/* ── language mix (current 7-day window) ───────────────────────────────────── */

function LanguageMixSection({ mix }: { mix: OverviewResponse["current"]["language_mix"] }) {
  const { t } = useDashI18n();
  const total = mix.en + mix.es + mix.unknown;
  const rows = (["en", "es", "unknown"] as const).filter((k) => mix[k] > 0);
  const languageLabel = {
    en: t.overview.text.langEn,
    es: t.overview.text.langEs,
    unknown: t.overview.text.langUnknown,
  };

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
                    <span className="text-ink-2">{languageLabel[key]}</span>
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
  const { t } = useDashI18n();
  return (
    <section className="space-y-3">
      <LimitBanner plan={usage.plan} />
      <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
        <p className="text-sm text-ink-3">{t.overview.text.voiceMinutes(usage.plan.label)}</p>
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
        <DeltaLine cur={value} prev={prev} />
        <p className="mt-1 max-w-[42ch] text-xs leading-5 text-ink-2">
          {quiet
            ? t.overview.text.afterHoursQuiet
            : value > 0
              ? t.overview.text.afterHoursSome
              : t.overview.text.afterHoursNone}
        </p>
      </div>
    </section>
  );
}

/* The week's four figures as a Band — label above value, `rule-quiet`
   verticals between columns only, reading across the page.

   Each figure carries a 7-day sparkline drawn from `daily`, the current
   window cut into seven 24-hour slices that sum to the figure above it — a
   real series, not a line interpolated between `current` and `previous`.
   Older API deploys don't send `daily`; the band just goes without.

   `esmi-lift` marks the one tile that carries money. One lifted thing on a
   screen is a hierarchy; two is a card deck. */
type DailyKey = "calls_answered" | "appointments_booked" | "leads_escalated" | "web_chats";

function WeekBand({
  cur,
  prev,
  daily,
}: {
  cur: OverviewBucket;
  prev: OverviewBucket;
  daily: OverviewDay[] | undefined;
}) {
  const { t } = useDashI18n();
  const w = t.overview.week;
  const rows: { key: DailyKey; label: string; note: string }[] = [
    { key: "calls_answered", label: w.callsAnswered, note: w.callsAnsweredNote },
    { key: "appointments_booked", label: w.appointments, note: w.appointmentsNote },
    { key: "leads_escalated", label: w.leadsRouted, note: w.leadsRoutedNote },
    { key: "web_chats", label: w.webChats, note: w.webChatsNote },
  ];
  const quiet = rows.every((r) => cur[r.key] === 0);

  return (
    <section>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <SectionTitle>{w.title}</SectionTitle>
        <p className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
          {w.vsPrior}
        </p>
      </div>

      <div className="esmi-band">
        {rows.map((row, i) => (
          <div key={row.key} className={i === 1 ? "esmi-lift" : undefined}>
            <span className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
              {row.label}
            </span>
            <span className="esmi-band-value">{cur[row.key]}</span>
            {daily && daily.length > 1 && (
              <Sparkline counts={daily.map((d) => d[row.key])} label={row.label} />
            )}
            <DeltaLine cur={cur[row.key]} prev={prev[row.key]} />
            <span className="text-xs leading-5 text-ink-3">{row.note}</span>
          </div>
        ))}
      </div>

      {quiet && (
        <p className="mt-2 text-xs leading-5 text-ink-2">
          {t.overview.text.quietWeek}
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
  const { t } = useDashI18n();
  const tx = t.overview.text;
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
          {orgIssue ? tx.noClientTitle : tx.loadFailed}
        </p>
        <p className="max-w-sm text-sm text-ink-3">
          {orgIssue ? tx.noClientBody : error}
        </p>
        {!orgIssue && (
          <Action
            weight="secondary"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            {tx.tryAgain}
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

      <WeekBand cur={cur} prev={prev} daily={data.daily} />

      <TonightWork />

      {/* Primary surface: dense live register from calls + chats APIs */}
      <NightRegister />

      <div className="grid gap-4 lg:grid-cols-2">
        <LanguageMixSection mix={cur.language_mix} />
        {usage ? (
          <UsageMeterSection usage={usage} />
        ) : (
          <section className="space-y-3">
            <div className="border border-line bg-surface p-5">
              <p className="text-sm text-ink-3">{tx.minutesMonth}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">
                {cur.minutes_used.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                <span className="text-base font-medium text-ink-3">{tx.minutesUnit}</span>
              </p>
              <Link
                href="/dashboard/usage"
                className="mt-2 inline-block text-xs font-medium text-navy-600 hover:underline"
              >
                {tx.fullUsage}
              </Link>
            </div>
          </section>
        )}
      </div>

      <p className="text-xs text-ink-4">
        {tx.footnote(data.business_tz)}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "../PageTitle";
import Action from "../Action";
import {
  fetchAnalytics,
  type AnalyticsDayCount,
  type AnalyticsResponse,
  type LanguageMix,
} from "@/app/lib/esmiPlatform";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const dayFmt = new Intl.DateTimeFormat(undefined, { day: "numeric" });

// True when the error means "this organization isn't a real Esmi client" —
// same distinction Overview/Usage/Scheduling already make; retrying can't
// fix it.
function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("unknown tenant") ||
    m.includes("no active organization") ||
    m.includes("x-tenant-id header is required")
  );
}

/* ── call volume (simple CSS bars — no chart library) ───────────────────── */

const dayLabel = (date: string) => dayFmt.format(new Date(`${date}T00:00:00`));

/* The chart used to render the inverse of the data, and it took measuring the
   live page to see it. Each day column sat directly in a `h-28 items-end` flex
   row with no height of its own, so `items-end` shrank it to its label — about
   19px — and a bar asking for `height: 33%` resolved against an indefinite
   height and computed to 0. The only marks that survived were the zero-call
   days, which used a literal `2px`. Every visible tick was a day nothing
   happened, and every day that took a call was invisible.

   The fix is a definite height to resolve against: the bar area is its own
   fixed-height row, the labels sit below it, and each column is `h-full`
   inside that row. Percentages mean something again. */
function VolumeChart({ days }: { days: AnalyticsDayCount[] }) {
  const max = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <SectionTitle>
          Call volume (last {days.length} days)
        </SectionTitle>
        <span className="text-sm text-ink-3">{total} calls</span>
      </div>
      <div className="mt-3 border border-line bg-surface p-5">
        {/* The ruling is drawn whether or not there is anything on it. An empty
            register is still a register — dropping to a bare sentence made a
            quiet fortnight look like a broken page, which is the failure this
            whole block is here to avoid. */}
        <div
          className="flex h-28 items-end gap-1 border-b"
          style={{ borderColor: "var(--lg-rule)" }}
          role="img"
          aria-label={
            total === 0
              ? `No calls in the last ${days.length} days.`
              : `${total} calls over the last ${days.length} days, ` +
                `busiest day ${max} call${max === 1 ? "" : "s"}.`
          }
        >
          {days.map((d) => (
            <div key={d.date} className="flex h-full min-w-0 flex-1 items-end">
              <div
                title={`${d.date}: ${d.count} call${d.count === 1 ? "" : "s"}`}
                className="w-full"
                style={{
                  // A day with no calls keeps a hairline on the baseline so the
                  // gap is legible as "nothing that day" and not as a missing
                  // column. It is a mark, so it is drawn in the ruling.
                  height:
                    d.count === 0
                      ? "1px"
                      : `${Math.max(6, (d.count / max) * 100)}%`,
                  background:
                    d.count === 0 ? "var(--lg-hair)" : "var(--lg-ink)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-1 pt-1.5">
          {days.map((d) => (
            <span
              key={d.date}
              className="min-w-0 flex-1 text-center text-[10px] text-ink-4"
            >
              {dayLabel(d.date)}
            </span>
          ))}
        </div>
        {total === 0 && (
          <p className="mt-3 max-w-[60ch] text-sm text-ink-2">
            No calls yet in this window. Esmi is answering — the register fills
            in as calls come through.
          </p>
        )}
      </div>
    </section>
  );
}

/* ── language mix (same bar-list style as Usage's outcome breakdown) ────── */

const LANGUAGE_MIX_LABEL: Record<"en" | "es" | "unknown", string> = {
  en: "English",
  es: "Spanish",
  unknown: "Unknown",
};

function LanguageMixSection({ mix }: { mix: LanguageMix }) {
  const total = mix.en + mix.es + mix.unknown;
  const rows = (["en", "es", "unknown"] as const).filter((k) => mix[k] > 0);

  return (
    <section>
      <SectionTitle>Language mix</SectionTitle>
      <div className="mt-3 rounded-lg border border-line bg-surface p-5 shadow-sm">
        {total === 0 ? (
          <p className="text-sm text-ink-3">No calls in this window.</p>
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
                  {/* Every bar here was the accent, on a page with no primary
                      action — the stamp appeared twice and marked nothing you
                      can do. DESIGN.md sanctions foil for one thing in this
                      neighbourhood, "the ES language marker", so Spanish keeps
                      it and carries real meaning; English and Unknown are
                      drawn in ink like the volume chart beside them. */}
                  <div className="mt-1 h-1.5 w-full overflow-hidden bg-surface-2">
                    <div
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          key === "es" ? "var(--lg-foil)" : "var(--lg-ink)",
                      }}
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

/* ── coming soon ─────────────────────────────────────────────────────────── */

const COMING_SOON = [
  { title: "Peak hours heatmap", body: "When your callers actually call, by hour and day of week." },
  { title: "Booking conversion rate", body: "What share of calls turn into a booked appointment." },
  { title: "Lead quality score", body: "How promising the leads Esmi escalates to you tend to be." },
];

/* An EntryList, not a card row. DESIGN.md: "Don't ship a row of same-size icon
   + heading + text cards" — this section was three of exactly those, dashed
   and rounded, and it survived the commit that cleared the card farm off the
   rest of the surface. The replacement is the documented form: a 2px graphite
   top rule over stacked rows, each an uppercase entry title with a prose line
   beneath, hairline-separated. It also stops pretending three unbuilt features
   are three equal-weight objects. */
function ComingSoonSection() {
  return (
    <section>
      <SectionTitle>
        Coming soon
      </SectionTitle>
      <div className="mt-3 border-t-2 border-[var(--lg-rule)]">
        {COMING_SOON.map((c) => (
          <article
            key={c.title}
            className="border-b border-[var(--lg-hair)] py-3 last:border-b-0"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-[0.04em] text-ink">
              {c.title}
            </p>
            <p className="mt-0.5 max-w-[60ch] text-xs leading-5 text-ink-2">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── skeleton / error / main ─────────────────────────────────────────────── */

function SkeletonCards() {
  return (
    <div className="space-y-4">
      <div className="h-44 rounded-lg bg-surface-2" />
      <div className="h-32 rounded-lg bg-surface-2" />
    </div>
  );
}

export default function AnalyticsView() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchAnalytics()
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
          {orgIssue ? "No client selected" : "Couldn't load analytics"}
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

  if (!data) return <SkeletonCards />;

  return (
    <div className="space-y-6">
      <VolumeChart days={data.volume_by_day} />
      <LanguageMixSection mix={data.language_mix} />
      <ComingSoonSection />
      <p className="text-xs text-ink-4">
        Last {data.window_days} days, in your business timezone ({data.business_tz}). For
        plan usage and cost, see Usage.
      </p>
    </div>
  );
}

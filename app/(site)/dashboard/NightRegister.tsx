"use client";

/* Dense night register for Overview — pulls live calls (and chats when
   available) so the operator sees a real ledger, not a thin activity teaser.

   2026-09-10, console port: the run is now grouped by day. It previously
   rendered one flat list from today back to whenever the 18-row window
   reached, which read as an undifferentiated scroll — you could not tell at
   a glance whether a busy stretch was one night or three. Each day now
   carries its own head and tallies itself, and the foot rule tallies the
   whole run. Every count here is DERIVED from the rendered rows, never
   typed. Data fetching is untouched. */

import { useEffect, useState } from "react";
import { SectionTitle } from "./PageTitle";
import Link from "next/link";
import {
  fetchCalls,
  fetchChats,
  type CallOutcome,
  type ChatOutcome,
  type PlatformCall,
  type PlatformChat,
} from "@/app/lib/esmiPlatform";
import { Badge } from "./Badge";
import { OUTCOME_STYLE } from "./calls/CallLog";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import { useDashI18n } from "./i18n";

const dayFmt = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

type RegisterRow = {
  key: string;
  kind: "call" | "chat";
  at: string | null;
  href: string;
  outcome: CallOutcome | ChatOutcome | null;
  language: "en" | "es" | null;
  primary: string;
  secondary: string | null;
  duration: string | null;
};

function fmtTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return timeFmt.format(d);
}

function fmtDay(iso: string | null): string {
  if (!iso) return "Undated";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Undated";
  return dayFmt.format(d);
}

function fmtDuration(sec: number | null): string | null {
  if (sec == null) return null;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtCaller(e164: string | null): string {
  if (!e164) return "No caller ID";
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

function fromCall(c: PlatformCall): RegisterRow {
  return {
    key: `call-${c.id}`,
    kind: "call",
    at: c.started_at,
    href: "/dashboard/calls",
    outcome: c.outcome,
    language: c.language === "en" || c.language === "es" ? c.language : null,
    primary: fmtCaller(c.caller),
    secondary: c.summary,
    duration: fmtDuration(c.duration_sec),
  };
}

function fromChat(c: PlatformChat): RegisterRow {
  return {
    key: `chat-${c.id}`,
    kind: "chat",
    at: c.started_at ?? c.last_at,
    href: "/dashboard/chats",
    outcome: c.outcome,
    language: null,
    primary: "Web chat",
    secondary: c.summary,
    duration: c.message_count ? `${c.message_count} msgs` : null,
  };
}

function styleFor(row: RegisterRow) {
  return OUTCOME_STYLE[row.outcome ?? "other"] ?? OUTCOME_STYLE.other;
}

/* "Booked" is read off the tone rather than the outcome string. Badge.tsx
   documents `warning` as "Attention / booked — the only foil-tinted state",
   and DispositionKey below maps BOOKED → warning. Going through the tone
   means this count follows the disposition map instead of duplicating its
   knowledge of which raw outcome strings mean booked. */
function bookedCount(rows: RegisterRow[]): number {
  return rows.filter((r) => styleFor(r).tone === "warning").length;
}

function DispositionKey() {
  const keys: {
    code: string;
    meaning: string;
    tone: "warning" | "info" | "positive" | "negative";
  }[] = [
    { code: "BOOKED", meaning: "Appointment set", tone: "warning" },
    { code: "ROUTED", meaning: "Handed to a person", tone: "info" },
    { code: "ANSWERED", meaning: "Resolved on the line", tone: "positive" },
    { code: "CLOSED", meaning: "Ended / missed / voicemail", tone: "negative" },
  ];
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3">
      {keys.map((k) => (
        <li key={k.code} className="flex items-center gap-2">
          <Badge tone={k.tone}>{k.code}</Badge>
          <span className="text-xs text-ink-3">{k.meaning}</span>
        </li>
      ))}
    </ul>
  );
}

/* One entry. Settle is staggered by index and capped at ten steps so a full
   run lands in well under a second rather than crawling down the page — the
   same retiming DESIGN.md records for the marketing register. It animates
   to the resting state, so the row is legible with motion suppressed. */
function Row({ row, index }: { row: RegisterRow; index: number }) {
  const style = styleFor(row);
  return (
    <li className="esmi-regrow border-b border-line last:border-b-0"
        style={{ animationDelay: `${Math.min(index, 9) * 45}ms` }}>
      <Link
        href={row.href}
        className="grid gap-2 py-2.5 transition-colors sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
      >
        <div className="flex items-baseline gap-2 sm:block">
          <p className="lg-fig text-xs font-medium text-ink-3">{fmtTime(row.at)}</p>
          <div className="flex flex-wrap items-center gap-x-2 sm:mt-0.5">
            {row.language && (
              <span
                className="lg-fig text-[0.625rem] uppercase tracking-wide"
                style={{
                  color:
                    row.language === "es" ? "var(--esmi-brass)" : "var(--lg-ink-3)",
                }}
              >
                {row.language.toUpperCase()}
              </span>
            )}
            {row.duration && (
              <span className="lg-fig text-[0.625rem] text-ink-3">{row.duration}</span>
            )}
            <span className="lg-fig text-[0.625rem] uppercase tracking-wide text-ink-3">
              {row.kind === "call" ? "CALL" : "CHAT"}
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="lg-fig truncate text-sm font-medium text-ink">
            {row.primary}
            <span className="ml-2 text-xs font-normal text-ink-3">
              {style.disposition}
            </span>
          </p>
          {row.secondary && (
            <p className="mt-0.5 line-clamp-1 text-sm text-ink-2">{row.secondary}</p>
          )}
        </div>
        <div className="sm:justify-self-end">
          <Badge tone={style.tone}>{style.label}</Badge>
        </div>
      </Link>
    </li>
  );
}

export default function NightRegister() {
  const { t } = useDashI18n();
  const orgSlug = useActiveOrgSlug();
  const [rows, setRows] = useState<RegisterRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setRows(null);
    setError(null);

    Promise.all([
      fetchCalls({ limit: 15 }),
      fetchChats({ limit: 10 }).catch(() => null),
    ])
      .then(([calls, chats]) => {
        if (!active) return;
        const merged: RegisterRow[] = [
          ...calls.calls.map(fromCall),
          ...(chats?.chats.map(fromChat) ?? []),
        ];
        merged.sort((a, b) => {
          const ta = a.at ? new Date(a.at).getTime() : 0;
          const tb = b.at ? new Date(b.at).getTime() : 0;
          return tb - ta;
        });
        setRows(merged.slice(0, 18));
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      });

    return () => {
      active = false;
    };
  }, [orgSlug]);

  /* Grouped in render order, so the run stays newest-first and a day head
     only appears where the day actually changes. */
  const groups: { day: string; rows: RegisterRow[] }[] = [];
  for (const row of rows ?? []) {
    const day = fmtDay(row.at);
    const last = groups[groups.length - 1];
    if (last && last.day === day) last.rows.push(row);
    else groups.push({ day, rows: [row] });
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <SectionTitle>{t.overview.registerTitle}</SectionTitle>
          <p className="mt-0.5 text-xs text-ink-3">{t.overview.registerLede}</p>
        </div>
        <div className="flex gap-3 text-xs font-medium">
          <Link href="/dashboard/calls" className="text-navy-600 hover:underline">
            {t.overview.allCalls}
          </Link>
          <Link href="/dashboard/chats" className="text-navy-600 hover:underline">
            {t.overview.allChats}
          </Link>
        </div>
      </div>

      <div className="mt-3 border border-line bg-surface px-4 sm:px-5">
        {error ? (
          <p className="py-5 text-sm text-ink-3" role="alert">
            {error}
          </p>
        ) : rows === null ? (
          <ul className="divide-y divide-line">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="py-3">
                <div className="h-10 bg-surface-2" />
              </li>
            ))}
          </ul>
        ) : rows.length === 0 ? (
          <p className="py-5 text-sm text-ink-3">{t.overview.empty}</p>
        ) : (
          <>
            {groups.map((group, gi) => {
              const booked = bookedCount(group.rows);
              return (
                <div key={group.day}>
                  <div className="esmi-dayhead" style={gi === 0 ? { borderTop: "none" } : undefined}>
                    <span className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-2">
                      {group.day}
                    </span>
                    <span className="esmi-dayhead-count lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
                      {group.rows.length}
                      {group.rows.length === 1 ? " entry" : " entries"}
                      {booked > 0 && ` · ${booked} booked`}
                    </span>
                  </div>
                  <ul>
                    {group.rows.map((row, i) => (
                      <Row key={row.key} row={row} index={i} />
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* Foot rule — tallied from the rows above, never typed. */}
            <div className="esmi-footrule">
              <span className="lg-fig text-[0.625rem] uppercase tracking-[0.13em] text-ink-3">
                Tally
              </span>
              <span className="lg-fig text-xs text-ink-2">
                {rows.length} entries
              </span>
              <span className="lg-fig text-xs text-ink-2">
                {rows.filter((r) => r.kind === "call").length} calls
              </span>
              <span className="lg-fig text-xs text-ink-2">
                {rows.filter((r) => r.kind === "chat").length} chats
              </span>
              <span className="lg-fig text-xs" style={{ color: "var(--lg-foil)" }}>
                {bookedCount(rows)} booked
              </span>
              {rows.some((r) => r.language === "es") && (
                <span
                  className="lg-fig text-xs"
                  style={{ color: "var(--esmi-brass)" }}
                >
                  {rows.filter((r) => r.language === "es").length} in Spanish
                </span>
              )}
            </div>
          </>
        )}
        <DispositionKey />
      </div>
    </section>
  );
}

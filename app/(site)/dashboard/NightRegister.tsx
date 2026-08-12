"use client";

/* Dense night register for Overview — pulls live calls (and chats when
   available) so the operator sees a real ledger, not a thin activity teaser. */

import { useEffect, useState } from "react";
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

const dateFmt = new Intl.DateTimeFormat(undefined, {
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

function fmtWhen(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return `${dateFmt.format(d)}, ${timeFmt.format(d)}`;
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

function Row({ row }: { row: RegisterRow }) {
  const style = OUTCOME_STYLE[row.outcome ?? "other"] ?? OUTCOME_STYLE.other;
  return (
    <li className="border-b border-line last:border-b-0">
      <Link
        href={row.href}
        className="grid gap-2 py-3 transition-colors hover:bg-surface-2 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
      >
        <div className="min-w-0">
          <p className="lg-fig text-xs font-medium uppercase tracking-wide text-ink-3">
            {fmtWhen(row.at)}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2">
            {row.language && (
              <span
                className="lg-fig text-xs uppercase tracking-wide"
                style={{
                  color: row.language === "es" ? "var(--lg-foil)" : "var(--lg-ink-3)",
                }}
              >
                {row.language.toUpperCase()}
              </span>
            )}
            {row.duration && (
              <span className="lg-fig text-xs text-ink-3">{row.duration}</span>
            )}
            <span className="lg-fig text-xs uppercase tracking-wide text-ink-3">
              {row.kind === "call" ? "CALL" : "CHAT"}
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
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

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            {t.overview.registerTitle}
          </h2>
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
                <div className="h-10 animate-pulse rounded bg-surface-2" />
              </li>
            ))}
          </ul>
        ) : rows.length === 0 ? (
          <p className="py-5 text-sm text-ink-3">{t.overview.empty}</p>
        ) : (
          <ul>
            {rows.map((row) => (
              <Row key={row.key} row={row} />
            ))}
          </ul>
        )}
        <DispositionKey />
      </div>
    </section>
  );
}

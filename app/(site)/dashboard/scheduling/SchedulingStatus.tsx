"use client";

import { useEffect, useState } from "react";
import Action from "../Action";
import Link from "next/link";
import {
  fetchSchedulingStatus,
  type SchedulingCalendarStatus,
  type SchedulingLocationHours,
  type SchedulingStatus as SchedulingStatusData,
} from "@/app/lib/esmiPlatform";
import { Badge } from "../Badge";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function fmtDays(days: number[]): string {
  if (days.length === 0) return "Closed every day";
  if (days.length === 7) return "Every day";
  return [...days].sort((a, b) => a - b).map((d) => WEEKDAYS[d]).join(", ");
}

function fmtHours([open, close]: [number, number]): string {
  const fmt = (h: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}${period}`;
  };
  return `${fmt(open)} – ${fmt(close)}`;
}

// True when the error means "this organization isn't a real Esmi client" —
// same distinction Overview/Usage already make; retrying can't fix it.
function isUnknownOrgError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("unknown tenant") ||
    m.includes("no active organization") ||
    m.includes("x-tenant-id header is required")
  );
}

function CalendarRow({ cal }: { cal: SchedulingCalendarStatus }) {
  return (
    <li className="flex items-start justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{cal.location_name}</p>
        <p className="mt-0.5 text-xs text-ink-4">
          {cal.calendar_id ?? "No calendar set"}
        </p>
        {!cal.reachable && cal.detail && (
          <p className="mt-1 text-xs text-amber-700">{cal.detail}</p>
        )}
      </div>
      <Badge tone={cal.reachable ? "positive" : "warning"}>
        {cal.reachable ? "Connected" : "Not connected"}
      </Badge>
    </li>
  );
}

function HoursRow({ hours }: { hours: SchedulingLocationHours }) {
  return (
    <li className="py-2.5">
      <p className="text-sm font-medium text-ink">{hours.name}</p>
      <p className="mt-0.5 text-xs text-ink-3">
        {fmtDays(hours.business_days)} · {fmtHours(hours.business_hours)}
      </p>
      {hours.has_day_overrides && (
        <p className="mt-0.5 text-xs text-ink-4">Some days have custom hours.</p>
      )}
    </li>
  );
}

function SkeletonCards() {
  return (
    <div className="space-y-4">
      <div className="h-40 rounded-lg bg-surface-2" />
      <div className="h-32 rounded-lg bg-surface-2" />
    </div>
  );
}

export default function SchedulingStatus() {
  const [data, setData] = useState<SchedulingStatusData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  useEffect(() => {
    let active = true;
    setError(null);
    setData(null);
    fetchSchedulingStatus()
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
          {orgIssue ? "No client selected" : "Couldn't load scheduling status"}
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

  const locationHours = data.hours.locations
    ? Object.values(data.hours.locations)
    : null;

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-4 py-4 sm:px-6">
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Calendar connection
            </h2>
            <p className="mt-1 text-sm text-ink-3">
              {data.connected
                ? "Esmi can read and write your calendar."
                : "Esmi can't book on this calendar yet."}
            </p>
          </div>
          <Badge tone={data.connected ? "positive" : "warning"}>
            {data.connected ? "Connected" : "Not connected"}
          </Badge>
        </div>
        {!data.connected && data.detail && (
          <p className="border-b border-line bg-amber-50 px-4 py-2.5 text-sm text-amber-900 sm:px-6">
            {data.detail}
          </p>
        )}
        <ul className="divide-y divide-line px-4 sm:px-6">
          {data.calendars.map((cal) => (
            <CalendarRow key={cal.location_id} cal={cal} />
          ))}
        </ul>
      </section>

      <section className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <div className="border-b border-line px-4 py-4 sm:px-6">
          <h2 className="font-display text-base font-semibold text-ink">Booking hours</h2>
          <p className="mt-1 text-sm text-ink-3">
            Set in Settings — shown here read-only.
          </p>
        </div>
        <div className="px-4 sm:px-6">
          {locationHours ? (
            <ul className="divide-y divide-line">
              {locationHours.map((h) => (
                <HoursRow key={h.name} hours={h} />
              ))}
            </ul>
          ) : (
            <div className="py-2.5">
              <p className="text-sm text-ink-2">
                {fmtDays(data.hours.business_days)} · {fmtHours(data.hours.business_hours)}
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-line px-4 py-3 sm:px-6">
          <Link href="/dashboard/settings" className="text-sm text-[var(--lg-ink-2)] hover:text-[var(--lg-ink)] hover:underline">
            Edit hours in Settings →
          </Link>
        </div>
      </section>

      <p className="text-xs text-ink-4">
        Booking buffers and confirmation SMS/email toggles aren&apos;t available yet.
      </p>
    </div>
  );
}

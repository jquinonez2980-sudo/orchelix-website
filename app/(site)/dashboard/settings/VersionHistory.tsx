"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  fetchConfigVersion,
  fetchConfigVersions,
  type ConfigVersionDetail,
  type ConfigVersionSummary,
  type PlatformConfig,
} from "@/app/lib/esmiPlatform";

const dateTimeFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function fmtWhen(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : dateTimeFmt.format(d);
}

// created_by is an internal value (a Clerk user id, or the one-off import
// script's name) — never show that raw to a tenant.
function friendlyCreatedBy(
  createdBy: string | null,
  currentUserId: string | null | undefined,
): string | null {
  if (!createdBy) return null;
  if (createdBy === "import_tenant_configs") return "Initial setup";
  if (createdBy.startsWith("user_")) {
    return createdBy === currentUserId ? "You" : "Team member";
  }
  return "Dashboard";
}

/* ── read-only snapshot of a past version ──────────────────────────────── */

function ConfigSnapshot({ config }: { config: PlatformConfig }) {
  const fieldCls = "text-sm text-ink";
  const labelCls = "text-xs font-medium uppercase tracking-wide text-ink-4";

  return (
    <div className="space-y-4 rounded-md bg-surface-2 p-4 text-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className={labelCls}>Business name</div>
          <div className={fieldCls}>{config.company_name || "—"}</div>
        </div>
        <div>
          <div className={labelCls}>Transfer number</div>
          <div className={fieldCls}>{config.transfer_phone || "—"}</div>
        </div>
      </div>

      <div>
        <div className={labelCls}>Greeting</div>
        <div className={fieldCls}>{config.greeting || "(not set)"}</div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <div className={labelCls}>Booking confirmations to</div>
          <div className={fieldCls}>{config.emails.booking_to || "—"}</div>
        </div>
        <div>
          <div className={labelCls}>Escalations to</div>
          <div className={fieldCls}>{config.emails.escalation_to || "—"}</div>
        </div>
      </div>

      {config.has_locations ? (
        <div>
          <div className={labelCls}>Locations</div>
          <div className="mt-1 space-y-2">
            {Object.entries(config.locations).map(([id, loc]) => (
              <div key={id} className={fieldCls}>
                <span className="font-medium">{loc.name}</span> — {loc.address || "no address"} ·{" "}
                {loc.business_hours[0]}:00–{loc.business_hours[1]}:00
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={labelCls}>Hours</div>
          <div className={fieldCls}>
            {config.business_hours[0]}:00–{config.business_hours[1]}:00
          </div>
        </div>
      )}

      <div>
        <div className={labelCls}>Services</div>
        <div className="mt-1 space-y-1">
          {Object.entries(config.services).map(([id, svc]) => (
            <div key={id} className={fieldCls}>
              {svc.name} — {svc.duration_min} min
              {svc.price ? ` — ${svc.price}` : ""}
            </div>
          ))}
          {Object.keys(config.services).length === 0 && (
            <div className="text-sm text-ink-4">No services</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── version row (expandable) ──────────────────────────────────────────── */

function VersionRow({
  v,
  currentUserId,
}: {
  v: ConfigVersionSummary;
  currentUserId: string | null | undefined;
}) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<ConfigVersionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && !detail && !loading) {
      setLoading(true);
      setError(null);
      fetchConfigVersion(v.version)
        .then((d) => {
          setDetail(d);
          setLoading(false);
        })
        .catch((e: Error) => {
          setError(e.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="border-t border-line first:border-t-0">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-2 sm:px-6"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink">v{v.version}</span>
            <span className="text-xs text-ink-4">{fmtWhen(v.created_at)}</span>
            {friendlyCreatedBy(v.created_by, currentUserId) && (
              <span className="text-xs text-ink-4">
                · {friendlyCreatedBy(v.created_by, currentUserId)}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-sm text-ink-2">{v.summary}</p>
        </div>
        <span className="shrink-0 text-xs font-medium text-[var(--lg-ink-2)]">
          {expanded ? "Hide" : "View"}
        </span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 sm:px-6">
          {loading && <p className="text-sm text-ink-4">Loading…</p>}
          {error && <p className="text-sm text-rose-600">{error}</p>}
          {detail && <ConfigSnapshot config={detail.config} />}
        </div>
      )}
    </div>
  );
}

/* ── loading skeleton ───────────────────────────────────────────────────── */

function SkeletonRows() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-4 w-8 rounded bg-surface-2" />
            <div className="h-3 w-28 rounded bg-surface-2" />
            <div className="h-3 flex-1 rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── main section ───────────────────────────────────────────────────────── */

export default function VersionHistory({ reloadSignal }: { reloadSignal?: number } = {}) {
  const { user } = useUser();
  const [versions, setVersions] = useState<ConfigVersionSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchConfigVersions()
      .then((d) => {
        setVersions(d.versions);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [reloadKey, reloadSignal]);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-base font-semibold text-ink">Version history</h2>
          <p className="mt-1 text-sm text-ink-3">
            Every save creates a new version. Rollback isn&apos;t available yet — for now
            this is a read-only record of what changed and when.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="shrink-0 text-[0.75rem] font-medium text-[var(--lg-ink-2)] underline-offset-4 hover:text-[var(--lg-ink)] hover:underline"
        >
          Refresh
        </button>
      </div>
      {loading && <SkeletonRows />}
      {error && (
        <div className="px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-rose-600">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="mt-3 border border-[var(--lg-rule)] px-4 py-2 text-[0.75rem] font-display uppercase tracking-[0.08em] text-[var(--lg-ink)] transition-colors duration-150 hover:bg-[var(--lg-field-2)]"
          >
            Try again
          </button>
        </div>
      )}
      {versions && versions.length === 0 && !loading && !error && (
        <p className="px-4 py-6 text-sm text-ink-4 sm:px-6">No versions yet.</p>
      )}
      {versions && versions.length > 0 && !loading && (
        <div>
          {versions.map((v) => (
            <VersionRow key={v.version} v={v} currentUserId={user?.id} />
          ))}
        </div>
      )}
    </div>
  );
}

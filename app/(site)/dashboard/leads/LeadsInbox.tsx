"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LEAD_STATUSES,
  fetchLeads,
  updateLeadStatus,
  type Lead,
  type LeadsResponse,
  type LeadStatus,
} from "@/app/lib/esmiPlatform";
import { Badge, type BadgeTone } from "../Badge";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const PAGE_SIZE = 25;

/* ── formatting ──────────────────────────────────────────────────────────── */

const dateFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

function fmtWhen(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "—", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "" };
  return { date: dateFmt.format(d), time: timeFmt.format(d) };
}

/* ── status badge / picker ───────────────────────────────────────────────── */

// contacted was gold (AcumenAI's reserved accent, not Esmi/Orchelix) — same
// branding leak fixed on Team's "Pending" and Calls' "Escalated" badges.
const STATUS_STYLE: Record<LeadStatus, { label: string; tone: BadgeTone }> = {
  new: { label: "New", tone: "info" },
  contacted: { label: "Contacted", tone: "warning" },
  won: { label: "Won", tone: "positive" },
  lost: { label: "Lost", tone: "neutral" },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const s = STATUS_STYLE[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

const OUTCOME_LABEL: Record<string, string> = {
  booked: "Booked",
  escalated: "Escalated",
  info: "Info",
  voicemail: "Voicemail",
  abandoned: "Abandoned",
  other: "Other",
};

function SourceChip({ lead }: { lead: Lead }) {
  const voice = Boolean(lead.call);
  return <Badge tone={voice ? "positive" : "info"}>{voice ? "Phone" : "Web chat"}</Badge>;
}

function LeadScore({ score }: { score: number | null }) {
  if (score == null) return <span className="text-sm text-ink-4">—</span>;
  const warm = score >= 70;
  return (
    <span className={`text-sm font-medium tabular-nums ${warm ? "text-teal-700" : "text-ink-2"}`}>
      {score}
    </span>
  );
}

function CallRef({ lead }: { lead: Lead }) {
  if (!lead.call) return <span className="text-sm text-ink-4">—</span>;
  const when = fmtWhen(lead.call.started_at);
  return (
    <div className="text-sm">
      <span className="text-ink-2">{when.date}</span>
      {lead.call.outcome && (
        <span className="ml-1.5 text-xs text-ink-4">
          {OUTCOME_LABEL[lead.call.outcome] ?? lead.call.outcome}
        </span>
      )}
    </div>
  );
}

function StatusPicker({
  lead,
  onChange,
}: {
  lead: Lead;
  onChange: (status: LeadStatus) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <select
        value={lead.status}
        disabled={saving}
        onChange={async (e) => {
          const next = e.target.value as LeadStatus;
          setSaving(true);
          setFailed(false);
          try {
            const updated = await updateLeadStatus(lead.id, next);
            onChange(updated.status);
          } catch {
            setFailed(true);
          } finally {
            setSaving(false);
          }
        }}
        className="h-9 rounded-md border border-line bg-surface px-2.5 text-sm font-medium text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-50"
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_STYLE[s].label}
          </option>
        ))}
      </select>
      {saving && <span className="text-xs text-ink-4">Saving…</span>}
      {failed && <span className="text-xs text-rose-600">Failed — try again</span>}
    </div>
  );
}

/* ── rows / cards ────────────────────────────────────────────────────────── */

function LeadRow({
  lead,
  onUpdated,
}: {
  lead: Lead;
  onUpdated: (updated: Lead) => void;
}) {
  const when = fmtWhen(lead.last_updated);

  const applyStatus = (status: LeadStatus) => {
    // Promoting a derived lead swaps its id server-side; the caller
    // replaces this row by its current (pre-update) id.
    onUpdated({ ...lead, status, derived: false });
  };

  return (
    <>
      {/* Desktop row */}
      <tbody className="hidden md:table-row-group">
        <tr className="border-t border-line">
          <td className="whitespace-nowrap px-4 py-3 text-sm sm:px-6">
            <span className="font-medium text-ink">{when.date}</span>
            <span className="ml-2 text-ink-3">{when.time}</span>
          </td>
          <td className="px-4 py-3">
            <SourceChip lead={lead} />
          </td>
          <td className="max-w-[10rem] px-4 py-3 text-sm text-ink-2">
            <span className="truncate font-mono">{lead.contact || "No contact on file"}</span>
          </td>
          <td className="max-w-xs px-4 py-3 text-sm text-ink-2">
            <span className="line-clamp-2">{lead.summary || "—"}</span>
          </td>
          <td className="px-4 py-3">
            <LeadScore score={lead.lead_score} />
          </td>
          <td className="px-4 py-3">
            <CallRef lead={lead} />
          </td>
          <td className="px-4 py-3">
            <StatusPicker lead={lead} onChange={applyStatus} />
          </td>
        </tr>
      </tbody>

      {/* Mobile card */}
      <tbody className="md:hidden">
        <tr>
          <td colSpan={7} className="border-t border-line px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate font-mono text-sm font-medium text-ink">
                    {lead.contact || "No contact on file"}
                  </span>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <SourceChip lead={lead} />
                  <LeadScore score={lead.lead_score} />
                </div>
                {lead.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-ink-2">{lead.summary}</p>
                )}
                <div className="mt-1 flex items-center gap-2 text-xs text-ink-4">
                  <span>
                    {when.date} {when.time}
                  </span>
                  {lead.call?.outcome && (
                    <span>· {OUTCOME_LABEL[lead.call.outcome] ?? lead.call.outcome}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <StatusPicker lead={lead} onChange={applyStatus} />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

/* ── states ──────────────────────────────────────────────────────────────── */

function SkeletonRows() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-t border-line">
          <td colSpan={7} className="px-4 py-3 sm:px-6">
            <div className="flex animate-pulse items-center gap-4">
              <div className="h-4 w-24 rounded bg-surface-2" />
              <div className="h-5 w-16 rounded-full bg-surface-2" />
              <div className="h-4 w-32 rounded bg-surface-2" />
              <div className="h-4 flex-1 rounded bg-surface-2" />
              <div className="h-5 w-20 rounded-full bg-surface-2" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={7}>
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              {filtered ? "No leads match these filters" : "No leads yet"}
            </p>
            <p className="max-w-sm text-sm text-ink-3">
              {filtered
                ? "Try a different search or switch the status filter back to All."
                : "When Esmi qualifies a web chat, or flags a phone caller for follow-up, they show up here."}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <tbody>
      <tr className="border-t border-line">
        <td colSpan={7}>
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="font-display text-base font-semibold text-ink">
              Couldn&apos;t load leads
            </p>
            <p className="max-w-sm text-sm text-ink-3">{message}</p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
            >
              Try again
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

/* ── main component ──────────────────────────────────────────────────────── */

export default function LeadsInbox() {
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const orgSlug = useActiveOrgSlug();

  const filtered = Boolean(status || search);

  // Debounce the search box → server-side search param.
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchLeads({ status, search, limit: PAGE_SIZE, offset: page * PAGE_SIZE })
      .then((d) => {
        if (!active) return;
        setData(d);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (!active) return;
        setError(e.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [orgSlug, status, search, page, reloadKey]);

  const totalPages = useMemo(
    () => (data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1),
    [data],
  );

  const handleUpdated = (leadId: string, updated: Lead) => {
    setData((prev) => {
      if (!prev) return prev;
      // A status change that no longer matches the active filter drops the
      // row locally rather than waiting for the next fetch.
      if (status && updated.status !== status) {
        return {
          ...prev,
          total: Math.max(0, prev.total - 1),
          leads: prev.leads.filter((l) => l.id !== leadId),
        };
      }
      return {
        ...prev,
        leads: prev.leads.map((l) => (l.id === leadId ? updated : l)),
      };
    });
  };

  const inputCls =
    "h-9 rounded-md border border-line bg-surface px-2.5 text-sm text-ink " +
    "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
        <label className="flex flex-col gap-1 text-xs font-medium text-ink-3">
          Status
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as LeadStatus | "");
              setPage(0);
            }}
            className={inputCls}
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_STYLE[s].label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-ink-3">
          Search
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search contact or summary…"
            className={`${inputCls} w-full max-w-xs`}
          />
        </label>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setStatus("");
              setSearchInput("");
              setSearch("");
              setPage(0);
            }}
            className="h-9 rounded-md px-3 text-sm font-medium text-teal-700 hover:bg-teal-50"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-3">
              <th className="px-4 py-3 sm:px-6">Updated</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Lead score (0–100)</th>
              <th className="px-4 py-3">Call</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonRows />
          ) : error ? (
            <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
          ) : !data || data.leads.length === 0 ? (
            <EmptyState filtered={filtered} />
          ) : (
            data.leads.map((l) => (
              <LeadRow
                key={l.id}
                lead={l}
                onUpdated={(updated) => handleUpdated(l.id, updated)}
              />
            ))
          )}
        </table>
      </div>

      {/* Pagination */}
      {data && !error && data.total > 0 && (
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink-2 sm:px-6">
          <span className="tabular-nums">
            {data.offset + 1}–{Math.min(data.offset + PAGE_SIZE, data.total)} of{" "}
            {data.total}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0 || loading}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-md border border-line px-3 py-1.5 font-medium text-ink enabled:hover:bg-surface-2 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="tabular-nums text-ink-3">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page + 1 >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-line px-3 py-1.5 font-medium text-ink enabled:hover:bg-surface-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

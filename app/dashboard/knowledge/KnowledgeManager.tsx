"use client";

import { useEffect, useState } from "react";
import {
  addKnowledgeEntry,
  deleteKnowledgeEntry,
  fetchKnowledge,
  testKnowledge,
  type KnowledgeEntry,
} from "../../lib/esmiPlatform";

const inputCls =
  "w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink " +
  "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
const labelCls = "flex flex-col gap-1 text-xs font-medium text-ink-3";

const dateFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : dateFmt.format(d);
}

// The backend intentionally returns the exact production tool output — some
// of that text is written for the AI's own instructions, not for a tenant
// reading their own test results. Reformat the known prefixes here, in the
// display layer only, so the underlying retrieval stays byte-identical.
function friendlyKbResult(raw: string): string {
  if (raw.startsWith("NO_RESULTS:")) {
    return "Esmi wouldn't find anything relevant in the knowledge base for this question.";
  }
  if (raw.startsWith("Knowledge base unavailable")) {
    return "The knowledge base isn't available right now — try again in a moment.";
  }
  return raw;
}

/* ── add-entry form ─────────────────────────────────────────────────────── */

function AddEntryForm({ onAdded }: { onAdded: (entry: KnowledgeEntry) => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const submit = async () => {
    if (!answer.trim()) {
      setError("Answer / note is required");
      return;
    }
    setSaving(true);
    setError(null);
    setJustAdded(false);
    try {
      const entry = await addKnowledgeEntry({
        question: question.trim() || undefined,
        answer: answer.trim(),
      });
      onAdded(entry);
      setQuestion("");
      setAnswer("");
      setJustAdded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add entry");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 className="font-display text-base font-semibold text-ink">Add an entry</h2>
      <p className="mt-1 text-sm text-ink-3">
        A question and answer works best (it matches how customers usually ask), but a
        plain note is fine too — just leave the question blank.
      </p>
      <div className="mt-4 space-y-3">
        <label className={labelCls}>
          Question (optional)
          <input
            className={inputCls}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setJustAdded(false);
            }}
            placeholder="Do you sell gift cards?"
            maxLength={300}
          />
          <span className="self-end text-xs text-ink-4">{question.length}/300</span>
        </label>
        <label className={labelCls}>
          Answer / note
          <textarea
            rows={3}
            className={inputCls}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setJustAdded(false);
            }}
            placeholder="Yes! Ask at the front desk at either location."
            maxLength={4000}
          />
          <span className="self-end text-xs text-ink-4">{answer.length}/4000</span>
        </label>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          disabled={saving || !answer.trim()}
          onClick={submit}
          className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500 disabled:opacity-50"
        >
          {saving ? "Adding…" : "Add entry"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
        {!error && justAdded && (
          <span className="text-sm text-teal-700">Added — Esmi can use this right away.</span>
        )}
      </div>
    </div>
  );
}

/* ── entries list ───────────────────────────────────────────────────────── */

function EntryRow({
  entry,
  onDeleted,
}: {
  entry: KnowledgeEntry;
  onDeleted: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteKnowledgeEntry(entry.id);
      onDeleted(entry.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {entry.question && (
            <p className="text-sm font-medium text-ink">{entry.question}</p>
          )}
          <p className="mt-0.5 whitespace-pre-wrap text-sm text-ink-2">{entry.answer}</p>
          <p className="mt-1 text-xs text-ink-4">Added {fmtDate(entry.created_at)}</p>
        </div>
        <button
          type="button"
          disabled={deleting}
          onClick={remove}
          className="shrink-0 text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SkeletonRows() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-1/3 rounded bg-surface-2" />
            <div className="h-3 w-full rounded bg-surface-2" />
            <div className="h-3 w-2/3 rounded bg-surface-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EntriesList({
  entries,
  otherDocsCount,
  loading,
  error,
  onDeleted,
  onRetry,
}: {
  entries: KnowledgeEntry[] | null;
  otherDocsCount: number;
  loading: boolean;
  error: string | null;
  onDeleted: (id: string) => void;
  onRetry: () => void;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      <div className="border-b border-line px-4 py-4 sm:px-6">
        <h2 className="font-display text-base font-semibold text-ink">Current entries</h2>
        {otherDocsCount > 0 && (
          <p className="mt-1 text-sm text-ink-3">
            Esmi also draws on {otherDocsCount} other document
            {otherDocsCount === 1 ? "" : "s"} set up during onboarding — those aren&apos;t
            editable here yet; ask your Orchelix contact to update those.
          </p>
        )}
      </div>
      {loading && <SkeletonRows />}
      {error && (
        <div className="px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
          >
            Try again
          </button>
        </div>
      )}
      {entries && entries.length === 0 && !loading && !error && (
        <p className="px-4 py-6 text-sm text-ink-4 sm:px-6">
          No entries yet. Add a quick FAQ above and Esmi can start using it right away.
        </p>
      )}
      {entries && entries.length > 0 && !loading && (
        <div>
          {entries.map((e) => (
            <EntryRow key={e.id} entry={e} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── test box ───────────────────────────────────────────────────────────── */

function TestBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await testKnowledge(query.trim());
      setResult(res.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Test failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 className="font-display text-base font-semibold text-ink">Ask a test question</h2>
      <p className="mt-1 text-sm text-ink-3">
        Shows exactly what Esmi would retrieve from the knowledge base for this question —
        not a generated answer, the same raw lookup Esmi uses before replying.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          className={`${inputCls} sm:flex-1`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          placeholder="Do you sell gift cards?"
        />
        <button
          type="button"
          disabled={loading || !query.trim()}
          onClick={run}
          className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500 disabled:opacity-50 sm:shrink-0"
        >
          {loading ? "Searching…" : "Test"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-3 whitespace-pre-wrap rounded-md bg-surface-2/50 p-3 text-sm text-ink-2">
          {friendlyKbResult(result)}
        </div>
      )}
    </div>
  );
}

/* ── main ───────────────────────────────────────────────────────────────── */

export default function KnowledgeManager() {
  const [entries, setEntries] = useState<KnowledgeEntry[] | null>(null);
  const [otherDocsCount, setOtherDocsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchKnowledge()
      .then((d) => {
        setEntries(d.entries);
        setOtherDocsCount(d.other_docs_count);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  };

  useEffect(load, []);

  return (
    <div>
      <AddEntryForm onAdded={(entry) => setEntries((prev) => [entry, ...(prev ?? [])])} />
      <EntriesList
        entries={entries}
        otherDocsCount={otherDocsCount}
        loading={loading}
        error={error}
        onDeleted={(id) => setEntries((prev) => (prev ?? []).filter((e) => e.id !== id))}
        onRetry={load}
      />
      <TestBox />
    </div>
  );
}

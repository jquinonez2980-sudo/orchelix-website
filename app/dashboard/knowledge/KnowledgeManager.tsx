"use client";

import { useEffect, useRef, useState } from "react";
import {
  addKnowledgeEntry,
  deleteKnowledgeEntry,
  fetchKnowledge,
  testKnowledge,
  updateKnowledgeEntry,
  uploadKnowledgePdf,
  MAX_PDF_MB,
  type KnowledgeEntry,
  type KnowledgePdfEntry,
} from "../../lib/esmiPlatform";
import { Badge } from "../Badge";

const inputCls =
  "w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink " +
  "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
const labelCls = "flex flex-col gap-1 text-xs font-medium text-ink-3";
const deleteBtnCls =
  "shrink-0 rounded px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 hover:underline disabled:opacity-50";
// Same navy/ghost pair the Add form uses, pulled out so the inline editor
// matches it exactly rather than re-deriving the classes.
const primaryBtnCls =
  "rounded-md bg-navy-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-navy-500 disabled:opacity-50";
const secondaryBtnCls =
  "shrink-0 rounded px-2 py-1 text-xs font-medium text-ink-2 hover:bg-surface-2 disabled:opacity-50";

const dateFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : dateFmt.format(d);
}

function fmtBytes(n: number | null): string {
  if (n == null) return "";
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
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

/* ── shared section shell ───────────────────────────────────────────────────
   One card per topic (FAQs & notes / PDF documents / Test) instead of five
   flat boxes — a single header + description, with a form area and a list
   area sharing the same card, divided by a border instead of a visual gap. */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      <div className="border-b border-line px-4 py-4 sm:px-6">
        <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 text-sm text-ink-3">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-t border-b border-line bg-surface-2/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-4 sm:px-6">
      {children}
    </p>
  );
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
    <div className="p-4 sm:p-6">
      <div className="space-y-3">
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
        {error && <span className="text-sm text-rose-600">{error}</span>}
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
  onUpdated,
}: {
  entry: KnowledgeEntry;
  onDeleted: (id: string) => void;
  onUpdated: (entry: KnowledgeEntry) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Inline edit rather than a modal: entries are short, the list is the
     context you need while rewriting one, and it keeps the page a single
     scrollable surface on mobile. Draft state is local and discarded on
     cancel, so nothing is written until Save succeeds. */
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState(entry.question ?? "");
  const [a, setA] = useState(entry.answer);

  const startEdit = () => {
    setQ(entry.question ?? "");
    setA(entry.answer);
    setError(null);
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateKnowledgeEntry(entry.id, {
        question: q.trim() || undefined,
        answer: a,
      });
      onUpdated(updated);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

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

  const dirty = q !== (entry.question ?? "") || a !== entry.answer;

  return (
    <div className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
      {editing ? (
        <div className="space-y-2">
          <input
            className={inputCls}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Question (optional)"
            maxLength={300}
          />
          <textarea
            className={`${inputCls} h-auto`}
            rows={4}
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Answer"
            maxLength={4000}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={saving || !a.trim() || !dirty}
              className={primaryBtnCls}
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={saving}
              className={secondaryBtnCls}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {entry.question && (
              <p className="text-sm font-medium text-ink">{entry.question}</p>
            )}
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-ink-2">{entry.answer}</p>
            <p className="mt-1 text-xs text-ink-4">Added {fmtDate(entry.created_at)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={startEdit}
              disabled={deleting}
              className={secondaryBtnCls}
            >
              Edit
            </button>
            <button type="button" disabled={deleting} onClick={remove} className={deleteBtnCls}>
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
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
  onUpdated,
  onRetry,
}: {
  entries: KnowledgeEntry[] | null;
  otherDocsCount: number;
  loading: boolean;
  error: string | null;
  onDeleted: (id: string) => void;
  onUpdated: (entry: KnowledgeEntry) => void;
  onRetry: () => void;
}) {
  return (
    <>
      <SubLabel>Current entries</SubLabel>
      {otherDocsCount > 0 && (
        <p className="px-4 py-2 text-sm text-ink-3 sm:px-6">
          Esmi also draws on {otherDocsCount} other document
          {otherDocsCount === 1 ? "" : "s"} set up during onboarding — those aren&apos;t
          editable here yet; ask your Orchelix contact to update those.
        </p>
      )}
      {loading && <SkeletonRows />}
      {error && (
        <div className="px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-rose-600">{error}</p>
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
            <EntryRow
              key={e.id}
              entry={e}
              onDeleted={onDeleted}
              onUpdated={onUpdated}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ── PDF upload ─────────────────────────────────────────────────────────── */

function PdfUploadForm({ onUploaded }: { onUploaded: (entry: KnowledgePdfEntry) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploadedName(null);
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Only PDF files are accepted");
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      setError(`PDF must be at most ${MAX_PDF_MB} MB`);
      return;
    }
    setUploading(true);
    try {
      const entry = await uploadKnowledgePdf(file);
      onUploaded(entry);
      setUploadedName(entry.filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to upload PDF");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="block w-full text-sm text-ink-2 file:mr-3 file:rounded-md file:border-0 file:bg-navy-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-500 disabled:opacity-50"
        />
        {uploading && <span className="shrink-0 text-sm text-ink-4">Uploading…</span>}
      </div>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      {!error && uploadedName && !uploading && (
        <p className="mt-2 text-sm text-teal-700">
          &quot;{uploadedName}&quot; added — Esmi can use it right away.
        </p>
      )}
    </div>
  );
}

function PdfRow({
  pdf,
  onDeleted,
}: {
  pdf: KnowledgePdfEntry;
  onDeleted: (id: string) => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteKnowledgeEntry(pdf.id);
      onDeleted(pdf.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-medium text-ink">{pdf.filename}</p>
            {pdf.truncated && <Badge tone="warning">Trimmed</Badge>}
          </div>
          <p className="mt-0.5 text-xs text-ink-4">
            {fmtBytes(pdf.size_bytes)}
            {pdf.pages != null && ` · ${pdf.pages} page${pdf.pages === 1 ? "" : "s"}`}
            {" · "}Added {fmtDate(pdf.created_at)}
          </p>
        </div>
        <button type="button" disabled={deleting} onClick={remove} className={deleteBtnCls}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function PdfsList({
  pdfs,
  loading,
  error,
  onDeleted,
  onRetry,
}: {
  pdfs: KnowledgePdfEntry[] | null;
  loading: boolean;
  error: string | null;
  onDeleted: (id: string) => void;
  onRetry: () => void;
}) {
  return (
    <>
      <SubLabel>Uploaded PDFs</SubLabel>
      {loading && <SkeletonRows />}
      {error && (
        <div className="px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-rose-600">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
          >
            Try again
          </button>
        </div>
      )}
      {pdfs && pdfs.length === 0 && !loading && !error && (
        <p className="px-4 py-6 text-sm text-ink-4 sm:px-6">
          No PDFs uploaded yet — add one above and Esmi can start using it right away.
        </p>
      )}
      {pdfs && pdfs.length > 0 && !loading && (
        <div>
          {pdfs.map((p) => (
            <PdfRow key={p.id} pdf={p} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </>
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
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row">
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
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
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
  const [pdfs, setPdfs] = useState<KnowledgePdfEntry[] | null>(null);
  const [otherDocsCount, setOtherDocsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchKnowledge()
      .then((d) => {
        setEntries(d.entries);
        setPdfs(d.pdfs);
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
    <div className="space-y-6">
      <Section
        title="FAQs & notes"
        description="A question and answer works best (it matches how customers usually ask), but a plain note is fine too — just leave the question blank. Changes are searchable within about a minute."
      >
        <AddEntryForm onAdded={(entry) => setEntries((prev) => [entry, ...(prev ?? [])])} />
        <EntriesList
          entries={entries}
          otherDocsCount={otherDocsCount}
          loading={loading}
          error={error}
          onDeleted={(id) => setEntries((prev) => (prev ?? []).filter((e) => e.id !== id))}
          onUpdated={(updated) =>
            setEntries((prev) =>
              (prev ?? []).map((e) => (e.id === updated.id ? updated : e)),
            )
          }
          onRetry={load}
        />
      </Section>

      <Section
        title="PDF documents"
        description={`Menus, price sheets, policies — Esmi reads the text and can use it right away. Up to ${MAX_PDF_MB} MB per file.`}
      >
        <PdfUploadForm onUploaded={(entry) => setPdfs((prev) => [entry, ...(prev ?? [])])} />
        <PdfsList
          pdfs={pdfs}
          loading={loading}
          error={error}
          onDeleted={(id) => setPdfs((prev) => (prev ?? []).filter((p) => p.id !== id))}
          onRetry={load}
        />
      </Section>

      <Section
        title="Ask a test question"
        description="Shows exactly what Esmi would retrieve from the knowledge base for this question — not a generated answer, the same raw lookup Esmi uses before replying."
      >
        <TestBox />
      </Section>
    </div>
  );
}

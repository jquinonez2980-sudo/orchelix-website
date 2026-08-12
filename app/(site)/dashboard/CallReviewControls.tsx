"use client";

import { useState } from "react";
import {
  REVIEW_STATUSES,
  updateCallReview,
  type CallReview,
  type ReviewStatus,
} from "@/app/lib/esmiPlatform";
import { track } from "@/app/lib/analytics";
import { useDashI18n } from "./i18n";

const LABELS: Record<ReviewStatus, { en: string; es: string }> = {
  open: { en: "Open", es: "Abierta" },
  reviewed: { en: "Reviewed", es: "Revisada" },
  needs_followup: { en: "Needs follow-up", es: "Requiere seguimiento" },
};

export default function CallReviewControls({
  callId,
  initial,
  onChange,
}: {
  callId: string;
  initial?: CallReview | null;
  onChange?: (r: CallReview) => void;
}) {
  const { locale } = useDashI18n();
  const [status, setStatus] = useState<ReviewStatus>(initial?.status ?? "open");
  const [note, setNote] = useState(initial?.note ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save(nextStatus: ReviewStatus) {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      const review = await updateCallReview(callId, {
        status: nextStatus,
        note: note.trim() || null,
      });
      setStatus(review.status);
      setNote(review.note ?? "");
      setSaved(true);
      onChange?.(review);
      track("call_review", { status: review.status });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save review.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2 border border-line bg-surface-2 px-3 py-3">
      <p
        className="lg-fig text-xs uppercase text-ink-3"
        style={{ letterSpacing: "0.1em" }}
      >
        {locale === "es" ? "Estado de revisión" : "Review status"}
      </p>
      <div className="flex flex-wrap gap-2">
        {REVIEW_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            disabled={busy}
            onClick={() => save(s)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide ${
              status === s
                ? "bg-navy-600 text-white"
                : "border border-line text-ink-2 hover:bg-surface"
            }`}
            style={{ borderRadius: 0 }}
          >
            {LABELS[s][locale === "es" ? "es" : "en"]}
          </button>
        ))}
      </div>
      <label className="block">
        <span className="sr-only">{locale === "es" ? "Nota" : "Note"}</span>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => {
            if (note !== (initial?.note ?? "")) save(status);
          }}
          placeholder={
            locale === "es"
              ? "Nota opcional para el equipo…"
              : "Optional note for your team…"
          }
          className="mt-1 h-9 w-full border border-line bg-surface px-3 text-sm text-ink focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        />
      </label>
      {saved && (
        <p className="text-xs text-ink-3" role="status">
          {locale === "es" ? "Guardado" : "Saved"}
        </p>
      )}
      {error && (
        <p className="text-xs text-ink" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

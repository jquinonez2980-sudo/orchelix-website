"use client";

/* Persisted HITL coach: saves a knowledge entry the platform will use on
   future calls. Call disposition is not rewritten; knowledge is the override
   path. Review status is saved via CallReviewControls / updateCallReview. */

import { useState } from "react";
import {
  addKnowledgeEntry,
  updateCallReview,
  type PlatformCall,
} from "@/app/lib/esmiPlatform";
import { track } from "@/app/lib/analytics";
import { useDashI18n } from "./i18n";
import { OUTCOME_STYLE } from "./calls/CallLog";

export default function CoachFromCall({
  call,
  onCoached,
}: {
  call: PlatformCall;
  onCoached?: () => void;
}) {
  const { t } = useDashI18n();
  const style = OUTCOME_STYLE[call.outcome ?? "other"] ?? OUTCOME_STYLE.other;

  const defaultQ =
    call.summary?.trim().slice(0, 140) ||
    `Correction from call ${fmtCaller(call.caller)}`;

  const [question, setQuestion] = useState(defaultQ);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function saveKnowledge() {
    const a = answer.trim();
    if (!a) {
      setError("Write what Esmi should do or say next time.");
      setStatus("error");
      return;
    }
    setStatus("saving");
    setError(null);
    try {
      await addKnowledgeEntry({
        question: question.trim() || defaultQ,
        answer: a,
        language:
          call.language === "es" ? "es" : call.language === "en" ? "en" : "auto",
      });
      /* Coaching implies the operator handled the call — mark reviewed. */
      await updateCallReview(call.id, { status: "reviewed" }).catch(() => {
        /* knowledge still saved */
      });
      setStatus("saved");
      setAnswer("");
      track("coach_save");
      onCoached?.();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Could not save.");
    }
  }

  return (
    <div
      className="border border-line bg-surface px-4 py-3"
      style={{ borderLeft: "2px solid var(--lg-foil)" }}
    >
      <p
        className="lg-fig text-xs uppercase tracking-wide text-ink-3"
        style={{ letterSpacing: "0.12em" }}
      >
        {t.calls.coachTitle} · {style.disposition}
      </p>

      <p className="mt-1 text-sm text-ink-2">{t.calls.coachLede}</p>

      <div className="mt-3 space-y-2">
        <label className="block">
          <span
            className="lg-fig text-xs uppercase text-ink-3"
            style={{ letterSpacing: "0.1em" }}
          >
            {t.calls.question}
          </span>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 h-9 w-full border border-line bg-surface px-3 text-sm text-ink focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
        </label>
        <label className="block">
          <span
            className="lg-fig text-xs uppercase text-ink-3"
            style={{ letterSpacing: "0.1em" }}
          >
            {t.calls.answer}
          </span>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            placeholder="e.g. We close at 6pm weekdays. Emergency HVAC only after hours — route to on-call."
            className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-4 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveKnowledge}
            disabled={status === "saving"}
            className="lg-stamp lg-foil-surface px-4 py-2 text-xs font-semibold disabled:opacity-50"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--lg-foil-ink)",
              borderRadius: 0,
            }}
          >
            {status === "saving" ? t.calls.saving : t.calls.save}
          </button>
          {status === "saved" && (
            <span className="text-xs font-medium text-ink" role="status">
              {t.calls.saved}
            </span>
          )}
          {status === "error" && error && (
            <span className="text-xs text-ink" role="alert">
              {error}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
        <a href="/dashboard/knowledge" className="text-navy-600 hover:underline">
          {t.calls.knowledge}
        </a>
        <a href="/dashboard/voice" className="text-navy-600 hover:underline">
          {t.calls.voice}
        </a>
        <a href="/dashboard/settings" className="text-navy-600 hover:underline">
          {t.calls.settings}
        </a>
      </div>
    </div>
  );
}

function fmtCaller(e164: string | null): string {
  if (!e164) return "unknown caller";
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164;
}

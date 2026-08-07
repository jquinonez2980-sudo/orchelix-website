"use client";

import { useState } from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import {
  QUALITY_STUDIO_SCENARIOS,
  runQualityStudioScenario,
  type QualityStudioRunResponse,
  type QualityStudioScenarioId,
} from "../../lib/esmiPlatform";

/* Quality Studio (docs/ESMI_DASHBOARD_UX.md Section 3.6) — replaces
   QualityStudioStub.tsx. Runs a FIXED scripted scenario through the
   tenant's real agent server-side (platform_api/quality_studio.py);
   write-tools are short-circuited there, not here — this component never
   needs to know that detail, it just displays whatever transcript/
   disposition/success the backend returns. */

const DISPOSITION_LABEL: Record<string, string> = {
  booked: "Booked",
  escalated: "Escalated",
  info: "Answered from knowledge base",
  no_signal: "No clear signal",
};

function timeLabel(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });
  } catch {
    return "";
  }
}

function ResultBanner({ result }: { result: QualityStudioRunResponse }) {
  const disposition = DISPOSITION_LABEL[result.disposition] ?? result.disposition;
  return (
    <div
      className={`rounded-lg border px-4 py-3 ${
        result.success
          ? "border-teal-200 bg-teal-50/60 text-teal-900"
          : "border-amber-200 bg-amber-50/60 text-amber-900"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/70">
          {result.success ? (
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          ) : (
            <span className="text-xs font-bold">!</span>
          )}
        </span>
        <span className="text-sm font-semibold">
          {result.success ? "Scenario passed" : "Needs attention"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.11em] opacity-70">
          · {disposition}
        </span>
        <span className="ml-auto flex items-center gap-1 font-mono text-[11px] tabular-nums opacity-70">
          <Clock className="h-3 w-3" strokeWidth={2} />
          {(result.duration_ms / 1000).toFixed(1)}s
        </span>
      </div>
      {result.tools_called.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {result.tools_called.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/70 px-2 py-0.5 font-mono text-[10px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs leading-5 opacity-80">{result.note}</p>
    </div>
  );
}

function Transcript({ result }: { result: QualityStudioRunResponse }) {
  return (
    <div className="max-h-96 space-y-3 overflow-y-auto rounded-lg border border-line bg-surface-2/40 p-4">
      {result.transcript.map((turn, i) => (
        <div key={i} className={`flex ${turn.speaker === "caller" ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
              turn.speaker === "caller"
                ? "border border-line bg-surface text-ink shadow-sm"
                : "bg-navy-600 text-white shadow-sm"
            }`}
          >
            <div
              className={`mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.11em] ${
                turn.speaker === "caller" ? "text-ink-4" : "text-white/55"
              }`}
            >
              <span>{turn.speaker === "caller" ? "Caller" : "Esmi"}</span>
              <span className="tabular-nums">{timeLabel(turn.timestamp)}</span>
            </div>
            <p>{turn.text}</p>
            {turn.tools_called.length > 0 && (
              <p
                className={`mt-1.5 font-mono text-[10px] ${
                  turn.speaker === "caller" ? "text-ink-4" : "text-white/55"
                }`}
              >
                Called: {turn.tools_called.join(", ")}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function QualityStudio() {
  const [scenarioId, setScenarioId] = useState<QualityStudioScenarioId>(
    QUALITY_STUDIO_SCENARIOS[0].id,
  );
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<QualityStudioRunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    try {
      const r = await runQualityStudioScenario(scenarioId);
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The practice run failed — try again.");
    } finally {
      setRunning(false);
    }
  };

  return (
    /* Deliberately quieter than the voice panels above it: a section rule +
       eyebrow rather than another shadowed card competing for the eye. Same
       tokens, same mono-eyebrow register — one design system, lower rank. */
    <section className="border-t border-line pt-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-teal-500" strokeWidth={2} />
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-4">
          Quality Studio
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-3">
        Practice calls without risking a real customer. These use your current saved voice,
        greeting, and knowledge base — not a real customer call, and nothing is booked, emailed,
        or texted for real.
      </p>

      <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {QUALITY_STUDIO_SCENARIOS.map((s) => {
            const active = s.id === scenarioId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenarioId(s.id)}
                aria-pressed={active}
                className={`rounded-lg border p-3.5 text-left transition-colors duration-150 ${
                  active
                    ? "border-teal-400 bg-teal-50/50 ring-1 ring-teal-400/40"
                    : "border-line bg-surface hover:border-line-strong hover:bg-surface-2/60"
                }`}
              >
                <p className="text-sm font-semibold text-ink">{s.label}</p>
                <p className="mt-1 text-xs leading-5 text-ink-3">{s.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRun}
            disabled={running}
            className="rounded-lg border border-line-strong px-3.5 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-surface-2 disabled:opacity-50"
          >
            {running ? "Running…" : "Run scenario"}
          </button>
          {error && <span className="text-sm text-rose-600">{error}</span>}
        </div>

        {result && (
          <div className="mt-5 space-y-3.5 border-t border-line pt-5">
            {/* result.label (not the currently-selected chip) — this stays
                showing the LAST run's scenario even if the picker above has
                since moved to a different chip, so "replay last run" (i.e.
                just leaving this on screen) never mislabels a stale
                transcript as the newly-selected scenario. */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-4">
                Last run · {result.label}
              </span>
              {result.scenario_id !== scenarioId && (
                <span className="text-xs text-ink-4">
                  Picker has since moved on — run again to update.
                </span>
              )}
            </div>
            <ResultBanner result={result} />
            <Transcript result={result} />
          </div>
        )}
      </div>
    </section>
  );
}

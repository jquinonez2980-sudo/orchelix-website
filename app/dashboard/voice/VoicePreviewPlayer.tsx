"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { fetchVoicePreview, type LanguagePref } from "../../lib/esmiPlatform";

/* THE premium player (docs/ESMI_DASHBOARD_UX.md Section 3.5). Reused
   as-is by VoiceStudio; the public try-esmi page (Section 6) is meant to
   reuse the same component later, which is why this file takes no
   dashboard-specific props (tenant auth stays in fetchVoicePreview's own
   proxy call, not this component).

   State machine: idle -> loading -> playing <-> paused, or -> error at any
   point loading/playing can fail. "Outdated" is a separate axis layered on
   top of any of those: once a preview has loaded, changing voice/speed/
   language/text doesn't reset playback of what's already loaded — it just
   flags that the loaded audio no longer matches the current inputs, per the
   spec's "Changing voice, speed, or greeting invalidates current audio and
   shows 'Outdated — re-preview'" — it does not say stop existing playback. */

type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error";

type VoicePreviewPlayerProps = {
  voiceId: string;
  voiceName: string;
  speed: number;
  language: LanguagePref;
  text: string;
  // "Draft" pill — true when voice/speed/greeting differ from the tenant's
  // last SAVED config, a different concept from "outdated" (which is about
  // this player's own loaded audio vs. current inputs, saved or not).
  draft?: boolean;
  // Fires once per successful fetchVoicePreview() call — i.e. the backend
  // actually returned 200, not just that playback started. The onboarding
  // voice-gate step (app/dashboard/onboarding/voice) uses this to unlock its
  // Continue button; VoiceStudio doesn't pass it and is unaffected.
  onPreviewSuccess?: () => void;
};

const LANGUAGE_LABEL: Record<LanguagePref, string> = {
  auto: "Auto-detect",
  en: "English",
  es: "Spanish",
};

const BAR_COUNT = 16;

function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VoicePreviewPlayer({
  voiceId,
  voiceName,
  speed,
  language,
  text,
  draft = false,
  onPreviewSuccess,
}: VoicePreviewPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const paramsKey = JSON.stringify({ voiceId, speed, language, text });
  const outdated = loadedKey !== null && loadedKey !== paramsKey;

  // A param change never yanks audio out from under an in-progress listen —
  // see the module note above — it only flips `outdated` (computed above).

  const load = async () => {
    if (!text.trim()) {
      setStatus("error");
      setErrorMsg("Write a greeting first — there's nothing to preview yet.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetchVoicePreview({ voice_id: voiceId, speed, language, text });
      setAudioUrl(res.url);
      setLoadedKey(paramsKey);
      // Seed with the backend's byte-size estimate; onLoadedMetadata below
      // overwrites it with the real decoded duration once available.
      setDuration(res.duration_sec);
      setCurrentTime(0);
      // Actual <audio> playback kicks off from the effect below, once `src`
      // is set and the element has re-rendered with the new source.
      setStatus("playing");
      onPreviewSuccess?.();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Preview failed — try again.");
    }
  };

  useEffect(() => {
    if (status !== "playing") return;
    const el = audioRef.current;
    if (!el) return;
    el.play().catch(() => {
      setStatus("error");
      setErrorMsg("Playback was blocked — try clicking the player again.");
    });
    // audioUrl in the deps: a re-preview while already "playing" (new src
    // loaded, status re-set to "playing" by load()) must issue a fresh
    // play() call, since swapping `src` alone doesn't resume playback.
  }, [status, audioUrl]);

  const handleToggle = () => {
    if (status === "loading") return;
    if (status === "playing") {
      audioRef.current?.pause();
      setStatus("paused");
      return;
    }
    if (status === "paused" && !outdated) {
      setStatus("playing");
      return;
    }
    load();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleToggle();
    }
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const animated = status === "playing";

  let buttonLabel: string;
  if (status === "loading") buttonLabel = "Preparing preview…";
  else if (status === "playing") buttonLabel = "Playing preview";
  else if (status === "error") buttonLabel = "Retry preview";
  else if (outdated) buttonLabel = "Re-preview to hear your latest changes";
  else buttonLabel = "Preview with current greeting";

  return (
    <div
      role="group"
      aria-label="Voice preview player"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded-lg border border-line bg-surface p-4 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="auto"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            if (Number.isFinite(e.currentTarget.duration)) {
              setDuration(e.currentTarget.duration);
            }
          }}
          onEnded={() => {
            setStatus("idle");
            setCurrentTime(0);
          }}
          onError={() => {
            setStatus("error");
            setErrorMsg("This preview clip couldn't be played — try re-previewing.");
          }}
          className="hidden"
        />
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleToggle}
          disabled={status === "loading"}
          aria-label={buttonLabel}
          className={
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-md " +
            "transition-transform duration-150 hover:scale-105 disabled:cursor-wait disabled:opacity-70 " +
            (status === "error" ? "bg-rose-500 hover:bg-rose-400" : "bg-teal-500 hover:bg-teal-400")
          }
        >
          {status === "loading" ? (
            <span
              aria-hidden
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : status === "playing" ? (
            <Pause className="h-6 w-6" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="ml-0.5 h-6 w-6" fill="currentColor" strokeWidth={0} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {/* Waveform */}
          <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <span
                key={i}
                className="w-full rounded-full bg-teal-400"
                style={{
                  height: "100%",
                  animation: animated
                    ? `esmi-wave 900ms ease-in-out ${(i % 8) * 90}ms infinite`
                    : status === "idle" || status === "paused"
                      ? `esmi-wave-idle 2400ms ease-in-out ${(i % 8) * 120}ms infinite`
                      : "none",
                  transform: animated || status === "idle" || status === "paused" ? undefined : "scaleY(0.2)",
                  opacity: status === "error" ? 0.25 : 1,
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-teal-500 transition-[width] duration-150"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-ink-4">
            <span>
              {fmtTime(currentTime)} / {fmtTime(duration)}
            </span>
            {draft && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
                Draft
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-ink">{buttonLabel}</p>
      <p className="text-xs text-ink-3">
        Voice: {voiceName} · {speed.toFixed(2)}× · {LANGUAGE_LABEL[language]}
      </p>
      {outdated && status !== "loading" && (
        <p className="mt-1 text-xs font-medium text-amber-700">
          Outdated — re-preview to hear your latest changes
        </p>
      )}
      {status === "error" && errorMsg && (
        <p className="mt-1 text-xs text-rose-600" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

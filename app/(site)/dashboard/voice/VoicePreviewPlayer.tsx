"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { fetchVoicePreview, type LanguagePref } from "@/app/lib/esmiPlatform";

/* THE premium player (docs/ESMI_DASHBOARD_UX.md Section 3.5). Reused
   as-is by VoiceStudio and the onboarding voice gate; the public try-esmi
   page (Section 6) runs the same *DNA* in its own dark-theme component
   (app/try-esmi/PublicVoicePreview.tsx) — see that file's header for why
   it can't literally import this one. This file takes no dashboard-specific
   props (tenant auth stays in fetchVoicePreview's own proxy call, not this
   component) so a light-theme host anywhere can drop it in.

   Presentation: a slim transport bar. One saturated control (play/pause),
   a static waveform that doubles as the scrub track, and a quiet mono meta
   line — deliberately not a hero play button with a bouncing equalizer.

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

/* The waveform doubles as the progress track: a fixed, non-animated
   silhouette whose played portion fills teal. Heights come from a
   deterministic formula (never Math.random) so server and client render
   byte-identical markup and hydration stays quiet. Mirrors the try-esmi
   player's WAVE, at the narrower bar count a dashboard column affords. */
const WAVE = Array.from({ length: 48 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 1.31) * Math.cos(i * 0.47));
  const b = Math.abs(Math.sin(i * 0.19 + 1.2));
  // Taper the very edges so the silhouette reads as a clip, not a crop.
  const edge = Math.min(1, Math.min(i, 47 - i) / 5 + 0.45);
  return Math.round((0.24 + 0.76 * (a * 0.65 + b * 0.35)) * edge * 100);
});

const SEEK_STEP_SEC = 5;

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
  const scrubRef = useRef<HTMLDivElement | null>(null);
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

  // Seeking only makes sense against audio that still matches the current
  // inputs — an outdated clip's timeline isn't the one the meta line
  // describes, so the track goes inert rather than lying about position.
  const seekable = Boolean(audioUrl) && duration > 0 && !outdated;

  const seekTo = (sec: number) => {
    const el = audioRef.current;
    if (!el || !seekable) return;
    const next = Math.max(0, Math.min(duration, sec));
    el.currentTime = next;
    setCurrentTime(next);
  };

  const handleScrubClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rail = scrubRef.current;
    if (!rail || !seekable) return;
    const rect = rail.getBoundingClientRect();
    if (rect.width <= 0) return;
    seekTo(((e.clientX - rect.left) / rect.width) * duration);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleToggle();
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      seekTo(currentTime + SEEK_STEP_SEC);
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekTo(currentTime - SEEK_STEP_SEC);
    }
  };

  const ratio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  let buttonLabel: string;
  if (status === "loading") buttonLabel = "Preparing preview…";
  else if (status === "playing") buttonLabel = "Pause preview";
  else if (status === "error") buttonLabel = "Retry preview";
  else if (outdated) buttonLabel = "Re-preview to hear your latest changes";
  else if (status === "paused") buttonLabel = "Resume preview";
  else buttonLabel = "Preview with current greeting";

  // First word of the meta line. Before anything has ever loaded this doubles
  // as the call to action, so the slim bar still tells you what to press.
  let statusWord: string;
  if (status === "loading") statusWord = "Preparing";
  else if (status === "playing") statusWord = "Playing";
  else if (status === "paused") statusWord = "Paused";
  else if (status === "error") statusWord = "Error";
  else if (outdated) statusWord = "Press play";
  else if (audioUrl) statusWord = "Ready";
  else statusWord = "Preview greeting";

  return (
    <div
      role="group"
      aria-label="Voice preview player"
      aria-keyshortcuts="Space ArrowLeft ArrowRight"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded-xl border border-line bg-surface px-3.5 py-3.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 sm:px-4"
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

      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Play / pause — the only saturated element in the bar */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={status === "loading"}
          aria-label={buttonLabel}
          title={buttonLabel}
          className={
            "vs-play flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:cursor-wait " +
            (status === "error"
              ? "border border-rose-200 bg-rose-50 text-rose-600"
              : "bg-teal-500 text-white shadow-sm")
          }
        >
          {status === "loading" ? (
            /* A held mark, not a spinner. DESIGN.md forbids `infinite` on
               anything asserting a system state; the button is disabled and
               labelled while loading, so the state is legible without motion. */
            <span
              aria-hidden
              className="h-3.5 w-3.5 border-2 border-current opacity-60"
            />
          ) : status === "playing" ? (
            <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {/* Waveform doubles as the progress track — static bars, teal fill,
              click or ←/→ to seek. */}
          <div
            ref={scrubRef}
            onClick={handleScrubClick}
            role="progressbar"
            aria-label="Playback progress"
            aria-valuemin={0}
            aria-valuemax={Math.max(1, Math.round(duration))}
            aria-valuenow={Math.round(currentTime)}
            aria-valuetext={`${fmtTime(currentTime)} of ${fmtTime(duration)}`}
            data-seekable={seekable}
            className="vs-scrub flex items-center gap-px"
            style={{ height: 24, cursor: seekable ? "pointer" : "default" }}
          >
            {WAVE.map((h, i) => {
              const played = seekable && i / WAVE.length < ratio;
              return (
                <span
                  key={i}
                  className="vs-bar"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: `${h}%`,
                    borderRadius: 1,
                    background: played ? "var(--teal-500)" : "var(--vs-rail)",
                    opacity: status === "error" ? 0.4 : 1,
                  }}
                />
              );
            })}
          </div>

          {/* Quiet meta: status · voice · speed · language, then time */}
          <div className="mt-2 flex items-center gap-2.5">
            <span
              className={`min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.11em] ${
                status === "error" ? "text-rose-400" : "text-ink-4"
              }`}
            >
              {statusWord} · {voiceName} · {speed.toFixed(2)}× · {LANGUAGE_LABEL[language]}
            </span>
            {draft && (
              <span
                title="Unsaved changes — this preview reflects your draft, not what's saved."
                className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.09em] text-amber-700"
              >
                Draft
              </span>
            )}
            <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-4">
              {fmtTime(currentTime)} / {fmtTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Inline notices — a quiet line, never a boxed alert */}
      {outdated && status !== "loading" && (
        <p className="mt-2.5 text-xs leading-5 text-amber-700">
          Settings changed — press play to hear this version.
        </p>
      )}
      {status === "error" && errorMsg && (
        <p className="mt-2.5 text-xs leading-5 text-rose-600" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

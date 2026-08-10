"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "@/app/components/ledger";

/* Public, unauthenticated voice preview for try-esmi
   (docs/ESMI_DASHBOARD_UX.md Section 6 / Section 4 "player DNA").

   Converted to the Ruled Record on 2026-08-08: cyan #00F0FF became foil,
   glass panels became a red top rule over the buckram field, every radius
   went to 0, and the two gold CTAs became quiet actions so the page's single
   foil stamp keeps its meaning.

   Deliberately NOT a reuse of app/dashboard/voice/VoicePreviewPlayer.tsx.
   "Same player DNA" means the same interaction pattern (play/pause, progress,
   meta line, states, outdated-on-change, space-to-play) — not the literal
   React component. Once the dashboard is converted to this world too, the two
   are worth revisiting as one shared transport.

   Only a fixed sample_id + language ever get sent — no free-text input
   exists anywhere in this component, matching the public preview
   endpoint's own contract (it has no `text` field to send one to). */

const FOIL = "var(--lg-foil)";
const TEXT = "var(--lg-ink)";
const MUTED = "var(--lg-ink-2)";
const FAINT = "var(--lg-ink-3)";

type Lang = "en" | "es";
type Status = "idle" | "loading" | "playing" | "paused" | "error";

type Sample = { id: string; label: string; labelEs: string };

// Mirrors platform_api/public_voice_samples.py's PUBLIC_SAMPLES keys —
// labels only (display strings); the actual spoken words are resolved
// server-side, never duplicated here.
const SAMPLES: Sample[] = [
  { id: "general", label: "General business", labelEs: "Negocio general" },
  { id: "hvac", label: "HVAC & home services", labelEs: "Climatización y hogar" },
  { id: "dental", label: "Dental & medical", labelEs: "Dental y médico" },
  { id: "law-firm", label: "Law firms", labelEs: "Bufetes legales" },
  { id: "real-estate", label: "Real estate", labelEs: "Bienes raíces" },
];

const DEFAULT_WATERMARK =
  "Sample only — your Esmi will use your business name and services.";

type PreviewResponse = {
  url: string;
  duration_sec: number;
  cache_key: string;
  text: string;
  watermark: string;
};

/* The waveform doubles as the progress track: a fixed, non-animated
   silhouette whose played portion fills teal. Heights are derived from a
   deterministic formula (never Math.random) so server and client render
   byte-identical markup and hydration stays quiet. */
const WAVE = Array.from({ length: 56 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 1.31) * Math.cos(i * 0.47));
  const b = Math.abs(Math.sin(i * 0.19 + 1.2));
  // Taper the very edges so the silhouette reads as a clip, not a crop.
  const edge = Math.min(1, Math.min(i, 55 - i) / 5 + 0.45);
  return Math.round((0.24 + 0.76 * (a * 0.65 + b * 0.35)) * edge * 100);
});

const SEEK_STEP_SEC = 5;

function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function PublicVoicePreview() {
  const [sampleId, setSampleId] = useState("general");
  const [language, setLanguage] = useState<Lang>("en");
  const [status, setStatus] = useState<Status>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [watermark, setWatermark] = useState(DEFAULT_WATERMARK);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);

  const sample = SAMPLES.find((s) => s.id === sampleId) ?? SAMPLES[0];
  const paramsKey = `${sampleId}:${language}`;
  // Same axis as the dashboard player: a selection change never yanks
  // audio that's already loaded/playing out from under a listener — it
  // only flags that the loaded clip no longer matches the current chips.
  const outdated = loadedKey !== null && loadedKey !== paramsKey;

  const load = async () => {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/public/voice/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample_id: sampleId, language }),
      });
      if (!res.ok) {
        let detail = `Preview failed (${res.status})`;
        try {
          const b = await res.json();
          if (typeof b?.detail === "string") detail = b.detail;
          else if (typeof b?.error === "string") detail = b.error;
        } catch {
          /* keep default */
        }
        throw new Error(detail);
      }
      const data: PreviewResponse = await res.json();
      setAudioUrl(data.url);
      setText(data.text);
      setWatermark(data.watermark || DEFAULT_WATERMARK);
      setDuration(data.duration_sec);
      setLoadedKey(paramsKey);
      setCurrentTime(0);
      setStatus("playing");
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
      setErrorMsg("Playback was blocked — try clicking play again.");
    });
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

  const isEs = language === "es";
  const ratio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  const sampleLabel = isEs ? sample.labelEs : sample.label;

  let buttonLabel: string;
  if (status === "loading") buttonLabel = isEs ? "Preparando…" : "Preparing…";
  else if (status === "playing") buttonLabel = isEs ? "Pausar" : "Pause";
  else if (status === "error") buttonLabel = isEs ? "Reintentar" : "Retry";
  else if (outdated) buttonLabel = isEs ? "Volver a escuchar" : "Re-preview";
  else if (status === "paused") buttonLabel = isEs ? "Reanudar" : "Resume";
  else buttonLabel = isEs ? "Escuchar" : "Preview";

  let statusWord: string;
  if (status === "loading") statusWord = isEs ? "Preparando" : "Preparing";
  else if (status === "playing") statusWord = isEs ? "Reproduciendo" : "Playing";
  else if (status === "paused") statusWord = isEs ? "En pausa" : "Paused";
  else if (status === "error") statusWord = isEs ? "Error" : "Error";
  else statusWord = isEs ? "Listo" : "Ready";

  return (
    <section id="voice-preview">
      <div style={{ position: "relative" }}>
        {/* ── Section head */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginTop: 14 }}>
            <SectionTitle max="22ch">
              {isEs ? "Elige un tipo de negocio, escucha a Esmi." : "Pick a business type, hear Esmi say hello."}
            </SectionTitle>
          </div>
        </div>

        {/* ── Control row: industry pills · language segmented control */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex flex-wrap gap-2" role="group" aria-label={isEs ? "Tipo de negocio" : "Business type"}>
            {SAMPLES.map((s) => {
              const active = s.id === sampleId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSampleId(s.id)}
                  aria-pressed={active}
                  className="epv-pill px-3.5 py-2.5 sm:py-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.1,
                    border: `1px solid ${active ? "var(--lg-ink-3)" : "var(--lg-hair)"}`,
                    background: active ? "rgba(46,50,62,0.06)" : "transparent",
                    color: active ? TEXT : MUTED,
                    cursor: "pointer",
                  }}
                >
                  {isEs ? s.labelEs : s.label}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label={isEs ? "Idioma" : "Language"}
            className="flex shrink-0 self-start p-0.5 sm:self-auto"
            style={{ border: "1px solid var(--lg-hair)", background: "transparent" }}
          >
            {(["en", "es"] as Lang[]).map((l) => {
              const active = language === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  aria-pressed={active}
                  className="epv-seg px-3 py-2 sm:py-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.10em",
                    lineHeight: 1.1,
                    border: "none",
                    background: active ? "rgba(46,50,62,0.07)" : "transparent",
                    color: active ? TEXT : FAINT,
                    cursor: "pointer",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Player bar */}
        <div
          role="group"
          aria-label={isEs ? "Reproductor de vista previa de voz" : "Esmi voice preview player"}
          aria-keyshortcuts="Space ArrowLeft ArrowRight"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="px-4 py-4 sm:px-5"
          style={{
            /* Ruled, not glazed: a red top rule over the field, the way
               every other block in this world is anchored. */
            borderTop: "2px solid var(--lg-rule)",
            borderBottom: "1px solid var(--lg-hair)",
            background: "transparent",
          }}
        >
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              preload="auto"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
              }}
              onEnded={() => {
                setStatus("idle");
                setCurrentTime(0);
              }}
              onError={() => {
                setStatus("error");
                setErrorMsg(isEs ? "No se pudo reproducir este clip." : "This clip couldn't be played.");
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
              className="epv-play flex size-11 shrink-0 items-center justify-center"
              style={{
                border: status === "error" ? "1px solid var(--lg-ink-3)" : "none",
                cursor: status === "loading" ? "wait" : "pointer",
                background: status === "error" ? "transparent" : FOIL,
                color: status === "error" ? "var(--lg-ink-3)" : "#FFFFFF",
              }}
            >
              {status === "loading" ? (
                <span
                  aria-hidden
                  data-esmi-motion
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 0,
                    border: "2px solid rgba(255,255,255,0.35)",
                    borderTopColor: "#FFFFFF",
                    animation: "esmi-sheen 700ms linear infinite",
                  }}
                />
              ) : status === "playing" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1.2" />
                  <rect x="14" y="5" width="4" height="14" rx="1.2" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div style={{ minWidth: 0, flex: 1 }}>
              {/* Waveform doubles as the progress track — static bars, teal fill, click to seek */}
              <div
                ref={scrubRef}
                onClick={handleScrubClick}
                role="progressbar"
                aria-label={isEs ? "Progreso" : "Playback progress"}
                aria-valuemin={0}
                aria-valuemax={Math.max(1, Math.round(duration))}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${fmtTime(currentTime)} / ${fmtTime(duration)}`}
                className="epv-scrub flex items-center gap-px"
                data-seekable={seekable}
                style={{ height: 26, cursor: seekable ? "pointer" : "default" }}
              >
                {WAVE.map((h, i) => {
                  const played = seekable && i / WAVE.length < ratio;
                  return (
                    <span
                      key={i}
                      className="epv-bar"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        height: `${h}%`,
                        borderRadius: 1,
                        background: played ? FOIL : "var(--epv-rail)",
                      }}
                    />
                  );
                })}
              </div>

              {/* Quiet meta + time */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <span
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.11em",
                    textTransform: "uppercase",
                    color: status === "error" ? "var(--lg-rule)" : FAINT,
                  }}
                >
                  {statusWord} · {sampleLabel} · {language.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: FAINT,
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}
                >
                  {fmtTime(currentTime)} / {fmtTime(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Inline notices */}
          {outdated && status !== "loading" && (
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12.5, lineHeight: 1.5, color: "var(--lg-ink-2)", margin: "12px 0 0" }}>
              {isEs
                ? "Selección cambiada — pulsa reproducir para escuchar esta versión."
                : "Selection changed — press play to hear this one."}
            </p>
          )}
          {/* Errors are drawn with a device, not with colour: DESIGN.md's Red
              Is Structure rule reserves rule red for ruling and says an error
              "must be drawn with a device, not by borrowing the rule". This is
              a margin annotation — a heavy ink rule and a mono label — which
              reads as an exception without introducing an alert hue. */}
          {status === "error" && errorMsg && (
            <div
              role="alert"
              style={{
                marginTop: 12,
                paddingLeft: "0.9rem",
                borderLeft: "2px solid var(--lg-ink)",
              }}
            >
              <span
                className="lg-fig"
                style={{
                  display: "block",
                  fontSize: "0.625rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink)",
                  marginBottom: "0.3rem",
                }}
              >
                {isEs ? "No se reprodujo" : "Did not play"}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--lg-ink-2)",
                }}
              >
                {errorMsg}
              </span>
            </div>
          )}

          {/* Footer: transcript + watermark */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--lg-hair-2)" }}>
            {text && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "var(--lg-ink-2)",
                  borderLeft: "1px solid var(--lg-rule-quiet)",
                  paddingLeft: 12,
                  margin: "0 0 12px",
                }}
              >
                &ldquo;{text}&rdquo;
              </p>
            )}
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12, lineHeight: 1.5, color: FAINT, margin: 0 }}>
              {watermark}
            </p>
          </div>
        </div>

        {/* ── CTAs

            Both are quiet. The page's foil stamp ("Book a pilot") sits in the
            offer column immediately beside this player, and foil marks the
            primary action once per view — a second gold button here would
            spend the stamp's meaning on a secondary path.

            `#demo` was a dead anchor after the ledger conversion; the chat
            section is `#chat`. /get-started is the real self-serve signup and
            is preserved as a destination. */}
        <div className="mt-7 flex flex-col gap-x-7 gap-y-3 sm:flex-row sm:items-center">
          <a
            href="#chat"
            className="lg-quiet"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              color: "var(--lg-ink)",
              textDecoration: "none",
            }}
          >
            {isEs ? "Probar el chat en vivo" : "Try the live chat"}
          </a>
          <a
            href="/get-started"
            className="lg-quiet"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              color: "var(--lg-ink-2)",
              textDecoration: "none",
            }}
          >
            {isEs ? "Empezar por tu cuenta" : "Start on your own"}
          </a>
        </div>
      </div>
    </section>
  );
}

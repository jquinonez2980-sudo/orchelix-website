"use client";

import { useEffect, useRef, useState } from "react";

/* Public, unauthenticated voice preview for try-esmi
   (docs/ESMI_DASHBOARD_UX.md Section 6 / Section 4 "player DNA").

   Deliberately NOT a reuse of app/dashboard/voice/VoicePreviewPlayer.tsx —
   that component is styled for the light dashboard theme (bg-surface,
   text-ink, Tailwind design tokens); this page runs the dark esmi-dark
   glassmorphism theme (inline styles, cyan/purple, --esmi-* vars) that
   EsmiHero/EsmiChat below already use. "Same player DNA" means the same
   interaction pattern (play/pause, progress, meta line, states,
   outdated-on-change, space-to-play) — not the literal React component,
   which has nowhere compatible to render its own styling.

   Only a fixed sample_id + language ever get sent — no free-text input
   exists anywhere in this component, matching the public preview
   endpoint's own contract (it has no `text` field to send one to). */

const CYAN = "#00F0FF";
const TEXT = "#EAF2FF";
const MUTED = "rgba(234,242,255,0.52)";
const FAINT = "rgba(234,242,255,0.38)";

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
    <section
      id="voice-preview"
      style={{
        background: "#0B1322",
        padding: "84px 0 96px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 sm:px-8 lg:px-10" style={{ position: "relative" }}>
        {/* ── Section head */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              lineHeight: 1,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: CYAN,
            }}
          >
            <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
            {isEs ? "Vista previa de voz" : "Voice preview"}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(25px, 3.6vw, 34px)",
              lineHeight: 1.18,
              letterSpacing: "-0.026em",
              color: "#fff",
              margin: "14px 0 0",
            }}
          >
            {isEs ? "Elige un tipo de negocio, escucha a Esmi." : "Pick a business type, hear Esmi say hello."}
          </h2>
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
                  className="epv-pill rounded-full px-3.5 py-2.5 sm:py-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.1,
                    border: `1px solid ${active ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.10)"}`,
                    background: active ? "rgba(255,255,255,0.09)" : "transparent",
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
            className="flex shrink-0 self-start rounded-lg p-0.5 sm:self-auto"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}
          >
            {(["en", "es"] as Lang[]).map((l) => {
              const active = language === l;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  aria-pressed={active}
                  className="epv-seg rounded-[6px] px-3 py-2 sm:py-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.10em",
                    lineHeight: 1.1,
                    border: "none",
                    background: active ? "rgba(255,255,255,0.10)" : "transparent",
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
          className="rounded-2xl px-4 py-4 sm:px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          style={{
            border: "1px solid rgba(255,255,255,0.09)",
            background: "rgba(255,255,255,0.035)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -34px rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
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
              className="epv-play flex size-11 shrink-0 items-center justify-center rounded-full"
              style={{
                border: status === "error" ? "1px solid rgba(248,113,113,0.45)" : "none",
                cursor: status === "loading" ? "wait" : "pointer",
                background: status === "error" ? "rgba(248,113,113,0.12)" : CYAN,
                color: status === "error" ? "#F87171" : "#04121A",
              }}
            >
              {status === "loading" ? (
                <span
                  aria-hidden
                  data-esmi-motion
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "2px solid rgba(4,18,26,0.28)",
                    borderTopColor: "#04121A",
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
                        background: played ? CYAN : "var(--epv-rail)",
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
                    color: status === "error" ? "rgba(248,113,113,0.75)" : FAINT,
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
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12.5, lineHeight: 1.5, color: "rgba(251,191,36,0.85)", margin: "12px 0 0" }}>
              {isEs
                ? "Selección cambiada — pulsa reproducir para escuchar esta versión."
                : "Selection changed — press play to hear this one."}
            </p>
          )}
          {status === "error" && errorMsg && (
            <p role="alert" style={{ fontFamily: "var(--font-display)", fontSize: 12.5, lineHeight: 1.5, color: "#F87171", margin: "12px 0 0" }}>
              {errorMsg}
            </p>
          )}

          {/* Footer: transcript + watermark */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {text && (
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "rgba(234,242,255,0.66)",
                  borderLeft: "1px solid rgba(255,255,255,0.14)",
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

        {/* ── CTAs */}
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center sm:gap-3">
          <a
            href="#demo"
            className="epv-cta rounded-[10px] px-6 py-3.5 text-center sm:py-3"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(234,242,255,0.85)",
              textDecoration: "none",
            }}
          >
            {isEs ? "Probar el chat en vivo" : "Try the live chat"}
          </a>
          <a
            href="/get-started"
            className="epv-cta rounded-[10px] px-6 py-3.5 text-center sm:py-3"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              background: CYAN,
              border: "1px solid transparent",
              color: "#04121A",
              textDecoration: "none",
            }}
          >
            {isEs ? "Empezar prueba gratis →" : "Start free trial →"}
          </a>
        </div>
      </div>
    </section>
  );
}

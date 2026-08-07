"use client";

import { useEffect, useRef, useState } from "react";

/* Public, unauthenticated voice preview for try-esmi
   (docs/ESMI_DASHBOARD_UX.md Section 6 / Section 4 "player DNA").

   Deliberately NOT a reuse of app/dashboard/voice/VoicePreviewPlayer.tsx —
   that component is styled for the light dashboard theme (bg-surface,
   text-ink, Tailwind design tokens); this page runs the dark esmi-dark
   glassmorphism theme (inline styles, cyan/purple, --esmi-* vars) that
   EsmiHero/EsmiChat below already use. "Same player DNA" means the same
   interaction pattern (large play button, waveform, progress, meta line,
   states, outdated-on-change, space-to-play) — not the literal React
   component, which has nowhere compatible to render its own styling.

   Only a fixed sample_id + language ever get sent — no free-text input
   exists anywhere in this component, matching the public preview
   endpoint's own contract (it has no `text` field to send one to). */

const CYAN = "#00F0FF";

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

const BAR_COUNT = 16;

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleToggle();
    }
  };

  const isEs = language === "es";
  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const animated = status === "playing";

  let buttonLabel: string;
  if (status === "loading") buttonLabel = isEs ? "Preparando…" : "Preparing…";
  else if (status === "playing") buttonLabel = isEs ? "Reproduciendo" : "Playing";
  else if (status === "error") buttonLabel = isEs ? "Reintentar" : "Retry";
  else if (outdated) buttonLabel = isEs ? "Volver a escuchar" : "Re-preview";
  else buttonLabel = isEs ? "Escuchar" : "Preview";

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
      <div className="mx-auto max-w-[880px] px-6 sm:px-8 lg:px-10" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
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
            {isEs ? "Escucha antes de contratarla" : "Hear her before you hire her"}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(26px, 4vw, 38px)",
              lineHeight: 1.15,
              letterSpacing: "-0.026em",
              color: "#fff",
              margin: "14px 0 0",
            }}
          >
            {isEs ? "Elige un tipo de negocio, escucha a Esmi." : "Pick a business type, hear Esmi say hello."}
          </h2>
        </div>

        {/* Language toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          {(["en", "es"] as Lang[]).map((l) => {
            const active = language === l;
            return (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${active ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.14)"}`,
                  background: active ? "rgba(0,240,255,0.10)" : "rgba(255,255,255,0.03)",
                  color: active ? CYAN : "rgba(234,242,255,0.55)",
                  cursor: "pointer",
                }}
              >
                {l.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Industry chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 28 }}>
          {SAMPLES.map((s) => {
            const active = s.id === sampleId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSampleId(s.id)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13.5,
                  fontWeight: 500,
                  padding: "9px 16px",
                  borderRadius: 999,
                  border: `1px solid ${active ? "rgba(0,240,255,0.5)" : "rgba(255,255,255,0.12)"}`,
                  background: active ? "rgba(0,240,255,0.10)" : "rgba(255,255,255,0.04)",
                  color: active ? "#fff" : "rgba(234,242,255,0.7)",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                }}
              >
                {isEs ? s.labelEs : s.label}
              </button>
            );
          })}
        </div>

        {/* Player */}
        <div
          role="group"
          aria-label="Esmi voice preview player"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{
            borderRadius: 20,
            border: "1px solid rgba(0,240,255,0.18)",
            background: "rgba(255,255,255,0.03)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px -24px rgba(0,0,0,0.7), 0 0 60px -20px rgba(0,240,255,0.30)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "28px 28px 24px",
            outline: "none",
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

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              type="button"
              onClick={handleToggle}
              disabled={status === "loading"}
              aria-label={buttonLabel}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: status === "loading" ? "wait" : "pointer",
                background:
                  status === "error"
                    ? "linear-gradient(135deg, #F87171 0%, #EF4444 100%)"
                    : "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)",
                boxShadow:
                  status === "error"
                    ? "0 0 28px rgba(239,68,68,0.45)"
                    : "0 0 28px rgba(0,240,255,0.45)",
                transition: "transform 150ms ease",
              }}
            >
              {status === "loading" ? (
                <span
                  aria-hidden
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "2px solid rgba(4,18,26,0.35)",
                    borderTopColor: "#04121A",
                    animation: "esmi-sheen 800ms linear infinite",
                  }}
                />
              ) : status === "playing" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#04121A" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#04121A" aria-hidden="true" style={{ marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div style={{ minWidth: 0, flex: 1 }}>
              {/* Waveform */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 30 }} aria-hidden="true">
                {Array.from({ length: BAR_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    data-esmi-motion
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                      background: i % 2 === 0 ? CYAN : "#A855F7",
                      boxShadow: "0 0 6px rgba(0,240,255,0.35)",
                      transformOrigin: "center",
                      opacity: status === "error" ? 0.25 : 0.85,
                      animation: animated
                        ? `esmi-wave 900ms ease-in-out ${(i % 8) * 90}ms infinite`
                        : status === "idle" || status === "paused"
                          ? `esmi-wave-idle 2400ms ease-in-out ${(i % 8) * 120}ms infinite`
                          : "none",
                      transform: animated || status === "idle" || status === "paused" ? undefined : "scaleY(0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 10, height: 3, width: "100%", borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 999,
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
                    transition: "width 150ms linear",
                  }}
                />
              </div>
              <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(234,242,255,0.4)" }}>
                {fmtTime(currentTime)} / {fmtTime(duration)}
              </div>
            </div>
          </div>

          <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 500, color: "#fff", margin: "16px 0 2px" }}>
            {buttonLabel} — {isEs ? sample.labelEs : sample.label}
          </p>
          {outdated && status !== "loading" && (
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12.5, color: "#FBBF24", margin: "2px 0" }}>
              {isEs
                ? "Selección cambiada — pulsa reproducir para escuchar esta versión."
                : "Selection changed — press play to hear this one."}
            </p>
          )}
          {status === "error" && errorMsg && (
            <p role="alert" style={{ fontFamily: "var(--font-display)", fontSize: 12.5, color: "#F87171", margin: "2px 0" }}>
              {errorMsg}
            </p>
          )}
          {text && (
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, lineHeight: 1.6, color: "rgba(234,242,255,0.55)", margin: "10px 0 0", fontStyle: "italic" }}>
              &ldquo;{text}&rdquo;
            </p>
          )}
        </div>

        {/* Watermark + CTAs */}
        <p style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: 12.5, color: "rgba(234,242,255,0.4)", margin: "18px 0 28px" }}>
          {watermark}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a
            href="#demo"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              padding: "13px 24px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(234,242,255,0.88)",
              textDecoration: "none",
            }}
          >
            {isEs ? "Probar el chat en vivo" : "Try the live chat"}
          </a>
          <a
            href="/get-started"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              padding: "13px 24px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)",
              color: "#04121A",
              textDecoration: "none",
              boxShadow: "0 0 22px rgba(0,240,255,0.35)",
            }}
          >
            {isEs ? "Empezar prueba gratis →" : "Start free trial →"}
          </a>
        </div>
      </div>
    </section>
  );
}

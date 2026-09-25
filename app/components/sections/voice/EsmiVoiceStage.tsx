"use client";

/* The listening stage — the one place a visitor hears Esmi's real voice.

   A dark, lit console that sits on any band: the voice orb with the play
   control at its heart, the words she is saying lighting up as she says
   them, the clip's waveform, and one tile per line of business. Picking a
   tile plays it straight away — one click to hear her, not two.

   Captions are the text the preview endpoint returns for the clip, lit in
   proportion to the playhead. They are the words of this recording, not a
   transcript of a customer call. */

import { useState } from "react";
import { Building2, House, Scale, Stethoscope, Wrench } from "lucide-react";
import VoiceWave from "@/app/components/sections/VoiceWave";
import VoiceOrb, { type OrbState } from "./VoiceOrb";
import { SAMPLES, fmtTime, useVoicePreview, type Lang } from "./useVoicePreview";

const ICONS: Record<string, typeof Building2> = {
  general: Building2,
  hvac: Wrench,
  dental: Stethoscope,
  "law-firm": Scale,
  "real-estate": House,
};

const SEEK_STEP_SEC = 5;

export default function EsmiVoiceStage({
  initialLang = "en",
  id = "hear-esmi-player",
  onLanguageChange,
}: {
  initialLang?: Lang;
  id?: string;
  onLanguageChange?: (lang: Lang) => void;
}) {
  const v = useVoicePreview(initialLang);
  const [hover, setHover] = useState(false);
  const { isEs } = v;
  const playing = v.status === "playing";
  const loading = v.status === "loading";
  const orbState: OrbState = playing ? "playing" : loading ? "loading" : hover ? "hover" : "idle";

  const setLang = (l: Lang) => {
    v.pickLanguage(l);
    onLanguageChange?.(l);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      v.toggle();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      v.seekTo(v.currentTime + SEEK_STEP_SEC);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      v.seekTo(v.currentTime - SEEK_STEP_SEC);
    }
  };

  let buttonLabel: string;
  if (v.status === "loading") buttonLabel = isEs ? "Preparando…" : "Preparing…";
  else if (v.status === "playing") buttonLabel = isEs ? "Pausar" : "Pause";
  else if (v.status === "error") buttonLabel = isEs ? "Reintentar" : "Retry";
  else if (v.status === "paused" && !v.outdated) buttonLabel = isEs ? "Reanudar" : "Resume";
  else buttonLabel = isEs ? "Escuchar a Esmi" : "Hear Esmi";

  let statusWord: string;
  if (v.status === "loading") statusWord = isEs ? "Conectando" : "Connecting";
  else if (v.status === "playing") statusWord = isEs ? "En la línea" : "On the line";
  else if (v.status === "paused") statusWord = isEs ? "En pausa" : "Paused";
  else if (v.status === "error") statusWord = isEs ? "Sin audio" : "No audio";
  else statusWord = isEs ? "Lista" : "Ready";

  const sampleLabel = isEs ? v.sample.labelEs : v.sample.label;
  const words = v.text && !v.outdated ? v.text.split(/\s+/).filter(Boolean) : [];
  /* Lead the playhead slightly so a word lights as it begins, not after. */
  const lit = Math.min(words.length, Math.ceil((v.ratio * 1.04 + 0.01) * words.length));

  return (
    <section id={id} className="evs" data-status={v.status} aria-label={isEs ? "Escucha a Esmi" : "Hear Esmi"}>
      {v.audioUrl ? <audio {...v.audioProps} className="hidden" /> : null}

      <header className="evs-top">
        <span className="evs-live" data-on={playing ? "true" : undefined}>
          <i aria-hidden="true" />
          {isEs ? "Esmi · línea en vivo" : "Esmi · live line"}
        </span>
        <div role="group" aria-label={isEs ? "Idioma" : "Language"} className="evs-seg">
          {(["en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={v.language === l}
              onClick={() => setLang(l)}
            >
              {l === "en" ? "EN" : "ES"}
            </button>
          ))}
        </div>
      </header>

      <div
        className="evs-body"
        role="group"
        tabIndex={0}
        aria-label={isEs ? "Reproductor de Esmi" : "Esmi voice player"}
        aria-keyshortcuts="Space ArrowLeft ArrowRight"
        onKeyDown={onKeyDown}
      >
        <div className="evs-orb">
          <VoiceOrb state={orbState} audioRef={v.audioRef} duration={v.duration} />
          <button
            type="button"
            className="evs-play"
            onClick={v.toggle}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            disabled={loading}
            aria-label={buttonLabel}
          >
            {loading ? (
              <span className="evs-spin" aria-hidden="true" />
            ) : playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1.2" />
                <rect x="14" y="5" width="4" height="14" rx="1.2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginLeft: 3 }}>
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              </svg>
            )}
          </button>
          {v.status === "idle" && !v.audioUrl ? (
            <span className="evs-hint" aria-hidden="true">
              {isEs ? "Toca para escuchar" : "Tap to listen"}
            </span>
          ) : null}
        </div>

        <div className="evs-caption">
          <p className="evs-meta">
            {statusWord} · {sampleLabel}
          </p>
          {v.status === "error" && v.errorMsg ? (
            <p className="evs-words evs-words--error" role="alert">
              {v.errorMsg}
            </p>
          ) : words.length ? (
            <p className="evs-words" aria-live="off">
              {words.map((w, i) => (
                <span key={i} data-lit={i < lit ? "true" : undefined}>
                  {w}{" "}
                </span>
              ))}
            </p>
          ) : (
            <p className="evs-words evs-words--prompt">
              {isEs
                ? "Elige un tipo de negocio y escucha cómo contesta Esmi en tu línea."
                : "Pick a business below and hear how Esmi would pick up your line."}
            </p>
          )}
          <p className="evs-mark">{v.watermark}</p>
        </div>
      </div>

      <div className="evs-wave">
        <VoiceWave
          vivid
          progress={v.outdated ? 0 : v.ratio}
          playing={playing}
          seekable={v.seekable}
          label={isEs ? "Progreso" : "Playback progress"}
          valueText={`${fmtTime(v.currentTime)} / ${fmtTime(v.duration)}`}
          onSeek={(r) => v.seekTo(r * v.duration)}
        />
        <div className="evs-time">
          <span>{fmtTime(v.outdated ? 0 : v.currentTime)}</span>
          <span>{fmtTime(v.outdated ? 0 : v.duration)}</span>
        </div>
      </div>

      <div className="evs-tiles" role="group" aria-label={isEs ? "Tipo de negocio" : "Business type"}>
        {SAMPLES.map((s) => {
          const Icon = ICONS[s.id] ?? Building2;
          const active = s.id === v.sampleId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              data-live={active && playing ? "true" : undefined}
              onClick={() => v.pickSample(s.id)}
            >
              <Icon aria-hidden="true" />
              <span>{isEs ? s.labelEs : s.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

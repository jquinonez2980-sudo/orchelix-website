"use client";

/* Playback state for the public Esmi voice preview — shared by every surface
   that plays a sample (the home listening stage and /try-esmi).

   Only a fixed sample_id + language are ever sent: the public preview
   endpoint has no free-text field, and nothing here offers one. */

import { useCallback, useEffect, useRef, useState } from "react";

export type Lang = "en" | "es";
export type Status = "idle" | "loading" | "playing" | "paused" | "error";

export type Sample = { id: string; label: string; labelEs: string };

/* Mirrors platform_api/public_voice_samples.py's PUBLIC_SAMPLES keys —
   labels only; the spoken words are resolved server-side. */
export const SAMPLES: Sample[] = [
  { id: "general", label: "General business", labelEs: "Negocio general" },
  { id: "hvac", label: "HVAC & home services", labelEs: "Climatización y hogar" },
  { id: "dental", label: "Dental & medical", labelEs: "Dental y médico" },
  { id: "law-firm", label: "Law firms", labelEs: "Bufetes legales" },
  { id: "real-estate", label: "Real estate", labelEs: "Bienes raíces" },
];

export const DEFAULT_WATERMARK =
  "Sample only — your Esmi will use your business name and services.";
export const DEFAULT_WATERMARK_ES =
  "Solo una muestra — tu Esmi usará el nombre y los servicios de tu negocio.";

type PreviewResponse = {
  url: string;
  duration_sec: number;
  cache_key: string;
  text: string;
  watermark: string;
};

export function useVoicePreview(initialLang: Lang = "en") {
  const [sampleId, setSampleId] = useState("general");
  const [language, setLanguage] = useState<Lang>(initialLang);
  const [status, setStatus] = useState<Status>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [watermark, setWatermark] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestRef = useRef(0);

  const isEs = language === "es";
  const paramsKey = `${sampleId}:${language}`;
  const outdated = loadedKey !== null && loadedKey !== paramsKey;

  const load = useCallback(
    async (id: string, lang: Lang) => {
      const req = ++requestRef.current;
      audioRef.current?.pause();
      setStatus("loading");
      setErrorMsg(null);
      try {
        const res = await fetch("/api/public/voice/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sample_id: id, language: lang }),
        });
        if (!res.ok) {
          let detail = lang === "es" ? `La vista previa falló (${res.status})` : `Preview failed (${res.status})`;
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
        if (req !== requestRef.current) return; // a newer pick won
        setAudioUrl(data.url);
        setText(data.text);
        setWatermark(data.watermark || null);
        setDuration(data.duration_sec);
        setLoadedKey(`${id}:${lang}`);
        setCurrentTime(0);
        setStatus("playing");
        try {
          window.dispatchEvent(new Event("esmi:hear_play"));
        } catch {
          /* ignore */
        }
      } catch (e) {
        if (req !== requestRef.current) return;
        setStatus("error");
        setErrorMsg(
          e instanceof Error
            ? e.message
            : lang === "es"
              ? "La vista previa falló — inténtalo de nuevo."
              : "Preview failed — try again.",
        );
      }
    },
    [],
  );

  /* Start (or resume) the element whenever we enter `playing`. */
  useEffect(() => {
    if (status !== "playing") return;
    const el = audioRef.current;
    if (!el) return;
    el.play().catch(() => {
      setStatus("error");
      setErrorMsg(
        isEs
          ? "El navegador bloqueó la reproducción — pulsa reproducir otra vez."
          : "Playback was blocked — try clicking play again.",
      );
    });
  }, [status, audioUrl, isEs]);

  const toggle = useCallback(() => {
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
    if (status === "idle" && audioUrl && !outdated && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setStatus("playing");
      return;
    }
    load(sampleId, language);
  }, [status, outdated, audioUrl, load, sampleId, language]);

  /* Picking a business type is itself the request to hear it: one click,
     not a pick and then a play. */
  const pickSample = useCallback(
    (id: string) => {
      setSampleId(id);
      load(id, language);
    },
    [load, language],
  );

  /* Switching language re-plays only if something was already audible. */
  const pickLanguage = useCallback(
    (lang: Lang) => {
      setLanguage(lang);
      if (status === "playing" || status === "paused" || status === "loading") load(sampleId, lang);
    },
    [load, sampleId, status],
  );

  const seekable = Boolean(audioUrl) && duration > 0 && !outdated;
  const seekTo = useCallback(
    (sec: number) => {
      const el = audioRef.current;
      if (!el || !seekable) return;
      const next = Math.max(0, Math.min(duration, sec));
      el.currentTime = next;
      setCurrentTime(next);
    },
    [seekable, duration],
  );

  const audioProps = {
    ref: audioRef,
    src: audioUrl ?? undefined,
    preload: "auto" as const,
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => setCurrentTime(e.currentTarget.currentTime),
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration);
    },
    onEnded: () => {
      setStatus("idle");
      setCurrentTime(duration);
    },
    onError: () => {
      setStatus("error");
      setErrorMsg(isEs ? "No se pudo reproducir este clip." : "This clip couldn't be played.");
    },
  };

  const sample = SAMPLES.find((s) => s.id === sampleId) ?? SAMPLES[0];
  const ratio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  return {
    sample,
    sampleId,
    language,
    isEs,
    status,
    text,
    watermark: watermark ?? (isEs ? DEFAULT_WATERMARK_ES : DEFAULT_WATERMARK),
    duration,
    currentTime,
    ratio,
    errorMsg,
    outdated,
    seekable,
    audioUrl,
    audioRef,
    audioProps,
    toggle,
    pickSample,
    pickLanguage,
    seekTo,
  };
}

export function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

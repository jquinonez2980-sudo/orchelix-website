"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VoiceStudio from "./VoiceStudio";
import { useDashI18n } from "../i18n";

function VoicePageInner() {
  const { t, locale } = useDashI18n();
  const searchParams = useSearchParams();
  const onboarded = searchParams.get("onboarded") === "1";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-4">
          {locale === "es" ? "Estudio de voz" : "Voice Studio"}
        </span>
        <h1 className="mt-1.5 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          {t.pages.voiceTitle}
        </h1>
        <p className="mt-1 text-sm text-ink-2">{t.pages.voiceLede}</p>
      </div>
      {onboarded && (
        <div
          className="mb-5 border border-line bg-surface-2 px-4 py-3 text-sm text-ink"
          style={{ borderLeft: "2px solid var(--lg-foil)" }}
        >
          {locale === "es"
            ? "Ya escuchaste cómo suena Esmi. Sigue ajustando aquí cuando quieras antes de salir al aire."
            : "You've heard how Esmi sounds — keep tweaking here anytime before you go live."}
        </div>
      )}
      <VoiceStudio />
    </main>
  );
}

export default function VoicePage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-5xl px-4 py-8 sm:px-6" />}>
      <VoicePageInner />
    </Suspense>
  );
}

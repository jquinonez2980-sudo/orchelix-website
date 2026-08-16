"use client";

import { useSearchParams } from "next/navigation";
import PageTitle, { PageLede } from "../PageTitle";
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
        {/* The "Voice Studio" eyebrow is gone — DESIGN.md forbids a kicker
            above a heading, and it was restating the page title in mono at
            10px directly above the page title. */}
        <PageTitle>{t.pages.voiceTitle}</PageTitle>
        <PageLede>{t.pages.voiceLede}</PageLede>
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

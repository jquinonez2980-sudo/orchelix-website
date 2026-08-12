"use client";

/* Compact real-call player for the home hero — proof in the first viewport
   without inventing testimonials. PublicVoicePreview hits the live public
   sample endpoint; this is only a layout wrapper. */

import PublicVoicePreview from "@/app/(site)/try-esmi/PublicVoicePreview";
import type { Locale } from "@/app/i18n/config";

export default function HeroProof({ locale = "en" }: { locale?: Locale }) {
  return (
    <div
      id="hear-esmi"
      className="mt-10 max-w-[34rem]"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      <PublicVoicePreview compact initialLang={locale} id="hear-esmi-player" />
      <p
        className="mt-3"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8125rem",
          lineHeight: 1.5,
          color: "var(--lg-ink-3)",
          margin: "0.75rem 0 0",
        }}
      >
        {locale === "es" ? (
          <>
            Muestra del agente en producción.{" "}
            <a href="/try-esmi?lang=es" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
              Escucha más y chatea con Esmi →
            </a>
          </>
        ) : (
          <>
            Sample from the production agent.{" "}
            <a href="/try-esmi" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
              Hear more and chat with Esmi →
            </a>
          </>
        )}
      </p>
    </div>
  );
}

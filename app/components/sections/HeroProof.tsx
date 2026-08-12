"use client";

/* Compact real-call player + ruled sample transcript for the home hero.
   Transcript is a labeled sample (not a live tenant call) — demonstrates the
   artifact shape without inventing client proof.

   Language follows the player's EN/ES chips, not only the page locale, so
   pressing Spanish updates both the clip and the transcript lines. */

import PublicVoicePreview from "@/app/(site)/try-esmi/PublicVoicePreview";
import type { Locale } from "@/app/i18n/config";
import { track } from "@/app/lib/analytics";
import { useEffect, useState } from "react";

type SampleLang = "en" | "es";

/* Transcript mirrors a real flow: Esmi matches the language the caller used.
   Do not offer "English or Spanish" after they already spoke one language. */
const SAMPLE_LINES_EN = [
  { who: "Caller", text: "Hi — do you have anything tomorrow morning for a kitchen template?" },
  { who: "Esmi", text: "I can check that for you. What time works best?" },
  { who: "Caller", text: "Around nine if you have it." },
  { who: "Esmi", text: "Thursday at 9:00 is open. I'll book that and send a confirmation." },
] as const;

const SAMPLE_LINES_ES = [
  { who: "Llamante", text: "Hola — ¿tienen algo mañana en la mañana para plantilla de cocina?" },
  { who: "Esmi", text: "Claro, lo reviso. ¿Qué horario le conviene?" },
  { who: "Llamante", text: "Como a las nueve, si hay." },
  { who: "Esmi", text: "Jueves a las 9:00 está libre. Lo agendo y le mando confirmación." },
] as const;

export default function HeroProof({ locale = "en" }: { locale?: Locale }) {
  /* Player chips own the sample language; start from the page locale. */
  const [sampleLang, setSampleLang] = useState<SampleLang>(
    locale === "es" ? "es" : "en",
  );
  const isEs = sampleLang === "es";
  const lines = isEs ? SAMPLE_LINES_ES : SAMPLE_LINES_EN;

  useEffect(() => {
    const onPlay = () => track("hear_play", { surface: "hero" });
    window.addEventListener("esmi:hear_play", onPlay);
    return () => window.removeEventListener("esmi:hear_play", onPlay);
  }, []);

  return (
    <div
      id="hear-esmi"
      className="mt-10 max-w-[34rem]"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      <PublicVoicePreview
        compact
        initialLang={locale === "es" ? "es" : "en"}
        id="hear-esmi-player"
        onLanguageChange={setSampleLang}
      />

      {/* Ruled sample transcript — switches with the player EN/ES chips */}
      <figure
        className="mt-6 m-0"
        style={{
          borderTop: "2px solid var(--lg-rule)",
          paddingTop: "0.85rem",
        }}
        aria-live="polite"
      >
        <figcaption
          className="lg-fig flex flex-wrap items-baseline justify-between gap-2"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--lg-ink-3)",
            marginBottom: "0.75rem",
          }}
        >
          <span>
            {isEs ? "Transcripción de muestra" : "Sample transcript"}
            <span style={{ color: "var(--lg-ink-3)", marginLeft: "0.5rem", opacity: 0.85 }}>
              · {sampleLang.toUpperCase()}
            </span>
          </span>
          <span style={{ color: "var(--lg-foil)" }}>
            {isEs ? "AGENDADO" : "BOOKED"}
          </span>
        </figcaption>
        <ul className="m-0 list-none space-y-2.5 p-0">
          {lines.map((line, i) => (
            <li
              key={`${sampleLang}-${i}`}
              style={{
                borderBottom: "1px solid var(--lg-hair-2)",
                paddingBottom: "0.55rem",
              }}
            >
              <span
                className="lg-fig"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:
                    line.who === "Esmi" ? "var(--lg-foil)" : "var(--lg-ink-3)",
                }}
              >
                {line.who}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--lg-ink)",
                  margin: "0.2rem 0 0",
                }}
              >
                {line.text}
              </p>
            </li>
          ))}
        </ul>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--lg-ink-3)",
            margin: "0.75rem 0 0",
          }}
        >
          {isEs
            ? "Muestra ilustrativa de la forma del registro — no una llamada de un cliente público."
            : "Illustrative sample of the record shape — not a public client call."}
        </p>
      </figure>

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
        {/* Page chrome follows site locale; transcript above follows the chips. */}
        {locale === "es" ? (
          <>
            Audio del agente en producción.{" "}
            <a href="/try-esmi?lang=es" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
              Escucha más y chatea con Esmi →
            </a>
          </>
        ) : (
          <>
            Production agent audio.{" "}
            <a href="/try-esmi" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
              Hear more and chat with Esmi →
            </a>
          </>
        )}
      </p>
    </div>
  );
}

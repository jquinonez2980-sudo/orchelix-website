"use client";

/* The home listening stage: Esmi's real voice on the left, the sample
   booking conversation playing out on the right.

   The conversation follows the stage's EN/ES, not only the page locale, so
   pressing Spanish updates both the clip and the conversation. */

import EsmiVoiceStage from "@/app/components/sections/voice/EsmiVoiceStage";
import CallThread from "@/app/components/sections/voice/CallThread";
import type { Locale } from "@/app/i18n/config";
import { track } from "@/app/lib/analytics";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroProof({ locale = "en" }: { locale?: Locale }) {
  const [lang, setLang] = useState<"en" | "es">(locale === "es" ? "es" : "en");

  useEffect(() => {
    const onPlay = () => track("hear_play", { surface: "hero" });
    window.addEventListener("esmi:hear_play", onPlay);
    return () => window.removeEventListener("esmi:hear_play", onPlay);
  }, []);

  return (
    <div style={{ scrollMarginTop: "5.5rem" }}>
      <div className="evs-duo">
        <EsmiVoiceStage initialLang={lang} onLanguageChange={setLang} />
        <CallThread lang={lang} />
      </div>
      <p className="evs-more">
        {locale === "es" ? (
          <>
            Audio del agente en producción.{" "}
            <Link href="/try-esmi?lang=es" className="lg-quiet">
              Escucha más y chatea con Esmi →
            </Link>
          </>
        ) : (
          <>
            Production agent audio.{" "}
            <Link href="/try-esmi" className="lg-quiet">
              Hear more and chat with Esmi →
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

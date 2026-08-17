"use client";

import { useSyncExternalStore } from "react";
import {
  getInscriptionSnapshot,
  setMode,
  subscribeInscription,
} from "@/app/inscription/store";
import type { Locale } from "@/app/i18n/config";

/* The conditions of record: which language the page is in, and which light
   it is being read under.

   These two belong together. The hero's meta strip already states the other
   conditions — place, time, languages carried — and lighting is the same
   class of fact, so it is drawn the same way: ruled segments, no fill, no
   radius, no float. The previous treatment was a fixed blurred pill parked
   over the bottom-right of the record, which is a card by any other name and
   the one element on the page the No Float Rule did not survive.

   Selection reads as ink weight rather than as a filled pill, because that is
   how every other state in this system reads. The only transition is colour
   at `--lg-dur-state`, so no new motion verb enters the vocabulary.

   Lighting is homepage-only — it drives the Inscription scene, which no other
   route mounts — so Nav renders this cluster only there. `store` is a
   dependency-free module (no `three`, no React), so importing it here costs
   the shared nav bundle nothing measurable. */

export type ConditionsCopy = {
  language: string;
  lighting: string;
  day: string;
  night: string;
  switchLabel: string;
};

export default function ConditionsControl({
  locale,
  other,
  switchHref,
  copy,
  onNavigate,
}: {
  locale: Locale;
  other: Locale;
  switchHref: string;
  copy: ConditionsCopy;
  onNavigate?: () => void;
}) {
  /* Server snapshot is "light" to match InscriptionRoot's own default, so the
     first paint agrees with the wrapper's `data-theme` and nothing flips
     during hydration. */
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "light" as const,
  );

  return (
    <div className="lg-conditions">
      <div className="lg-seg" role="group" aria-label={copy.language}>
        {/* The current locale is a state, not a destination — it must not be a
            link to the page you are already on. */}
        <span className="lg-seg__item" data-on="true" aria-current="true">
          {locale.toUpperCase()}
        </span>
        <a
          className="lg-seg__item"
          href={switchHref}
          onClick={onNavigate}
          lang={other}
          hrefLang={other}
          aria-label={copy.switchLabel}
        >
          {other.toUpperCase()}
        </a>
      </div>

      <div className="lg-seg" role="group" aria-label={copy.lighting}>
        <button
          type="button"
          className="lg-seg__item"
          data-on={mode === "light" ? "true" : undefined}
          aria-pressed={mode === "light"}
          onClick={() => setMode("light")}
        >
          {copy.day}
        </button>
        <button
          type="button"
          className="lg-seg__item"
          data-on={mode === "dark" ? "true" : undefined}
          aria-pressed={mode === "dark"}
          onClick={() => setMode("dark")}
        >
          {copy.night}
        </button>
      </div>
    </div>
  );
}

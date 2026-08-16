"use client";

import { useEffect, type ReactNode } from "react";
import { useSyncExternalStore } from "react";
import "./inscription.css";
import CanvasRoot from "./CanvasRoot";
import { applyQuality, detectQuality } from "./QualityGovernor";
import {
  getInscriptionSnapshot,
  setInscription,
  setMode,
  subscribeInscription,
} from "./store";
import { readStoredMode } from "./theme";
import { applyModeNow } from "./relight";

const CONTRACT = `<!--
THESIS: The night is written into optical glass. Refuses the AI orb, the DNA helix, and the category hero of three identical cards.
OWN-WORLD: The Inscription — a ruled glass ledger in a real room. Daylight studio and 02:18 desk are the same object under two lights. Archivo / Literata / Azeret. Magenta stamp withheld until the die exists.
STORY: An operator watches last night's calls become a record, hears Esmi, and books a pilot.
FIRST VIEWPORT: Pinned glass volume behind existing homepage chapters. Native scroll. Day/Night toggle. Existing copy and proof untouched.
FORM: The Inscription — homepage only, seed key inscription-2026.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function InscriptionRoot({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "light" as const,
  );
  const backend = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().backend,
    () => "none" as const,
  );
  const tier = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().quality.tier,
    () => "high" as const,
  );

  useEffect(() => {
    applyQuality(detectQuality());
    const initial = readStoredMode();
    applyModeNow(initial);
    setMode(initial);
    setInscription("hidden", document.hidden);
  }, []);

  return (
    <div
      data-inscription=""
      data-theme={mode}
      data-backend={backend}
      data-tier={tier}
    >
      <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: CONTRACT }} />
      <CanvasRoot />
      <div className="ins-content">{children}</div>
    </div>
  );
}

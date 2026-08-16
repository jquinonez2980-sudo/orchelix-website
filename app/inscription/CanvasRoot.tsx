"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { getInscriptionSnapshot, subscribeInscription } from "./store";
import { NIGHT_ENTRIES } from "./data/nightRegister";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

function InscriptionPoster() {
  return (
    <div className="ins-stage" aria-hidden="true" data-poster="">
      <div className="ins-poster">
        <div className="ins-poster__slab">
          <div className="ins-poster__page">
            {NIGHT_ENTRIES.slice(0, 8).map((row) => (
              <div
                key={row.time}
                className="ins-poster__row"
                data-booked={row.disposition === "BOOKED" ? "" : undefined}
              >
                <span>{row.time}</span>
                <span>{row.lang}</span>
                <span>{row.reason}</span>
                <span>{row.disposition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CanvasRoot() {
  const tier = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().quality.tier,
    () => getInscriptionSnapshot().quality.tier,
  );
  const ready = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().ready,
    () => false,
  );

  if (tier === "off") {
    return <InscriptionPoster />;
  }

  return (
    <div className="ins-stage" aria-hidden="true" data-ready={ready ? "true" : undefined}>
      <SceneCanvas />
    </div>
  );
}

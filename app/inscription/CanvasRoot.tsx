"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { NIGHT_ENTRIES } from "./data/nightRegister";
import { scheduleSceneLoad } from "./scheduler";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { getInscriptionSnapshot, subscribeInscription } from "./store";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

function InscriptionPoster() {
  return (
    <div className="ins-poster" data-poster="">
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
  );
}

export default function CanvasRoot() {
  const [load, setLoad] = useState(false);
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

  useEffect(() => {
    if (tier === "off") return;
    return scheduleSceneLoad(() => setLoad(true));
  }, [tier]);

  /* Poster is the LCP stand-in: reserved aspect, paints with CSS, no Three.
     The canvas hydrates on top after idle / first gesture. */
  return (
    <div
      className="ins-stage"
      aria-hidden="true"
      data-ready={ready ? "true" : undefined}
      data-poster={tier === "off" || !ready ? "" : undefined}
    >
      <InscriptionPoster />
      {load && tier !== "off" ? (
        <SceneErrorBoundary>
          <SceneCanvas />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}

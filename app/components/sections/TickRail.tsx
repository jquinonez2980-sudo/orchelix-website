"use client";

import { useEffect, useState } from "react";

type Tick = { id: string; label: string };

export default function TickRail({ ticks }: { ticks: Tick[] }) {
  const [active, setActive] = useState(ticks[0]?.id ?? "");

  useEffect(() => {
    const els = ticks
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const seen = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.intersectionRatio);
        }
        let best = ticks[0]?.id ?? "";
        let bestRatio = -1;
        for (const t of ticks) {
          const r = seen.get(t.id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = t.id;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.8] },
    );

    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, [ticks]);

  return (
    <nav className="lg-tick-rail" aria-label="On this page">
      {ticks.map((t) => {
        const current = t.id === active;
        return (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="lg-tick-rail__item"
            data-active={current ? "true" : undefined}
            aria-current={current ? "true" : undefined}
            aria-label={t.label}
          >
            <span className="lg-tick-rail__mark" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}

"use client";

/* The /how-it-works opening visual: the fourteen days as a dial.

   Fourteen segments, one per day, coloured by the phase they belong to. When
   the dial scrolls into view the days light one by one while the centre
   counts them and names the phase; on day fourteen it turns over to LIVE,
   rings out, holds, and starts again. Below it, the four phases, with the
   current one lit.

   Phase names and day ranges come from the page's own schedule copy, so the
   dial can never disagree with the schedule underneath it.

   Reduced motion: the finished dial, LIVE, still. */

import { useEffect, useRef, useState } from "react";

type Phase = { when: string; title: string };

const DAYS = 14;
/* Which phase each day belongs to — the schedule's own ranges (1–3, 4–7,
   8–11, 12–14). */
const PHASE_OF_DAY = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
const STEP_MS = 520;
const HOLD_MS = 3200;

const C = 160;
const R = 118;
const GAP = 2.6; // degrees between segments

function arc(i: number) {
  const span = 360 / DAYS;
  const a0 = ((i * span + GAP / 2 - 90) * Math.PI) / 180;
  const a1 = (((i + 1) * span - GAP / 2 - 90) * Math.PI) / 180;
  const p = (a: number) => `${(C + Math.cos(a) * R).toFixed(2)} ${(C + Math.sin(a) * R).toFixed(2)}`;
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`;
}

export default function FourteenDays({
  phases,
  labels,
}: {
  phases: Phase[];
  labels: { day: string; live: string; aria: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  /* 0 = nothing lit yet, 1..14 = days lit, 15 = live. */
  const [day, setDay] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) {
          if (e.isIntersecting) setDay(DAYS + 1);
          return;
        }
        setRunning(e.isIntersecting);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setDay((d) => (d > DAYS ? 0 : d + 1)),
      day > DAYS ? HOLD_MS : day === 0 ? 700 : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [running, day]);

  const live = day > DAYS;
  const shown = Math.min(day, DAYS);
  const phase = live ? 3 : shown > 0 ? PHASE_OF_DAY[shown - 1] : 0;

  return (
    <div ref={ref} className="lg-console fdx" data-live={live ? "true" : undefined} role="img" aria-label={labels.aria}>
      <div className="fdx-dial">
        <svg viewBox="0 0 320 320" aria-hidden="true">
          <defs>
            <linearGradient id="fdx-g0" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1e40af" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="fdx-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2563eb" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="fdx-g2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="fdx-g3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a5f3fc" />
            </linearGradient>
            <radialGradient id="fdx-core">
              <stop offset="0" stopColor="rgba(34,211,238,0.35)" />
              <stop offset="1" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
          </defs>
          <circle cx={C} cy={C} r={R - 22} className="fdx-core" fill="url(#fdx-core)" />
          <circle cx={C} cy={C} r={R + 16} className="fdx-halo" />
          {Array.from({ length: DAYS }, (_, i) => (
            <path
              key={i}
              d={arc(i)}
              className="fdx-seg"
              data-on={i < shown ? "true" : undefined}
              data-now={i === shown - 1 && !live ? "true" : undefined}
              style={i < shown ? { stroke: `url(#fdx-g${PHASE_OF_DAY[i]})` } : undefined}
            />
          ))}
          {live ? (
            <>
              <circle cx={C} cy={C} r={R} className="fdx-ripple" />
              <circle cx={C} cy={C} r={R} className="fdx-ripple fdx-ripple--2" />
            </>
          ) : null}
        </svg>
        <div className="fdx-center">
          {live ? (
            <span className="fdx-live">{labels.live}</span>
          ) : (
            <>
              <span className="fdx-daylabel">{labels.day}</span>
              <span className="fdx-num">{String(Math.max(1, shown)).padStart(2, "0")}</span>
              <span className="fdx-of">/ 14</span>
            </>
          )}
          <span className="fdx-phase">{phases[phase]?.title}</span>
        </div>
      </div>
      <ol className="fdx-legend">
        {phases.map((p, i) => (
          <li key={p.title} data-on={i === phase && day > 0 ? "true" : undefined} data-done={i < phase || live ? "true" : undefined}>
            <span className="fdx-legend__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="fdx-legend__t">{p.title}</span>
            <span className="fdx-legend__w">{p.when}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

/* The /pricing opening visual: the three plans as lit glass columns.

   Each column's height is its included minutes, so the picture is the rate
   schedule's capacity row drawn to scale. The columns rise when the console
   scrolls into view, lean toward the pointer, and the lit plan cycles on its
   own until a visitor picks one — then it stays on their pick. The caption
   reads the chosen plan's price, minutes and setup.

   Every number comes from PLANS in the pricing page, the same array the rate
   schedule table renders, so the two cannot disagree.

   Reduced motion: risen columns, no cycling, no lean. */

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type PlanFacts = {
  name: string;
  monthly: string;
  setup: string;
  minutes: string;
  minutesValue: number;
};

const CYCLE_MS = 2800;

export default function PlanConsole({
  plans,
  labels,
}: {
  plans: PlanFacts[];
  labels: { perMonth: string; minutes: string; setup: string; aria: string; pick: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  const [risen, setRisen] = useState(false);
  const [running, setRunning] = useState(false);
  const [picked, setPicked] = useState(false);
  const max = Math.max(...plans.map((p) => p.minutesValue));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setRisen(true);
        if (!reduce) setRunning(e.isIntersecting);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || picked) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % plans.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [running, picked, plans.length]);

  /* Lean toward the pointer. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      stage.style.setProperty("--pc-lean-x", `${(-cur.y * 6).toFixed(2)}deg`);
      stage.style.setProperty("--pc-lean-y", `${(cur.x * 12).toFixed(2)}deg`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      target.x = clamp(((e.clientX - box.left) / box.width - 0.5) * 2);
      target.y = clamp(((e.clientY - box.top) / box.height - 0.5) * 2);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const p = plans[active];

  return (
    <div ref={ref} className="lg-console pcx" data-risen={risen ? "true" : undefined}>
      <div className="pcx-stage" ref={stageRef} aria-hidden="true">
        <div className="pcx-floor" />
        <div className="pcx-lean">
          <div className="pcx-world">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className="pcx-col"
                data-on={i === active ? "true" : undefined}
                style={
                  {
                    "--i": i,
                    "--x": i - (plans.length - 1) / 2,
                    "--h": (0.18 + 0.82 * (plan.minutesValue / max)).toFixed(3),
                  } as CSSProperties
                }
              >
                <div className="pcx-rise">
                  <span className="pcx-f pcx-f--front" />
                  <span className="pcx-f pcx-f--back" />
                  <span className="pcx-f pcx-f--left" />
                  <span className="pcx-f pcx-f--right" />
                  <span className="pcx-f pcx-f--top" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pcx-tabs" role="group" aria-label={labels.pick}>
        {plans.map((plan, i) => (
          <button
            key={plan.name}
            type="button"
            aria-pressed={i === active}
            onClick={() => {
              setActive(i);
              setPicked(true);
            }}
          >
            <span className="pcx-tabs__name">{plan.name}</span>
            <span className="pcx-tabs__price">{plan.monthly}</span>
          </button>
        ))}
      </div>

      <div className="pcx-caption" key={active} aria-live="polite">
        <p className="pcx-price">
          <span className="pcx-price__n">{p.monthly}</span>
          <span className="pcx-price__per">{labels.perMonth}</span>
        </p>
        <p className="pcx-facts">
          <span>
            <b>{p.minutes}</b> {labels.minutes}
          </span>
          <span>
            {labels.setup} <b>{p.setup}</b>
          </span>
        </p>
      </div>
      <p className="sr-only">{labels.aria}</p>
    </div>
  );
}

"use client";

/* The /industries opening visual: one Esmi, four kinds of business.

   Four industry badges sit at the corners of a dark console, each wired to a
   glowing core in the middle. In turn, a call leaves one industry, runs down
   its wire into the core, and the core answers — the badge lights, the wire
   glows, and the caption below names the sector, its line, and the trades
   it covers, one after another.

   Names, lines and trades come from the page's own sector copy, so the
   visual and the index beneath it always agree.

   Reduced motion: the first sector, lit, still. */

import { useEffect, useRef, useState } from "react";
import { BriefcaseMedical, Factory, Gem, HardHat } from "lucide-react";

type Sector = { id: string; name: string; line: string; trades: [string, string][] };

const ICONS = [Gem, HardHat, Factory, BriefcaseMedical];
/* Corners of the 320 × 240 board, and the wire from each into the core. */
const NODES = [
  { x: 52, y: 46 },
  { x: 268, y: 46 },
  { x: 52, y: 194 },
  { x: 268, y: 194 },
];
const CORE = { x: 160, y: 120 };
const wire = (n: { x: number; y: number }) =>
  `M ${n.x} ${n.y} C ${(n.x + CORE.x) / 2} ${n.y}, ${(n.x + CORE.x) / 2} ${CORE.y}, ${CORE.x} ${CORE.y}`;

const TURN_MS = 3200;
const TRADE_MS = 1400;

export default function IndustrySwitchboard({ sectors, aria }: { sectors: Sector[]; aria: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [trade, setTrade] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % sectors.length);
      setTrade(0);
    }, TURN_MS);
    return () => window.clearInterval(id);
  }, [running, sectors.length]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTrade((t) => t + 1), TRADE_MS);
    return () => window.clearInterval(id);
  }, [running, active]);

  const s = sectors[active];
  const tr = s?.trades.length ? s.trades[trade % s.trades.length] : null;

  return (
    <div ref={ref} className="lg-console isb" role="img" aria-label={aria}>
      <div className="isb-board">
        <svg viewBox="0 0 320 240" aria-hidden="true">
          <defs>
            <linearGradient id="isb-wire" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {NODES.map((n, i) => (
            <g key={i} data-on={i === active ? "true" : undefined} className="isb-wire">
              <path d={wire(n)} className="isb-wire__base" />
              <path d={wire(n)} className="isb-wire__lit" pathLength={1} />
              {i === active ? (
                <path key={`p-${active}`} d={wire(n)} className="isb-wire__pulse" pathLength={1} />
              ) : null}
            </g>
          ))}
        </svg>
        <div className="isb-core" key={`core-${active}`}>
          <span className="isb-core__ring" />
          <span className="isb-core__orb" />
        </div>
        {NODES.map((n, i) => {
          const Icon = ICONS[i] ?? Gem;
          return (
            <span
              key={i}
              className="isb-node"
              data-on={i === active ? "true" : undefined}
              style={{ left: `${(n.x / 320) * 100}%`, top: `${(n.y / 240) * 100}%` }}
            >
              <Icon aria-hidden="true" />
            </span>
          );
        })}
      </div>
      {s ? (
        <div className="isb-caption" key={`cap-${active}`}>
          <p className="isb-caption__name">{s.name}</p>
          <p className="isb-caption__line">{s.line}</p>
          {tr ? (
            <p className="isb-caption__trade" key={`t-${active}-${trade}`}>
              <span>{tr[0]}</span> {tr[1]}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="isb-dots" aria-hidden="true">
        {sectors.map((x, i) => (
          <i key={x.id} data-on={i === active ? "true" : undefined} />
        ))}
      </div>
    </div>
  );
}

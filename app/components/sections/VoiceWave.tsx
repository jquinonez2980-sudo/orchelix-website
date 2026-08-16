"use client";

import { useId } from "react";

/* Recorded-clip silhouette — Voice Memo / WAV view. Dense mirrored
   spikes with talk bursts and rests. Progress clips the same drawing.
   The recording does not bounce; a played recording holds still. */

const W = 1000;
const H = 80;
const N = 168;
const MID = H / 2;

function grain(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const PHRASES: [number, number][] = [
  [0.03, 0.2],
  [0.24, 0.47],
  [0.52, 0.61],
  [0.66, 0.94],
];

const AMPS = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  let gate = 0;
  for (const [a, b] of PHRASES) {
    if (t >= a && t <= b) {
      const u = (t - a) / (b - a);
      gate = Math.sin(Math.PI * Math.min(1, Math.max(0, u)));
      break;
    }
  }
  if (gate < 0.04) return 0.045 + grain(i) * 0.04;
  const spike = 0.22 + grain(i) * 0.78;
  const formant = 0.5 + 0.5 * Math.abs(Math.sin(i * 0.61 + grain(i + 3)));
  return Math.min(1, gate * spike * formant);
});

const STEP = W / N;

export default function VoiceWave({
  progress,
  playing,
  seekable,
  label,
  valueText,
  onSeek,
}: {
  progress: number;
  playing: boolean;
  seekable: boolean;
  label: string;
  valueText: string;
  onSeek: (ratio: number) => void;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `lg-wave-clip-${uid}`;
  const played = Math.max(0, Math.min(1, progress));
  const headX = played * W;

  return (
    <div
      className="lg-wave"
      data-playing={playing ? "true" : undefined}
      data-seekable={seekable ? "true" : undefined}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(played * 100)}
      aria-valuetext={valueText}
      tabIndex={seekable ? 0 : -1}
      onClick={(e) => {
        if (!seekable) return;
        const rect = e.currentTarget.getBoundingClientRect();
        if (rect.width <= 0) return;
        onSeek((e.clientX - rect.left) / rect.width);
      }}
      onKeyDown={(e) => {
        if (!seekable) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onSeek(Math.min(1, played + 0.05));
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onSeek(Math.max(0, played - 0.05));
        }
      }}
    >
      <svg className="lg-wave__svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={Math.max(0, headX)} height={H} />
          </clipPath>
        </defs>
        <g className="lg-wave__rest">
          {AMPS.map((amp, i) => {
            const x = (i + 0.5) * STEP;
            const h = Math.max(2.2, amp * (H - 6));
            return <line key={i} x1={x} x2={x} y1={MID - h / 2} y2={MID + h / 2} />;
          })}
        </g>
        <g className="lg-wave__played" clipPath={`url(#${clipId})`}>
          {AMPS.map((amp, i) => {
            const x = (i + 0.5) * STEP;
            const h = Math.max(2.2, amp * (H - 6));
            return <line key={i} x1={x} x2={x} y1={MID - h / 2} y2={MID + h / 2} />;
          })}
        </g>
        {played > 0 && played < 1 ? (
          <line className="lg-wave__head" x1={headX} x2={headX} y1="2" y2={H - 2} />
        ) : null}
      </svg>
    </div>
  );
}

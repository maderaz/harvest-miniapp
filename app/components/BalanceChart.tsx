"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";

const W = 1000;
const H = 320;
const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;
const PLOT_PAD_X = 10; // keep in sync with .chart-plot padding

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

// Anchor the minimum (first, since growth-only) at the very bottom so the line
// starts in the bottom-left corner.
function normalize(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => ((v - min) / span) * 0.9);
}

export function BalanceChart({ dates, values, asset }: { dates: number[]; values: number[]; asset: string }) {
  const [active, setActive] = useState<number | null>(null);

  const n = values.length;
  const norm = normalize(values);
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const baseY = H - PAD_BOTTOM;
  const xAt = (i: number) => PAD_X + (innerW * i) / (n - 1);
  const yAt = (i: number) => PAD_TOP + innerH * (1 - norm[i]);

  const line = norm.map((_, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)} ${yAt(i).toFixed(1)}`).join(" ");
  const area = `${line} L${(PAD_X + innerW).toFixed(1)} ${baseY} L${PAD_X.toFixed(1)} ${baseY} Z`;

  const idx = active ?? n - 1;

  function pick(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const innerLeft = rect.left + PLOT_PAD_X;
    const usable = rect.width - PLOT_PAD_X * 2;
    const frac = Math.min(1, Math.max(0, (e.clientX - innerLeft) / usable));
    setActive(Math.round(frac * (n - 1)));
  }

  return (
    <div className="perf-chart">
      <div className="chart-readout">
        <span className="chart-readout-date">{active === null ? "Today" : fmtDate(dates[idx])}</span>
        <span className="chart-readout-value">
          {values[idx].toFixed(4)} {asset}
        </span>
      </div>

      <div
        className="chart-plot"
        onPointerDown={pick}
        onPointerMove={(e) => {
          if (e.buttons === 1) pick(e);
        }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="chart-svg" role="img" aria-label="Balance over time">
          <defs>
            <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb936" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ffb936" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#balance-fill)" />
          {active !== null && (
            <line
              x1={xAt(idx)}
              x2={xAt(idx)}
              y1={PAD_TOP}
              y2={baseY}
              stroke="rgba(25,23,23,0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path
            d={line}
            fill="none"
            stroke="#ffb936"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {active !== null && (
            <circle cx={xAt(idx)} cy={yAt(idx)} r="7" fill="#ffb936" stroke="#fff" strokeWidth="2" />
          )}
        </svg>
      </div>

      <div className="chart-axis">
        <span>{fmtDate(dates[0])}</span>
        <span>{fmtDate(dates[Math.floor((n - 1) / 2)])}</span>
        <span>today</span>
      </div>
    </div>
  );
}

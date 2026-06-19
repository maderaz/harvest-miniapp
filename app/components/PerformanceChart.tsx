"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ChartSeries } from "../lib/chart-data";

const W = 1000;
const H = 320;
const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;

// CSS padding on .chart-plot (keep in sync with miniapp.css).
const PLOT_PAD_X = 10;

type MetricId = "sharePrice" | "apy" | "tvl";

function fmtUsd(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

const METRICS: { id: MetricId; label: string; format: (v: number) => string }[] = [
  { id: "sharePrice", label: "Share price", format: (v) => v.toFixed(4) },
  { id: "apy", label: "APY", format: (v) => `${v.toFixed(2)}%` },
  { id: "tvl", label: "TVL", format: fmtUsd },
];

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

// Map raw values into 0.08..0.92 so the line keeps padding from the plot edges.
function normalize(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => 0.08 + ((v - min) / span) * 0.84);
}

function linePath(norm: number[]): string {
  const n = norm.length;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  return norm
    .map((val, i) => {
      const x = PAD_X + (innerW * i) / (n - 1);
      const y = PAD_TOP + innerH * (1 - val);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

// All three metrics share the APY look: one solid Sunflower Gold line. Metric
// tabs replace the legend; tap/drag the plot for a crosshair readout.
export function PerformanceChart({ series }: { series: ChartSeries }) {
  const [metric, setMetric] = useState<MetricId>("apy");
  const [active, setActive] = useState<number | null>(null);

  const values = series[metric];
  const n = values.length;
  const norm = normalize(values);
  const current = METRICS.find((m) => m.id === metric)!;

  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const xAt = (i: number) => PAD_X + (innerW * i) / (n - 1);
  const yAt = (i: number) => PAD_TOP + innerH * (1 - norm[i]);

  const readoutIndex = active ?? n - 1;
  const readoutLabel = active === null ? "Today" : fmtDate(series.dates[readoutIndex]);

  function pick(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const innerLeft = rect.left + PLOT_PAD_X;
    const usable = rect.width - PLOT_PAD_X * 2;
    const frac = Math.min(1, Math.max(0, (e.clientX - innerLeft) / usable));
    setActive(Math.round(frac * (n - 1)));
  }

  return (
    <div className="perf-chart">
      <div className="chart-tabs" role="tablist" aria-label="Chart metric">
        {METRICS.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={metric === m.id}
            className={`chart-tab${metric === m.id ? " is-active" : ""}`}
            onClick={() => {
              setMetric(m.id);
              setActive(null);
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="chart-readout">
        <span className="chart-readout-date">{readoutLabel}</span>
        <span className="chart-readout-value">{current.format(values[readoutIndex])}</span>
      </div>

      <div
        className="chart-plot"
        onPointerDown={pick}
        onPointerMove={(e) => {
          if (e.buttons === 1) pick(e);
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="chart-svg"
          role="img"
          aria-label={`${current.label} over the trailing ${n} days`}
        >
          {active !== null && (
            <line
              x1={xAt(active)}
              x2={xAt(active)}
              y1={PAD_TOP}
              y2={H - PAD_BOTTOM}
              stroke="rgba(25,23,23,0.35)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path
            d={linePath(norm)}
            fill="none"
            stroke="#ffb936"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {active !== null && (
            <circle cx={xAt(active)} cy={yAt(active)} r="7" fill="#ffb936" stroke="#fff" strokeWidth="2" />
          )}
        </svg>
      </div>

      <div className="chart-axis">
        <span>{fmtDate(series.dates[0])}</span>
        <span>{fmtDate(series.dates[Math.floor((n - 1) / 2)])}</span>
        <span>today</span>
      </div>
    </div>
  );
}

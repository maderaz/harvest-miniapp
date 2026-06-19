import type { Product } from "../data/products";
import { buildBalanceSeries } from "../lib/chart-data";

const W = 1000;
const H = 320;
const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function norm(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => 0.1 + ((v - min) / span) * 0.82);
}

function paths(values: number[]): { line: string; area: string } {
  const n = values.length;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  const ys = norm(values);
  const line = ys
    .map((v, i) => {
      const x = PAD_X + (innerW * i) / (n - 1);
      const y = PAD_TOP + innerH * (1 - v);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const baseY = H - PAD_BOTTOM;
  const area = `${line} L${(PAD_X + innerW).toFixed(1)} ${baseY} L${PAD_X.toFixed(1)} ${baseY} Z`;
  return { line, area };
}

// Growth-only balance chart (denominated in the vault asset).
export function MyPositionsPanel({ product }: { product: Product }) {
  const { dates, balance } = buildBalanceSeries(product.id);
  const earned = balance[balance.length - 1] - balance[0];
  const { line, area } = paths(balance);

  return (
    <div className="panel">
      <div className="position-box">
        <span className="position-label">Total earned</span>
        <span className="position-value">
          +{earned.toFixed(4)} {product.asset}
        </span>
        <span className="position-sub">Across your {product.name} position</span>
      </div>

      <div className="perf-chart">
        <div className="chart-readout">
          <span className="chart-readout-date">Balance</span>
          <span className="chart-readout-value">
            {balance[balance.length - 1].toFixed(4)} {product.asset}
          </span>
        </div>

        <div className="chart-plot is-static">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="chart-svg" role="img" aria-label="Balance over time">
            <defs>
              <linearGradient id="balance-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffb936" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#ffb936" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#balance-fill)" />
            <path
              d={line}
              fill="none"
              stroke="#ffb936"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="chart-axis">
          <span>{fmtDate(dates[0])}</span>
          <span>{fmtDate(dates[Math.floor((dates.length - 1) / 2)])}</span>
          <span>today</span>
        </div>
      </div>
    </div>
  );
}

import type { ChartSeries } from "../lib/chart-data";

const W = 1000;
const H = 320;
const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 16;

function linePath(values: number[]): string {
  const n = values.length;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_TOP - PAD_BOTTOM;
  return values
    .map((val, i) => {
      const x = PAD_X + (innerW * i) / (n - 1);
      const y = PAD_TOP + innerH * (1 - val);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function areaPath(values: number[]): string {
  const innerW = W - PAD_X * 2;
  const baseY = H - PAD_BOTTOM;
  return `${linePath(values)} L${(PAD_X + innerW).toFixed(1)} ${baseY} L${PAD_X.toFixed(1)} ${baseY} Z`;
}

// Share price = green line (positive trajectory), APY = gold line (brand accent),
// on the dotted plot from charts.md.
export function PerformanceChart({ series }: { series: ChartSeries }) {
  return (
    <div className="perf-chart">
      <div className="chart-head">
        <span className="chart-title">Share price &amp; APY</span>
        <span className="chart-legend">
          <span className="legend-item"><span className="legend-dot is-share" />Share price</span>
          <span className="legend-item"><span className="legend-dot is-apy" />APY</span>
        </span>
      </div>

      <div className="chart-plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="chart-svg"
          role="img"
          aria-label="Share price and APY over the trailing 30 days"
        >
          <defs>
            <linearGradient id="share-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f7c4d" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1f7c4d" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath(series.sharePrice)} fill="url(#share-fill)" />
          <path
            d={linePath(series.apy)}
            fill="none"
            stroke="#ffb936"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={linePath(series.sharePrice)}
            fill="none"
            stroke="#1f7c4d"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="chart-axis">
        <span>30d ago</span>
        <span>15d ago</span>
        <span>today</span>
      </div>
    </div>
  );
}

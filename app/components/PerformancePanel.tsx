import type { ChartSeries } from "../lib/chart-data";
import { PerformanceChart } from "./PerformanceChart";

type Stats = { apy24h: string; apy7d: string; tvl: string };

export function PerformancePanel({ stats, series, live }: { stats: Stats; series: ChartSeries; live: boolean }) {
  return (
    <div className="panel">
      <div className="stat-row">
        <div className="stat-tile">
          <span className="stat-label">24h APY</span>
          <span className="stat-value">{stats.apy24h}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-label">7d APY</span>
          <span className="stat-value">{stats.apy7d}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-label">TVL</span>
          <span className="stat-value">{stats.tvl}</span>
        </div>
      </div>

      <PerformanceChart series={series} />

      <p className="panel-note">
        {live
          ? "Live from the Harvest API, refreshed every few minutes."
          : "Sample data shown - live feed is temporarily unavailable."}
      </p>
    </div>
  );
}

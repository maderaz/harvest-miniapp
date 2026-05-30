import type { Product } from "../data/products";
import type { ChartSeries } from "../lib/chart-data";
import { PerformanceChart } from "./PerformanceChart";

export function PerformancePanel({ product, series }: { product: Product; series: ChartSeries }) {
  return (
    <div className="panel">
      <div className="stat-row">
        <div className="stat-tile">
          <span className="stat-label">24h APY</span>
          <span className="stat-value">{product.stats.apy24h}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-label">7d APY</span>
          <span className="stat-value">{product.stats.apy7d}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-label">TVL</span>
          <span className="stat-value">{product.stats.tvl}</span>
        </div>
      </div>

      <PerformanceChart series={series} />

      <p className="panel-note">Sample metrics for vaults we track. Live data wires in next.</p>
    </div>
  );
}

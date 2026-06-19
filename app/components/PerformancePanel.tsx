import type { Product } from "../data/products";
import type { ChartSeries } from "../lib/chart-data";
import { PerformanceChart } from "./PerformanceChart";
import { ExternalLinkIcon } from "./icons";

type Stats = { apy24h: string; apy7d: string; tvl: string };

export function PerformancePanel({
  stats,
  series,
  live,
  product,
}: {
  stats: Stats;
  series: ChartSeries;
  live: boolean;
  product: Product;
}) {
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
          ? "Live from the Harvest API, refreshed hourly."
          : "Sample data shown - live feed is temporarily unavailable."}
      </p>

      <div className="yield-source">
        <h3 className="block-title">Source of Yield</h3>
        <p className="block-text">
          Harvest {product.name} plugs into multiple sub-level vaults and uses algorithms to monitor and adjust
          positioning based on prevailing interest rates, liquidity conditions, and network gas costs. It
          streamlines the process by selecting optimal opportunities within Harvest, helping users maximize
          efficiency without manual oversight.
        </p>
        <a
          className="cta-secondary vault-address-btn"
          href={`https://basescan.org/address/${product.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Vault address
          <ExternalLinkIcon size={14} />
        </a>
      </div>
    </div>
  );
}

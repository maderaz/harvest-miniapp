import type { Product } from "../data/products";
import { buildBalanceSeries } from "../lib/chart-data";
import { BalanceChart } from "./BalanceChart";

export function MyPositionsPanel({ product }: { product: Product }) {
  const { dates, balance } = buildBalanceSeries(product.id);
  const current = balance[balance.length - 1];
  const earned = current - balance[0];

  return (
    <div className="panel">
      <div className="position-grid">
        <div className="position-box">
          <span className="position-label">My Balance</span>
          <span className="position-value">
            {current.toFixed(4)} {product.asset}
          </span>
        </div>
        <div className="position-box">
          <span className="position-label">Total earned</span>
          <span className="position-value is-earn">
            +{earned.toFixed(4)} {product.asset}
          </span>
        </div>
      </div>

      <BalanceChart dates={dates} values={balance} asset={product.asset} />
    </div>
  );
}

import type { AssetSymbol, Product } from "../data/products";
import { buildBalanceSeries } from "../lib/chart-data";
import { BalanceChart } from "./BalanceChart";
import { TokenIcon } from "./icons";

// Rough USD reference prices for the dollar estimate.
const PRICE: Record<AssetSymbol, number> = { WETH: 3500, USDC: 1, cbBTC: 95000 };

function usd(n: number): string {
  return `≈ $${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function MyPositionsPanel({ product }: { product: Product }) {
  const { dates, balance } = buildBalanceSeries(product.id);
  const current = balance[balance.length - 1];
  const earned = current - balance[0];
  const price = PRICE[product.asset];

  return (
    <div className="panel">
      <div className="position-grid">
        <div className="position-box">
          <span className="position-ico" aria-hidden="true">
            <TokenIcon asset={product.asset} size={20} />
          </span>
          <span className="position-label">My Balance</span>
          <span className="position-value">
            {current.toFixed(6)} {product.asset}
          </span>
          <span className="position-usd">{usd(current * price)}</span>
        </div>

        <div className="position-box">
          <span className="position-ico" aria-hidden="true">
            <TokenIcon asset={product.asset} size={20} />
          </span>
          <span className="position-label">Total earned</span>
          <span className="position-value is-earn">
            +{earned.toFixed(6)} {product.asset}
          </span>
          <span className="position-usd">{usd(earned * price)}</span>
        </div>
      </div>

      <BalanceChart dates={dates} values={balance} asset={product.asset} />
    </div>
  );
}

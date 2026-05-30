import type { Product } from "../data/products";
import { ArrowIcon, BaseMark, TokenIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-top">
        <div className="apy">
          <span className="apy-value">{product.apy}</span>
          <span className="apy-label">APY</span>
        </div>
        <TokenIcon asset={product.asset} size={40} />
      </div>

      <h2 className="product-name">{product.name}</h2>

      <span className="network-chip">
        <BaseMark size={16} />
        <span className="network-chip-name">{product.network}</span>
      </span>

      <button
        type="button"
        className="cta-primary earn-cta"
        aria-label={`Earn now with ${product.name}`}
      >
        Earn now
        <ArrowIcon size={16} />
      </button>
    </article>
  );
}

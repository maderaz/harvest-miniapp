import Link from "next/link";
import type { Product } from "../data/products";
import { ArrowIcon, TokenIcon } from "./icons";

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

      <Link
        href={`/product/${product.id}`}
        className="cta-primary earn-cta"
        aria-label={`Earn now with ${product.name}`}
      >
        Earn now
        <ArrowIcon size={16} />
      </Link>
    </article>
  );
}

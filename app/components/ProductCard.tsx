import Link from "next/link";
import type { Product } from "../data/products";
import { ArrowIcon, TokenIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="product-card" aria-label={`Open ${product.name}`}>
      <div className="product-top">
        <div className="apy">
          <span className="apy-value">{product.apy}</span>
          <span className="apy-label">Live APY</span>
        </div>
        <TokenIcon asset={product.asset} size={40} />
      </div>

      <h2 className="product-name">{product.name}</h2>

      <span className="cta-primary earn-cta">
        Earn now
        <ArrowIcon size={16} />
      </span>
    </Link>
  );
}

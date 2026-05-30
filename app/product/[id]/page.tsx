import Link from "next/link";
import { notFound } from "next/navigation";
import { HarvestLogo } from "../../components/HarvestLogo";
import { ProductTabs } from "../../components/ProductTabs";
import { SeasonTag } from "../../components/SeasonTag";
import { ArrowLeftIcon, TokenIcon } from "../../components/icons";
import { PRODUCTS, getProduct } from "../../data/products";
import { buildSeries } from "../../lib/chart-data";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const series = buildSeries(product.id);

  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="app-top">
          <HarvestLogo />
          <SeasonTag />
        </header>

        <Link href="/" className="back-link">
          <ArrowLeftIcon size={16} />
          All vaults
        </Link>

        <section className="product-recap">
          <TokenIcon asset={product.asset} size={46} />
          <div className="recap-text">
            <h1 className="recap-name">{product.name}</h1>
            <p className="recap-tagline">{product.tagline}</p>
          </div>
          <div className="recap-apy">
            <span className="recap-apy-value">{product.apy}</span>
            <span className="recap-apy-label">APY</span>
          </div>
        </section>

        <ProductTabs product={product} series={series} />
      </div>
    </main>
  );
}

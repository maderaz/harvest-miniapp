import Link from "next/link";
import { notFound } from "next/navigation";
import { AllocationBox } from "../../components/AllocationBox";
import { HarvestLogo } from "../../components/HarvestLogo";
import { ProductTabs } from "../../components/ProductTabs";
import { WalletBadge } from "../../components/WalletBadge";
import { ArrowLeftIcon, BaseMark, TokenIcon } from "../../components/icons";
import { PRODUCTS, getProduct } from "../../data/products";
import { buildSeries, seriesFromHistory } from "../../lib/chart-data";
import { computeStats, formatApy, formatTvl, getHistory } from "../../lib/api";

export const revalidate = 3600;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const history = await getHistory(product.address);
  const live = history.length ? computeStats(history) : null;

  const recapApy = live ? formatApy(live.currentApy) : product.apy;
  const stats = live
    ? { apy24h: formatApy(live.apy24h), apy7d: formatApy(live.apy7d), tvl: formatTvl(live.tvl) }
    : product.stats;
  const series = history.length ? seriesFromHistory(history) : buildSeries(product.id);

  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="app-top">
          <HarvestLogo />
          <WalletBadge />
        </header>

        <Link href="/" className="back-link">
          <ArrowLeftIcon size={16} />
          All vaults
        </Link>

        <section className="product-recap">
          <TokenIcon asset={product.asset} size={46} />
          <div className="recap-text">
            <h1 className="recap-name">{product.name}</h1>
            <p className="recap-tagline">
              <span className="base-chip" aria-hidden="true">
                <BaseMark size={11} tone="white" />
              </span>
              {product.tagline}
            </p>
          </div>
          <div className="recap-apy">
            <span className="recap-apy-value">{recapApy}</span>
            <span className="recap-apy-label">APY</span>
          </div>
        </section>

        <ProductTabs product={product} stats={stats} series={series} live={!!live} apy={recapApy} />

        <AllocationBox />
      </div>
    </main>
  );
}

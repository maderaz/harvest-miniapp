import { HarvestLogo } from "./components/HarvestLogo";
import { ProductCard } from "./components/ProductCard";
import { SeasonTag } from "./components/SeasonTag";
import { PRODUCTS } from "./data/products";
import { formatApy, getSnapshots } from "./lib/api";

export const revalidate = 300;

export default async function Home() {
  const snapshots = await getSnapshots(PRODUCTS.map((p) => p.address));
  const cards = PRODUCTS.map((p) => {
    const snap = snapshots[p.address.toLowerCase()];
    return snap ? { ...p, apy: formatApy(snap.apy) } : p;
  });

  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="app-top">
          <HarvestLogo />
          <SeasonTag />
        </header>

        <section className="product-list" aria-label="DeFi products">
          {cards.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}

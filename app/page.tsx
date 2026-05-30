import { HarvestLogo } from "./components/HarvestLogo";
import { ProductCard } from "./components/ProductCard";
import { SeasonTag } from "./components/SeasonTag";
import { PRODUCTS } from "./data/products";

export default function Home() {
  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="app-top">
          <HarvestLogo />
          <SeasonTag />
        </header>

        <section className="product-list" aria-label="DeFi products">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}

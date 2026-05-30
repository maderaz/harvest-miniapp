import { HarvestLogo } from "./components/HarvestLogo";
import { BaseMark } from "./components/icons";
import { ProductCard } from "./components/ProductCard";
import { PRODUCTS } from "./data/products";

export default function Home() {
  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="app-top">
          <HarvestLogo />
        </header>

        <section className="season-head" aria-label="Base season">
          <span className="season-icon" aria-hidden="true">
            <BaseMark size={22} tone="white" />
          </span>
          <div className="season-text">
            <h1 className="season-title">Base season</h1>
            <p className="season-sub">Put your assets on autopilot.</p>
          </div>
        </section>

        <section className="product-list" aria-label="DeFi products">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}

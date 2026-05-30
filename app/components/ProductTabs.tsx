"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import type { ChartSeries } from "../lib/chart-data";
import { DepositPanel } from "./DepositPanel";
import { PerformancePanel } from "./PerformancePanel";

const TABS = [
  { id: "holdings", label: "Holdings" },
  { id: "performance", label: "Performance" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductTabs({ product, series }: { product: Product; series: ChartSeries }) {
  const [active, setActive] = useState<TabId>("holdings");

  return (
    <div className="tabs">
      <div className="tabbar" role="tablist" aria-label="Product views">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            className={`tab${active === tab.id ? " is-active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "holdings" ? (
        <DepositPanel product={product} />
      ) : (
        <PerformancePanel product={product} series={series} />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import type { ChartSeries } from "../lib/chart-data";
import { DepositPanel } from "./DepositPanel";
import { MyPositionsPanel } from "./MyPositionsPanel";
import { PerformancePanel } from "./PerformancePanel";
import { EnterIcon, ExitIcon, PerformanceIcon, PositionsIcon } from "./icons";

const TABS = [
  { id: "enter", label: "Enter", Icon: EnterIcon },
  { id: "exit", label: "Exit", Icon: ExitIcon },
  { id: "positions", label: "My Positions", Icon: PositionsIcon },
  { id: "performance", label: "Performance", Icon: PerformanceIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];
type Stats = { apy24h: string; apy7d: string; tvl: string };

export function ProductTabs({
  product,
  stats,
  series,
  live,
  apy,
}: {
  product: Product;
  stats: Stats;
  series: ChartSeries;
  live: boolean;
  apy: string;
}) {
  const [active, setActive] = useState<TabId>("enter");

  return (
    <div className="tabs">
      <div className="tabbar" role="tablist" aria-label="Product views">
        {TABS.map((tab) => {
          const { Icon } = tab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={`tab${active === tab.id ? " is-active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              <span className="tab-ico" aria-hidden="true">
                <Icon size={16} />
              </span>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {active === "enter" && <DepositPanel product={product} mode="enter" apy={apy} />}
      {active === "exit" && <DepositPanel product={product} mode="exit" />}
      {active === "positions" && <MyPositionsPanel product={product} />}
      {active === "performance" && (
        <PerformancePanel stats={stats} series={series} live={live} product={product} />
      )}
    </div>
  );
}

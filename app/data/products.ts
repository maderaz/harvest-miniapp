export type AssetSymbol = "WETH" | "USDC" | "cbBTC";
export type TokenSymbol = AssetSymbol | "ETH";

export type Product = {
  id: string;
  asset: AssetSymbol;
  name: string;
  apy: string; // pre-formatted headline APY, e.g. "5.65%"
  tagline: string;
  network: string;
  stats: { apy24h: string; apy7d: string; tvl: string };
  depositTokens: TokenSymbol[];
};

// First-iteration content. Only the WETH headline APY (5.65%) was specified;
// every other figure is a placeholder - wire these to live vault data later.
export const PRODUCTS: Product[] = [
  {
    id: "weth-autopilot",
    asset: "WETH",
    name: "WETH Autopilot",
    apy: "5.65%",
    tagline: "Auto-compounding WETH yield on Base.",
    network: "Base",
    stats: { apy24h: "5.71%", apy7d: "5.58%", tvl: "$4.2M" },
    depositTokens: ["ETH", "WETH"],
  },
  {
    id: "usdc-autopilot",
    asset: "USDC",
    name: "USDC Autopilot",
    apy: "7.42%",
    tagline: "Auto-compounding USDC yield on Base.",
    network: "Base",
    stats: { apy24h: "7.55%", apy7d: "7.31%", tvl: "$9.8M" },
    depositTokens: ["USDC"],
  },
  {
    id: "cbbtc-autopilot",
    asset: "cbBTC",
    name: "cbBTC Autopilot",
    apy: "3.18%",
    tagline: "Auto-compounding cbBTC yield on Base.",
    network: "Base",
    stats: { apy24h: "3.22%", apy7d: "3.09%", tvl: "$2.1M" },
    depositTokens: ["cbBTC"],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

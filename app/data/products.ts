export type AssetSymbol = "WETH" | "USDC" | "cbBTC";
export type TokenSymbol = AssetSymbol | "ETH";

export type Product = {
  id: string;
  asset: AssetSymbol;
  name: string;
  address: string; // Autopilot (plasma vault) address on Base
  apy: string; // fallback headline APY if the live feed is unavailable
  tagline: string;
  network: string;
  stats: { apy24h: string; apy7d: string; tvl: string }; // fallbacks
  depositTokens: TokenSymbol[];
};

// Live APY / TVL / chart come from the Harvest API (see lib/api.ts). The
// values below are fallbacks shown only if the feed is unreachable.
export const PRODUCTS: Product[] = [
  {
    id: "weth-autopilot",
    asset: "WETH",
    name: "WETH Autopilot",
    address: "0x7872893e528Fe2c0829e405960db5B742112aa97",
    apy: "5.65%",
    tagline: "Auto-compounding WETH yield",
    network: "Base",
    stats: { apy24h: "5.71%", apy7d: "5.58%", tvl: "$4.2M" },
    depositTokens: ["ETH", "WETH"],
  },
  {
    id: "usdc-autopilot",
    asset: "USDC",
    name: "USDC Autopilot",
    address: "0x0d877Dc7C8Fa3aD980DfDb18B48eC9F8768359C4",
    apy: "7.42%",
    tagline: "Auto-compounding USDC yield",
    network: "Base",
    stats: { apy24h: "7.55%", apy7d: "7.31%", tvl: "$9.8M" },
    depositTokens: ["USDC"],
  },
  {
    id: "cbbtc-autopilot",
    asset: "cbBTC",
    name: "cbBTC Autopilot",
    address: "0x31A421271414641cb5063B71594b642D2666dB6B",
    apy: "3.18%",
    tagline: "Auto-compounding cbBTC yield",
    network: "Base",
    stats: { apy24h: "3.22%", apy7d: "3.09%", tvl: "$2.1M" },
    depositTokens: ["cbBTC"],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export type AssetSymbol = "WETH" | "USDC" | "cbBTC";

export type Product = {
  id: string;
  asset: AssetSymbol;
  name: string;
  apy: string; // pre-formatted for display, e.g. "5.65%"
  network: string;
};

// First-iteration content. Only the WETH APY (5.65%) was specified; the USDC
// and cbBTC figures are placeholders - wire these to live vault data later.
export const PRODUCTS: Product[] = [
  { id: "weth-autopilot", asset: "WETH", name: "WETH Autopilot", apy: "5.65%", network: "Base" },
  { id: "usdc-autopilot", asset: "USDC", name: "USDC Autopilot", apy: "7.42%", network: "Base" },
  { id: "cbbtc-autopilot", asset: "cbBTC", name: "cbBTC Autopilot", apy: "3.18%", network: "Base" },
];

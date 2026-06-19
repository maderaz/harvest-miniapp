import type { AssetSymbol, TokenSymbol } from "./products";

// Single source of truth for the mock balances so Enter / Exit / My Position
// stay consistent:
//  - WALLET_BALANCE: what the wallet holds (available to deposit in Enter)
//  - VAULT_POSITION: the user's current vault position in asset units
//    (available to withdraw in Exit, and shown as the balance in My Position)
export const WALLET_BALANCE: Record<TokenSymbol, number> = {
  ETH: 8.2431,
  WETH: 12.4823,
  USDC: 5240.18,
  cbBTC: 0.3472,
};

export const VAULT_POSITION: Record<AssetSymbol, number> = {
  WETH: 6.5129,
  USDC: 3180.44,
  cbBTC: 0.1208,
};

import type { TokenSymbol } from "../data/products";

// Base network mark. `tone="white"` renders it for the blue season tile.
// Official Base symbol geometry; swap for a supplied asset by replacing the path.
export function BaseMark({ size = 18, tone = "blue" }: { size?: number; tone?: "blue" | "white" }) {
  const fill = tone === "white" ? "#ffffff" : "#0052ff";
  return (
    <svg width={size} height={size} viewBox="0 0 146 146" fill="none" aria-hidden="true" role="presentation">
      <path
        d="M72.84 145.68C113.07 145.68 145.68 113.07 145.68 72.84C145.68 32.61 113.07 0 72.84 0C34.66 0 3.34 29.38 0.23 66.74H96.35V79.02H0.23C3.34 116.31 34.66 145.68 72.84 145.68Z"
        fill={fill}
      />
    </svg>
  );
}

// Round token marks. Served from /public so every view shares the same
// official artwork (ETH reuses the WETH mark).
const TOKEN_ART: Record<TokenSymbol, string> = {
  ETH: "/weth.png",
  WETH: "/weth.png",
  USDC: "/usdc.svg",
  cbBTC: "/cbbtc.png",
};

export function TokenIcon({ asset, size = 40 }: { asset: TokenSymbol; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={TOKEN_ART[asset]}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className="token-art"
      style={{ width: size, height: size }}
    />
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12.5 8h-9M7 4.5 3.5 8 7 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4.5 7 9 11.5 13.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

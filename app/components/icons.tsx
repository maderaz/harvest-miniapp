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

// Round token marks, drawn inline so the bundle stays asset-free.
export function TokenIcon({ asset, size = 40 }: { asset: TokenSymbol; size?: number }) {
  if (asset === "WETH" || asset === "ETH") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#627eea" />
        <g fill="#fff" fillRule="nonzero">
          <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z" />
          <path d="M16.498 4 9 16.22l7.498-3.35z" />
          <path fillOpacity="0.602" d="M16.498 21.968v6.027L24 17.616z" />
          <path d="M16.498 27.995v-6.028L9 17.616z" />
          <path fillOpacity="0.2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
          <path fillOpacity="0.602" d="M9 16.22l7.498 4.353v-7.701z" />
        </g>
      </svg>
    );
  }
  if (asset === "USDC") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#2775ca" />
        <text x="16" y="22.4" textAnchor="middle" fontFamily="var(--sans), system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#fff">$</text>
      </svg>
    );
  }
  // cbBTC
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f7931a" />
      <text x="16" y="22.8" textAnchor="middle" fontFamily="var(--sans), system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#fff">&#8383;</text>
    </svg>
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

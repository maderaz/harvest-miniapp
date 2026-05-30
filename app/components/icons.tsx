import type { AssetSymbol } from "../data/products";

// Base network mark. `tone="white"` renders it for the blue season tile.
// This is the official Base symbol geometry; swap for a supplied asset
// any time by replacing the path.
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
export function TokenIcon({ asset, size = 40 }: { asset: AssetSymbol; size?: number }) {
  if (asset === "WETH") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#627eea" />
        <g fill="#fff" fillRule="nonzero">
          <path fillOpacity="0.602" d="M16.5 4v8.87l7.5 3.35z" />
          <path d="M16.5 4 9 16.22l7.5-3.35z" />
          <path fillOpacity="0.602" d="M16.5 21.97v6.03L24 17.62z" />
          <path d="M16.5 28v-6.03L9 17.62z" />
          <path fillOpacity="0.2" d="M16.5 20.57l7.5-4.35-7.5-3.35z" />
          <path fillOpacity="0.602" d="M9 16.22l7.5 4.35v-7.7z" />
        </g>
      </svg>
    );
  }
  if (asset === "USDC") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#2775ca" />
        <text
          x="16"
          y="22.4"
          textAnchor="middle"
          fontFamily="var(--sans), system-ui, sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="#fff"
        >
          $
        </text>
      </svg>
    );
  }
  // cbBTC
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f7931a" />
      <text
        x="16"
        y="22.8"
        textAnchor="middle"
        fontFamily="var(--sans), system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#fff"
      >
        &#8383;
      </text>
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

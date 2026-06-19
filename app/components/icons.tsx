import type { ReactNode } from "react";
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

// ── Tab icons (stroked, 16px grid) ──────────────────────────
function tabSvg(size: number, children: ReactNode) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

// Enter / deposit: arrow down into a tray.
export function EnterIcon({ size = 16 }: { size?: number }) {
  return tabSvg(
    size,
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2.5v6.5" />
      <path d="M5.2 6.3 8 9l2.8-2.7" />
      <path d="M3 12.5h10" />
    </g>,
  );
}

// Exit / withdraw: arrow up from a tray.
export function ExitIcon({ size = 16 }: { size?: number }) {
  return tabSvg(
    size,
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9.5V3" />
      <path d="M5.2 5.7 8 3l2.8 2.7" />
      <path d="M3 12.5h10" />
    </g>,
  );
}

// My Positions: stacked layers (holdings).
export function PositionsIcon({ size = 16 }: { size?: number }) {
  return tabSvg(
    size,
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2.2 14 5 8 7.8 2 5 8 2.2Z" />
      <path d="M2.4 8.4 8 11l5.6-2.6" />
      <path d="M2.4 11.2 8 13.8l5.6-2.6" />
    </g>,
  );
}

// Performance: trending-up line.
export function PerformanceIcon({ size = 16 }: { size?: number }) {
  return tabSvg(
    size,
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 10.5 6 7l2.4 2.4L13.5 4.5" />
      <path d="M10.4 4.5h3.1v3.1" />
    </g>,
  );
}

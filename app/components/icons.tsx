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

export function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 3.5H3.5v9h9V9.5" />
        <path d="M9.5 3.5h3v3" />
        <path d="M12.5 3.5 7.5 8.5" />
      </g>
    </svg>
  );
}

export function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

export function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
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

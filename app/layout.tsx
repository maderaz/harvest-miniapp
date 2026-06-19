import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { MiniAppReady } from "./ready";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_URL ?? "https://harvest-miniapp.vercel.app";

// Mini App embed (shown when the app URL is shared in a feed). The image and
// splash art are placeholders for this first iteration.
const miniappEmbed = {
  version: "1",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: "Open Harvest",
    action: {
      type: "launch_miniapp",
      name: "Harvest",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#ffb936",
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Harvest - Earn on Autopilot",
  description: "Explore USDC, WETH and cbBTC Strategies",
  openGraph: {
    title: "Harvest - Earn on Autopilot",
    description: "Explore USDC, WETH and cbBTC Strategies",
    url: appUrl,
    siteName: "Harvest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harvest - Earn on Autopilot",
    description: "Explore USDC, WETH and cbBTC Strategies",
  },
  other: {
    "fc:miniapp": JSON.stringify(miniappEmbed),
    // Back-compat with the older frame embed key.
    "fc:frame": JSON.stringify({
      ...miniappEmbed,
      button: {
        ...miniappEmbed.button,
        action: { ...miniappEmbed.button.action, type: "launch_frame" },
      },
    }),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#ffb936",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // data-theme is pinned to light for this iteration so the branded gold
  // surface is predictable regardless of the host's colour scheme.
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <MiniAppReady />
        {children}
      </body>
    </html>
  );
}

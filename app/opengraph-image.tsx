import { ImageResponse } from "next/og";

export const alt = "Harvest - Earn on Autopilot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social / OG card that mirrors the app: gold field + product cards.
export default function OpengraphImage() {
  const cards = [
    { token: "WETH Autopilot", apy: "5.65%" },
    { token: "USDC Autopilot", apy: "7.42%" },
    { token: "cbBTC Autopilot", apy: "3.18%" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 56,
          padding: 72,
          background: "#ffb936",
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), rgba(255,185,54,0) 45%)",
          color: "#191717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 30 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 10,
              background: "#ffffff",
              borderRadius: 999,
              padding: "14px 26px",
              fontSize: 32,
              fontWeight: 600,
              boxShadow: "0 8px 24px -12px rgba(25,23,23,0.5)",
            }}
          >
            <span>Harvest</span>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: "#ffb936", display: "flex" }} />
          </div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.0, letterSpacing: -4, fontWeight: 700 }}>
            Earn on Autopilot
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#32312b" }}>
            Explore USDC, WETH and cbBTC strategies on Base.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 440 }}>
          {cards.map((c) => (
            <div
              key={c.token}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#ffffff",
                borderRadius: 28,
                padding: "26px 30px",
                gap: 8,
                boxShadow: "0 18px 40px -22px rgba(25,23,23,0.6)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{c.apy}</span>
                <span style={{ fontSize: 24, color: "#6e6c66", fontWeight: 600 }}>APY</span>
              </div>
              <div style={{ display: "flex", fontSize: 30, color: "#191717", fontWeight: 600 }}>{c.token}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

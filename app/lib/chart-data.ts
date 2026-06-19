// Deterministic placeholder series so server and client render identically
// (no Math.random -> no hydration mismatch). Live data replaces it when the
// Harvest feed is reachable. Values are kept RAW (real units) so the chart can
// show actual rates in the crosshair; the chart normalises for plotting.

export type ChartSeries = {
  dates: number[]; // unix ms, oldest -> newest
  sharePrice: number[]; // share price (e.g. 1.0423)
  apy: number[]; // percent (e.g. 5.42)
  tvl: number[]; // USD
};

const DAY_MS = 86_400_000;

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed: number): () => number {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function buildSeries(id: string, points = 32): ChartSeries {
  const seed = hashSeed(id);
  const rng = makeRng(seed);
  const now = Date.now();

  const dates: number[] = [];
  for (let i = 0; i < points; i++) dates.push(now - (points - 1 - i) * DAY_MS);

  // Share price: small positive daily returns (auto-compounding).
  const sharePrice: number[] = [];
  let sp = 1;
  for (let i = 0; i < points; i++) {
    sp += sp * (0.0002 + rng() * 0.0011);
    sharePrice.push(Number(sp.toFixed(6)));
  }

  // APY: mean-reverting around a per-vault base (~4-8%).
  const base = 4 + (seed % 5);
  const apy: number[] = [];
  let a = base;
  for (let i = 0; i < points; i++) {
    a += (rng() - 0.5) * 0.9;
    a += (base - a) * 0.2;
    apy.push(Number(Math.max(0.1, a).toFixed(2)));
  }

  // TVL: gentle upward drift with the odd pullback.
  const tvl: number[] = [];
  let t = 1_500_000 + (seed % 8) * 600_000;
  for (let i = 0; i < points; i++) {
    t += t * (rng() - 0.42) * 0.03;
    tvl.push(Math.round(Math.max(50_000, t)));
  }

  return { dates, sharePrice, apy, tvl };
}

function downsample<T>(arr: T[], target: number): T[] {
  if (arr.length <= target) return arr;
  const step = arr.length / target;
  const out: T[] = [];
  for (let i = 0; i < target; i++) out.push(arr[Math.floor(i * step)]);
  out.push(arr[arr.length - 1]);
  return out;
}

// Raw chart series from real history (oldest -> newest), downsampled so a long
// series still draws as a smooth line.
export function seriesFromHistory(
  history: { timestamp: number; sharePrice: number; apy: number; tvl: number }[],
  target = 120,
): ChartSeries {
  const recs = downsample(history, target);
  const toMs = (ts: number) => (ts < 1e12 ? ts * 1000 : ts);
  return {
    dates: recs.map((r) => toMs(r.timestamp)),
    sharePrice: recs.map((r) => r.sharePrice),
    apy: recs.map((r) => r.apy),
    tvl: recs.map((r) => r.tvl),
  };
}

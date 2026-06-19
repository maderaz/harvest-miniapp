// Deterministic placeholder series so server and client render identically
// (no Math.random -> no hydration mismatch). Replace with live data later.

export type ChartSeries = { sharePrice: number[]; apy: number[]; tvl: number[] };

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

// Map values into 0.08..0.92 so lines keep padding from the plot edges.
function normalize(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v) => 0.08 + ((v - min) / span) * 0.84);
}

export function buildSeries(id: string, points = 32): ChartSeries {
  const rng = makeRng(hashSeed(id));

  // Share price: upward trajectory with zig-zag noise.
  const rawSharePrice: number[] = [];
  let v = 0;
  for (let i = 0; i < points; i++) {
    v += 0.6 + (rng() - 0.35) * 1.4; // net upward drift, jittery
    rawSharePrice.push(v);
  }

  // APY: fluctuates around a mid level, mean-reverting (no strong trend).
  const rawApy: number[] = [];
  let a = 0.5;
  for (let i = 0; i < points; i++) {
    a += (rng() - 0.5) * 0.32;
    a += (0.5 - a) * 0.18;
    rawApy.push(a);
  }

  // TVL (mock): gentle upward growth with the odd dip, like deposits trickling in.
  const rawTvl: number[] = [];
  let t = 1;
  for (let i = 0; i < points; i++) {
    t += 0.4 + (rng() - 0.4) * 1.1; // mostly up, occasional pullback
    rawTvl.push(t);
  }

  return { sharePrice: normalize(rawSharePrice), apy: normalize(rawApy), tvl: normalize(rawTvl) };
}

function downsample<T>(arr: T[], target: number): T[] {
  if (arr.length <= target) return arr;
  const step = arr.length / target;
  const out: T[] = [];
  for (let i = 0; i < target; i++) out.push(arr[Math.floor(i * step)]);
  out.push(arr[arr.length - 1]);
  return out;
}

// Normalised chart series from real history (oldest -> newest), downsampled
// so a long series still draws as a smooth line.
export function seriesFromHistory(history: { sharePrice: number; apy: number; tvl: number }[], target = 120): ChartSeries {
  const recs = downsample(history, target);
  return {
    sharePrice: normalize(recs.map((r) => r.sharePrice)),
    apy: normalize(recs.map((r) => r.apy)),
    tvl: normalize(recs.map((r) => r.tvl)),
  };
}

// Harvest API client (the "clownfish" GraphQL proxy in front of the Harvest
// subgraph). Autopilots are "plasma vaults". Schema/queries confirmed working:
//   plasmaVaultHistories(
//     where: { plasmaVault_: { id: "0x..lowercase" } },
//     orderBy: timestamp, orderDirection: desc|asc, first: <=1000
//   ) { timestamp tvl sharePrice apy }
// APY is already in percent (5.23 => 5.23%); TVL is USD; timestamp is unix.
//
// Every call fails soft (returns null / []), so views fall back to the
// placeholder figures in data/products.ts if the feed is unreachable.

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? "8453"; // Base
const ENDPOINT = `https://clownfish-app-2dsdk.ondigitalocean.app/${CHAIN_ID}`;
const REVALIDATE = 3600; // seconds (hourly)

export type HistoryRecord = { timestamp: number; tvl: number; sharePrice: number; apy: number };
export type VaultStats = { currentApy: number; tvl: number; apy24h: number; apy7d: number };

function num(v: unknown): number {
  const n = typeof v === "string" ? Number.parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T; errors?: unknown };
    if (!json.data || json.errors) return null;
    return json.data;
  } catch {
    return null;
  }
}

// Latest apy + tvl for several Autopilots in a single request (aliased).
export async function getSnapshots(addresses: string[]): Promise<Record<string, { apy: number; tvl: number }>> {
  const body = addresses
    .map(
      (addr, i) =>
        `v${i}: plasmaVaultHistories(where: { plasmaVault_: { id: "${addr.toLowerCase()}" } }, orderBy: timestamp, orderDirection: desc, first: 1) { apy tvl }`,
    )
    .join("\n");
  const data = await gql<Record<string, { apy: string; tvl: string }[]>>(`{ ${body} }`);
  const out: Record<string, { apy: number; tvl: number }> = {};
  if (!data) return out;
  addresses.forEach((addr, i) => {
    const rec = data[`v${i}`]?.[0];
    if (rec) out[addr.toLowerCase()] = { apy: num(rec.apy), tvl: num(rec.tvl) };
  });
  return out;
}

// Full Autopilot history, oldest -> newest. Empty on any failure.
export async function getHistory(address: string): Promise<HistoryRecord[]> {
  const query = `query History($id: String!) {
    plasmaVaultHistories(where: { plasmaVault_: { id: $id } }, orderBy: timestamp, orderDirection: desc, first: 1000) {
      timestamp
      tvl
      sharePrice
      apy
    }
  }`;
  const data = await gql<{
    plasmaVaultHistories: { timestamp: string; tvl: string; sharePrice: string; apy: string }[];
  }>(query, { id: address.toLowerCase() });
  const rows = data?.plasmaVaultHistories ?? [];
  return rows
    .map((r) => ({ timestamp: num(r.timestamp), tvl: num(r.tvl), sharePrice: num(r.sharePrice), apy: num(r.apy) }))
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function computeStats(history: HistoryRecord[]): VaultStats {
  const last = history[history.length - 1];
  const lastTs = last.timestamp;
  const day = lastTs > 1e12 ? 86_400_000 : 86_400; // tolerate ms or s timestamps
  const trailingApy = (windowDays: number) => {
    const cutoff = lastTs - windowDays * day;
    const recs = history.filter((r) => r.timestamp >= cutoff);
    const src = recs.length ? recs : [last];
    return src.reduce((sum, r) => sum + r.apy, 0) / src.length;
  };
  return { currentApy: last.apy, tvl: last.tvl, apy24h: trailingApy(1), apy7d: trailingApy(7) };
}

export function formatApy(n: number): string {
  return `${n.toFixed(2)}%`;
}

export function formatTvl(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "$0";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

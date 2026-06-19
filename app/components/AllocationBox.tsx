// Current vault allocation across sub-strategies (template figures).
const ALLOCATIONS: { name: string; pct: number }[] = [
  { name: "Morpho - Gauntlet Frontier V2", pct: 60 },
  { name: "Morpho - Yearn OG V2", pct: 0 },
  { name: "Morpho - Steakhouse High Yield V2", pct: 0 },
  { name: "Morpho - Gauntlet Prime V2", pct: 0 },
  { name: "Arcadia - Lend", pct: 0 },
  { name: "Morpho - Moonwell Flagship V2", pct: 0 },
  { name: "Morpho - Alpha Prime V2", pct: 0 },
  { name: "Compound V3", pct: 0 },
  { name: "Fluid", pct: 20 },
  { name: "Aave", pct: 0 },
  { name: "ExtraFi - Lend", pct: 20 },
  { name: "Deployment Buffer", pct: 0 },
];

export function AllocationBox() {
  return (
    <section className="allocation" aria-label="Vault allocation">
      <h2 className="block-title">Allocation</h2>
      <ul className="alloc-list">
        {ALLOCATIONS.map((a) => (
          <li key={a.name} className={`alloc-row${a.pct > 0 ? " is-active" : ""}`}>
            <div className="alloc-head">
              <span className="alloc-name">{a.name}</span>
              <span className="alloc-pct">{a.pct.toFixed(2)}%</span>
            </div>
            <div className="alloc-bar">
              <span style={{ width: `${a.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

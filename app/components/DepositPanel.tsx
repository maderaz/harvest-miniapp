"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import { TokenSelect } from "./TokenSelect";

type Mode = "enter" | "exit";

const COPY: Record<Mode, { tokenLabel: string; cta: (a: string, t: string) => string; note: string }> = {
  enter: {
    tokenLabel: "Select token",
    cta: (a, t) => `Deposit ${a} ${t}`,
    note: "Connect a wallet to deposit. Wallet support lands next.",
  },
  exit: {
    tokenLabel: "Receive token",
    cta: (a, t) => `Withdraw ${a} ${t}`,
    note: "Connect a wallet to withdraw. Wallet support lands next.",
  },
};

// Parse a headline APY string like "5.65%" into a fraction (0.0565).
function apyFraction(apy: string): number {
  const n = Number.parseFloat(apy.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n / 100 : 0;
}

export function DepositPanel({ product, mode = "enter", apy }: { product: Product; mode?: Mode; apy?: string }) {
  const [token, setToken] = useState(product.depositTokens[0]);
  const [amount, setAmount] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);

  const copy = COPY[mode];
  const amountNum = Number.parseFloat(amount);
  const canSubmit = !Number.isNaN(amountNum) && amountNum > 0;

  const yearly = canSubmit && apy ? amountNum * apyFraction(apy) : null;
  const yearlyText =
    yearly !== null ? `≈ ${yearly.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${token} / yr` : "—";

  return (
    <div className="panel">
      <div className="form-field">
        <span className="field-label">{copy.tokenLabel}</span>
        <TokenSelect value={token} options={product.depositTokens} onChange={setToken} />
      </div>

      <div className="form-field">
        <label className="field-label" htmlFor="deposit-amount">Enter amount</label>
        <div className="amount-input">
          <input
            id="deposit-amount"
            inputMode="decimal"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <span className="amount-token">{token}</span>
        </div>
      </div>

      {mode === "enter" && (
        <div className="yield-row">
          <div className="yield-label">
            <span>Est. Yearly Yield</span>
            <button
              type="button"
              className="help-toggle"
              aria-expanded={helpOpen}
              aria-label="What is the estimated yearly yield?"
              onClick={() => setHelpOpen((o) => !o)}
            >
              ?
            </button>
          </div>
          <span className="yield-value">{yearlyText}</span>
          {helpOpen && (
            <p className="yield-help">
              This is an estimate based on the vault&apos;s recent historical APY. It is not a promise or guarantee
              of future returns &mdash; yields vary and can go down. Treat it as rough guidance only.
            </p>
          )}
        </div>
      )}

      <button type="button" className="cta-primary earn-cta" disabled={!canSubmit}>
        {canSubmit ? copy.cta(amount, token) : "Enter an amount"}
      </button>

      <p className="panel-note">{copy.note}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import { TokenSelect } from "./TokenSelect";

export function DepositPanel({ product }: { product: Product }) {
  const [token, setToken] = useState(product.depositTokens[0]);
  const [amount, setAmount] = useState("");

  const amountNum = Number.parseFloat(amount);
  const canDeposit = !Number.isNaN(amountNum) && amountNum > 0;

  return (
    <div className="panel">
      <div className="form-field">
        <span className="field-label">Select token</span>
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

      <button type="button" className="cta-primary earn-cta" disabled={!canDeposit}>
        {canDeposit ? `Deposit ${amount} ${token}` : "Enter an amount"}
      </button>

      <p className="panel-note">Connect a wallet to deposit. Wallet support lands next.</p>
    </div>
  );
}

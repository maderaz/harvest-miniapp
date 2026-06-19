"use client";

import { useState } from "react";
import type { AssetSymbol, Product, TokenSymbol } from "../data/products";
import { TokenSelect } from "./TokenSelect";

type Mode = "enter" | "exit";

// Mock balances (deterministic so SSR/CSR match). Wallet balances back the
// Enter flow; the vault position (denominated in the asset) backs Exit.
const WALLET_BALANCE: Record<TokenSymbol, number> = {
  ETH: 8.2431,
  WETH: 12.4823,
  USDC: 5240.18,
  cbBTC: 0.3472,
};
const VAULT_POSITION: Record<AssetSymbol, number> = {
  WETH: 6.5129,
  USDC: 3180.44,
  cbBTC: 0.1208,
};

function fmtAmount(n: number, token: TokenSymbol): string {
  const d = token === "USDC" ? 2 : 4;
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

function trimmed(n: number, token: TokenSymbol): string {
  const d = token === "USDC" ? 2 : 4;
  return String(Number(n.toFixed(d)));
}

// Parse a headline APY string like "5.65%" into a fraction (0.0565).
function apyFraction(apy: string): number {
  const n = Number.parseFloat(apy.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n / 100 : 0;
}

export function DepositPanel({ product, mode = "enter", apy }: { product: Product; mode?: Mode; apy?: string }) {
  const isEnter = mode === "enter";
  // Exit always settles in the vault asset; Enter lets the user pick.
  const [token, setToken] = useState<TokenSymbol>(isEnter ? product.depositTokens[0] : product.asset);
  const [amount, setAmount] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");

  const balance = isEnter ? WALLET_BALANCE[token] : VAULT_POSITION[product.asset];
  const balanceToken: TokenSymbol = isEnter ? token : product.asset;

  const amountNum = Number.parseFloat(amount);
  const canSubmit = !Number.isNaN(amountNum) && amountNum > 0;

  const yearly = canSubmit && apy ? amountNum * apyFraction(apy) : null;
  const yearlyText =
    yearly !== null ? `≈ ${fmtAmount(yearly, token)} ${token} / yr` : "—";

  // Leave ~1% for gas on Enter; a full position can be withdrawn on Exit.
  const setMax = () => {
    setAmount(trimmed(balance * (isEnter ? 0.99 : 1), balanceToken));
    if (status === "success") setStatus("idle");
  };

  // Simulate a wallet tx: pending for ~2s, then confirmed (clears the input).
  const submit = () => {
    if (!canSubmit || status === "pending") return;
    setStatus("pending");
    setTimeout(() => {
      setStatus("success");
      setAmount("");
    }, 2000);
  };

  const amountField = (
    <div className="form-field">
      <div className="field-row">
        <label className="field-label" htmlFor="deposit-amount">Enter amount</label>
        <span className="field-balance">
          My Balance: {fmtAmount(balance, balanceToken)} {balanceToken}
        </span>
      </div>
      <div className="amount-input">
        <input
          id="deposit-amount"
          inputMode="decimal"
          placeholder="0.0"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value.replace(/[^0-9.]/g, ""));
            if (status === "success") setStatus("idle");
          }}
        />
        <button type="button" className="max-btn" onClick={setMax}>MAX</button>
        <span className="amount-token">{balanceToken}</span>
      </div>
    </div>
  );

  return (
    <div className="panel">
      {isEnter ? (
        <>
          <div className="form-field">
            <span className="field-label">Select token</span>
            <TokenSelect value={token} options={product.depositTokens} onChange={setToken} />
          </div>
          {amountField}
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
                This is an estimate based on the vault&apos;s recent historical APY. It is not a promise or
                guarantee of future returns &mdash; yields vary and can go down. Treat it as rough guidance only.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {amountField}
          <div className="form-field">
            <span className="field-label">Receive token</span>
            <TokenSelect value={product.asset} options={[product.asset]} onChange={() => {}} />
          </div>
        </>
      )}

      <button
        type="button"
        className="cta-primary earn-cta"
        disabled={!canSubmit || status === "pending"}
        onClick={submit}
      >
        {status === "pending" ? (
          <>
            <span className="cta-spinner" aria-hidden="true" />
            Confirming…
          </>
        ) : canSubmit ? (
          isEnter ? `Deposit ${amount} ${token}` : `Exit ${amount} ${balanceToken}`
        ) : (
          "Enter an amount"
        )}
      </button>

      <p className={`panel-note${status === "success" ? " is-success" : ""}`}>
        {status === "success"
          ? isEnter
            ? "Deposit confirmed — preview your earnings in the Positions tab."
            : "Exit confirmed — preview the change in the Positions tab."
          : isEnter
            ? "Connect a wallet to deposit. Wallet support lands next."
            : "Connect a wallet to withdraw. Wallet support lands next."}
      </p>
    </div>
  );
}

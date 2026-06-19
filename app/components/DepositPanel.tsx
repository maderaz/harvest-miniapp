"use client";

import { useState } from "react";
import type { Product, TokenSymbol } from "../data/products";
import { VAULT_POSITION, WALLET_BALANCE } from "../data/balances";
import { TokenSelect } from "./TokenSelect";
import { useWallet } from "./WalletProvider";

type Mode = "enter" | "exit";
type Status = "idle" | "approving" | "depositing" | "success";

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
  const { connected, connect } = useWallet();
  const isEnter = mode === "enter";
  // Exit always settles in the vault asset; Enter lets the user pick.
  const [token, setToken] = useState<TokenSymbol>(isEnter ? product.depositTokens[0] : product.asset);
  const [amount, setAmount] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [approved, setApproved] = useState(false);

  const balance = isEnter ? WALLET_BALANCE[token] : VAULT_POSITION[product.asset];
  const balanceToken: TokenSymbol = isEnter ? token : product.asset;

  const amountNum = Number.parseFloat(amount);
  const canSubmit = !Number.isNaN(amountNum) && amountNum > 0;
  const busy = status === "approving" || status === "depositing";

  // ERC-20 entries need an approval first; native ETH does not.
  const needsApproval = isEnter && token !== "ETH" && !approved;

  const yearly = canSubmit && apy ? amountNum * apyFraction(apy) : null;
  const yearlyText = yearly !== null ? `≈ ${fmtAmount(yearly, token)} ${token} / yr` : "-";

  // Leave ~1% for gas on Enter; a full position can be withdrawn on Exit.
  const setMax = () => {
    setAmount(trimmed(balance * (isEnter ? 0.99 : 1), balanceToken));
    if (status === "success") setStatus("idle");
  };

  const onTokenChange = (t: TokenSymbol) => {
    setToken(t);
    setApproved(false);
    setStatus("idle");
  };

  // Simulate wallet txs: each step is pending for ~2s. ERC-20 entries run an
  // approve step before the deposit; the deposit step clears the input.
  const onCta = () => {
    if (!connected) {
      connect();
      return;
    }
    if (!canSubmit || busy) return;
    if (needsApproval) {
      setStatus("approving");
      setTimeout(() => {
        setApproved(true);
        setStatus("idle");
      }, 2000);
      return;
    }
    setStatus("depositing");
    setTimeout(() => {
      setStatus("success");
      setAmount("");
      setApproved(false);
    }, 2000);
  };

  const ctaContent = () => {
    if (!connected) return "Connect Wallet";
    if (status === "approving")
      return (
        <>
          <span className="cta-spinner" aria-hidden="true" />
          Approving…
        </>
      );
    if (status === "depositing")
      return (
        <>
          <span className="cta-spinner" aria-hidden="true" />
          Confirming…
        </>
      );
    if (!canSubmit) return "Enter an amount";
    if (needsApproval) return "Approve token";
    return isEnter ? `Deposit ${amount} ${token}` : `Exit ${amount} ${balanceToken}`;
  };

  const amountField = (
    <div className="form-field">
      <div className="field-row">
        <label className="field-label" htmlFor="deposit-amount">Enter amount</label>
        <button type="button" className="field-balance" onClick={setMax}>
          My Balance: <span className="field-balance-value">{fmtAmount(balance, balanceToken)} {balanceToken}</span>
        </button>
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
            <TokenSelect value={token} options={product.depositTokens} onChange={onTokenChange} />
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
                guarantee of future returns. Yields vary and can go down, so treat it as rough guidance only.
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
        disabled={connected && (!canSubmit || busy)}
        onClick={onCta}
      >
        {ctaContent()}
      </button>

      {status === "success" && (
        <p className="panel-note is-success">
          {isEnter
            ? "Deposit confirmed. Preview your earnings in the My Position tab."
            : "Exit successful. Assets are now in your wallet."}
        </p>
      )}
    </div>
  );
}

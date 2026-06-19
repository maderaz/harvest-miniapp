"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "./icons";
import { MOCK_ADDRESS, useWallet } from "./WalletProvider";

function short(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletBadge() {
  const { connected, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (!connected) {
    return (
      <button type="button" className="wallet-badge" onClick={connect}>
        <span className="wallet-dot is-off" aria-hidden="true" />
        <span className="wallet-text">Connect Wallet</span>
      </button>
    );
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(MOCK_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable - no-op */
    }
  }

  return (
    <div className="wallet-wrap" ref={ref}>
      <button
        type="button"
        className="wallet-badge"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="wallet-dot is-on" aria-hidden="true" />
        <span className="wallet-text">{short(MOCK_ADDRESS)}</span>
        <ChevronDownIcon size={16} />
      </button>

      {open && (
        <div className="wallet-menu" role="menu">
          <button type="button" className="wallet-menu-item" role="menuitem" onClick={copyAddress}>
            {copied ? "Copied!" : "Copy address"}
          </button>
          <button
            type="button"
            className="wallet-menu-item"
            role="menuitem"
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

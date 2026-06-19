"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Simulated wallet connection shared across the header badge and the
// deposit/exit CTAs.
export const MOCK_ADDRESS = "0x1F98a4C2b7Df6e21cE5b3aD9842112aa97c0b5E4";

type WalletState = {
  connected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  return (
    <WalletContext.Provider
      value={{
        connected,
        address: connected ? MOCK_ADDRESS : null,
        connect: () => setConnected(true),
        disconnect: () => setConnected(false),
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

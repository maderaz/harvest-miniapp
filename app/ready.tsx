"use client";

import { useEffect } from "react";

// Signals to the Mini App host that the UI is mounted, so it can dismiss the
// splash screen. Outside a Mini App host (e.g. a plain browser) the dynamic
// import resolves but the call is a harmless no-op.
export function MiniAppReady() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { sdk } = await import("@farcaster/miniapp-sdk");
        if (!cancelled) {
          await sdk.actions.ready();
        }
      } catch {
        // Not embedded in a Mini App host - nothing to do.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

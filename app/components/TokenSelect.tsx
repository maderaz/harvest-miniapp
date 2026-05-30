"use client";

import { useEffect, useRef, useState } from "react";
import type { TokenSymbol } from "../data/products";
import { ChevronDownIcon, TokenIcon } from "./icons";

export function TokenSelect({
  value,
  options,
  onChange,
}: {
  value: TokenSymbol;
  options: TokenSymbol[];
  onChange: (token: TokenSymbol) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const single = options.length <= 1;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="token-select" ref={ref}>
      <button
        type="button"
        className="token-select-btn"
        data-single={single}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !single && setOpen((o) => !o)}
      >
        <span className="token-select-value">
          <TokenIcon asset={value} size={24} />
          <span className="token-symbol">{value}</span>
        </span>
        {!single && <ChevronDownIcon size={18} />}
      </button>

      {open && !single && (
        <ul className="token-menu" role="listbox">
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                className="token-option"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <TokenIcon asset={opt} size={22} />
                <span className="token-symbol">{opt}</span>
                {opt === value && <span className="token-check" aria-hidden="true">&#10003;</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

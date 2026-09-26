"use client";

import { useState } from "react";

/* Copies a value (a file URL, a hex code) and says so for two seconds. */
export default function CopyButton({ value, label = "Copy link" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="bk-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          window.setTimeout(() => setDone(false), 2000);
        } catch {
          /* clipboard blocked — the link beside it still works */
        }
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

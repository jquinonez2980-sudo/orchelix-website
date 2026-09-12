"use client";

import { useEffect, useRef, useState } from "react";
import { QR_PATH, QR_SIZE, QR_URL } from "./assets";

/* Share and Show QR — the only two things on the card that need JS.

   Share uses the Web Share API where the browser has it (every modern phone)
   and falls back to copying the link. Show QR puts a large code on screen so
   someone across the table can scan it straight off the phone — the digital
   card handing itself on, the way the printed one does. It is a native
   <dialog>, so focus, Escape, and the backdrop come from the platform. */

export default function CardActions() {
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function share() {
    const data = {
      title: "Jorge Quiñonez — Orchelix",
      text: "Jorge Quiñonez, Founder & CEO, Orchelix AI Consulting",
      url: QR_URL,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(QR_URL);
      setCopied(true);
    } catch {
      /* The visitor dismissed the share sheet. Nothing to do. */
    }
  }

  return (
    <>
      <div className="dc__actions">
        <button type="button" onClick={share}>
          {copied ? "Link copied" : "Share"}
        </button>
        <button type="button" onClick={() => dialog.current?.showModal()}>
          Show QR
        </button>
      </div>

      <dialog ref={dialog} className="dc__qr" aria-label="QR code for this card">
        <svg
          viewBox={`-3 -3 ${QR_SIZE + 6} ${QR_SIZE + 6}`}
          shapeRendering="crispEdges"
          role="img"
          aria-label={`QR code linking to ${QR_URL}`}
        >
          <rect x="-3" y="-3" width={QR_SIZE + 6} height={QR_SIZE + 6} fill="#F6F1EA" />
          <path d={QR_PATH} fill="#1C1C1C" />
        </svg>
        <p>Scan to open this card</p>
        <form method="dialog">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}

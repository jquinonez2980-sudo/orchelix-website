"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, isLaunchSku } from "@/app/lib/products";

export default function ProductDetail({
  product,
  description,
}: {
  product: Product;
  description: string;
}) {
  const hasSizes = !!product.sizes && product.sizes.length > 0;
  const [size, setSize] = useState<string | undefined>(hasSizes ? product.sizes![0] : undefined);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const available = isLaunchSku(product.sku);

  async function handleBuy() {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku: product.sku, size, quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach checkout. Try again.");
    }
  }

  return (
    <section className="detail">
      <div className="detail-gallery">
        {/* Natural aspect ratio: the tee images put front and back side by side,
            and any fixed-ratio crop cuts one of them in half. */}
        <Image
          src={product.image}
          alt={product.name}
          width={product.imageWidth}
          height={product.imageHeight}
          sizes="(max-width: 780px) 100vw, 55vw"
          priority
        />
      </div>
      <div className="detail-info">
        <Link className="back-link" href="/shop">
          ← Shop
        </Link>
        <h1>
          {product.name}
          {product.fit && product.fit !== "One size" && product.fit !== "—" ? ` · ${product.fit}` : ""}
        </h1>
        <p className="fit-color">
          {product.color}
          {hasSizes ? ` · Sizes ${product.sizes!.join(", ")}` : ""}
        </p>
        <p className="price">{formatPrice(product.price, product.currency)}</p>
        <p className="desc">{description}</p>

        <p className="prints">
          Front: <span>{product.front}</span>
          <br />
          Back: <span>{product.back}</span>
        </p>

        {hasSizes && (
          <div className="size-select">
            <span className="label">Size</span>
            <div className="size-options" role="group" aria-label="Select size">
              {product.sizes!.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="size-option"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="buy-row">
          {available ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBuy}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Redirecting…" : "Buy"}
            </button>
          ) : (
            <span className="tag-soon">Soon</span>
          )}
          {status === "error" && (
            <p className="checkout-note" data-state="error">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

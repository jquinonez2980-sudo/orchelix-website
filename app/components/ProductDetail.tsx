"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Product, formatPrice, isLaunchSku } from "@/app/lib/products";
import { framesFor, type Style } from "@/app/lib/shopMedia";
import ProductShot from "@/app/components/shop/ProductShot";
import Swatch from "@/app/components/shop/Swatch";
import CheckoutNotice from "@/app/components/shop/CheckoutNotice";

export default function ProductDetail({
  product,
  style,
  description,
}: {
  product: Product;
  style: Style;
  description: string;
}) {
  const hasSizes = !!product.sizes && product.sizes.length > 0;
  const [size, setSize] = useState<string | undefined>(hasSizes ? product.sizes![0] : undefined);
  const [view, setView] = useState<"front" | "back">("front");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const available = isLaunchSku(product.sku);
  const price = formatPrice(product.price, product.currency);
  const { front, back } = framesFor(product.sku);
  const showFit = product.fit && product.fit !== "One size" && product.fit !== "—";

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

  const buyLabel = status === "loading" ? "Opening checkout…" : `Buy now · ${price}`;

  return (
    <div className="pdp">
      <div className="pdp__gallery">
        <div className="pdp__stage">
          <ProductShot
            product={product}
            frame={view === "back" && back ? back : front}
            alt={`${product.name}, ${product.color}, ${view}`}
            sizes="(max-width: 900px) 100vw, 55vw"
            priority
          />
        </div>
        {back ? (
          <div className="pdp__views" role="group" aria-label="Choose a view">
            {(["front", "back"] as const).map((v) => (
              <button
                key={v}
                type="button"
                className="pdp__view"
                aria-pressed={view === v}
                onClick={() => setView(v)}
              >
                <span className="pdp__thumb">
                  <ProductShot product={product} frame={v === "back" ? back : front} alt="" sizes="96px" />
                </span>
                {v === "front" ? "Front" : "Back"}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="pdp__info">
        <Suspense fallback={null}>
          <CheckoutNotice />
        </Suspense>

        <nav className="pdp__crumbs" aria-label="Breadcrumb">
          <Link href="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span>{style.available ? "Drop 01" : "In the studio"}</span>
        </nav>

        <h1 className="pdp__name">{product.name}</h1>
        <p className="pdp__color">
          <Swatch color={product.color} />
          {product.color}
          {showFit ? ` · ${product.fit}` : ""}
        </p>
        <p className="pdp__price">{price}</p>
        <p className="pdp__desc">{description}</p>

        {style.fits.length > 1 ? (
          <div className="pdp__field">
            <span className="pdp__label">Fit</span>
            <div className="pdp__options">
              {style.fits.map((f) =>
                f.sku === product.sku ? (
                  <span key={f.sku} className="pdp__option" aria-current="true">
                    {f.fit}
                  </span>
                ) : f.available ? (
                  <Link key={f.sku} href={`/shop/${f.sku}`} className="pdp__option">
                    {f.fit}
                  </Link>
                ) : (
                  <span key={f.sku} className="pdp__option" aria-disabled="true">
                    {f.fit} <small>soon</small>
                  </span>
                ),
              )}
            </div>
          </div>
        ) : null}

        {hasSizes ? (
          <div className="pdp__field">
            <span className="pdp__label">Size</span>
            <div className="pdp__options" role="group" aria-label="Select size">
              {product.sizes!.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="pdp__option pdp__option--size"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="pdp__buy">
          {available ? (
            <button type="button" className="pdp__cta" onClick={handleBuy} disabled={status === "loading"}>
              {buyLabel}
            </button>
          ) : (
            <span className="pdp__cta" aria-disabled="true">
              In the studio · not for sale yet
            </span>
          )}
          {status === "error" ? (
            <p className="pdp__error" role="alert">
              {errorMessage}
            </p>
          ) : null}
          {available ? (
            <p className="pdp__fine">Secure checkout by Stripe. Priced in Canadian dollars.</p>
          ) : null}
        </div>

        <dl className="pdp__specs">
          <div>
            <dt>Front</dt>
            <dd>{product.front}</dd>
          </div>
          <div>
            <dt>Back</dt>
            <dd>{product.back}</dd>
          </div>
          <div>
            <dt>Colour</dt>
            <dd>{product.color}</dd>
          </div>
          {hasSizes ? (
            <div>
              <dt>Sizes</dt>
              <dd>{product.sizes!.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {/* Phones: the buy action stays in reach while the page scrolls. */}
      {available ? (
        <div className="pdp__bar">
          <span>
            <span className="pdp__bar-name">{product.name}</span>
            <span className="pdp__bar-meta">
              {size ? `${size} · ` : ""}
              {price}
            </span>
          </span>
          <button type="button" className="pdp__cta" onClick={handleBuy} disabled={status === "loading"}>
            {status === "loading" ? "Opening…" : "Buy now"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

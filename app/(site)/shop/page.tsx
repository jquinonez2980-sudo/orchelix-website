import type { Metadata } from "next";
import ShopHeader from "@/app/components/ShopHeader";
import ShopFooter from "@/app/components/ShopFooter";
import ProductCard from "@/app/components/ProductCard";
import { ALL_PRODUCTS, isLaunchSku } from "@/app/lib/products";

export const metadata: Metadata = {
  // The site layout's title template appends "| Orchelix".
  title: "Shop",
};

export default function ShopPage() {
  const launch = ALL_PRODUCTS.filter((p) => isLaunchSku(p.sku));
  const soon = ALL_PRODUCTS.filter((p) => !isLaunchSku(p.sku));

  return (
    <>
      <ShopHeader />
      <section className="hero">
        <p className="kicker">Shop</p>
        <h1>ORCHELIX</h1>
        <p className="sub">Front is the symbol. Back is the site.</p>
      </section>

      <div className="grid" aria-label="First drop">
        {launch.map((p) => (
          <ProductCard key={p.sku} product={p} />
        ))}
      </div>

      {soon.length > 0 && (
        <>
          <div className="grid-section">
            <h3>Soon</h3>
          </div>
          <div className="grid" aria-label="Coming soon">
            {soon.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </>
      )}

      <ShopFooter />
    </>
  );
}

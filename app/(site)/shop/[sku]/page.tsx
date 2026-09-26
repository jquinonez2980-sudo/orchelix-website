import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ProductDetail from "@/app/components/ProductDetail";
import DropCard from "@/app/components/shop/DropCard";
import { ALL_PRODUCTS, getDescription, getProduct } from "@/app/lib/products";
import { allStyles, styleForSku } from "@/app/lib/shopMedia";

// Next 16: `params` is a Promise and must be awaited.
type Params = Promise<{ sku: string }>;

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ sku: p.sku }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sku } = await params;
  const product = getProduct(sku);
  // The site layout's title template appends "| Orchelix".
  return {
    title: product ? `${product.name} · ${product.color}` : "Shop",
    description: product ? getDescription(product.sku) : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { sku } = await params;
  const product = getProduct(sku);
  const style = styleForSku(sku);
  if (!product || !style) notFound();

  const more = allStyles().filter((s) => s.available && s.id !== style.id);

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="lg-world shop-band shop-band--pdp">
          <div className="shop-wrap">
            <ProductDetail product={product} style={style} description={getDescription(product.sku)} />
          </div>
        </section>
        {more.length > 0 ? (
          <section className="lg-world shop-band shop-band--more">
            <div className="shop-wrap">
              <header className="shop-band__head">
                <h2 className="shop-band__h">Also in Drop 01</h2>
              </header>
              <div className="drop-grid">
                {more.map((s) => (
                  <DropCard key={s.id} style={s} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

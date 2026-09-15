import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopHeader from "@/app/components/ShopHeader";
import ShopFooter from "@/app/components/ShopFooter";
import ProductDetail from "@/app/components/ProductDetail";
import { ALL_PRODUCTS, getDescription, getProduct } from "@/app/lib/products";

// Next 16: `params` is a Promise and must be awaited.
type Params = Promise<{ sku: string }>;

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ sku: p.sku }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { sku } = await params;
  const product = getProduct(sku);
  // The site layout's title template appends "| Orchelix".
  return { title: product ? product.name : "Shop" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { sku } = await params;
  const product = getProduct(sku);
  if (!product) notFound();

  return (
    <>
      <ShopHeader />
      <ProductDetail product={product} description={getDescription(product.sku)} />
      <ShopFooter />
    </>
  );
}

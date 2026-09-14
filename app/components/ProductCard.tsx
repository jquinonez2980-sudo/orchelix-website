import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice, isLaunchSku } from "@/app/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const available = isLaunchSku(product.sku);

  return (
    <article className="card">
      <Image
        className="card-media"
        src={product.image}
        alt={product.name}
        width={560}
        height={350}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="meta">
        <h2>{product.name}</h2>
        <p className="fit">
          {product.fit} · {product.color}
        </p>
        <div className="row">
          <span className="price">{formatPrice(product.price, product.currency)}</span>
          {available ? (
            <Link className="btn" href={`/shop/${product.sku}`}>
              View
            </Link>
          ) : (
            <span className="tag-soon">Soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

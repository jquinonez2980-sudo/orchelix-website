import Image from "next/image";
import type { Product } from "@/app/lib/products";
import { frameStyle, type Frame } from "@/app/lib/shopMedia";

/* One framed view of a product photograph (see shopMedia.ts for frames).
   Fills its parent, which sets the aspect ratio and the corner radius. */
export default function ProductShot({
  product,
  frame,
  alt,
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority,
  className = "",
}: {
  product: Product;
  frame: Frame;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={`shot ${className}`.trim()}>
      <Image src={product.image} alt={alt} fill sizes={sizes} priority={priority} style={frameStyle(frame)} />
    </span>
  );
}

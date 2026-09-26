import Link from "next/link";
import { formatPrice } from "@/app/lib/products";
import { framesFor, type Style } from "@/app/lib/shopMedia";
import ProductShot from "./ProductShot";
import Swatch from "./Swatch";

/* A style in the current drop. The photograph turns to the back on hover;
   on touch screens, where there is no hover, the back sits as an inset. */
export default function DropCard({ style, priority }: { style: Style; priority?: boolean }) {
  const { front, back } = framesFor(style.lead.sku);
  const fits = style.fits.map((f) => (f.available ? f.fit : `${f.fit} soon`)).join(" · ");
  return (
    <Link href={`/shop/${style.lead.sku}`} className="drop-card">
      <span className="drop-card__media">
        <ProductShot product={style.lead} frame={front} alt={`${style.name}, ${style.color}, front`} priority={priority} className="is-front" />
        {back ? (
          <>
            <ProductShot product={style.lead} frame={back} alt="" className="is-back" />
            <span className="drop-card__inset" aria-hidden="true">
              <ProductShot product={style.lead} frame={back} alt="" sizes="160px" />
            </span>
            <span className="drop-card__chip" aria-hidden="true">
              <span className="when-front">Front</span>
              <span className="when-back">Back</span>
            </span>
          </>
        ) : null}
      </span>
      <span className="drop-card__meta">
        <span>
          <span className="drop-card__name">{style.name}</span>
          <span className="drop-card__sub">
            <Swatch color={style.color} />
            {style.color} · {fits}
          </span>
        </span>
        <span className="drop-card__price">{formatPrice(style.price, style.currency)}</span>
      </span>
    </Link>
  );
}

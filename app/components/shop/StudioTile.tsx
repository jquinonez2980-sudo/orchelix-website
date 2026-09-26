import { formatPrice } from "@/app/lib/products";
import { framesFor, type Style } from "@/app/lib/shopMedia";
import ProductShot from "./ProductShot";
import Swatch from "./Swatch";

/* A style that is not for sale yet. Not a link: there is nothing to buy. */
export default function StudioTile({ style }: { style: Style }) {
  const { front } = framesFor(style.lead.sku);
  const fits = style.fits.map((f) => f.fit).filter((f) => f !== "—" && f !== "One size");
  return (
    <article className="studio-tile">
      <span className="studio-tile__media">
        <ProductShot product={style.lead} frame={front} alt={`${style.name}, ${style.color}`} sizes="(max-width: 900px) 50vw, 25vw" />
        <span className="studio-tile__tag">In the studio</span>
      </span>
      <h3 className="studio-tile__name">{style.name}</h3>
      <p className="studio-tile__sub">
        <Swatch color={style.color} />
        {[style.color, ...fits].join(" · ")}
      </p>
      <p className="studio-tile__price">{formatPrice(style.price, style.currency)}</p>
    </article>
  );
}

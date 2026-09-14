import Link from "next/link";
import Image from "next/image";

export default function ShopHeader() {
  return (
    <header className="shop-header">
      <Link href="/shop" aria-label="Orchelix shop">
        {/* The site's ring mark, as in Lockup.tsx. Intrinsic size is the SVG's
            own 554×608; shop.css sets the height and lets the width follow, so
            the mark keeps its proportions. */}
        <Image
          src="/orchelix-mark.svg"
          alt="Orchelix"
          width={554}
          height={608}
          unoptimized
        />
      </Link>
      <a className="site-link" href="https://www.orchelix.com">
        ORCHELIX.COM
      </a>
    </header>
  );
}

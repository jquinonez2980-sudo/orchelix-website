import "./shop.css";

// Nested layout (NOT a root layout) — renders no <html>/<body>.
// It sits under app/(site)/layout.tsx, so the shop keeps the site's nav,
// footer, type and analytics. Shop-only styles are confined to .shop-scope
// in shop.css.
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <div className="shop-scope">{children}</div>;
}

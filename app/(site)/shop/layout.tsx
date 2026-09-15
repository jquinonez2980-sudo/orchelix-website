import { Geist } from "next/font/google";
import "./shop.css";

// Nested layout (NOT a root layout) — renders no <html>/<body>.
// It sits under app/(site)/layout.tsx, so the shop keeps the site's analytics
// and client-side navigation.
//
// The .shop-scope wrapper is what confines the shop's pale-field palette —
// see shop.css. Don't move those tokens to :root.
//
// Geist is the shop's typeface only. It is exposed as --shop-font on the same
// wrapper, so it never reaches the site's type (Archivo / Literata in
// app/shell.tsx); shop.css puts it at the head of the stack.
const geist = Geist({
  subsets: ["latin"],
  variable: "--shop-font",
  display: "swap",
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <div className={`shop-scope ${geist.variable}`}>{children}</div>;
}

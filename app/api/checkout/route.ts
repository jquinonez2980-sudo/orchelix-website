import { NextRequest, NextResponse } from "next/server";
import { getProduct, isLaunchSku } from "@/app/lib/products";
import { getSiteUrl, getStripe } from "@/app/lib/stripe";

// Creates a Stripe Checkout Session for one SKU and redirects the buyer to
// Stripe's hosted page. This is the only path that can charge a card — there
// is no separate cart or fake "buy" state anywhere else in the shop.
export async function POST(req: NextRequest) {
  let body: { sku?: string; size?: string; quantity?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { sku, size } = body;
  const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 10);

  if (!sku || !isLaunchSku(sku)) {
    return NextResponse.json(
      { error: "This item is not available for checkout yet." },
      { status: 400 }
    );
  }

  const product = getProduct(sku);
  if (!product) {
    return NextResponse.json({ error: "Unknown SKU." }, { status: 404 });
  }

  if (product.sizes && product.sizes.length > 0 && !size) {
    return NextResponse.json({ error: "Select a size first." }, { status: 400 });
  }

  const siteUrl = getSiteUrl();
  const productLabel = size ? `${product.name} — ${product.fit} — ${size}` : `${product.name} — ${product.fit}`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: product.currency.toLowerCase(),
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: productLabel,
              images: [`${siteUrl}${product.image}`],
              metadata: { sku: product.sku },
            },
          },
        },
      ],
      metadata: {
        sku: product.sku,
        size: size ?? "",
      },
      success_url: `${siteUrl}/shop/${product.sku}?checkout=success`,
      cancel_url: `${siteUrl}/shop/${product.sku}?checkout=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session failed:", err);
    return NextResponse.json(
      { error: "Checkout is not configured yet. Add STRIPE_SECRET_KEY to go live." },
      { status: 500 }
    );
  }
}

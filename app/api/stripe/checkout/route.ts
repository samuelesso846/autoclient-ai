import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { email } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "eur", product_data: { name: "AutoClient AI Pro" }, unit_amount: 4900, recurring: { interval: "month" } }, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/overview`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    customer_email: email,
  });
  return NextResponse.json({ url: session.url });
}

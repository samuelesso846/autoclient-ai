import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { customerId } = await req.json();
  const portal = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: process.env.NEXT_PUBLIC_APP_URL! });
  return NextResponse.json({ url: portal.url });
}

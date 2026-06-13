import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { customerId } = await req.json();
    const stripe = getStripe();
    const portal = await stripe.billingPortal.sessions.create({ customer: customerId, return_url: process.env.NEXT_PUBLIC_APP_URL! });
    return NextResponse.json({ url: portal.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

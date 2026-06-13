import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new NextResponse("Webhook Error", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;
    await supabaseAdmin.from("subscriptions").insert({ workspace_id: session.client_reference_id, stripe_customer_id: session.customer, stripe_subscription_id: session.subscription, plan: "pro", status: "active" });
  }
  return NextResponse.json({ received: true });
}

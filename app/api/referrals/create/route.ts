import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { referrer_id, referred_id } = await req.json();
  await supabaseAdmin.from("referrals").insert({ referrer_id, referred_id });
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();
    const { data } = await supabaseAdmin.from("referrals").select("*").eq("referrer_id", user_id);
    return NextResponse.json({ count: data?.length || 0 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

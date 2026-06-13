import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { workspace_id } = await req.json();
    const { data } = await supabaseAdmin.from("leads").select("*").eq("workspace_id", workspace_id).order("created_at", { ascending: false });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

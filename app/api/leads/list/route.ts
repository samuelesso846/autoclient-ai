import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { workspace_id } = await req.json();
  const { data } = await supabaseAdmin.from("leads").select("*").eq("workspace_id", workspace_id).order("created_at", { ascending: false });
  return NextResponse.json(data);
}

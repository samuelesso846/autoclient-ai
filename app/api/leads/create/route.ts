import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from("leads").insert({
    workspace_id: body.workspace_id,
    site_id: body.site_id,
    name: body.name,
    phone: body.phone,
    message: body.message,
    status: "new",
  });
  return NextResponse.json({ data, error });
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
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
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

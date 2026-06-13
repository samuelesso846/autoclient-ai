import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { sitePrompt } from "@/lib/prompts/site";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: sitePrompt(body.business) }],
    });
    const json = JSON.parse(completion.choices[0].message.content!);
    const { data } = await supabaseAdmin
      .from("sites")
      .insert({ workspace_id: body.workspace_id, business_id: body.business_id, content_json: json, slug: body.slug || crypto.randomUUID() })
      .select()
      .single();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

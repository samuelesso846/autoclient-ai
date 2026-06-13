import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { businessPrompt } from "@/lib/prompts/business";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: businessPrompt(body) }],
    });
    const json = JSON.parse(completion.choices[0].message.content!);
    await supabaseAdmin.from("businesses").insert({ workspace_id: body.workspace_id, data_json: json });
    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

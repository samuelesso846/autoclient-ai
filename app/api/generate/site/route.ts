import { NextResponse } from "next/server";
import OpenAI from "openai";
import { sitePrompt } from "@/lib/prompts/site";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const body = await req.json();
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
}

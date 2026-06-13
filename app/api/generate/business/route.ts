import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { businessPrompt } from "@/lib/prompts/business";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: businessPrompt(body) }],
  });
  const json = JSON.parse(completion.choices[0].message.content!);
  await supabaseAdmin.from("businesses").insert({ workspace_id: body.workspace_id, data_json: json });
  return NextResponse.json(json);
}

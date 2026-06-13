import { NextResponse } from "next/server";
import OpenAI from "openai";
import { agentPrompt } from "@/lib/prompts/agent";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const body = await req.json();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: agentPrompt(body.message) }],
  });
  const reply = completion.choices[0].message.content;
  if (body.workspace_id) {
    await supabaseAdmin.from("leads").insert({ workspace_id: body.workspace_id, name: "AI Lead", phone: "unknown", message: body.message, status: "new" });
  }
  return NextResponse.json({ reply });
}

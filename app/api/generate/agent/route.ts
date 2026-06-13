import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { agentPrompt } from "@/lib/prompts/agent";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: agentPrompt(body.message) }],
    });
    const reply = completion.choices[0].message.content;
    if (body.workspace_id) {
      await supabaseAdmin.from("leads").insert({ workspace_id: body.workspace_id, name: "AI Lead", phone: "unknown", message: body.message, status: "new" });
    }
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const events: any[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    events.push({ ...body, date: new Date() });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

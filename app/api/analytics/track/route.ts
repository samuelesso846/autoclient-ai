import { NextResponse } from "next/server";

let events: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  events.push({ ...body, date: new Date() });
  return NextResponse.json({ success: true });
}

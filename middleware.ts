import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isBuilder = req.nextUrl.pathname.startsWith("/builder");
  const isAgent = req.nextUrl.pathname.startsWith("/agent");

  if (isDashboard || isBuilder || isAgent) {
    const token = req.cookies.get("sb-access-token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

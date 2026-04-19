import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshCookie = request.cookies.get("refreshToken");
  const isAuthed = Boolean(refreshCookie?.value);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/transactions") || pathname.startsWith("/budget-goals") || pathname.startsWith("/reports") || pathname.startsWith("/settings")) {
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (PUBLIC_AUTH_ROUTES.includes(pathname) && isAuthed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/budget-goals/:path*", "/reports/:path*", "/settings/:path*", "/login", "/register"],
};

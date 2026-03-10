import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

  const isAuth = req.cookies.get("isAuthenticated")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
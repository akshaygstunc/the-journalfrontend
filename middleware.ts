import { NextRequest, NextResponse } from "next/server";

function isAuthenticated(req: NextRequest) {
  return req.cookies.get("admin-auth")?.value === "true";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow login page without auth
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ Protect other admin routes
//   if (!isAuthenticated(req)) {
//     return NextResponse.redirect(
//       new URL("/admin/login", req.url)
//     );
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Example: Replace with real authentication logic
  const { password } = await req.json();
  if (password === "admin123") {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}

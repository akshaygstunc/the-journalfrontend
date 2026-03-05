import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Remove the admin-auth cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-auth", "", { path: "/", maxAge: 0 });
  return res;
}

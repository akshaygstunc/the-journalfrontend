import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });

  res.cookies.set("isAuthenticated", "", {path: "/", maxAge: 0 });
  res.cookies.set("role", "", { maxAge: 0 });

  return res;
}
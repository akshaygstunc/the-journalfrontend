import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const { username, password } = await req.json();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "editor", password: "editor123", role: "editor" },
    { username: "reporter", password: "reporter123", role: "reporter" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {

    const res = NextResponse.json({
      success: true,
      role: user.role,
    });

    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
    });

    res.cookies.set("role", user.role, {
      httpOnly: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      title: "Heavy Rains Causes Flooding in Mumbai",
      subHeadline: "Flooding reported in Mumbai",
      status: "upcoming",
      createdAt: new Date().toISOString(),
    },
  ]);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(body);
}
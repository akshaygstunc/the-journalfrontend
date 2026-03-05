import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import News from "@/src/models/News";

export async function GET() {
  await connectDB();

  const news = await News.find();

  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const body = await req.json();

  await connectDB();

  const news = await News.create(body);

  return NextResponse.json(news);
}
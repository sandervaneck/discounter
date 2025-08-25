// File: src/app/api/auth/me-debug/route.ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("🚨 COOKIE HEADER:", req.headers.get("cookie"));
  console.log("🚨 SESSION:", session);

  return NextResponse.json({ session });
}

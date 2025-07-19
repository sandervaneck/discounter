// File: src/app/api/auth/signup/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, userType } = await req.json();

    if (!email || !password || !userType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType,
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, userType: user.userType } });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

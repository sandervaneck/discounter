// File: src/app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, userType, name } = await req.json();

    if (!email || !password || !userType || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
      },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name, userType: user.userType });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
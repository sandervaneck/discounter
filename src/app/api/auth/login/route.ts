import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "../../../../generated/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign({ id: user.id, email: user.email, userType: user.userType }, process.env.AUTH_SECRET!, {
    expiresIn: '1h',
  });

  const response = NextResponse.json({ message: 'Logged in' });
  response.cookies.set({
    name: 'auth-token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 3600, // 1 hour
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  

  return response;
}

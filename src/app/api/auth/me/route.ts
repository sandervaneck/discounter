
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
    console.log("SESSION (prod):", session);
    
  console.log('SECRET:', process.env.NEXTAUTH_SECRET);
  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader
    ?.split(';')
    .find((c) => c.trim().startsWith('auth-token='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    return NextResponse.json({
      id: (payload as any).id,
      email: (payload as any).email,
      userType: (payload as any).userType,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}


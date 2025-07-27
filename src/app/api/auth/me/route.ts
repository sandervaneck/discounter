import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
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


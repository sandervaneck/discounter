import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') ?? '';
  const restaurants = await prisma.user.findMany({
    where: {
      userType: 'business',
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    select: { id: true, name: true },
    take: 10,
  });
  return NextResponse.json(restaurants);
}

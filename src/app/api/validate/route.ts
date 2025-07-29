import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { restaurantId } = await req.json();
  if (!restaurantId) {
    return NextResponse.json({ error: 'Restaurant id required' }, { status: 400 });
  }

  const restaurant = await prisma.user.findFirst({
    where: { id: Number(restaurantId), userType: 'business' },
    select: { id: true, name: true },
  });

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
  }

  // Placeholder validation logic
  const result = {
    username: session.user.name || 'unknown',
    views: 18200,
    likes: 2400,
    comments: 310,
    reposts: 120,
    discount: '30%',
    items: ['Focaccia Truffle', 'Focaccia Caprese'],
    restaurant: restaurant.name,
    code: 'DISCOUNT-ER-18200',
  };

  return NextResponse.json(result);
}

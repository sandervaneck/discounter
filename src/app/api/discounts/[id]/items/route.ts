// File: src/app/api/discounts/[id]/items/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export type ParamsType = Promise<{ id: string }>;


export async function GET(props : {params: ParamsType}) { 
    const { id } = await props.params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.userType !== 'business') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const discountId = parseInt(id, 10);
  if (isNaN(discountId)) {
    return NextResponse.json({ error: 'Invalid discount ID' }, { status: 400 });
  }

  try {
    const items = await prisma.discountCodeItem.findMany({
      where: {
        discountCodeId: discountId,
        item: {
          restaurant: {
            email: session.user.email,
          },
        },
      },
      include: {
        item: true,
      },
    });

    const result = items.map((entry) => entry.item);
    return NextResponse.json(result);
  } catch (err) {
    console.error('GET /api/discounts/[id]/items error:', err);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

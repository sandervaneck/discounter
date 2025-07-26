// discounter/src/app/api/items/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { PrismaClient } from '@/generated/client';

const prisma = new PrismaClient();

// GET: fetch all items for authenticated business user
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== 'business') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await prisma.item.findMany({
      where: { restaurant: { email: session.user.email } },
    });
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/items error:', err);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST: create new item
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== 'business') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid item name' }, { status: 400 });
    }

    const newItem = await prisma.item.create({
      data: {
        name,
        restaurant: { connect: { email: session.user.email } },
      },
    });

    return NextResponse.json(newItem);
  } catch (err) {
    console.error('POST /api/items error:', err);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

// DELETE: remove an item and its associations
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== 'business') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = parseInt(body.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid item id' }, { status: 400 });
    }

    const item = await prisma.item.findFirst({
      where: { id, restaurant: { email: session.user.email } },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await prisma.discountCodeItem.deleteMany({ where: { itemId: id } });
    await prisma.item.delete({ where: { id } });

    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/items error:', err);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

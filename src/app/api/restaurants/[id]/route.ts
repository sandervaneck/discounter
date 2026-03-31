import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id)) {
    return NextResponse.json(
      { error: 'Invalid restaurant id' },
      { status: 400 }
    );
  }

  const restaurant = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      userType: true,
      restaurantProfile: {
        select: {
          restaurantName: true,
          street: true,
          streetNumber: true,
          zipCode: true,
          city: true,
          country: true,
          contactEmail: true,
          instagramUsername: true,
          tiktokUsername: true,
        },
      },
    },
  });

  if (!restaurant || restaurant.userType !== 'business') {
    return NextResponse.json(
      { error: 'Restaurant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: restaurant.id,
    name: restaurant.name,
    profile: restaurant.restaurantProfile,
  });
}

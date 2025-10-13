import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/client';
import { getInstagramReelInfo } from '@/lib/instagram';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const BodySchema = z.object({
    restaurantId: z.union([z.string(), z.number()]),
    platform: z.enum(['instagram', 'tiktok']),
    reelLink: z.string().optional(),
  });

  let payload;
  try {
    payload = BodySchema.parse(await req.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? 'Invalid request' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const restaurantId = Number(payload.restaurantId);
  if (Number.isNaN(restaurantId)) {
    return NextResponse.json({ error: 'Restaurant id required' }, { status: 400 });
  }

  const restaurant = await prisma.user.findFirst({
    where: { id: Number(restaurantId), userType: 'business' },
    select: { id: true, name: true },
  });

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
  }

  if (payload.platform === 'instagram') {
    if (!payload.reelLink) {
      return NextResponse.json({ error: 'Instagram reel link is required.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: {
        instagramToken: true,
        instagramUserId: true,
        instagramConnected: true,
      },
    });

    if (!user || !user.instagramConnected || !user.instagramToken || !user.instagramUserId) {
      return NextResponse.json(
        { error: 'Connect your Instagram account before submitting a reel.' },
        { status: 400 }
      );
    }

    const info = await getInstagramReelInfo({
      igUserId: user.instagramUserId,
      accessToken: user.instagramToken,
      reelUrl: payload.reelLink,
    });

    return NextResponse.json({
      platform: payload.platform,
      username: session.user.name || 'unknown',
      restaurant: restaurant.name,
      mediaId: info.mediaId,
      caption: info.caption,
      permalink: info.permalink,
      views: info.views,
    });
  }

  return NextResponse.json({
    platform: payload.platform,
    username: session.user.name || 'unknown',
    restaurant: restaurant.name,
    message: 'TikTok verification is not yet implemented.',
  });
}

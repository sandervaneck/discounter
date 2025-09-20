// File: src/app/api/auth/instagram/refresh/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.instagramToken) {
      return NextResponse.json({ error: 'No Instagram token found' }, { status: 404 });
    }

    // Refresh the long-lived token (Instagram tokens can be refreshed)
    const refreshResponse = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${user.instagramToken}`);

    if (!refreshResponse.ok) {
      const error = await refreshResponse.text();
      console.error('Instagram token refresh failed:', error);
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 400 });
    }

    const refreshData = await refreshResponse.json();

    // Update the user's token in the database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        instagramToken: refreshData.access_token,
        tokenExpiresAt: new Date(Date.now() + refreshData.expires_in * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      expiresAt: updatedUser.tokenExpiresAt,
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
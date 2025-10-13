import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@/generated/client";
import { getInstagramReelInfo } from "@/lib/instagram";

const prisma = new PrismaClient();

const InputSchema = z.object({
  reelUrl: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reelUrl } = InputSchema.parse(await req.json());
    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        instagramToken: true,
        instagramUserId: true,
        instagramConnected: true,
      },
    });

    if (!user || !user.instagramConnected || !user.instagramToken || !user.instagramUserId) {
      return NextResponse.json(
        { error: "Instagram account is not connected for this user." },
        { status: 400 }
      );
    }

    const info = await getInstagramReelInfo({
      igUserId: user.instagramUserId,
      accessToken: user.instagramToken,
      reelUrl,
    });

    return NextResponse.json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    console.error("Instagram reel lookup failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

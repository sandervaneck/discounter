// src/app/api/discounts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { DiscountStatus, PrismaClient } from "../../../generated/client";
import { authOptions } from "@/lib/auth";
import { getInstagramReelInfo } from "@/lib/instagram";

const prisma = new PrismaClient();

async function enrichDiscountWithVerification(discount: any) {
  if (!Array.isArray(discount?.redemptions) || discount.redemptions.length === 0) {
    return discount;
  }

  const enrichedRedemptions = await Promise.all(
    discount.redemptions.map(async (redemption: any) => {
      if (!redemption || redemption.status !== DiscountStatus.requested) {
        return { ...redemption };
      }

      const influencerId = Number(
        (redemption as any).influencerId ?? redemption.influencer?.id ?? redemption.influencerId
      );

      if (!influencerId) {
        return {
          ...redemption,
          verification: {
            error: "Missing influencer information for this request.",
          },
        };
      }

      const influencer = await prisma.user.findUnique({
        where: { id: influencerId },
        select: {
          instagramToken: true,
          instagramUserId: true,
          instagramConnected: true,
          url: true,
        },
      });

      if (!influencer || !influencer.instagramConnected || !influencer.instagramToken || !influencer.instagramUserId) {
        return {
          ...redemption,
          verification: {
            error: "Influencer Instagram account is not connected.",
            reelUrl: influencer?.url ?? null,
          },
        };
      }

      if (!influencer.url) {
        return {
          ...redemption,
          verification: {
            error: "No Instagram reel link submitted for this request yet.",
            reelUrl: null,
          },
        };
      }

      try {
        const info = await getInstagramReelInfo({
          igUserId: influencer.instagramUserId,
          accessToken: influencer.instagramToken,
          reelUrl: influencer.url,
        });

        return {
          ...redemption,
          verification: {
            mediaId: info.mediaId,
            caption: info.caption,
            permalink: info.permalink,
            reelUrl: influencer.url,
            metrics: {
              views: info.views,
              likes: info.likes,
              comments: info.comments,
              shares: info.shares,
            },
            fetchedAt: info.fetchedAt,
          },
        };
      } catch (error) {
        console.error("Failed to resolve Instagram metrics for redemption", {
          redemptionId: redemption.id,
          influencerId,
          error,
        });

        return {
          ...redemption,
          verification: {
            error:
              error instanceof Error
                ? error.message
                : "Unable to fetch Instagram metrics for this request.",
            reelUrl: influencer.url,
          },
        };
      }
    })
  );

  return { ...discount, redemptions: enrichedRedemptions };
}

export async function GET(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("restaurantId");
  if (restaurantId) {
    try {
      const discounts = await prisma.discountCode.findMany({
        where: { restaurantId: Number(restaurantId) },
        orderBy: { code: 'asc' },
        include: {
          applicableItems: {
            include: { item: true },
          },
          redemptions: {
            include: {
              influencer: {
                select: { id: true, name: true, email: true, url: true },
              },
            },
          },
        },
      });
      const enriched = await Promise.all(discounts.map(enrichDiscountWithVerification));
      return NextResponse.json(enriched);
    } catch (err) {
      console.error("Error fetching discounts by restaurant:", err);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  const session = await getServerSession(authOptions);
  console.log("Fetching discounts for session:", session);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const discounts = await prisma.discountCode.findMany({
      where: { restaurant: { email: session.user.email } },
      orderBy: { code: 'asc' },
    include: {
      applicableItems: {
        include: { item: true },
      },
      redemptions: {
        include: {
          influencer: {
            select: { id: true, name: true, email: true, url: true },
          },
        },
      },
    },
    });
    const enriched = await Promise.all(discounts.map(enrichDiscountWithVerification));
    return NextResponse.json(enriched);
  } catch (err) {
    console.error("Error fetching discounts:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("Creating discount for session:", session);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      code,
      activationTime,
      expirationTime,
      discountPercent,
      requirements,
      applicableItemIds,
      status 
    } = body;

    if (
      typeof code !== "string" ||
      !code.trim() ||
      typeof discountPercent !== "number" ||
      typeof requirements !== "string" ||
      isNaN(Date.parse(activationTime)) ||
      isNaN(Date.parse(expirationTime)) ||
      !Array.isArray(applicableItemIds) ||
      applicableItemIds.length === 0
    ) {
      console.log("Invalid payload:", body);
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
    }
    const parsedStatus = status ? (status.toLowerCase() as DiscountStatus) : DiscountStatus.available;

    // Extract only item IDs
    const itemIds: number[] = applicableItemIds
      .map((item: any) => (typeof item === "object" && "id" in item ? item.id : Number(item)))
      .filter((id) => !isNaN(id));

    const discount = await prisma.discountCode.create({
      data: {
        code,
        activationTime: new Date(activationTime),
        expirationTime: new Date(expirationTime),
        discountPercent,
        requirements: JSON.parse(requirements),
        restaurant: { connect: { email: session.user.email } },
        status: parsedStatus,
      },
    });

    await prisma.discountCodeItem.createMany({
      data: itemIds.map((itemId) => ({ discountCodeId: discount.id, itemId })),
    });

    return NextResponse.json(discount);
  } catch (err) {
    console.error("Error creating discount:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const discountId = parseInt(body.id, 10);

    if (isNaN(discountId)) {
      return NextResponse.json({ error: "Invalid discount id" }, { status: 400 });
    }

    const exists = await prisma.discountCode.findFirst({
      where: { id: discountId, restaurant: { email: session.user.email } },
    });

    if (!exists) {
      return NextResponse.json({ error: "Discount not found" }, { status: 404 });
    }

    await prisma.discountCodeItem.deleteMany({
      where: { discountCodeId: discountId },
    });
    await prisma.redemption.deleteMany({
      where: { discountCodeId: discountId },
    });

    await prisma.discountCode.delete({ where: { id: discountId } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting discount:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      code,
      expirationTime,
      discountPercent,
      requirements,
      applicableItemIds,
      status,
    } = body;

    const discountId = parseInt(id, 10);

    if (
      isNaN(discountId) ||
      typeof code !== "string" ||
      !code.trim() ||
      typeof discountPercent !== "number" ||
      typeof requirements !== "string" ||
      isNaN(Date.parse(expirationTime)) ||
      !Array.isArray(applicableItemIds) ||
      applicableItemIds.length === 0
    ) {
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
    }

    const existing = await prisma.discountCode.findFirst({
      where: { id: discountId, restaurant: { email: session.user.email } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Discount not found" }, { status: 404 });
    }

    const itemIds: number[] = applicableItemIds
      .map((item: any) => (typeof item === "object" && "id" in item ? item.id : Number(item)))
      .filter((i) => !isNaN(i));

    const updated = await prisma.discountCode.update({
      where: { id: discountId },
      data: {
        code,
        expirationTime: new Date(expirationTime),
        discountPercent,
        requirements: JSON.parse(requirements),
        status: (status ?? existing.status).toLowerCase() as DiscountStatus,
      },
    });

    await prisma.discountCodeItem.deleteMany({ where: { discountCodeId: discountId } });
    await prisma.discountCodeItem.createMany({
      data: itemIds.map((itemId) => ({ discountCodeId: discountId, itemId })),
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating discount:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

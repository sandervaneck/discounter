// src/app/api/discounts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { DiscountStatus, PrismaClient } from "../../../generated/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("restaurantId");
  if (restaurantId) {
    try {
      const discounts = await prisma.discountCode.findMany({
        where: { restaurantId: Number(restaurantId) },
        include: {
          applicableItems: {
            include: { item: true },
          },
        },
      });
      return NextResponse.json(discounts);
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
      include: {
        applicableItems: {
          include: { item: true },
        },
      },
    });
    return NextResponse.json(discounts);
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

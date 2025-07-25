// src/app/api/discounts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "../../../generated/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
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

    // Extract only item IDs
    const itemIds: number[] = applicableItemIds.map((item: any) =>
      typeof item === "object" && 'id' in item ? item.id : Number(item)
    ).filter((id) => !isNaN(id));

    const discount = await prisma.discountCode.create({
      data: {
        code,
        activationTime: new Date(activationTime),
        expirationTime: new Date(expirationTime),
        discountPercent,
        requirements: JSON.parse(requirements),
        restaurant: { connect: { email: session.user.email } },
        applicableItems: {
          create: itemIds.map((id) => ({
            item: { connect: { id } },
          })),
        },
      },
    });

    return NextResponse.json(discount);
  } catch (err) {
    console.error("Error creating discount:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

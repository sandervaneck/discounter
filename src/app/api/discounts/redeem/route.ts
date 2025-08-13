import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient, DiscountStatus } from "@/generated/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.userType !== "influencer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { codeId } = await req.json();
  if (!codeId) {
    return NextResponse.json({ error: "codeId required" }, { status: 400 });
  }

  const discount = await prisma.discountCode.findUnique({
    where: { id: Number(codeId) },
    include: {
      applicableItems: {
        include: { item: true },
      },
    },
  });

  if (!discount) {
    return NextResponse.json({ error: "Discount not found" }, { status: 404 });
  }

  if (discount.status !== DiscountStatus.available) {
    return NextResponse.json({ error: "Discount not available" }, { status: 400 });
  }

  await prisma.discountCode.update({
    where: { id: discount.id },
    data: { status: DiscountStatus.awarded },
  });

  await prisma.redemption.create({
    data: {
      influencerId: Number(session.user.id),
      discountCodeId: discount.id,
      status: DiscountStatus.awarded,
      redeemedAt: new Date(),
    },
  });

  return NextResponse.json(discount);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { codeId } = await req.json();
  if (!codeId) {
    return NextResponse.json({ error: "codeId required" }, { status: 400 });
  }

  const discount = await prisma.discountCode.findUnique({
    where: { id: Number(codeId) },
  });

  if (!discount) {
    return NextResponse.json({ error: "Discount not found" }, { status: 404 });
  }

  if (discount.status !== DiscountStatus.awarded) {
    return NextResponse.json({ error: "Discount not awarded" }, { status: 400 });
  }

  await prisma.discountCode.update({
    where: { id: discount.id },
    data: { status: DiscountStatus.used },
  });

  await prisma.redemption.updateMany({
    where: { discountCodeId: discount.id, status: DiscountStatus.awarded },
    data: { status: DiscountStatus.used, redeemedAt: new Date() },
  });

  return NextResponse.json({ message: "Discount marked as used" });
}

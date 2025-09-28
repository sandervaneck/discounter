import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient, DiscountStatus } from "@/generated/client";

const prisma = new PrismaClient();

const discountInclude = {
  applicableItems: {
    include: {
      item: true,
    },
  },
  redemptions: {
    include: {
      influencer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.userType !== "influencer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { codeId, action } = body ?? {};
  const parsedCodeId = Number(codeId);

  if (!codeId || Number.isNaN(parsedCodeId)) {
    return NextResponse.json({ error: "codeId required" }, { status: 400 });
  }

  const influencerId = Number(session.user.id);

  if (action === "cancel") {
    const existing = await prisma.redemption.findFirst({
      where: {
        influencerId,
        discountCodeId: parsedCodeId,
        status: DiscountStatus.requested,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "No active request for this code" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.redemption.delete({ where: { id: existing.id } });
      await tx.discountCode.update({
        where: { id: parsedCodeId },
        data: { status: DiscountStatus.available },
      });
    });

    const discount = await prisma.discountCode.findUnique({
      where: { id: parsedCodeId },
      include: discountInclude,
    });

    return NextResponse.json({ discount, cancelled: true });
  }

  const discount = await prisma.discountCode.findUnique({
    where: { id: parsedCodeId },
    include: discountInclude,
  });

  if (!discount) {
    return NextResponse.json({ error: "Discount not found" }, { status: 404 });
  }

  if (discount.status !== DiscountStatus.available) {
    const alreadyRequestedByInfluencer =
      discount.status === DiscountStatus.requested &&
      Array.isArray(discount.redemptions) &&
      discount.redemptions.some((redemption: any) => {
        const requesterId = Number(
          (redemption as any).influencerId ?? redemption.influencer?.id
        );
        return (
          redemption.status === DiscountStatus.requested &&
          requesterId === influencerId
        );
      });

    if (alreadyRequestedByInfluencer) {
      return NextResponse.json({ discount, previousCodeId: parsedCodeId, alreadyRequested: true });
    }

    return NextResponse.json({ error: "Discount not available" }, { status: 400 });
  }

  let previousCodeId: number | null = null;

  await prisma.$transaction(async (tx) => {
    const existingRequest = await tx.redemption.findFirst({
      where: {
        influencerId,
        status: DiscountStatus.requested,
      },
    });

    if (existingRequest) {
      previousCodeId = existingRequest.discountCodeId;
      await tx.discountCode.update({
        where: { id: existingRequest.discountCodeId },
        data: { status: DiscountStatus.available },
      });
      await tx.redemption.delete({ where: { id: existingRequest.id } });
    }

    await tx.discountCode.update({
      where: { id: parsedCodeId },
      data: { status: DiscountStatus.requested },
    });

    await tx.redemption.create({
      data: {
        influencerId,
        discountCodeId: parsedCodeId,
        status: DiscountStatus.requested,
      },
    });
  });

  const updatedDiscount = await prisma.discountCode.findUnique({
    where: { id: parsedCodeId },
    include: discountInclude,
  });

  return NextResponse.json({ discount: updatedDiscount, previousCodeId });
}

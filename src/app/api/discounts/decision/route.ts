import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DiscountStatus, PrismaClient } from "@/generated/client";

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
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const { codeId, decision } = body ?? {};
  const parsedCodeId = Number(codeId);

  if (!codeId || Number.isNaN(parsedCodeId) || !["approve", "reject"].includes(decision)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    if (decision === "approve") {
      const updatedDiscount = await prisma.$transaction(async (tx) => {
        await tx.redemption.updateMany({
          where: { discountCodeId: parsedCodeId, status: DiscountStatus.requested },
          data: { status: DiscountStatus.awarded },
        });

        return tx.discountCode.update({
          where: { id: parsedCodeId },
          data: { status: DiscountStatus.awarded },
          include: discountInclude,
        });
      });

      return NextResponse.json({ discount: updatedDiscount });
    }

    const updatedDiscount = await prisma.$transaction(async (tx) => {
      await tx.redemption.deleteMany({
        where: { discountCodeId: parsedCodeId },
      });

      return tx.discountCode.update({
        where: { id: parsedCodeId },
        data: { status: DiscountStatus.available },
        include: discountInclude,
      });
    });

    return NextResponse.json({ discount: updatedDiscount });
  } catch (error) {
    console.error("Failed to update discount decision", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

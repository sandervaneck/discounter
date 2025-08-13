import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@/generated/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.userType !== "influencer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redemptions = await prisma.redemption.findMany({
    where: { influencerId: Number(session.user.id) },
    include: {
      discountCode: {
        include: {
          applicableItems: {
            include: { item: true },
          },
        },
      },
    },
  });

  const discounts = redemptions.map((r) => r.discountCode);
  return NextResponse.json(discounts);
}

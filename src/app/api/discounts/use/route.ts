import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient, DiscountStatus } from "@/generated/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["restaurant", "business"].includes(session.user.userType)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { codeId } = await req.json();
  if (!codeId) {
    return NextResponse.json({ error: "codeId required" }, { status: 400 });
  }

  try {
    const discount = await prisma.discountCode.update({
      where: { id: Number(codeId) },
      data: { status: DiscountStatus.used },
    });

    await prisma.redemption.updateMany({
      where: { discountCodeId: Number(codeId) },
      data: { status: DiscountStatus.used, redeemedAt: new Date() },
    });

    return NextResponse.json(discount);
  } catch (err) {
    console.error("Error using discount:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

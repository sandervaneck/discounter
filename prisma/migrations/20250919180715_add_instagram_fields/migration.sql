-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('influencer', 'business');

-- CreateEnum
CREATE TYPE "public"."DiscountStatus" AS ENUM ('available', 'awarded', 'used', 'expired');

-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('Instagram', 'TikTok');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userType" "public"."UserType" NOT NULL,
    "url" TEXT NOT NULL DEFAULT 'https://www.instagram.com/',
    "instagramToken" TEXT,
    "instagramUserId" TEXT,
    "instagramUsername" TEXT,
    "instagramConnected" BOOLEAN NOT NULL DEFAULT false,
    "tokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiscountCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "activationTime" TIMESTAMP(3) NOT NULL,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "discountPercent" DOUBLE PRECISION NOT NULL,
    "requirements" JSONB NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "status" "public"."DiscountStatus" NOT NULL DEFAULT 'available',

    CONSTRAINT "DiscountCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiscountCodeItem" (
    "id" SERIAL NOT NULL,
    "discountCodeId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "DiscountCodeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Redemption" (
    "id" SERIAL NOT NULL,
    "influencerId" INTEGER NOT NULL,
    "discountCodeId" INTEGER NOT NULL,
    "status" "public"."DiscountStatus" NOT NULL,
    "redeemedAt" TIMESTAMP(3),

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DiscountCode_code_key" ON "public"."DiscountCode"("code");

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiscountCode" ADD CONSTRAINT "DiscountCode_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiscountCodeItem" ADD CONSTRAINT "DiscountCodeItem_discountCodeId_fkey" FOREIGN KEY ("discountCodeId") REFERENCES "public"."DiscountCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiscountCodeItem" ADD CONSTRAINT "DiscountCodeItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Redemption" ADD CONSTRAINT "Redemption_discountCodeId_fkey" FOREIGN KEY ("discountCodeId") REFERENCES "public"."DiscountCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Redemption" ADD CONSTRAINT "Redemption_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

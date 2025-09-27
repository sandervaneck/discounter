-- Add requested status to DiscountStatus enum
ALTER TYPE "public"."DiscountStatus" ADD VALUE IF NOT EXISTS 'requested';

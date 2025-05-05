/*
  Warnings:

  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "service_request" ADD COLUMN     "image_upload" TEXT;

-- DropTable
DROP TABLE "review";

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

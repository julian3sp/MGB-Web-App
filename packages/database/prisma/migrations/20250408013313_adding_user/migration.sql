/*
  Warnings:

  - Made the column `employee_id` on table `service_request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey

-- AlterTable


-- CreateTable
CREATE TABLE "User" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey

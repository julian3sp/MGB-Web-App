/*
  Warnings:

  - Made the column `employee_id` on table `service_request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "service_request" DROP CONSTRAINT "service_request_employee_id_fkey";

-- AlterTable
ALTER TABLE "service_request" ADD COLUMN     "assigned_employee" TEXT,
ALTER COLUMN "employee_id" SET NOT NULL,
ALTER COLUMN "language" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Directory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Directory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_assigned_employee_fkey" FOREIGN KEY ("assigned_employee") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

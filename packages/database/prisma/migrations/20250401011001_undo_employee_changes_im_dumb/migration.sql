/*
  Warnings:

  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "language_request" DROP CONSTRAINT "language_request_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee" DROP CONSTRAINT "employee_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "language_request" ALTER COLUMN "employee_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "language_request" ADD CONSTRAINT "language_request_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

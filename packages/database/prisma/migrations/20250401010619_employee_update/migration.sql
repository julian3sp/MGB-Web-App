/*
  Warnings:

  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `employee_id` column on the `language_request` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "language_request" DROP CONSTRAINT "language_request_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee" DROP CONSTRAINT "employee_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "language_request" DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" INTEGER;

-- AddForeignKey
ALTER TABLE "language_request" ADD CONSTRAINT "language_request_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

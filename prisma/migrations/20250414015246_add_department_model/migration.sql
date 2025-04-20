/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Directory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_request" DROP CONSTRAINT "service_request_assigned_employee_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Directory";

-- DropTable
DROP TABLE "employee";

-- DropTable
DROP TABLE "service_request";

-- DropTable
DROP TABLE "users";

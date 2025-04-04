/*
  Warnings:

  - You are about to drop the `language_request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "language_request" DROP CONSTRAINT "language_request_employee_id_fkey";

-- DropTable
DROP TABLE "language_request";

-- CreateTable
CREATE TABLE "service_requests" (
    "request_id" SERIAL NOT NULL,
    "room_num" INTEGER NOT NULL,
    "request_type" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("request_id")
);

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

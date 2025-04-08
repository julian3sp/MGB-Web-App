/*
  Warnings:

  - You are about to drop the `service_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service_requests" DROP CONSTRAINT "service_requests_employee_id_fkey";

-- DropTable
DROP TABLE "service_requests";

-- CreateTable
CREATE TABLE "service_request" (
    "request_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "room_num" INTEGER NOT NULL,
    "request_type" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,
    "language" TEXT NOT NULL,

    CONSTRAINT "service_request_pkey" PRIMARY KEY ("request_id")
);

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

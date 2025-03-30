-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language_request" (
    "request_id" SERIAL NOT NULL,
    "room_num" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "employee_id" TEXT,

    CONSTRAINT "language_request_pkey" PRIMARY KEY ("request_id")
);

-- AddForeignKey
ALTER TABLE "language_request" ADD CONSTRAINT "language_request_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

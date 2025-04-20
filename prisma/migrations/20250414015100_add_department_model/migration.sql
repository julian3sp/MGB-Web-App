-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_request" (
    "request_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "room_num" INTEGER NOT NULL,
    "request_type" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT NOT NULL,
    "additional_comments" TEXT,
    "assigned_employee" TEXT,
    "language" TEXT,

    CONSTRAINT "service_request_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Directory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Directory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_name" TEXT NOT NULL,
    "speciality_and_services" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_name")
);

-- AddForeignKey
ALTER TABLE "service_request" ADD CONSTRAINT "service_request_assigned_employee_fkey" FOREIGN KEY ("assigned_employee") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

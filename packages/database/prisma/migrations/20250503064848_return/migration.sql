/*
  Warnings:

  - You are about to drop the column `email` on the `service_request` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `service_request` table. All the data in the column will be lost.
  - You are about to drop the column `phone_num` on the `service_request` table. All the data in the column will be lost.
  - You are about to drop the column `room_num` on the `service_request` table. All the data in the column will be lost.
  - You are about to drop the `Directory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `department` to the `service_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `service_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `service_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `service_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_request" DROP COLUMN "email",
DROP COLUMN "language",
DROP COLUMN "phone_num",
DROP COLUMN "room_num",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "Directory";

-- CreateTable
CREATE TABLE "Sanitation" (
    "request_id" SERIAL NOT NULL,
    "cleaningType" TEXT NOT NULL,
    "contaminant" TEXT,
    "sanitationId" INTEGER NOT NULL,

    CONSTRAINT "Sanitation_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Language" (
    "request_id" SERIAL NOT NULL,
    "sourceLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Transportation" (
    "request_id" SERIAL NOT NULL,
    "transportationType" TEXT NOT NULL,
    "transportationDestination" TEXT NOT NULL,
    "transportationId" INTEGER NOT NULL,

    CONSTRAINT "Transportation_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "AudioVisual" (
    "request_id" SERIAL NOT NULL,
    "accommodationType" TEXT NOT NULL,
    "accommodationDetails" TEXT,
    "audioVisualId" INTEGER NOT NULL,

    CONSTRAINT "AudioVisual_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Security" (
    "request_id" SERIAL NOT NULL,
    "accessZones" TEXT NOT NULL,
    "securityIssue" TEXT NOT NULL,
    "securityId" INTEGER NOT NULL,

    CONSTRAINT "Security_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "MedicalDevice" (
    "request_id" SERIAL NOT NULL,
    "device" TEXT NOT NULL,
    "operatorRequired" TEXT NOT NULL,
    "medicalDeviceId" INTEGER NOT NULL,

    CONSTRAINT "MedicalDevice_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "Facilities" (
    "request_id" SERIAL NOT NULL,
    "maintenanceType" TEXT NOT NULL,
    "equipmentType" TEXT NOT NULL,
    "facilitiesID" INTEGER NOT NULL,

    CONSTRAINT "Facilities_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "AlgoType" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "algoType" TEXT NOT NULL DEFAULT 'A-Star',

    CONSTRAINT "AlgoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "directory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "employee" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "building" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "name" TEXT,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "edgeCost" INTEGER NOT NULL DEFAULT 0,
    "totalCost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sanitation_sanitationId_key" ON "Sanitation"("sanitationId");

-- CreateIndex
CREATE UNIQUE INDEX "Language_languageId_key" ON "Language"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Transportation_transportationId_key" ON "Transportation"("transportationId");

-- CreateIndex
CREATE UNIQUE INDEX "AudioVisual_audioVisualId_key" ON "AudioVisual"("audioVisualId");

-- CreateIndex
CREATE UNIQUE INDEX "Security_securityId_key" ON "Security"("securityId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalDevice_medicalDeviceId_key" ON "MedicalDevice"("medicalDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Facilities_facilitiesID_key" ON "Facilities"("facilitiesID");

-- AddForeignKey
ALTER TABLE "Sanitation" ADD CONSTRAINT "Sanitation_sanitationId_fkey" FOREIGN KEY ("sanitationId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_transportationId_fkey" FOREIGN KEY ("transportationId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioVisual" ADD CONSTRAINT "AudioVisual_audioVisualId_fkey" FOREIGN KEY ("audioVisualId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalDevice" ADD CONSTRAINT "MedicalDevice_medicalDeviceId_fkey" FOREIGN KEY ("medicalDeviceId") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facilities" ADD CONSTRAINT "Facilities_facilitiesID_fkey" FOREIGN KEY ("facilitiesID") REFERENCES "service_request"("request_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

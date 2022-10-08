/*
  Warnings:

  - The primary key for the `CCTV_System` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "CCTV_System" DROP CONSTRAINT "CCTV_System_userId_fkey";

-- AlterTable
ALTER TABLE "CCTV_System" DROP CONSTRAINT "CCTV_System_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CCTV_System_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CCTV_System_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Mobile_Device" (
    "id" TEXT NOT NULL,
    "systemId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Mobile_Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intrusion" (
    "id" TEXT NOT NULL,
    "occuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "systemId" TEXT NOT NULL,

    CONSTRAINT "Intrusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intrusion_Image" (
    "intrusionId" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Intrusion_Video" (
    "video" TEXT NOT NULL,
    "intrusionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mobile_Device_ownerId_key" ON "Mobile_Device"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Mobile_Device_id_ownerId_key" ON "Mobile_Device"("id", "ownerId");

-- CreateIndex
CREATE INDEX "Intrusion_systemId_idx" ON "Intrusion"("systemId");

-- CreateIndex
CREATE UNIQUE INDEX "Intrusion_Image_image_key" ON "Intrusion_Image"("image");

-- CreateIndex
CREATE INDEX "Intrusion_Image_intrusionId_idx" ON "Intrusion_Image"("intrusionId");

-- CreateIndex
CREATE UNIQUE INDEX "Intrusion_Image_intrusionId_image_key" ON "Intrusion_Image"("intrusionId", "image");

-- CreateIndex
CREATE UNIQUE INDEX "Intrusion_Video_video_key" ON "Intrusion_Video"("video");

-- CreateIndex
CREATE UNIQUE INDEX "Intrusion_Video_intrusionId_key" ON "Intrusion_Video"("intrusionId");

-- CreateIndex
CREATE UNIQUE INDEX "Intrusion_Video_video_intrusionId_key" ON "Intrusion_Video"("video", "intrusionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "CCTV_System" ADD CONSTRAINT "CCTV_System_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mobile_Device" ADD CONSTRAINT "Mobile_Device_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "CCTV_System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mobile_Device" ADD CONSTRAINT "Mobile_Device_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intrusion" ADD CONSTRAINT "Intrusion_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "CCTV_System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intrusion_Image" ADD CONSTRAINT "Intrusion_Image_intrusionId_fkey" FOREIGN KEY ("intrusionId") REFERENCES "Intrusion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intrusion_Video" ADD CONSTRAINT "Intrusion_Video_intrusionId_fkey" FOREIGN KEY ("intrusionId") REFERENCES "Intrusion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

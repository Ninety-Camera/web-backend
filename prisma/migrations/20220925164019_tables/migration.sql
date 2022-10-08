/*
  Warnings:

  - Added the required column `cameraCount` to the `CCTV_System` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "System_Status" AS ENUM ('RUNNING', 'STOP');

-- AlterTable
ALTER TABLE "CCTV_System" ADD COLUMN     "cameraCount" INTEGER NOT NULL,
ADD COLUMN     "status" "System_Status" NOT NULL DEFAULT 'STOP';

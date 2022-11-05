/*
  Warnings:

  - You are about to drop the column `userId` on the `CCTV_System` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `CCTV_System` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `CCTV_System` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CCTV_System_userId_key";

-- AlterTable
ALTER TABLE "CCTV_System" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CCTV_System_ownerId_key" ON "CCTV_System"("ownerId");

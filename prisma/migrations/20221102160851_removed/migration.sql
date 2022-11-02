/*
  Warnings:

  - You are about to drop the `Subscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscribers" DROP CONSTRAINT "Subscribers_systemId_fkey";

-- DropForeignKey
ALTER TABLE "Subscribers" DROP CONSTRAINT "Subscribers_userId_fkey";

-- DropTable
DROP TABLE "Subscribers";

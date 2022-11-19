/*
  Warnings:

  - You are about to drop the `Forgot_Codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Forgot_Codes" DROP CONSTRAINT "Forgot_Codes_userId_fkey";

-- DropTable
DROP TABLE "Forgot_Codes";

-- CreateTable
CREATE TABLE "Forgot_Code" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Forgot_Code_token_key" ON "Forgot_Code"("token");

-- AddForeignKey
ALTER TABLE "Forgot_Code" ADD CONSTRAINT "Forgot_Code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

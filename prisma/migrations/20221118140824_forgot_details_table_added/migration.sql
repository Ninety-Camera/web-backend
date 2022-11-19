-- CreateTable
CREATE TABLE "Forgot_Codes" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Forgot_Codes_userId_token_key" ON "Forgot_Codes"("userId", "token");

-- AddForeignKey
ALTER TABLE "Forgot_Codes" ADD CONSTRAINT "Forgot_Codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

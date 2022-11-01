-- CreateTable
CREATE TABLE "Subscribers" (
    "userId" TEXT NOT NULL,
    "systemId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_userId_key" ON "Subscribers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_userId_systemId_key" ON "Subscribers"("userId", "systemId");

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "CCTV_System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

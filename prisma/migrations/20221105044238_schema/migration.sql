-- DropForeignKey
ALTER TABLE "CCTV_System" DROP CONSTRAINT "CCTV_System_userId_fkey";

-- CreateTable
CREATE TABLE "UserSystem" (
    "userId" TEXT NOT NULL,
    "systemId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSystem_userId_key" ON "UserSystem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSystem_systemId_key" ON "UserSystem"("systemId");

-- AddForeignKey
ALTER TABLE "UserSystem" ADD CONSTRAINT "UserSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSystem" ADD CONSTRAINT "UserSystem_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "CCTV_System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

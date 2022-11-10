-- CreateEnum
CREATE TYPE "CAMERA_STATUS" AS ENUM ('RUNNING', 'STOP');

-- CreateEnum
CREATE TYPE "CAMERA_TYPE" AS ENUM ('IP_CAMERA', 'WEB_CAMERA');

-- CreateTable
CREATE TABLE "Camera_Details" (
    "id" TEXT NOT NULL,
    "systemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CAMERA_TYPE" NOT NULL,
    "status" "CAMERA_STATUS" NOT NULL,

    CONSTRAINT "Camera_Details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Camera_Details" ADD CONSTRAINT "Camera_Details_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "CCTV_System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

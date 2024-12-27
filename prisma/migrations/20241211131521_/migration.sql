/*
  Warnings:

  - You are about to drop the column `shopNumber` on the `rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rent" DROP COLUMN "shopNumber",
ADD COLUMN     "propertyId" TEXT;

-- CreateTable
CREATE TABLE "rentProperties" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentProperties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "rentProperties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

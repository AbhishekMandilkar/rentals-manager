/*
  Warnings:

  - You are about to drop the column `rentDueDate` on the `tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rentpayment" ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tenant" DROP COLUMN "rentDueDate";

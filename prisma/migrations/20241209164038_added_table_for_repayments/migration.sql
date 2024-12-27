/*
  Warnings:

  - You are about to drop the column `dateRepayment` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `repaymentMode` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `repayment` table. All the data in the column will be lost.
  - You are about to drop the column `loanId` on the `repayment` table. All the data in the column will be lost.
  - You are about to drop the column `mode` on the `repayment` table. All the data in the column will be lost.
  - You are about to drop the `rentpayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dueDate` to the `repayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceId` to the `repayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceType` to the `repayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rentpayment" DROP CONSTRAINT "rentpayment_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "repayment" DROP CONSTRAINT "repayment_loanId_fkey";

-- AlterTable
ALTER TABLE "loan" DROP COLUMN "dateRepayment",
DROP COLUMN "interestRate",
DROP COLUMN "repaymentMode";

-- AlterTable
ALTER TABLE "repayment" DROP COLUMN "date",
DROP COLUMN "loanId",
DROP COLUMN "mode",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "resourceId" TEXT NOT NULL,
ADD COLUMN     "resourceType" TEXT NOT NULL;

-- DropTable
DROP TABLE "rentpayment";

-- DropTable
DROP TABLE "tenant";

-- CreateTable
CREATE TABLE "rent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "shopNumber" TEXT,
    "rent" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "rent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rent_phone_idx" ON "rent"("phone");

-- CreateIndex
CREATE INDEX "rent_rent_idx" ON "rent"("rent");

-- CreateIndex
CREATE INDEX "rent_userId_idx" ON "rent"("userId");

-- CreateIndex
CREATE INDEX "rent_name_rent_idx" ON "rent"("name", "rent");

-- CreateIndex
CREATE INDEX "loan_borrowerPhone_idx" ON "loan"("borrowerPhone");

-- CreateIndex
CREATE INDEX "loan_amount_idx" ON "loan"("amount");

-- CreateIndex
CREATE INDEX "loan_dateLent_idx" ON "loan"("dateLent");

-- CreateIndex
CREATE INDEX "loan_status_idx" ON "loan"("status");

-- CreateIndex
CREATE INDEX "loan_userId_idx" ON "loan"("userId");

-- CreateIndex
CREATE INDEX "loan_borrowerName_status_idx" ON "loan"("borrowerName", "status");

-- CreateIndex
CREATE INDEX "repayment_dueDate_idx" ON "repayment"("dueDate");

-- CreateIndex
CREATE INDEX "repayment_amount_idx" ON "repayment"("amount");

-- CreateIndex
CREATE INDEX "repayment_userId_idx" ON "repayment"("userId");

-- CreateIndex
CREATE INDEX "repayment_paidAt_idx" ON "repayment"("paidAt");

-- CreateIndex
CREATE INDEX "repayment_resourceId_idx" ON "repayment"("resourceId");

-- CreateIndex
CREATE INDEX "repayment_resourceType_idx" ON "repayment"("resourceType");

-- CreateIndex
CREATE INDEX "repayment_resourceId_resourceType_idx" ON "repayment"("resourceId", "resourceType");

-- CreateIndex
CREATE INDEX "repayment_dueDate_amount_idx" ON "repayment"("dueDate", "amount");

-- AddForeignKey
ALTER TABLE "repayment" ADD CONSTRAINT "repayment_loan_fkey" FOREIGN KEY ("resourceId") REFERENCES "loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repayment" ADD CONSTRAINT "repayment_rent_fkey" FOREIGN KEY ("resourceId") REFERENCES "rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

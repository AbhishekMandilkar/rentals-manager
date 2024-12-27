/*
  Warnings:

  - Added the required column `interestRate` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repaymentMode` to the `loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "interestRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "repaymentMode" "repaymentMode" NOT NULL;

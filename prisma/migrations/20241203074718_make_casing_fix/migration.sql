/*
  Warnings:

  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "loanStatus" AS ENUM ('ACTIVE', 'REPAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "repaymentMode" AS ENUM ('EMI', 'ONETIME');

-- DropForeignKey
ALTER TABLE "RentPayment" DROP CONSTRAINT "RentPayment_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Repayment" DROP CONSTRAINT "Repayment_loanId_fkey";

-- DropTable
DROP TABLE "Loan";

-- DropTable
DROP TABLE "RentPayment";

-- DropTable
DROP TABLE "Repayment";

-- DropTable
DROP TABLE "Tenant";

-- DropEnum
DROP TYPE "LoanStatus";

-- DropEnum
DROP TYPE "RepaymentMode";

-- CreateTable
CREATE TABLE "loan" (
    "id" TEXT NOT NULL,
    "borrowerName" TEXT NOT NULL,
    "borrowerPhone" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "dateLent" TIMESTAMP(3) NOT NULL,
    "dateRepayment" TIMESTAMP(3) NOT NULL,
    "status" "loanStatus" NOT NULL,
    "repaymentMode" "repaymentMode" NOT NULL,
    "userId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repayment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mode" "repaymentMode" NOT NULL,
    "userId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "shopNumber" TEXT,
    "rent" DOUBLE PRECISION NOT NULL,
    "rentDueDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentpayment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rentpayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repayment" ADD CONSTRAINT "repayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentpayment" ADD CONSTRAINT "rentpayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "loan_amount_idx";

-- DropIndex
DROP INDEX "loan_borrowerName_status_idx";

-- DropIndex
DROP INDEX "loan_borrowerPhone_idx";

-- DropIndex
DROP INDEX "loan_dateLent_idx";

-- DropIndex
DROP INDEX "loan_status_idx";

-- DropIndex
DROP INDEX "loan_userId_idx";

-- DropIndex
DROP INDEX "repayment_amount_idx";

-- DropIndex
DROP INDEX "repayment_dueDate_amount_idx";

-- DropIndex
DROP INDEX "repayment_dueDate_idx";

-- DropIndex
DROP INDEX "repayment_paidAt_idx";

-- DropIndex
DROP INDEX "repayment_resourceId_idx";

-- DropIndex
DROP INDEX "repayment_resourceId_resourceType_idx";

-- DropIndex
DROP INDEX "repayment_resourceType_idx";

-- DropIndex
DROP INDEX "repayment_userId_idx";

-- CreateIndex
CREATE INDEX "loan_amount_status_userId_borrowerName_idx" ON "loan"("amount", "status", "userId", "borrowerName");

-- CreateIndex
CREATE INDEX "repayment_resourceType_resourceId_dueDate_paidAt_idx" ON "repayment"("resourceType", "resourceId", "dueDate", "paidAt");

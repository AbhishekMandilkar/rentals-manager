/*
  Warnings:

  - Added the required column `contractEndDate` to the `rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rent" ADD COLUMN     "contractEndDate" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - Added the required column `userId` to the `tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenant" ADD COLUMN     "userId" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `otp` to the `UserVerifyOtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserVerifyOtp" ADD COLUMN     "otp" TEXT NOT NULL;

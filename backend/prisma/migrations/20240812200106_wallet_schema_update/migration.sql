/*
  Warnings:

  - A unique constraint covering the columns `[paymailId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymailId` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletEmail` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletPassword` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "paymailId" TEXT NOT NULL,
ADD COLUMN     "walletEmail" TEXT NOT NULL,
ADD COLUMN     "walletPassword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_paymailId_key" ON "Wallet"("paymailId");

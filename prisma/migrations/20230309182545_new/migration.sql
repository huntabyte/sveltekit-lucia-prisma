/*
  Warnings:

  - You are about to drop the column `userId` on the `Comp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[compId]` on the table `Comp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comp" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Comp_compId_key" ON "Comp"("compId");

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Organization_id_key";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

/*
  Warnings:

  - You are about to drop the column `eventEmail` on the `Event` table. All the data in the column will be lost.
  - Made the column `public` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventEmail",
ADD COLUMN     "email" TEXT,
ALTER COLUMN "public" SET NOT NULL;

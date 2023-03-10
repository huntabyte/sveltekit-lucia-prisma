/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Series` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publisherId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publisherId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_userId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_userId_fkey";

-- DropIndex
DROP INDEX "Event_ownerId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "ownerId",
ADD COLUMN     "publisherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "userId",
ADD COLUMN     "publisherId" TEXT;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "publisherId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Event_publisherId_key" ON "Event"("publisherId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

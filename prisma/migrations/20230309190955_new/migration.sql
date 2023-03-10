/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Venue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_seriesId_fkey";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "seriesId";

-- CreateTable
CREATE TABLE "_SeriesToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SeriesToVenue_AB_unique" ON "_SeriesToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_SeriesToVenue_B_index" ON "_SeriesToVenue"("B");

-- AddForeignKey
ALTER TABLE "_SeriesToVenue" ADD CONSTRAINT "_SeriesToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeriesToVenue" ADD CONSTRAINT "_SeriesToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

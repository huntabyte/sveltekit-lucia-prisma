/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `resultId` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "seriesId";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "resultId";

-- CreateTable
CREATE TABLE "_EventToSeries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSeries_AB_unique" ON "_EventToSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSeries_B_index" ON "_EventToSeries"("B");

-- AddForeignKey
ALTER TABLE "_EventToSeries" ADD CONSTRAINT "_EventToSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSeries" ADD CONSTRAINT "_EventToSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

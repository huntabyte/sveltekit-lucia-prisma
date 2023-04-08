/*
  Warnings:

  - You are about to drop the `_EventToSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToSeries" DROP CONSTRAINT "_EventToSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSeries" DROP CONSTRAINT "_EventToSeries_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "seriesId" TEXT;

-- DropTable
DROP TABLE "_EventToSeries";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

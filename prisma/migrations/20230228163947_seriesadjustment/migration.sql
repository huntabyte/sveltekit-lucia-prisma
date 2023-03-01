/*
  Warnings:

  - You are about to drop the column `name` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `seriesInfoId` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the `SeriesInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_seriesInfoId_fkey";

-- AlterTable
ALTER TABLE "Comp" ADD COLUMN     "resultId" TEXT;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "name",
DROP COLUMN "seriesInfoId",
ADD COLUMN     "event" TEXT,
ADD COLUMN     "eventeid" TEXT,
ADD COLUMN     "eventwebsite" TEXT,
ADD COLUMN     "venue" TEXT;

-- DropTable
DROP TABLE "SeriesInfo";

-- AddForeignKey
ALTER TABLE "Comp" ADD CONSTRAINT "Comp_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comp" ADD CONSTRAINT "Comp_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

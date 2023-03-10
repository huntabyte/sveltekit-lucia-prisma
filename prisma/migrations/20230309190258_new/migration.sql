/*
  Warnings:

  - You are about to drop the column `venueWebsite` on the `Venue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[website]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Venue_venueWebsite_key";

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "venueWebsite",
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Venue_website_key" ON "Venue"("website");

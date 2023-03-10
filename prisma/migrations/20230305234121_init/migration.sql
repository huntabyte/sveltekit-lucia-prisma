/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[venueWebsite]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "venueWebsite" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "Venue"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_venueWebsite_key" ON "Venue"("venueWebsite");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_email_key" ON "Venue"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

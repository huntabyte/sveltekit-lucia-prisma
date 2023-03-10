/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_ownerId_key" ON "Event"("ownerId");

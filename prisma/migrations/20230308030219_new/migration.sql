/*
  Warnings:

  - A unique constraint covering the columns `[eventeid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_eventeid_key" ON "Event"("eventeid");

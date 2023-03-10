/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_id_key" ON "Result"("id");

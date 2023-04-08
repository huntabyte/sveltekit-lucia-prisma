-- CreateTable
CREATE TABLE "_CompToRace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompToRace_AB_unique" ON "_CompToRace"("A", "B");

-- CreateIndex
CREATE INDEX "_CompToRace_B_index" ON "_CompToRace"("B");

-- AddForeignKey
ALTER TABLE "_CompToRace" ADD CONSTRAINT "_CompToRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Comp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompToRace" ADD CONSTRAINT "_CompToRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

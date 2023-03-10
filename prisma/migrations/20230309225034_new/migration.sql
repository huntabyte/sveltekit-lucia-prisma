-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_publisherId_fkey";

-- DropIndex
DROP INDEX "Event_publisherId_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "publisherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

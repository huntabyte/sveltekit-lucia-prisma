-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('english', 'french', 'spanish', 'german', 'dutch', 'swedish', 'russian', 'chinese', 'japanese', 'norweigen', 'italian', 'portugese');

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rest" JSONB,
    "organizationId" TEXT,
    "publisherId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "eventeid" TEXT NOT NULL,
    "uniqueIdString" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventwebsite" TEXT,
    "venueName" TEXT,
    "description" TEXT,
    "titleImage" TEXT,
    "public" BOOLEAN DEFAULT true,
    "fileInfo" JSONB,
    "rest" JSONB,
    "publisherId" TEXT,
    "venueId" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "raceId" TEXT,
    "name" TEXT,
    "starts" JSONB,
    "rank" TEXT,
    "date" TEXT,
    "time" TEXT,
    "notes" TEXT,
    "sailed" TEXT,
    "rest" JSONB,
    "eventId" TEXT,
    "publisherId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comp" (
    "id" TEXT NOT NULL,
    "compId" TEXT NOT NULL,
    "boat" TEXT,
    "skipper" TEXT,
    "fleet" TEXT,
    "division" TEXT,
    "club" TEXT,
    "rest" JSONB,
    "publisherId" TEXT,
    "eventId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Comp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "resultId" TEXT,
    "finish" TEXT,
    "start" TEXT,
    "points" TEXT,
    "position" TEXT,
    "discard" TEXT,
    "corrected" TEXT,
    "rrestyp" TEXT,
    "elasped" TEXT,
    "srat" TEXT,
    "rewin" TEXT,
    "rrwin" TEXT,
    "rrset" TEXT,
    "publisherId" TEXT NOT NULL,
    "eventId" TEXT,
    "compId" TEXT,
    "raceId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tag" TEXT,
    "website" TEXT,
    "email" TEXT,
    "contact" JSONB,
    "titleImage" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "email" TEXT,
    "burgee" TEXT,
    "publisherId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "theme" TEXT,
    "language" "Lang" DEFAULT 'english',
    "userId" TEXT,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,

    CONSTRAINT "key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "userId" TEXT,
    "bogus" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SeriesToVenue" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToSeries" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Series_id_key" ON "Series"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_uniqueIdString_key" ON "Event"("uniqueIdString");

-- CreateIndex
CREATE UNIQUE INDEX "Race_id_key" ON "Race"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Race_raceId_key" ON "Race"("raceId");

-- CreateIndex
CREATE UNIQUE INDEX "Comp_compId_key" ON "Comp"("compId");

-- CreateIndex
CREATE INDEX "Comp_compId_eventId_idx" ON "Comp"("compId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_id_key" ON "Result"("id");

-- CreateIndex
CREATE INDEX "Result_raceId_idx" ON "Result"("raceId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_id_key" ON "Venue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_name_key" ON "Venue"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_id_key" ON "UserSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_id_key" ON "key"("id");

-- CreateIndex
CREATE INDEX "key_user_id_idx" ON "key"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_SeriesToVenue_AB_unique" ON "_SeriesToVenue"("A", "B");

-- CreateIndex
CREATE INDEX "_SeriesToVenue_B_index" ON "_SeriesToVenue"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSeries_AB_unique" ON "_EventToSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSeries_B_index" ON "_EventToSeries"("B");

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comp" ADD CONSTRAINT "Comp_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comp" ADD CONSTRAINT "Comp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Comp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key" ADD CONSTRAINT "key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeriesToVenue" ADD CONSTRAINT "_SeriesToVenue_A_fkey" FOREIGN KEY ("A") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeriesToVenue" ADD CONSTRAINT "_SeriesToVenue_B_fkey" FOREIGN KEY ("B") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSeries" ADD CONSTRAINT "_EventToSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSeries" ADD CONSTRAINT "_EventToSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

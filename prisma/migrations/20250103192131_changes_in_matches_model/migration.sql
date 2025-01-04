/*
  Warnings:

  - You are about to drop the column `gamesWonByPlayer1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `gamesWonByPlayer2` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `tiebreaksWonByPlayer1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `tiebreaksWonByPlayer2` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "gamesWonByPlayer1",
DROP COLUMN "gamesWonByPlayer2",
DROP COLUMN "tiebreaksWonByPlayer1",
DROP COLUMN "tiebreaksWonByPlayer2",
ADD COLUMN     "tiebreakWonByPlayer" INTEGER,
ADD COLUMN     "totalGamesPlayer1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalGamesPlayer2" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "superTiebreak" SET DEFAULT ARRAY[]::INTEGER[];

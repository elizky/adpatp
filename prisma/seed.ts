import { matches } from '../data/matches';
import { players } from '../data/players';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear jugadores
  for (const player of players) {
    await prisma.player.create({
      data: {
        id: player.id,
        name: player.name,
        avatarUrl: player.avatarUrl,
        ranking: player.ranking,
        rankingHistory: {
          create: player.rankingHistory.map(
            (r: { ranking: number; date: string | number | Date }) => ({
              ranking: r.ranking,
              date: new Date(r.date),
            })
          ),
        },
        gamesWon: player.gamesWon,
        gamesLost: player.gamesLost,
        setsWon: player.setsWon,
        setsLost: player.setsLost,
        tiebreaksWon: player.tiebreaksWon,
        tiebreaksLost: player.tiebreaksLost,
        matchesLost: player.matchesLost,
        racket: player.racket,
        handedness: player.handedness,
        backhand: player.backhand,
        clothingBrand: player.clothingBrand,
        birthplace: player.birthplace,
        favoriteShot: player.favoriteShot,
        rivalries: player.rivalries,
        playStyle: player.playStyle,
        height: player.height,
        weight: player.weight,
        favoritePlayer: player.favoritePlayer,
      },
    });
  }

  // Crear partidos
  for (const match of matches) {
    await prisma.match.create({
      data: {
        id: match.id,
        date: new Date(match.date),
        location: match.location,
        player1Id: match.player1Id,
        player2Id: match.player2Id,
        winnerId: match.winnerId,
        player1Games: match.player1Games,
        player2Games: match.player2Games,
        superTiebreak: match.superTiebreak || [],
        gamesWonByPlayer1: match.gamesWonByPlayer1,
        gamesWonByPlayer2: match.gamesWonByPlayer2,
        setsWonByPlayer1: match.setsWonByPlayer1,
        setsWonByPlayer2: match.setsWonByPlayer2,
        tiebreaksWonByPlayer1: match.tiebreaksWonByPlayer1,
        tiebreaksWonByPlayer2: match.tiebreaksWonByPlayer2,
        createdAt: new Date(match.createdAt),
        updatedAt: new Date(match.updatedAt),
      },
    });
  }

  console.log('Datos insertados con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

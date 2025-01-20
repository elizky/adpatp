import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetAndSeedPlayers() {
  try {
    // Eliminar todas las dependencias de los partidos y el historial de rankings
    await prisma.rankingHistory.deleteMany({});
    await prisma.match.deleteMany({});

    console.log('Partidos y rankingHistory eliminados.');

    // Reiniciar estadísticas de jugadores manteniendo su información general
    const players = [
      { id: 1, name: 'Jaime', ranking: 1 },
      { id: 2, name: 'Marcos', ranking: 2 },
      { id: 3, name: 'Yeta', ranking: 3 },
      { id: 4, name: 'Pela', ranking: 4 },
      { id: 5, name: 'Jotu', ranking: 5 },
      { id: 6, name: 'Second', ranking: 6 },
      { id: 7, name: 'Porte', ranking: 7 },
      { id: 8, name: 'Izki', ranking: 8 },
      { id: 9, name: 'Rami', ranking: 9 },
      { id: 10, name: 'Mo', ranking: 10 },
      { id: 11, name: 'Vier', ranking: 11 },
      { id: 12, name: 'Dilan', ranking: 12 },
      { id: 13, name: 'Abel', ranking: 13 },
      { id: 14, name: 'Enano', ranking: 14 },
      { id: 15, name: 'Guille', ranking: 15 },
    ];

    for (const player of players) {
      // Actualizar o crear jugadores
      const existingPlayer = await prisma.player.findUnique({
        where: { id: player.id },
      });

      if (existingPlayer) {
        // Si el jugador ya existe, solo reiniciar estadísticas y ranking
        await prisma.player.update({
          where: { id: existingPlayer.id },
          data: {
            ranking: player.ranking,
            gamesWon: 0,
            gamesLost: 0,
            setsWon: 0,
            setsLost: 0,
            tiebreaksWon: 0,
            tiebreaksLost: 0,
            matchesLost: 0,
          },
        });
      } else {
        // Si no existe, crear el jugador
        const newPlayer = await prisma.player.create({
          data: {
            name: player.name,
            ranking: player.ranking,
          },
        });

        console.log(`Jugador creado: ${newPlayer.name} con ranking ${newPlayer.ranking}`);
      }

      // Registrar el historial inicial de ranking
      const playerData =
        existingPlayer || (await prisma.player.findUnique({ where: { id: player.id } }));
      if (playerData) {
        await prisma.rankingHistory.create({
          data: {
            playerId: playerData.id,
            ranking: player.ranking,
            date: new Date(),
          },
        });
      }
    }

    console.log('Jugadores reiniciados y rankingHistory inicial registrado.');
  } catch (error) {
    console.error('Error al reiniciar y poblar jugadores:', error);
    throw new Error('Error al reiniciar y poblar jugadores');
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
resetAndSeedPlayers().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetAndSeedPlayers() {
  try {
    // Eliminar todas las dependencias de los partidos y el historial de rankings
    await prisma.rankingHistory.deleteMany({});
    await prisma.match.deleteMany({});

    console.log('Partidos y rankingHistory eliminados.');

    // Generar un array de rankings del 1 al 15
    const rankings = Array.from({ length: 15 }, (_, i) => i + 1);

    // Mezclar el array de rankings
    for (let i = rankings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rankings[i], rankings[j]] = [rankings[j], rankings[i]];
    }

    const players = [
      { id: 1, name: 'Jaime' },
      { id: 2, name: 'Marcos' },
      { id: 3, name: 'Yeta' },
      { id: 4, name: 'Pela' },
      { id: 5, name: 'Jotu' },
      { id: 6, name: 'Second' },
      { id: 7, name: 'Porte' },
      { id: 8, name: 'Izki' },
      { id: 9, name: 'Rami' },
      { id: 10, name: 'Mo' },
      { id: 11, name: 'Vier' },
      { id: 12, name: 'Dilan' },
      { id: 13, name: 'Abel' },
      { id: 14, name: 'Enano' },
      { id: 15, name: 'Guille' },
    ].map((player, index) => ({
      ...player,
      ranking: rankings[index]
    }));

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

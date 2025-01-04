import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetAndSeedPlayers() {
  try {
    // Eliminar todos los jugadores y sus dependencias
    await prisma.rankingHistory.deleteMany({});
    await prisma.match.deleteMany({});
    await prisma.player.deleteMany({});

    console.log('Jugadores, partidos y rankingHistory eliminados.');

    const players = [
      { name: 'Jaime', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Sawyer', ranking: 1 },
      { name: 'Marcos', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Riley', ranking: 2 },
      { name: 'Yeta', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Chase', ranking: 3 },
      { name: 'Pela', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Jack', ranking: 4 },
      { name: 'Jotu', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Leah', ranking: 5 },
      { name: 'Second', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Aidan', ranking: 6 },
      { name: 'Porte', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Jude', ranking: 7 },
      { name: 'Izki', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Alexander', ranking: 8 },
      { name: 'Rami', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Avery', ranking: 9 },
      { name: 'Mo', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Eliza', ranking: 10 },
      { name: 'Vier', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Kingston', ranking: 11 },
      { name: 'Dilan', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Jessica', ranking: 12 },
      { name: 'Abel', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Mackenzie', ranking: 13 },
      { name: 'Enano', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Adrian', ranking: 14 },
      { name: 'Guille', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=Amaya', ranking: 15 },
    ];

    // Crear jugadores y su historial de ranking
    for (const player of players) {
      const newPlayer = await prisma.player.create({
        data: {
          name: player.name,
          avatarUrl: player.avatar,
          ranking: player.ranking,
        },
      });

      await prisma.rankingHistory.create({
        data: {
          playerId: newPlayer.id,
          ranking: player.ranking,
          date: new Date(),
        },
      });

      console.log(`Jugador creado: ${newPlayer.name} con ranking ${newPlayer.ranking}`);
    }

    console.log('Jugadores creados y rankingHistory inicial registrado.');
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

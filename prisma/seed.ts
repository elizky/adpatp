import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanUpPlayerMatches() {
  try {
    // Limpiar las estadísticas de los jugadores
    await prisma.player.updateMany({
      data: {
        gamesWon: 0,
        gamesLost: 0,
        setsWon: 0,
        setsLost: 0,
        tiebreaksWon: 0,
        tiebreaksLost: 0,
        matchesLost: 0,
      },
    });

    // Si también deseas eliminar todos los partidos en la base de datos (opcional)
    await prisma.match.deleteMany({});

    console.log('Datos de partidos limpiados exitosamente para los jugadores');
  } catch (error) {
    console.error('Error al limpiar los datos de los partidos:', error);
    throw new Error('Error al limpiar los datos de los partidos');
  }
}

cleanUpPlayerMatches()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

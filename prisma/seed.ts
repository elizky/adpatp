import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixRankingHistory() {
  const initialDate = new Date('2025-02-01T00:00:00Z'); // Fecha de inicio de la competencia

  // 1️⃣ Buscar jugadores que no tienen ningún historial
  const playersWithoutHistory = await prisma.player.findMany({
    where: {
      rankingHistory: {
        none: {}, // Jugadores sin registros en RankingHistory
      },
    },
    select: {
      id: true,
      ranking: true,
    },
  });

  // 2️⃣ Buscar jugadores que ya tienen historial
  const playersWithHistory = await prisma.player.findMany({
    where: {
      rankingHistory: {
        some: {}, // Jugadores con al menos un registro en RankingHistory
      },
    },
    select: {
      id: true,
      ranking: true,
      rankingHistory: {
        select: {
          id: true,
          ranking: true,
          date: true,
        },
        orderBy: {
          date: 'asc', // Ordenamos por fecha para obtener el primer registro
        },
      },
    },
  });

  // 3️⃣ Crear historial inicial para los jugadores sin ranking histórico
  const newRankingEntries = playersWithoutHistory.map((player) => ({
    playerId: player.id,
    ranking: player.ranking,
    date: initialDate, // Fecha de inicio de la competencia
  }));

  // 4️⃣ Agregar historial inicial a los jugadores que ya tenían uno (si falta)
  playersWithHistory.forEach((player) => {
    const firstRecord = player.rankingHistory[0]; // Primer registro de historial
    if (firstRecord.date > initialDate) {
      // Si su primer registro es después del 1 de febrero, agregamos el inicial
      newRankingEntries.push({
        playerId: player.id,
        ranking: player.ranking,
        date: initialDate, // Fecha de inicio de la competencia
      });
    }
  });

  // 5️⃣ Insertar todos los nuevos registros en RankingHistory
  if (newRankingEntries.length > 0) {
    await prisma.rankingHistory.createMany({
      data: newRankingEntries,
    });
    console.log(
      `✅ Se agregaron ${newRankingEntries.length} registros iniciales a RankingHistory.`
    );
  } else {
    console.log('⚠️ No hay registros nuevos por agregar.');
  }
}

// Ejecutar la función
fixRankingHistory()
  .then(() =>
    console.log('✅ Historial de ranking corregido con fecha inicial 1 de febrero de 2025')
  )
  .catch((error) => console.error('❌ Error corrigiendo historial de ranking:', error)); // Ejecutar el script

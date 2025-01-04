/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { calculateMatchResults } from '@/utils/matchUtils';
import { z } from 'zod';

// Esquema de validación
const matchSchema = z.object({
  location: z.string().min(1, 'La ubicación es obligatoria'),
  player1Id: z.string().regex(/^\d+$/, 'El ID de player1 debe ser un número'),
  player2Id: z.string().regex(/^\d+$/, 'El ID de player2 debe ser un número'),
  player1Games: z.array(z.string()).nonempty('Se requiere al menos un score para player1'),
  player2Games: z.array(z.string()).nonempty('Se requiere al menos un score para player2'),
});

// Función para intercambiar rankings y actualizar historial
async function updateRankings(
  winnerId: number,
  loserId: number,
  winnerRanking: number,
  loserRanking: number
) {
  await db.player.update({
    where: { id: winnerId },
    data: { ranking: loserRanking },
  });
  await db.player.update({
    where: { id: loserId },
    data: { ranking: winnerRanking },
  });

  await db.rankingHistory.create({
    data: { playerId: winnerId, ranking: loserRanking },
  });
  await db.rankingHistory.create({
    data: { playerId: loserId, ranking: winnerRanking },
  });
}

// Acción principal para guardar el partido
interface SaveMatchActionProps {
  location: string;
  player1Id: string;
  player2Id: string;
  player1Games: string[] | number[];
  player2Games: string[] | number[];
}

export async function saveMatchAction(props: SaveMatchActionProps) {
  try {
    // Validar datos de entrada
    matchSchema.parse(props);

    const { location, player1Id, player2Id, player1Games, player2Games } = props;

    // Obtener jugadores
    const [player1, player2] = await Promise.all([
      db.player.findUnique({ where: { id: Number(player1Id) } }),
      db.player.findUnique({ where: { id: Number(player2Id) } }),
    ]);

    if (!player1 || !player2) throw new Error('Jugador no encontrado');

    // Calcular resultados del partido
    const matchData = calculateMatchResults(
      location,
      player1Games,
      player2Games,
      player1Id,
      player2Id
    );

    if (!matchData.winnerId) throw new Error('Faltan datos obligatorios en matchData');

    // Crear partido y manejar actualizaciones en una transacción
    return await db.$transaction(async (prisma) => {
      const match = await prisma.match.create({ data: matchData });

      // Intercambiar rankings si aplica
      if (match.winnerId === player1.id && player1.ranking > player2.ranking) {
        await updateRankings(player1.id, player2.id, player1.ranking, player2.ranking);
      } else if (match.winnerId === player2.id && player2.ranking > player1.ranking) {
        await updateRankings(player2.id, player1.id, player2.ranking, player1.ranking);
      }

      // Actualizar estadísticas de player1
      await prisma.player.update({
        where: { id: Number(player1Id) },
        data: {
          gamesWon: { increment: match.totalGamesPlayer1 },
          gamesLost: { increment: match.totalGamesPlayer2 },
          setsWon: { increment: match.setsWonByPlayer1 },
          setsLost: { increment: match.setsWonByPlayer2 },
          tiebreaksWon: { increment: match.tiebreakWonByPlayer === 1 ? 1 : 0 },
          tiebreaksLost: { increment: match.tiebreakWonByPlayer === 2 ? 1 : 0 },
          matchesLost: {
            increment: match.winnerId !== null && match.winnerId !== Number(player1Id) ? 1 : 0,
          },
        },
      });

      // Actualizar estadísticas de player2
      await prisma.player.update({
        where: { id: Number(player2Id) },
        data: {
          gamesWon: { increment: match.totalGamesPlayer2 },
          gamesLost: { increment: match.totalGamesPlayer1 },
          setsWon: { increment: match.setsWonByPlayer2 },
          setsLost: { increment: match.setsWonByPlayer1 },
          tiebreaksWon: { increment: match.tiebreakWonByPlayer === 2 ? 1 : 0 },
          tiebreaksLost: { increment: match.tiebreakWonByPlayer === 1 ? 1 : 0 },
          matchesLost: {
            increment: match.winnerId !== null && match.winnerId !== Number(player2Id) ? 1 : 0,
          },
        },
      });

      return match;
    });
  } catch (error: any) {
    console.error('[SaveMatchAction] Error:', error.message, { stack: error.stack });
    throw new Error('Error al guardar el partido: ' + error.message);
  }
}

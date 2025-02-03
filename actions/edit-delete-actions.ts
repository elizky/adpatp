/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { calculateMatchResults } from '@/utils/matchUtils';
import { z } from 'zod';

// Esquema de validación
const matchSchema = z.object({
  matchId: z.string().regex(/^\d+$/, 'El ID del partido debe ser un número'),
  location: z.string().min(1, 'La ubicación es obligatoria'),
  player1Id: z.string().regex(/^\d+$/, 'El ID de player1 debe ser un número'),
  player2Id: z.string().regex(/^\d+$/, 'El ID de player2 debe ser un número'),
  player1Games: z
    .array(z.union([z.string(), z.number()]))
    .nonempty('Se requiere al menos un score para player1'),
  player2Games: z
    .array(z.union([z.string(), z.number()]))
    .nonempty('Se requiere al menos un score para player2'),
});

// Función para revertir estadísticas de un partido
async function revertMatchStats(match: any) {
  const {
    player1Id,
    player2Id,
    totalGamesPlayer1,
    totalGamesPlayer2,
    setsWonByPlayer1,
    setsWonByPlayer2,
    tiebreakWonByPlayer,
    winnerId,
  } = match;

  // Actualizar estadísticas de player1
  await db.player.update({
    where: { id: player1Id },
    data: {
      gamesWon: { decrement: totalGamesPlayer1 },
      gamesLost: { decrement: totalGamesPlayer2 },
      setsWon: { decrement: setsWonByPlayer1 },
      setsLost: { decrement: setsWonByPlayer2 },
      tiebreaksWon: { decrement: tiebreakWonByPlayer === 1 ? 1 : 0 },
      tiebreaksLost: { decrement: tiebreakWonByPlayer === 2 ? 1 : 0 },
      matchesLost: { decrement: winnerId !== null && winnerId !== player1Id ? 1 : 0 },
    },
  });

  // Actualizar estadísticas de player2
  await db.player.update({
    where: { id: player2Id },
    data: {
      gamesWon: { decrement: totalGamesPlayer2 },
      gamesLost: { decrement: totalGamesPlayer1 },
      setsWon: { decrement: setsWonByPlayer2 },
      setsLost: { decrement: setsWonByPlayer1 },
      tiebreaksWon: { decrement: tiebreakWonByPlayer === 2 ? 1 : 0 },
      tiebreaksLost: { decrement: tiebreakWonByPlayer === 1 ? 1 : 0 },
      matchesLost: { decrement: winnerId !== null && winnerId !== player2Id ? 1 : 0 },
    },
  });
}

// Función para manejar edición de partidos
interface EditMatchActionProps {
  matchId: string;
  location: string;
  player1Id: string;
  player2Id: string;
  player1Games: string[] | number[];
  player2Games: string[] | number[];
}

export async function editMatchAction(props: EditMatchActionProps) {
  try {
    matchSchema.parse(props);
    const { matchId, location, player1Id, player2Id, player1Games, player2Games } = props;

    console.log('player1Games', player1Games);
    console.log('player2Games', player2Games);

    // Obtener partido original
    const originalMatch = await db.match.findUnique({
      where: { id: Number(matchId) },
    });
    if (!originalMatch) throw new Error('Partido no encontrado');

    // Revertir estadísticas originales
    await revertMatchStats(originalMatch);

    // Calcular nuevos resultados
    const newMatchData = calculateMatchResults(
      location,
      player1Games,
      player2Games,
      player1Id,
      player2Id
    );

    // Validar datos calculados
    if (!newMatchData.winnerId) throw new Error('Faltan datos en los resultados del partido');

    // Actualizar el partido
    return await db.$transaction(async (prisma) => {
      const updatedMatch = await prisma.match.update({
        where: { id: Number(matchId) },
        data: newMatchData,
      });

      // Actualizar estadísticas de jugadores con nuevos datos
      await revertMatchStats(newMatchData); // Aplicar nueva lógica

      return updatedMatch;
    });
  } catch (error: any) {
    console.error('[EditMatchAction] Error:', error.message);
    throw new Error('Error al editar el partido: ' + error.message);
  }
}

export async function deleteMatchAction(matchId: number) {
  try {
    if (!matchId) throw new Error('ID del partido no válido');

    // Obtener partido original
    const match = await db.match.findUnique({
      where: { id: Number(matchId) },
    });
    if (!match) throw new Error('Partido no encontrado');

    // Revertir estadísticas originales
    await revertMatchStats(match);

    // Eliminar registros dependientes
    await db.blogPost.deleteMany({
      where: { matchId: matchId },
    });

    // Eliminar el partido
    await db.match.delete({
      where: { id: matchId },
    });

    return { success: true };
  } catch (error: any) {
    console.error('[DeleteMatchAction] Error:', error.message);
    throw new Error('Error al eliminar el partido: ' + error.message);
  }
}

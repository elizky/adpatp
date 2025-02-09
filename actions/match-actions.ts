/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { calculateMatchResults } from '@/utils/matchUtils';
import { z } from 'zod';
import { createBlogPost } from '@/actions/blog-actions';
import { generateBlogPostContent } from './ia-actions';
import { parseBlogPostContent } from '@/utils/postUtils';

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
  comments?: string;
}

export async function saveMatchAction(props: SaveMatchActionProps) {
  try {
    // Validar datos de entrada
    matchSchema.parse(props);

    const { location, player1Id, player2Id, player1Games, player2Games, comments } = props;

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
    const match = await db.$transaction(async (prisma) => {
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

    const postContent = await generateBlogPostContent({
      player1: player1,
      player2: player2,
      winner: match.winnerId === player1.id ? player1.name : player2.name,
      score: `${match.setsWonByPlayer1}-${match.setsWonByPlayer2}`,
      date: match.date.toISOString(),
      location: match.location || 'Ubicación no especificada',
      setsWonByPlayer1: match.setsWonByPlayer1,
      setsWonByPlayer2: match.setsWonByPlayer2,
      totalGamesPlayer1: match.totalGamesPlayer1,
      totalGamesPlayer2: match.totalGamesPlayer2,
      tiebreakWonByPlayer: match.tiebreakWonByPlayer || undefined,
      player1Games: player1Games.map(Number),
      player2Games: player2Games.map(Number),
      highlights: [
        `Sets ganados por ${player1.name}: ${match.setsWonByPlayer1}`,
        `Sets ganados por ${player2.name}: ${match.setsWonByPlayer2}`,
        `Juegos totales de ${player1.name}: ${match.totalGamesPlayer1}`,
        `Juegos totales de ${player2.name}: ${match.totalGamesPlayer2}`,
      ],
      comments: comments,
    });

    const parsedContent = parseBlogPostContent(postContent);

    // Crear el post asociado al partido
    await createBlogPost(
      parsedContent, // Contenido generado por IA
      match.id // ID del partido
    );

    return match;
  } catch (error: any) {
    console.error('[SaveMatchAction] Error:', error.message, { stack: error.stack });
    throw new Error('Error al guardar el partido: ' + error.message);
  }
}

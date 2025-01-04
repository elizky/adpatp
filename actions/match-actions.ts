/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { calculateMatchResults } from '@/utils/matchUtils';

interface SaveMatchActionProps {
  location: string;
  player1Id: string;
  player2Id: string;
  player1Scores: string[];
  player2Scores: string[];
}

export async function saveMatchAction({
  location,
  player1Id,
  player2Id,
  player1Scores,
  player2Scores,
}: SaveMatchActionProps) {
  if (
    !location ||
    !player1Id ||
    !player2Id ||
    player1Scores.length === 0 ||
    player2Scores.length === 0
  ) {
    throw new Error('Faltan datos obligatorios');
  }

  // Obtener los rankings de los jugadores
  const player1 = await db.player.findUnique({ where: { id: Number(player1Id) } });
  const player2 = await db.player.findUnique({ where: { id: Number(player2Id) } });

  const matchData = calculateMatchResults(
    location,
    player1Scores,
    player2Scores,
    player1Id,
    player2Id
  );

  // Validar datos finales
  if (!matchData.location || !matchData.player1Id || !matchData.player2Id || !matchData.winnerId) {
    throw new Error('Faltan datos obligatorios en matchData');
  }

  try {
    const match = await db.match.create({
      data: matchData,
    });
    console.log('Match creado exitosamente:', match);

    // Lógica para intercambiar rankings si es necesario
    if (player1 && player2) {
      if (match.winnerId === player1.id && player1.ranking > player2.ranking) {
        // Intercambiar rankings
        console.log('intercambia a ===> ', player2.ranking);
        await db.player.update({
          where: { id: Number(player1Id) },
          data: { ranking: player2.ranking },
        });
        console.log('intercambia a ===> ', player1.ranking);

        await db.player.update({
          where: { id: Number(player2Id) },
          data: { ranking: player1.ranking },
        });

        // Agregar a rankingHistory
        await db.rankingHistory.create({
          data: {
            playerId: Number(player1Id),
            ranking: player2.ranking,
          },
        });
        await db.rankingHistory.create({
          data: {
            playerId: Number(player2Id),
            ranking: player1.ranking,
          },
        });
      } else if (match.winnerId === player2.id && player2.ranking > player1.ranking) {
        // Intercambiar rankings
        console.log('intercambia a ===> ', player1.ranking);

        await db.player.update({
          where: { id: Number(player2Id) },
          data: { ranking: player1.ranking },
        });
        console.log('intercambia a ===> ', player2.ranking);

        await db.player.update({
          where: { id: Number(player1Id) },
          data: { ranking: player2.ranking },
        });

        // Agregar a rankingHistory
        await db.rankingHistory.create({
          data: {
            playerId: Number(player2Id),
            ranking: player1.ranking,
          },
        });
        await db.rankingHistory.create({
          data: {
            playerId: Number(player1Id),
            ranking: player2.ranking,
          },
        });
      }
    }

    // Actualizar estadísticas de player1
    await db.player.update({
      where: { id: Number(player1Id) },
      data: {
        gamesWon: { increment: match.totalGamesPlayer1 }, // Incrementar según juegos ganados
        gamesLost: { increment: match.totalGamesPlayer2 }, // Incrementar según juegos perdidos
        setsWon: { increment: match.setsWonByPlayer1 }, // Incrementar según sets ganados
        setsLost: { increment: match.setsWonByPlayer2 }, // Incrementar según sets perdidos
        tiebreaksWon: { increment: match.tiebreakWonByPlayer === 1 ? 1 : 0 }, // Incrementar si ganó el tiebreak
        tiebreaksLost: { increment: match.tiebreakWonByPlayer === 2 ? 1 : 0 }, // Incrementar si perdió el tiebreak
        matchesLost: {
          increment: match.winnerId !== null && match.winnerId !== Number(player1Id) ? 1 : 0,
        }, // Incrementar si perdió el partido
      },
    });

    // Actualizar estadísticas de player2
    await db.player.update({
      where: { id: Number(player2Id) },
      data: {
        gamesWon: { increment: match.totalGamesPlayer2 }, // Incrementar según juegos ganados
        gamesLost: { increment: match.totalGamesPlayer1 }, // Incrementar según juegos perdidos
        setsWon: { increment: match.setsWonByPlayer2 }, // Incrementar según sets ganados
        setsLost: { increment: match.setsWonByPlayer1 }, // Incrementar según sets perdidos
        tiebreaksWon: { increment: match.tiebreakWonByPlayer === 2 ? 1 : 0 }, // Incrementar si ganó el tiebreak
        tiebreaksLost: { increment: match.tiebreakWonByPlayer === 1 ? 1 : 0 }, // Incrementar si perdió el tiebreak
        matchesLost: {
          increment: match.winnerId !== null && match.winnerId !== Number(player2Id) ? 1 : 0,
        }, // Incrementar si perdió el partido
      },
    });

    return match;
  } catch (error: any) {
    console.error('Error al crear el match:', error.message, error.stack);
    console.log('Datos enviados:', JSON.stringify(matchData, null, 2));
    throw new Error('Error al crear el match');
  }
}

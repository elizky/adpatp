'use server';
import { db } from '@/server/db/prisma';
import { PlayerUpdateInput } from '@/types/types';

export const getPlayers = async () => {
  try {
    const players = await db.player.findMany({
      include: {
        matchesWon: true,
        rankingHistory: true, // Incluye el historial de ranking
      },
    });
    return players;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw new Error('Error fetching players');
  }
};
// Función para obtener un jugador único por ID
export const getPlayerById = async (id: number) => {
  try {
    const player = await db.player.findUnique({
      where: { id }, // Busca el jugador por ID
      include: {
        matchesWon: true,
        rankingHistory: true, // Incluye el historial de ranking
      },
    });
    return player;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    throw new Error('Error fetching player by ID');
  }
};

// Función para obtener todos los partidos
export const getMatches = async () => {
  try {
    const matches = await db.match.findMany({
      include: {
        player1: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        player2: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        winner: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw new Error('Error fetching matches');
  }
};

// Función para obtener partidos por ID de jugador
export const getMatchesByPlayerId = async (playerId: number) => {
  try {
    const matches = await db.match.findMany({
      where: {
        OR: [
          { player1Id: playerId }, // Busca si el jugador es player1
          { player2Id: playerId }, // Busca si el jugador es player2
        ],
      },
      include: {
        player1: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        player2: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        winner: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return matches;
  } catch (error) {
    console.error('Error fetching matches by player ID:', error);
    throw new Error('Error fetching matches by player ID');
  }
};

// Función para actualizar la información de un jugador
export const updatePlayer = async (playerId: number, data: PlayerUpdateInput) => {
  try {
    const updatedPlayer = await db.player.update({
      where: { id: playerId }, // Ensure the id is a number
      data,
    });

    return updatedPlayer;
  } catch (error) {
    console.error('Error updating player:', error);
    throw new Error('Error updating player');
  }
};

// Función para obtener un partido único por ID
export const getMatchById = async (matchId: number) => {
  try {
    const match = await db.match.findUnique({
      where: { id: matchId }, // Busca el partido por ID
      include: {
        player1: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        player2: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
        winner: {
          include: {
            matchesWon: true,
            rankingHistory: true, // Incluye el historial de ranking
          },
        },
      },
    });
    return match;
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    throw new Error('Error fetching match by ID');
  }
};

export interface Match {
  id: number;
  date: Date | string; // Fecha del partido
  location: string | null; // Lugar donde se jugó el partido (opcional)

  player1Id: number; // ID del primer jugador
  player2Id: number; // ID del segundo jugador
  winnerId: number | null; // ID del ganador del partido (opcional)

  player1: Player; // Información del primer jugador
  player2: Player; // Información del segundo jugador
  winner: Player | null; // Información del ganador del partido (opcional)

  player1Games: number[]; // Juegos ganados por Player1 en cada set
  player2Games: number[]; // Juegos ganados por Player2 en cada set
  superTiebreak: number[]; // Resultados del super tiebreak (Player1, Player2)

  totalGamesPlayer1: number; // Total de juegos ganados por Player1 (sin incluir tiebreak)
  totalGamesPlayer2: number; // Total de juegos ganados por Player2 (sin incluir tiebreak)

  setsWonByPlayer1: number; // Total de sets ganados por Player1
  setsWonByPlayer2: number; // Total de sets ganados por Player2

  tiebreakWonByPlayer: number | null; // 1 si Player1 ganó el tiebreak, 2 si Player2 lo ganó (null si no hubo tiebreak)

  createdAt: Date | string; // Fecha de creación del registro
  updatedAt: Date | string; // Fecha de última actualización del registro

  playerId?: number | null; // Relación con Player (opcional según tu modelo)
  Player?: Player | null; // Información del jugador relacionado (opcional según tu modelo)
}

export interface RankingHistory {
  id: number;
  playerId: number;
  ranking: number;
  date: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Player {
  id: number;
  name: string;
  avatarUrl: string | null;
  userId: string | null;
  ranking: number;
  gamesWon: number;
  gamesLost: number;
  setsWon: number;
  setsLost: number;
  tiebreaksWon: number;
  tiebreaksLost: number;
  matchesLost: number;
  racket?: string | null;
  handedness?: string | null;
  backhand?: string | null;
  clothingBrand?: string | null;
  birthplace?: string | null;
  favoriteShot?: string | null;
  rivalries?: string | null;
  playStyle?: string | null;
  height?: number | null;
  weight?: number | null;
  favoritePlayer?: string | null;
  matchesWon: MatchWon[];
  rankingHistory: RankingHistory[];
}

export type PlayerUpdateInput = Omit<
  Player,
  | 'ranking'
  | 'avatarUrl'
  | 'userId'
  | 'gamesWon'
  | 'gamesLost'
  | 'setsWon'
  | 'setsLost'
  | 'tiebreaksWon'
  | 'tiebreaksLost'
  | 'matchesLost'
  | 'id'
  | 'rankingHistory'
  | 'matchesWon'
>;

export interface MatchWon {
  id: number;
  date: Date | string;
  location: string | null;
  player1Id: number;
  player2Id: number;
  winnerId: number | null;
  player1Games: number[];
  player2Games: number[];
  superTiebreak: number[];
  totalGamesPlayer1: number; // Nota: Actualizamos este nombre
  totalGamesPlayer2: number; // Nota: Actualizamos este nombre
  setsWonByPlayer1: number;
  setsWonByPlayer2: number;
  tiebreakWonByPlayer: number | null; // Nota: Actualizamos este nombre
  createdAt: Date | string;
  updatedAt: Date | string;
  playerId: number | null;
}

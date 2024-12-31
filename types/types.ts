export interface Match {
  id: number;
  date: Date | string;
  location: string | null;
  player1Id: number;
  player2Id: number;
  winnerId: number | null;
  player1: Player;
  player2: Player;
  winner: Player | null;
  player1Games: number[];
  player2Games: number[];
  superTiebreak: number[];
  gamesWonByPlayer1: number;
  gamesWonByPlayer2: number;
  setsWonByPlayer1: number;
  setsWonByPlayer2: number;
  tiebreaksWonByPlayer1: number;
  tiebreaksWonByPlayer2: number;
  createdAt: Date | string;
  updatedAt: Date | string;
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
  gamesWonByPlayer1: number;
  gamesWonByPlayer2: number;
  setsWonByPlayer1: number;
  setsWonByPlayer2: number;
  tiebreaksWonByPlayer1: number;
  tiebreaksWonByPlayer2: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  playerId: number | null;
}

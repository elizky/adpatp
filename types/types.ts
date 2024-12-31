export interface Match {
  id: number;
  date: string;
  location: string;
  player1Id: number;
  player1: PlayerInfo;
  player2Id: number;
  player2: PlayerInfo;
  winnerId: number;
  winner: PlayerInfo;
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
  ranking: number;
  date: string;
}

export interface Player {
  id: number;
  name: string;
  avatarUrl: string;
  ranking: number;
  rankingHistory: RankingHistory[];
  matchesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  setsWon: number;
  setsLost: number;
  tiebreaksWon: number;
  tiebreaksLost: number;
  matchesLost: number;
  racket?: string;
  handedness?: string;
  backhand?: string;
  clothingBrand?: string;
  birthplace?: string;
  favoriteShot?: string;
  rivalries?: string;
  playStyle?: string;
  height?: number;
  weight?: number;
  favoritePlayer?: string;
}

export interface PlayerInfo {
  id: number;
  name: string;
  avatarUrl: string;
}

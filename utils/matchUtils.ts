export function calculateMatchResults(
  location: string,
  player1Scores: string[],
  player2Scores: string[],
  player1Id: string,
  player2Id: string
) {
  // Convertir los puntajes a números y manejar valores vacíos
  const scores1 = player1Scores.map((score) => (score === '' ? null : parseInt(score, 10)));
  const scores2 = player2Scores.map((score) => (score === '' ? null : parseInt(score, 10)));

  // Calcular sets ganados por cada jugador (solo sets válidos)
  const setsWonByPlayer1 = scores1.filter(
    (game, idx) => game !== null && scores2[idx] !== null && game > scores2[idx]
  ).length;

  const setsWonByPlayer2 = scores2.filter(
    (game, idx) => game !== null && scores1[idx] !== null && game > scores1[idx]
  ).length;

  // Calcular el total de juegos ganados por cada jugador (excluyendo el super tiebreak)
  const totalGamesPlayer1 = scores1
    .slice(0, 2) // Solo considerar los dos primeros sets
    .filter((score) => score !== null)
    .reduce((acc, curr) => acc + curr, 0);

  const totalGamesPlayer2 = scores2
    .slice(0, 2) // Solo considerar los dos primeros sets
    .filter((score) => score !== null)
    .reduce((acc, curr) => acc + curr, 0);

  // Calcular si hubo un tiebreak (solo si hay 3 sets jugados)
  const superTiebreak = scores1.length === 3 ? [scores1[2] ?? 0, scores2[2] ?? 0] : [];

  // Determinar el ganador basado en los sets ganados
  const winnerId =
    setsWonByPlayer1 > setsWonByPlayer2 ? parseInt(player1Id, 10) : parseInt(player2Id, 10);

  // Determinar quién ganó el tiebreak si aplica
  const tiebreakWonByPlayer =
    superTiebreak[0] > 0 || superTiebreak[1] > 0
      ? superTiebreak[0] > superTiebreak[1]
        ? 1
        : 2
      : null;

  return {
    location,
    player1Id: parseInt(player1Id, 10),
    player2Id: parseInt(player2Id, 10),
    winnerId,
    player1Games: scores1.map((game) => game ?? 0),
    player2Games: scores2.map((game) => game ?? 0),
    superTiebreak,
    totalGamesPlayer1,
    totalGamesPlayer2,
    setsWonByPlayer1,
    setsWonByPlayer2,
    tiebreakWonByPlayer,
  };
} 
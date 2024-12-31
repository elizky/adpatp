import { Match } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function MatchCard({ match }: { match: Match }) {
  const hasSuperTiebreak = match.superTiebreak.length > 0;

  // Función para poner en negrita el número del ganador
  const getBoldScore = (player1Score: number, player2Score: number) => {
    if (player1Score > player2Score) {
      return 'font-black text-primary';
    }
    return '';
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        {match.location}
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {/* Información de Player 1 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={match.player1.avatarUrl || `/placeholder.svg?height=32&width=32`}
                />
                <AvatarFallback>{match.player1.name}</AvatarFallback>
              </Avatar>
              <span className='font-medium'>{match.player1.name}</span>
            </div>
            <div className='flex gap-2'>
              {match.player1Games.map((score, i) => (
                <span
                  key={i}
                  className={`w-6 text-center  ${getBoldScore(score, match.player2Games[i])}`}
                >
                  {score}
                </span>
              ))}
              {/* Mostrar super tiebreak si existe */}
              {hasSuperTiebreak && (
                <span
                  className={`w-6 text-center  ${getBoldScore(
                    match.superTiebreak[0],
                    match.superTiebreak[1]
                  )}`}
                >
                  {match.superTiebreak[0]}
                </span>
              )}
            </div>
          </div>

          {/* Información de Player 2 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={match.player2.avatarUrl || `/placeholder.svg?height=32&width=32`}
                />
                <AvatarFallback>{match.player2.name}</AvatarFallback>
              </Avatar>
              <span className='font-medium'>{match.player2.name}</span>
            </div>
            <div className='flex gap-2'>
              {match.player2Games.map((score, i) => (
                <span
                  key={i}
                  className={`w-6 text-center  ${getBoldScore(score, match.player1Games[i])}`}
                >
                  {score}
                </span>
              ))}
              {/* Mostrar super tiebreak si existe */}
              {hasSuperTiebreak && (
                <span
                  className={`w-6 text-center  ${getBoldScore(
                    match.superTiebreak[1],
                    match.superTiebreak[0]
                  )}`}
                >
                  {match.superTiebreak[1]}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='text-muted-foreground text-xs font-mono'>
        {new Date(match.date).toLocaleString()}
      </CardFooter>
    </Card>
  );
}

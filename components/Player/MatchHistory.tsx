import { MatchWon } from '@/types/types';
import { Card } from '../ui/card';

interface MatchHistoryProps {
  matches: MatchWon[];
}

export function MatchHistory({ matches }: MatchHistoryProps) {
  return (
    <div className='space-y-4 mt-4'>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}

function MatchCard({ match }: { match: MatchWon }) {
  const isWinner = (playerId: number) => match.winnerId === playerId;

  return (
    <Card className='p-4'>
      <div className='flex justify-between items-center mb-2'>
        <time className='text-sm text-gray-500'> {new Date(match.date).toLocaleString()}</time>
        {match.location && <span className='text-sm text-gray-500'>{match.location}</span>}
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <span className={`font-medium ${isWinner(match.player1Id) ? 'text-green-600' : ''}`}>
            {match.player1Id}
          </span>
          <span>vs</span>
          <span className={`font-medium ${isWinner(match.player2Id) ? 'text-green-600' : ''}`}>
            {match.player2Id}
          </span>
        </div>

        <div className='text-sm'>
          {match.player1Games.map((game, idx) => (
            <span key={idx} className='ml-2'>
              {game}-{match.player2Games[idx]}
            </span>
          ))}
          {match.superTiebreak.length > 0 && (
            <span className='ml-2'>
              [{match.superTiebreak[0]}-{match.superTiebreak[1]}]
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

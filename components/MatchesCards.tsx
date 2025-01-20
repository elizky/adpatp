import { Match } from '@/types/types'; // Asegúrate de importar los tipos correctamente
import MatchCard from './Match';

interface MatchesCardProps {
  matches: Match[];
  isAdmin: boolean;
}

export default function MatchesCards({ matches, isAdmin }: MatchesCardProps) {
  return (
    <div>
      <div className='flex items-center justify-between p-4 pl-0'>
        <h2 className='text-lg font-bold font-mono'>Partidos</h2>
      </div>

      <div className='space-y-4'>
        {matches.map((match) => (
          <MatchCard match={match} key={match.id} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

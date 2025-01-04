import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Match } from '@/types/types'; // Asegúrate de importar los tipos correctamente
import MatchCard from './Match';

interface MatchesCardProps {
  matches: Match[];
  isAdmin: boolean
}

export default function MatchesCards({ matches, isAdmin }: MatchesCardProps) {
  return (
    <Card className='bg-card'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Live Matches</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {matches.map((match) => (
          <MatchCard match={match} key={match.id} isAdmin={isAdmin} />
        ))}
      </CardContent>
    </Card>
  );
}

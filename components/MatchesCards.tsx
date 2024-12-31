import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Match } from '@/types/types'; // Asegúrate de importar los tipos correctamente
import MatchCard from './Match';

interface MatchesCardProps {
  matches: Match[];
}

export default function MatchesCards({ matches }: MatchesCardProps) {
  return (
    <Card className='bg-card'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Live Matches</CardTitle>
        {/* <AddMatchDialog /> */}
      </CardHeader>
      <CardContent className='space-y-4'>
        {matches.map((match) => (
          <MatchCard match={match} key={match.id} />
        ))}
      </CardContent>
    </Card>
  );
}

import { Match } from '@/types/types';
import MatchCard from '@/components/Match';

interface MatchHistoryProps {
  matches: Match[];
}

export function MatchHistory({ matches }: MatchHistoryProps) {
  return (
    <div className='space-y-4 mt-4'>
      {matches.length > 0 ? (
        matches.map((match) => <MatchCard key={match.id} match={match} />)
      ) : (
        <NotMatches />
      )}
    </div>
  );
}

function NotMatches() {
  return <p className='text-muted-foreground text-center text-sm pt-4'>Not matches yet...</p>;
}

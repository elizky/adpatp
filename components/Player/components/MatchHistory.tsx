import { Match } from '@/types/types';
import MatchCard from '@/components/Match';
import { auth } from '@/auth';

interface MatchHistoryProps {
  matches: Match[];
}

export async function MatchHistory({ matches }: MatchHistoryProps) {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';
  return (
    <div className='space-y-4 mt-4'>
      {matches.length > 0 ? (
        matches.map((match) => <MatchCard key={match.id} match={match} isAdmin={isAdmin} />)
      ) : (
        <NotMatches />
      )}
    </div>
  );
}

function NotMatches() {
  return <p className='text-muted-foreground text-center text-sm pt-4'>Not matches yet...</p>;
}

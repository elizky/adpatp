import { getMatches } from '@/actions/data-actions';
import { auth } from '@/auth';
import MatchCard from '@/components/Match';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partidos',
};

export default async function MatchesPage() {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';
  const matches = await getMatches();
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold font-mono mb-12'>Partidos</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
        {matches.map((match) => (
          <MatchCard match={match} key={match.id} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
}

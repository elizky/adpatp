import { auth } from '@/auth';

import MatchFormButton from '@/components/forms/MatchFormButton';
import MatchesCards from '@/components/MatchesCards';
import RankingsTable from '@/components/RankingTable';

import { getMatches, getPlayers } from '@/lib/services/dataService';

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  const players = await getPlayers();
  const matches = await getMatches();
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        {isAdmin && <MatchFormButton players={players} />}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <RankingsTable players={players} />
          </div>
          <div>
            <MatchesCards matches={matches} isAdmin={isAdmin}/>
          </div>
        </div>
      </main>
    </div>
  );
}

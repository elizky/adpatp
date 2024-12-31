import { auth } from '@/auth';
import MatchesCards from '@/components/MatchesCards';
import RankingsTable from '@/components/RankingTable';
import SignIn from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { matches } from '@/data/matches';
import { players } from '@/data/players';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-4'>
            <Image
              className='dark:invert'
              src='/tennis.svg'
              alt='ADP ATP Logo'
              width={15}
              height={15}
              priority
            />
            <h1 className='text-xl font-semibold'>ADP ATP</h1>
          </div>
          {!session ? <SignIn /> : <SignOut />}
        </div>
      </header>

      <main className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <RankingsTable players={players} />
          </div>
          <div>
            <MatchesCards matches={matches} />
          </div>
        </div>
      </main>
    </div>
  );
}

import { auth } from '@/auth';
import SignIn from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';

export default async function Home() {
  const session = await auth();

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-4'>
            <img src='/placeholder.svg?height=40&width=40' alt='ATP Logo' className='h-10 w-10' />
            <h1 className='text-xl font-semibold'>ATP Tennis Rankings</h1>
            <h3> Welcome {session?.user.name}</h3>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {!session ? <SignIn /> : <SignOut />}

          {/* <div className='lg:col-span-2'>
            <RankingsTable players={players} />
          </div>
          <div>
            <LiveMatches />
          </div> */}
        </div>
      </main>
    </div>
  );
}

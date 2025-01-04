import { auth } from '@/auth';
import HomeComponent from '@/components/Home';

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-6'>
        <HomeComponent isAdmin={isAdmin} />
      </main>
    </div>
  );
}

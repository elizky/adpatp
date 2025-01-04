import { auth } from '@/auth';
import HomeComponent from '@/components/Home';

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  return <HomeComponent isAdmin={isAdmin} />;
}

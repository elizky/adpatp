import { getMatchesByPlayerId, getPlayerById } from '@/actions/data-actions';
import { auth } from '@/auth';
import PlayerComponent from '@/components/Player/PlayerComponent';
import { PagesProps } from '@/types/types';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
  const id = (await params).id;
  const player = await getPlayerById(Number(id));
  return {
    title: player?.name,
  };
}

export default async function Page({ params }: PagesProps) {
  const { id } = await params;
  const player = await getPlayerById(Number(id));
  const matchesPlayed = await getMatchesByPlayerId(Number(id));
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  const isPlayer = session?.user.id === player?.userId;

  if (!player) {
    return (
      <main className='container mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold text-primary font-mono text-center mb-20'>
          No player found
        </h1>
        <div className='flex justify-center'>
          <Link href='/' className='flex gap-2 '>
            <ArrowLeft /> Volver atras
          </Link>
        </div>
      </main>
    );
  }

  return (
    <PlayerComponent player={player} matchesPlayed={matchesPlayed} canEdit={isAdmin || isPlayer} />
  );
}

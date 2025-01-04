import { getMatchesByPlayerId, getPlayerById } from '@/actions/data-actions';
import PlayerComponent from '@/components/Player/PlayerComponent';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const player = await getPlayerById(Number(id));
  return {
    title: player?.name,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const player = await getPlayerById(Number(id));
  const matchesPlayed = await getMatchesByPlayerId(Number(id));

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

  return <PlayerComponent player={player} matchesPlayed={matchesPlayed} />;
}

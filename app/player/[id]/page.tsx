import { getMatchesByPlayerId, getPlayerById } from '@/actions/data-actions';
import PlayerComponent from '@/components/Player/PlayerComponent';
import { Metadata } from 'next';

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
    return <div>Player not found</div>;
  }

  return <PlayerComponent player={player} matchesPlayed={matchesPlayed} />;
}

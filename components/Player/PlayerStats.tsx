import { Player } from '@/types/types';
import { Card, CardContent, CardHeader } from '../ui/card';

export function PlayerStats({ player }: { player: Player }) {
  const winRate = (
    (player.matchesWon.length / (player.matchesWon.length + player.matchesLost)) *
    100
  ).toFixed(1);

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
      <StatCard title='Current Ranking' value={`#${player.ranking}`} />
      <StatCard title='Win Rate' value={`${winRate}%`} />
      <StatCard title='Games Won/Lost' value={`${player.gamesWon}/${player.gamesLost}`} />
      <StatCard title='Sets Won/Lost' value={`${player.setsWon}/${player.setsLost}`} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className='text-sm font-medium'>{title}</CardHeader>
      <CardContent className='mt-2 text-3xl font-semibold text-primary font-mono'>{value}</CardContent>
    </Card>
  );
}

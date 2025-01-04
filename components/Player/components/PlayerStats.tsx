import { Player } from '@/types/types';
import { Card, CardContent, CardHeader } from '../../ui/card';

export function PlayerStats({ player }: { player: Player }) {
  const winRate = (
    (player.matchesWon.length / (player.matchesWon.length + player.matchesLost)) *
    100
  ).toFixed(1);

  const displayWinRate = isNaN(Number(winRate)) ? 'N/A' : `${winRate}%`;

  return (
    <div className='grid grid-cols-2 gap-8'>
      <StatCard title='Ranking Actual' value={`#${player.ranking}`} />
      <StatCard title='Win Rate' value={`${displayWinRate}`} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='text-sm font-medium'>{title}</CardHeader>
      <CardContent className='mt-2 text-3xl font-semibold text-primary font-mono'>
        {value}
      </CardContent>
    </Card>
  );
}

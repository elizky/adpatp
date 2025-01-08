import { Match, Player } from '@/types/types';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayerStats } from './components/PlayerStats';
import { MatchHistory } from './components/MatchHistory';
import { RankingChart } from './components/RankingChart';
import { PieChartComponent } from '../charts/PieChart';

interface PlayerComponentProps {
  player: Player;
  matchesPlayed: Match[];
  canEdit: boolean;
}

export default function PlayerComponent({ player, matchesPlayed, canEdit }: PlayerComponentProps) {
  const playersGames = [
    {
      status: 'win',
      value: player.gamesWon,
      fill: 'var(--color-win)',
    },
    {
      status: 'lost',
      value: player.gamesLost,
      fill: 'var(--color-lost)',
    },
  ];
  const playersSets = [
    {
      status: 'win',
      value: player.setsWon,
      fill: 'var(--color-win)',
    },
    {
      status: 'lost',
      value: player.setsLost,
      fill: 'var(--color-lost)',
    },
  ];
  return (
    <main className='container mx-auto py-8 px-4 space-y-8'>
      <PlayerInfo player={player} canEdit={canEdit} />

      <PlayerStats player={player} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8'>
        <RankingChart history={player.rankingHistory} />
        <div className='space-y-4 mt-4'>
          <PieChartComponent title='Games Won/Lost' chartData={playersGames} />
        </div>
        <div className='space-y-4 mt-4'>
          <PieChartComponent title='Sets Won/Lost' chartData={playersSets} />
        </div>
      </div>

      <MatchHistory matches={matchesPlayed} />
    </main>
  );
}

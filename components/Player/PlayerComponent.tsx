import { Player } from '@/types/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlayerInfo } from './PlayerInfo';
import { PlayerStats } from './PlayerStats';
import { MatchHistory } from './MatchHistory';
import { RankingChart } from './RankingChart';

export default function PlayerComponent({ player }: { player: Player }) {
  return (
    <div className=''>
      <main className='container mx-auto py-8 px-4'>
        <PlayerInfo player={player} />

        <div className='mt-8'>
          <PlayerStats player={player} />
        </div>

        <div className='mt-8'>
          <Tabs defaultValue='matches'>
            <TabsList>
              <TabsTrigger value='matches'>Match History</TabsTrigger>
              <TabsTrigger value='ranking'>Ranking History</TabsTrigger>
            </TabsList>

            <TabsContent value='matches'>
              <MatchHistory matches={player.matchesWon} />
            </TabsContent>

            <TabsContent value='ranking'>
              <RankingChart history={player.rankingHistory} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

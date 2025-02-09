import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Player } from '@/types/types';
import Link from 'next/link';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface RankingsTableProps {
  players: Player[];
}

export default function RankingsTable({ players }: RankingsTableProps) {
  const rankedPlayers = players.sort((a, b) => a.ranking - b.ranking);

  const getRankingChange = (player: Player) => {
    const history = player.rankingHistory;
    if (history.length < 2) return null;

    // Ordenamos por fecha descendente
    const sortedHistory = [...history].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Tomamos el ranking actual y el anterior
    const currentRanking = sortedHistory[0].ranking;
    const previousRanking = sortedHistory[1].ranking;

    return previousRanking - currentRanking;
  };

  return (
    <div className='rounded-lg bg-card'>
      <div className='flex items-center justify-between p-4 pl-0'>
        <h2 className='text-lg font-bold font-mono'>Ranking</h2>
      </div>
      <Table className='border'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>Rank</TableHead>
            <TableHead>Jugador</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedPlayers.map((player) => {
            const rankingChange = getRankingChange(player);
            return (
              <TableRow key={player.ranking}>
                <TableCell className='font-bold text-base font-mono'>{player.ranking}</TableCell>
                <TableCell>
                  <Link href={`/player/${player.id}`}>
                    <div className='flex items-center gap-3 hover:text-primary'>
                      <Avatar className='h-12 w-12'>
                        <AvatarImage src={player.avatarUrl || `/tennis-player.svg`} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className='font-medium text-base'>{player.name}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  {rankingChange !== null && (
                    <div className='flex items-center gap-1'>
                      {rankingChange > 0 ? (
                        <ArrowUpIcon className='text-green-500 h-4 w-4' />
                      ) : rankingChange < 0 ? (
                        <ArrowDownIcon className='text-red-500 h-4 w-4' />
                      ) : null}
                      {rankingChange !== 0 && (
                        <span className='text-sm'>{Math.abs(rankingChange)}</span>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

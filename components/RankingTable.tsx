import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Player } from '@/types/types';
import Link from 'next/link';

interface RankingsTableProps {
  players: Player[];
}

export default function RankingsTable({ players }: RankingsTableProps) {
  const rankedPlayers = players.sort((a, b) => a.ranking - b.ranking);

  console.log('rankedPlayers', rankedPlayers);
  return (
    <div className='rounded-lg border bg-card'>
      <div className='flex items-center justify-between p-4'>
        <h2 className='text-lg font-semibold'>Ranking</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>Rank</TableHead>
            <TableHead>Player</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedPlayers.map((player) => (
            <TableRow key={player.ranking}>
              <TableCell className='font-medium'>{player.ranking}</TableCell>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={player.avatarUrl || `/tennis-player.svg`} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <Link href={`/player/${player.id}`}>
                    <div className='font-medium'>{player.name}</div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-4'>
          Last updated: {new Date().toLocaleDateString()}
        </TableCaption>
      </Table>
    </div>
  );
}

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

  return (
    <div className='rounded-lg border bg-card'>
      <div className='flex items-center justify-between p-4'>
        <h2 className='text-lg font-bold font-mono'>Ranking</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>Rank</TableHead>
            <TableHead>Jugador</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedPlayers.map((player) => (
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
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className='pb-4'>
          Utlima actualizacion: {new Date().toLocaleDateString()}
        </TableCaption>
      </Table>
    </div>
  );
}

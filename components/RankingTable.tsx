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

interface Player {
  rank: number;
  name: string;
  country: string;
  points: number;
  previousPoints: number;
  image?: string;
}

interface RankingsTableProps {
  players: Player[];
}

export default function RankingsTable({ players }: RankingsTableProps) {
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
            <TableHead className='text-right'>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.rank}>
              <TableCell className='font-medium'>{player.rank}</TableCell>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={player.image || `/tennis-player.svg`} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium'>{player.name}</div>
                    <div className='text-sm text-muted-foreground'>{player.country}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='text-right font-medium text-primary'>{player.points}</TableCell>
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

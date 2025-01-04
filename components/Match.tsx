'use client';

import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { useModal } from '@/lib/ModalContext';
import { Match } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { deleteMatchAction } from '@/actions/edit-delete-actions';

interface MatchCardProps {
  match: Match;
  isAdmin: boolean;
}

export default function MatchCard({ match, isAdmin }: MatchCardProps) {
  const { openModal, setMatchData } = useModal();

  const hasSuperTiebreak = match.superTiebreak[0] > 0 || match.superTiebreak[1] > 0;

  // Games without super tiebreak
  const [player1Games, player2Games] = hasSuperTiebreak
    ? [match.player1Games, match.player2Games]
    : [match.player1Games.slice(0, -1), match.player2Games.slice(0, -1)];

  const getBoldScore = (player1Score: number, player2Score: number) => {
    if (player1Score > player2Score) {
      return 'font-black text-primary';
    }
    return '';
  };

  // Handle editing the match
  const handleEdit = () => {
    setMatchData(match); // Pasa los datos del partido al contexto.
    openModal(); // Abre el modal.
  };

  // Handle deleting the match
  const handleDelete = () => {
    deleteMatchAction(match.id);
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        {match.location}
        {isAdmin && (
          <div className='flex gap-4'>
            <Button size='icon' variant='outline' onClick={handleEdit}>
              <Pencil className='h-4 w-4' />
            </Button>
            <Button size='icon' variant='outline' onClick={handleDelete}>
              <Trash className='h-4 w-4' />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {/* Player 1 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={match.player1.avatarUrl || `/placeholder.svg?height=32&width=32`}
                />
                <AvatarFallback>{match.player1.name}</AvatarFallback>
              </Avatar>
              <Link href={`/player/${match.player1.id}`}>
                <span className='font-medium hover:text-primary'>
                  {match.player1.name}
                  {match.winnerId === match.player1.id && (
                    <span className='ml-2 text-green-500'>🎾</span>
                  )}
                </span>
              </Link>
            </div>
            <div className='flex gap-2'>
              {player1Games.map((score, i) => (
                <span
                  key={i}
                  className={`w-6 text-center  ${getBoldScore(score, player2Games[i])}`}
                >
                  {score}
                </span>
              ))}
            </div>
          </div>

          {/* Player 2 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={match.player2.avatarUrl || `/placeholder.svg?height=32&width=32`}
                />
                <AvatarFallback>{match.player2.name}</AvatarFallback>
              </Avatar>
              <Link href={`/player/${match.player2.id}`}>
                <span className='font-medium hover:text-primary'>
                  {match.player2.name}
                  {match.winnerId === match.player2.id && (
                    <span className='ml-2 text-green-500'>🎾</span>
                  )}
                </span>
              </Link>
            </div>
            <div className='flex gap-2'>
              {player2Games.map((score, i) => (
                <span
                  key={i}
                  className={`w-6 text-center  ${getBoldScore(score, player1Games[i])}`}
                >
                  {score}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='text-muted-foreground text-xs font-mono'>
        {new Date(match.date).toLocaleString()}
      </CardFooter>
    </Card>
  );
}

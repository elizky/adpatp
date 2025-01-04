import { Player } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Trophy,
  User,
  Ruler,
  Weight,
  Heart,
  Swords,
  Target,
  Shirt,
  BicepsFlexed,
  Menu,
} from 'lucide-react';
import { Separator } from '../../ui/separator';
import { Card } from '../../ui/card';

interface PlayerInfoProps {
  player: Player;
}

export function PlayerInfo({ player }: PlayerInfoProps) {
  return (
    <Card className='p-6'>
      <div className='flex flex-col sm:flex-row items-start sm:space-x-6'>
        <Avatar className='h-32 w-32 self-center sm:self-baseline'>
          <AvatarImage src={player.avatarUrl || undefined} alt={player.name} />
          <AvatarFallback>
            <User className='h-16 w-16' />
          </AvatarFallback>
        </Avatar>

        <div className='sm:flex-1 self-center'>
          <div className='flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0 text-center sm:text-left'>
            <div>
              <h1 className='text-3xl font-bold text-primary font-mono'>
                {player.name || 'Nombre no disponible'}
              </h1>
              <p className='text-gray-500 mt-1'>
                {player.birthplace || 'Lugar de nacimiento no disponible'}
              </p>
            </div>
            {player.matchesWon.length > 0 && (
              <div className='flex items-center space-x-2 bg-primary px-4 py-2 rounded-full'>
                <Trophy className='h-5 w-5 text-muted' />
                <span className='font-semibold text-muted'>
                  {player.matchesWon.length} Partidos Ganados
                </span>
              </div>
            )}
          </div>

          <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-4'>
            <div className='flex items-center space-x-2 text-foreground'>
              <BicepsFlexed className='h-5 w-5 text-muted-foreground' />
              <span>{player.handedness || 'Mano no disponible'}</span>
            </div>

            <div className='flex items-center space-x-2 text-foreground'>
              <Target className='h-5 w-5 text-muted-foreground' />
              <span>{player.backhand || 'Backhand no disponible'}</span>
            </div>

            <div className='flex items-center space-x-2 text-foreground'>
              <Menu className='h-5 w-5 text-muted-foreground' />
              <span>{player.racket || 'N/A'}</span>
            </div>

            <div className='flex items-center space-x-2 text-foreground'>
              <Shirt className='h-5 w-5 text-muted-foreground' />
              <span>{player.clothingBrand || 'Marca de ropa no disponible'}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className='my-6' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='space-y-4'>
          <h3 className='font-semibold text-primary font-mono'>Stats Físicos</h3>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-foreground'>
              <Ruler className='h-4 w-4 text-muted-foreground' />
              <span>{`Altura: ${player.height ? player.height + 'cm' : '-'}`}</span>
            </div>
            <div className='flex items-center space-x-2 text-foreground'>
              <Weight className='h-4 w-4 text-muted-foreground' />
              <span>{`Peso: ${player.weight ? player.weight + 'kg' : '-'}`}</span>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='font-semibold text-primary font-mono'>Estilo de Juego</h3>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-foreground'>
              <Target className='h-4 w-4 text-muted-foreground' />
              <span>Estilo: {player.playStyle ? player.playStyle : '-'}</span>
            </div>

            <div className='flex items-center space-x-2 text-foreground'>
              <Target className='h-4 w-4 text-muted-foreground' />
              <span>Tiro Favorito: {player.favoriteShot ? player.favoriteShot : '-'}</span>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='font-semibold text-primary font-mono'>Personal</h3>
          <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-foreground'>
              <Heart className='h-4 w-4 text-muted-foreground' />
              <span>Idolo: {player.favoritePlayer ? player.favoritePlayer : '-'}</span>
            </div>

            <div className='flex items-center space-x-2 text-foreground'>
              <Swords className='h-4 w-4 text-muted-foreground' />
              <span>Rivalidades: {player.rivalries ? player.rivalries : '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

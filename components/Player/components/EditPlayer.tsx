'use client';
import { useState, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Edit, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/types/types';
import { updatePlayer } from '@/actions/data-actions';
import { ScrollArea } from '@/components/ui/scroll-area';

const playerSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  birthplace: z.string().optional(),
  handedness: z.string().optional(),
  backhand: z.string().optional(),
  racket: z.string().optional(),
  clothingBrand: z.string().optional(),
  height: z
    .union([z.string(), z.number()])
    .transform((val) => (val === '' ? undefined : Number(val)))
    .optional(),
  weight: z
    .union([z.string(), z.number()])
    .transform((val) => (val === '' ? undefined : Number(val)))
    .optional(),
  playStyle: z.string().optional(),
  favoriteShot: z.string().optional(),
  favoritePlayer: z.string().optional(),
  rivalries: z.string().optional(),
});

interface EditPlayerProps {
  player: Player;
}

type PlayerFormData = z.infer<typeof playerSchema>;

const EditPlayer = ({ player }: EditPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: player.name ?? undefined,
        birthplace: player.birthplace ?? undefined,
        handedness: player.handedness ?? undefined,
        backhand: player.backhand ?? undefined,
        racket: player.racket ?? undefined,
        clothingBrand: player.clothingBrand ?? undefined,
        height: player.height ?? undefined,
        weight: player.weight ?? undefined,
        playStyle: player.playStyle ?? undefined,
        favoriteShot: player.favoriteShot ?? undefined,
        favoritePlayer: player.favoritePlayer ?? undefined,
        rivalries: player.rivalries ?? undefined,
      });
    }
  }, [isOpen, player, reset]);

  const onSubmit = async (data: PlayerFormData) => {
    setLoading(true);
    try {
      await updatePlayer(player.id, data);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Error updating player:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='absolute right-0' size='icon'>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-10/12 h-5/6 sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Editar Informacion del Jugador</DialogTitle>
          <DialogDescription>
            Cambia la informacion del jugador. Luego clickea guardar
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <div className='grid gap-5 py-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='name' className='text-left font-mono'>
                    Nombre
                  </Label>
                  <Input id='name' {...register('name')} className='border-primary' />
                  {errors.name && <span>{(errors.name as FieldError).message}</span>}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='birthplace' className='text-left font-mono'>
                    Lugar de nacimiento
                  </Label>
                  <Input id='birthplace' {...register('birthplace')} className='border-primary' />
                  {errors.birthplace && <span>{(errors.birthplace as FieldError).message}</span>}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='handedness' className='text-left font-mono'>
                    Mano
                  </Label>
                  <Input id='handedness' {...register('handedness')} className='border-primary' />
                  {errors.handedness && <span>{(errors.handedness as FieldError).message}</span>}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='backhand' className='text-left font-mono'>
                    Reves
                  </Label>
                  <Input id='backhand' {...register('backhand')} className='border-primary' />
                  {errors.backhand && <span>{(errors.backhand as FieldError).message}</span>}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='racket' className='text-left font-mono'>
                    Raqueta
                  </Label>
                  <Input id='racket' {...register('racket')} className='border-primary' />
                  {errors.racket && <span>{(errors.racket as FieldError).message}</span>}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='clothingBrand' className='text-left font-mono'>
                    Marca de ropa
                  </Label>
                  <Input
                    id='clothingBrand'
                    {...register('clothingBrand')}
                    className='border-primary'
                  />
                  {errors.clothingBrand && (
                    <span>{(errors.clothingBrand as FieldError).message}</span>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='height' className='text-left font-mono'>
                    Altura (cm)
                  </Label>
                  <Input
                    id='height'
                    {...register('height')}
                    type='number'
                    className='border-primary'
                  />
                  {errors.height && <span>{(errors.height as FieldError).message}</span>}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='weight' className='text-left font-mono'>
                    Peso (kg)
                  </Label>
                  <Input
                    id='weight'
                    {...register('weight')}
                    type='number'
                    className='border-primary'
                  />
                  {errors.weight && <span>{(errors.weight as FieldError).message}</span>}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='playStyle' className='text-left font-mono'>
                    Estilo de juego
                  </Label>
                  <Input id='playStyle' {...register('playStyle')} className='border-primary' />
                  {errors.playStyle && <span>{(errors.playStyle as FieldError).message}</span>}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='favoriteShot' className='text-left font-mono'>
                    Tiro favorito
                  </Label>
                  <Input
                    id='favoriteShot'
                    {...register('favoriteShot')}
                    className='border-primary'
                  />
                  {errors.favoriteShot && (
                    <span>{(errors.favoriteShot as FieldError).message}</span>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='favoritePlayer' className='text-left font-mono'>
                    Jugador Favorito
                  </Label>
                  <Input
                    id='favoritePlayer'
                    {...register('favoritePlayer')}
                    className='border-primary'
                  />
                  {errors.favoritePlayer && (
                    <span>{(errors.favoritePlayer as FieldError).message}</span>
                  )}
                </div>
                <div className='grid items-center gap-4'>
                  <Label htmlFor='rivalries' className='text-left font-mono'>
                    Rivalidades
                  </Label>
                  <Input id='rivalries' {...register('rivalries')} className='border-primary' />
                  {errors.rivalries && <span>{(errors.rivalries as FieldError).message}</span>}
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' disabled={loading} className='w-full'>
                  {loading ? <Loader className='animate-spin h-4 w-4' /> : 'Guardar'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlayer;

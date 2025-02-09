'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Loader } from 'lucide-react';
import { saveMatchAction } from '@/actions/match-actions';

import { Player, Match } from '@/types/types';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PlayerScoreInput from './PlayerScoreInput';
import { editMatchAction } from '@/actions/edit-delete-actions';
import { Textarea } from '../ui/textarea';

interface MatchFormProps {
  players: Player[];
  fetchData: () => Promise<void>;
  match?: Match | null; // Para edición
  isOpen: boolean;
  closeModal: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MatchForm({
  players,
  fetchData,
  match,
  isOpen,
  closeModal,
  setIsOpen,
}: MatchFormProps) {
  const [formData, setFormData] = useState({
    location: match?.location || '',
    player1: match?.player1Id || '',
    player2: match?.player2Id || '',
    player1Games: match?.player1Games || ['', '', ''],
    player2Games: match?.player2Games || ['', '', ''],
    comments: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match) {
      setFormData({
        location: match.location || '',
        player1: match.player1Id,
        player2: match.player2Id,
        player1Games: match.player1Games,
        player2Games: match.player2Games,
        comments: '',
      });
    }
  }, [match]);

  const availablePlayersForPlayer2 = players.filter(
    (player) => player.id.toString() !== formData.player1
  );
  const availablePlayersForPlayer1 = players.filter(
    (player) => player.id.toString() !== formData.player2
  );

  const cleanForm = () => {
    setFormData({
      location: '',
      player1: '',
      player2: '',
      player1Games: ['', '', ''],
      player2Games: ['', '', ''],
      comments: '',
    });
    setLoading(false);
    closeModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (match) {
        // Modo edición
        await editMatchAction({
          matchId: match.id.toLocaleString(),
          location: formData.location,
          player1Id: formData.player1.toLocaleString(),
          player2Id: formData.player2.toLocaleString(),
          player1Games: formData.player1Games,
          player2Games: formData.player2Games,
        });
      } else {
        // Modo creación
        await saveMatchAction({
          location: formData.location,
          player1Id: formData.player1.toLocaleString(),
          player2Id: formData.player2.toLocaleString(),
          player1Games: formData.player1Games,
          player2Games: formData.player2Games,
          comments: formData.comments,
        });
      }

      console.log(`${match ? 'Match edited' : 'Match saved'} successfully`);
      cleanForm();
      fetchData();
    } catch (error) {
      console.error(`Failed to ${match ? 'edit' : 'save'} match:`, error);
      cleanForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='w-full mb-6'>{match ? 'Editar Partido' : '+ Agregar Partido'}</Button>
      </DialogTrigger>
      <DialogContent className='w-10/12 sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{match ? 'Editar Partido' : 'Agregar Partido'}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {match ? 'Actualiza los resultados del partido' : 'Agrega el resultado del partido'}
        </DialogDescription>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='location'>Lugar</Label>
              <Input
                disabled={loading}
                id='location'
                placeholder='Club de Tenis Buenos Aires'
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className='w-full'
              />
            </div>

            <div className='space-y-2'>
              <Label>Jugador 1</Label>
              <Select
                disabled={loading}
                value={formData.player1.toString()}
                onValueChange={(value) => setFormData({ ...formData, player1: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Jugaror 1' />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayersForPlayer1.map((player) => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={player.avatarUrl || `/placeholder.svg?height=32&width=32`}
                          />
                          <AvatarFallback>{player.name}</AvatarFallback>
                        </Avatar>
                        {player.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Jugador 2</Label>
              <Select
                disabled={loading}
                value={formData.player2.toString()}
                onValueChange={(value) => setFormData({ ...formData, player2: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Jugaror 2' />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayersForPlayer2.map((player) => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                      <div className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={player.avatarUrl || `/placeholder.svg?height=32&width=32`}
                          />
                          <AvatarFallback>{player.name}</AvatarFallback>
                        </Avatar>
                        {player.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.player1 && (
              <PlayerScoreInput
                players={players}
                player={formData.player1.toString()}
                scores={formData.player1Games.map((score) => score.toString())}
                onScoreChange={(scores) =>
                  setFormData((prev) => ({ ...prev, player1Games: scores }))
                }
              />
            )}

            {formData.player2 && (
              <PlayerScoreInput
                players={players}
                player={formData.player2.toString()}
                scores={formData.player2Games.map((score) => score.toString())}
                onScoreChange={(scores) =>
                  setFormData((prev) => ({ ...prev, player2Games: scores }))
                }
              />
            )}

            <div className='space-y-2'>
              <Label htmlFor='comments'>Comentarios</Label>
              <Textarea
                disabled={loading}
                id='comments'
                placeholder='Agregar comentario...'
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className='w-full'
              />
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <Loader className='animate-spin h-4 w-4' />
            ) : match ? (
              'Actualizar Partido'
            ) : (
              'Guardar Partido'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Player } from '@/types/types';
import PlayerScoreInput from './PlayerScoreInput';
import { useModal } from '@/lib/ModalContext';

interface MatchFormProps {
  players: Player[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MatchForm({ players, isOpen, setIsOpen }: MatchFormProps) {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    location: '',
    player1: '',
    player2: '',
    player1Scores: ['', '', ''],
    player2Scores: ['', '', ''],
  });

  // Filtrar jugadores para que no se repitan
  const availablePlayersForPlayer2 = players.filter(
    (player) => player.id.toString() !== formData.player1
  );
  const availablePlayersForPlayer1 = players.filter(
    (player) => player.id.toString() !== formData.player2
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formData', formData);
    closeModal();
    // Reset form data
    setFormData({
      location: '',
      player1: '',
      player2: '',
      player1Scores: ['', '', ''],
      player2Scores: ['', '', ''],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-10/12 sm:max-w-[500px]'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <DialogHeader>
            <DialogTitle>Add Tennis Match Result</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                placeholder='Club de Tenis Buenos Aires'
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className='w-full'
              />
            </div>

            <div className='space-y-2'>
              <Label>Player 1</Label>
              <Select
                value={formData.player1}
                onValueChange={(value) => setFormData({ ...formData, player1: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select player 1' />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayersForPlayer1.map((player) => (
                    <SelectItem key={player.id} value={player.id.toLocaleString()}>
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
              <Label>Player 2</Label>
              <Select
                value={formData.player2}
                onValueChange={(value) => setFormData({ ...formData, player2: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select player 2' />
                </SelectTrigger>
                <SelectContent>
                  {availablePlayersForPlayer2.map((player) => (
                    <SelectItem key={player.id} value={player.id.toLocaleString()}>
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
                player={formData.player1}
                scores={formData.player1Scores}
                onScoreChange={(scores) =>
                  setFormData((prev) => ({ ...prev, player1Scores: scores }))
                }
              />
            )}

            {formData.player2 && (
              <PlayerScoreInput
                players={players}
                player={formData.player2}
                scores={formData.player2Scores}
                onScoreChange={(scores) =>
                  setFormData((prev) => ({ ...prev, player2Scores: scores }))
                }
              />
            )}
          </div>

          <Button type='submit' className='w-full'>
            Save Match Result
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { saveMatchAction } from '@/actions/match-actions';

import { Player } from '@/types/types';
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

const MatchFormButton = ({ players }: { players: Player[] }) => {
  const [formData, setFormData] = useState({
    location: '',
    player1: '',
    player2: '',
    player1Scores: ['', '', ''],
    player2Scores: ['', '', ''],
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filtrar jugadores para que no se repitan
  const availablePlayersForPlayer2 = players.filter(
    (player) => player.id.toString() !== formData.player1
  );
  const availablePlayersForPlayer1 = players.filter(
    (player) => player.id.toString() !== formData.player2
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('formData', formData);
    setLoading(true);

    try {
      await saveMatchAction({
        location: formData.location,
        player1Id: formData.player1,
        player2Id: formData.player2,
        player1Scores: formData.player1Scores,
        player2Scores: formData.player2Scores,
      });

      console.log('Match saved successfully');

      // Reset form data
      setFormData({
        location: '',
        player1: '',
        player2: '',
        player1Scores: ['', '', ''],
        player2Scores: ['', '', ''],
      });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error('Failed to save match:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full mb-6'>+ Add Tennis Match Result</Button>
      </DialogTrigger>
      <DialogContent className={`w-10/12 sm:max-w-[500px]`}>
        <DialogHeader>
          <DialogTitle>Add Tennis Match Result</DialogTitle>
        </DialogHeader>

        <DialogDescription>Add the results for the match</DialogDescription>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
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
              <Label>Player 1</Label>
              <Select
                disabled={loading}
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
                disabled={loading}
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

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? <Loader className=' animate-spin h-4 w-4' /> : 'Save Match Result'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MatchFormButton;

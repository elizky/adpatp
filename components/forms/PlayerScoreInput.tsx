import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Player } from '@/types/types';

interface PlayerScoreInputProps {
  players: Player[];
  player: string;
  scores: string[];
  onScoreChange: (scores: string[]) => void;
}

export default function PlayerScoreInput({
  players,
  player,
  scores,
  onScoreChange,
}: PlayerScoreInputProps) {
  const findPlayer = players.find((p) => p.id === Number(player));

  const handleScoreChange = (index: number, value: string) => {
    const updatedScores = [...scores];
    updatedScores[index] = value;
    onScoreChange(updatedScores);
  };

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={findPlayer?.avatarUrl || `/placeholder.svg?height=32&width=32`} />
          <AvatarFallback>{findPlayer?.name}</AvatarFallback>
        </Avatar>
        <span className='text-sm font-medium'>{findPlayer?.name}</span>
      </div>
      <div className='flex gap-2'>
        {[0, 1, 2].map((index) => (
          <Input
            key={index}
            type='tel'
            min='0'
            max='99'
            value={scores[index] || ''}
            onChange={(e) => handleScoreChange(index, e.target.value)}
            className='h-10 w-10 p-0 text-center text-lg font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          />
        ))}
      </div>
    </div>
  );
}

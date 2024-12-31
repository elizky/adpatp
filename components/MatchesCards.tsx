import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Match {
  id: number;
  tournament: string;
  time: string;
  player1: {
    name: string;
    score: number[];
    image?: string;
  };
  player2: {
    name: string;
    score: number[];
    image?: string;
  };
}

const liveMatches: Match[] = [
  {
    id: 1,
    tournament: 'ATP 250, Brisbane, Australia',
    time: '2:35',
    player1: {
      name: 'Thompson J.',
      score: [6, 6],
    },
    player2: {
      name: 'Berrettini M.',
      score: [3, 4],
    },
  },
  // Add more matches as needed
];

export default function MatchesCards() {
  return (
    <Card className='bg-card'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Live Matches</CardTitle>
        {/* <AddMatchDialog /> */}
      </CardHeader>
      <CardContent className='space-y-4'>
        {liveMatches.map((match) => (
          <div key={match.id} className='space-y-4'>
            <div className='text-sm text-muted-foreground'>{match.tournament}</div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src={match.player1.image || `/placeholder.svg?height=32&width=32`}
                    />
                    <AvatarFallback>{match.player1.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className='font-medium'>{match.player1.name}</span>
                </div>
                <div className='flex gap-2'>
                  {match.player1.score.map((score, i) => (
                    <span key={i} className='w-6 text-center font-medium'>
                      {score}
                    </span>
                  ))}
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src={match.player2.image || `/placeholder.svg?height=32&width=32`}
                    />
                    <AvatarFallback>{match.player2.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className='font-medium'>{match.player2.name}</span>
                </div>
                <div className='flex gap-2'>
                  {match.player2.score.map((score, i) => (
                    <span key={i} className='w-6 text-center font-medium'>
                      {score}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className='text-sm text-primary'>{match.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

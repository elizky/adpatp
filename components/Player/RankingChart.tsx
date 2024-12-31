import { RankingHistory } from '@/types/types';

interface RankingChartProps {
  history: RankingHistory[];
}

export function RankingChart({ history }: RankingChartProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className='space-y-4 mt-4'>
      <h3 className='text-lg font-medium'>Ranking History</h3>
      <div className='h-64 relative'>
        {sortedHistory.map((entry, index) => (
          <div
            key={entry.id}
            className='absolute h-2 w-2 bg-blue-600 rounded-full transform -translate-x-1'
            style={{
              left: `${(index / (sortedHistory.length - 1)) * 100}%`,
              bottom: `${(1 - entry.ranking / 100) * 100}%`,
            }}
            title={`Rank ${entry.ranking} on ${(new Date(entry.date), 'MMM d, yyyy')}`}
          />
        ))}
      </div>
    </div>
  );
}

import { LineChartComponent } from '@/components/charts/LineChart';
import { RankingHistory } from '@/types/types';

interface RankingChartProps {
  history: RankingHistory[];
}

export function RankingChart({ history }: RankingChartProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Create chartData from sortedHistory
  const chartData = sortedHistory.map((item) => ({
    month: new Date(item.date).toLocaleString('default', { month: 'long' }),
    ranking: item.ranking,
  }));

  return (
    <div className='space-y-4 mt-4'>
      <LineChartComponent data={chartData} />
    </div>
  );
}

'use client';

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  ranking: {
    label: 'Ranking',
    color: '#F2D600',
  },
} satisfies ChartConfig;

export function LineChartComponent({ data }: { data: Array<{ month: string; ranking: number }> }) {
  return (
    <div>
      <h3 className='font-mono text-lg font-semibold mb-6 text-center'>Ranking Historico</h3>

      <CardContent>
        <ChartContainer className='min-h-[200px] w-full' config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
            <Line
              dataKey='ranking'
              type='natural'
              stroke='var(--color-ranking)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-ranking)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}

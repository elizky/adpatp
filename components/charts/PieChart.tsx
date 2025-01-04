'use client';

import { Label, Pie, PieChart } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';

interface PieChartComponentProps {
  title: string;
  chartData: {
    status: string;
    value: number;
  }[];
}

const chartConfig = {
  value: {
    label: 'Games',
  },
  win: {
    label: 'Win',
    color: 'hsl(var(--chart-1))',
  },
  lost: {
    label: 'Lost',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function PieChartComponent({ title, chartData }: PieChartComponentProps) {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  const titleSplit = title.split(' ')[0];

  console.log('chartData', chartData);

  if (totalVisitors === 0) {
    return (
      <div className='flex flex-col h-full '>
        <h3 className='font-mono text-lg font-semibold mb-6 text-center'>{title}</h3>
        <p className='text-muted-foreground text-center text-sm pt-4 mt-16'>No data available</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <h3 className='font-mono text-lg font-semibold mb-6 text-center'>{title}</h3>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[200px]'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey='value' nameKey='status' innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          {titleSplit}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}

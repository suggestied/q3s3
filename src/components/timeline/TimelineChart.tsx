import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

interface TimelineChartProps {
  data: any[];
  targetEfficiency: number;
}

export default function TimelineChart({ data, targetEfficiency }: TimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <XAxis 
          dataKey="hour" 
          tick={{ fontSize: 10 }}
          interval={2}
          tickFormatter={(hour) => `${hour}:00`}
        />
        <YAxis hide domain={[0, 100]} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-lg rounded-lg border text-xs">
                  <p className="font-medium">{data.hour}:00</p>
                  <p className={`${data.efficiency >= targetEfficiency ? 'text-green-600' : 'text-gray-600'}`}>
                    Efficiency: {data.efficiency}%
                  </p>
                  {data.efficiency > 0 && (
                    <p className="text-gray-600">
                      {data.shotsPerHour} shots/hour
                    </p>
                  )}
                </div>
              );
            }
            return null;
          }}
        />
        <ReferenceLine y={targetEfficiency} stroke="#9CA3AF" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
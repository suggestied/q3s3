import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoldUsageChartProps {
  moldId: string;
}

export default function MoldUsageChart({ moldId }: MoldUsageChartProps) {
  // Mock data - replace with actual data
  const data = Array.from({ length: 4 }, (_, i) => ({
    week: `Week ${i + 1}`,
    handelingen: Math.floor(Math.random() * 300 + 200)
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="week" 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-3 shadow-lg rounded-lg border">
                  <p className="text-sm font-medium">{payload[0].payload.week}</p>
                  <p className="text-sm text-gray-600">
                    Handelingen: {payload[0].value}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="handelingen" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
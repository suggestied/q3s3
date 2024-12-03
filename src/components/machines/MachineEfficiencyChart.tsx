import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface MachineEfficiencyChartProps {
  machineId: string;
}

export default function MachineEfficiencyChart({ machineId }: MachineEfficiencyChartProps) {
  // Mock data - replace with actual data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    efficiency: Math.floor(Math.random() * 20 + 80),
    target: 90
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12 }}
          interval={2}
        />
        <YAxis 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-3 shadow-lg rounded-lg border">
                  <p className="text-sm font-medium">{payload[0].payload.time}</p>
                  <p className="text-sm text-gray-600">
                    Efficiency: {payload[0].value}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <ReferenceLine y={90} stroke="#9CA3AF" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Matrijs } from '../types';

interface MatrijsUsageChartProps {
  matrijs: Matrijs;
  weeklyData: {
    week: string;
    handelingen: number;
  }[];
}

export default function MatrijsUsageChart({ weeklyData }: MatrijsUsageChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="handelingen" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
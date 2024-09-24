"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MoldAction {
  board: number;
  port: number;
  start: string;
  machine: number;
  hothalf: number;
}

interface WeeklyAction {
  week: string;
  count: number;
}

function processData(data: MoldAction[]): WeeklyAction[] {
  const weekCounts: { [key: string]: number } = {};

  data.forEach((action) => {
    const date = new Date(action.start);
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
    const weekKey = weekStart.toISOString().split("T")[0];
    weekCounts[weekKey] = (weekCounts[weekKey] || 0) + 1;
  });

  return Object.entries(weekCounts)
    .map(([week, count]) => ({ week, count }))
    .sort((a, b) => a.week.localeCompare(b.week));
}

export default function MoldHistoryChart({ id }: { id: number }) {
  const [moldData, setMoldData] = useState<MoldAction[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMoldHistory();
  }, [id]);

  useEffect(() => {
    setWeeklyData(processData(moldData));
  }, [moldData]);

  const fetchMoldHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://q4api.keke.ceo/v1/mold/${id}/history`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mold history");
      }
      const data: MoldAction[] = await response.json();
      setMoldData(data);
    } catch (err) {
      setError("Failed to fetch mold history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Mold {id} - Actions per Week</span>
          <Button onClick={fetchMoldHistory} disabled={isLoading}>
            {isLoading ? "Loading..." : "Refresh Data"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[400px] w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={weeklyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Actions"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

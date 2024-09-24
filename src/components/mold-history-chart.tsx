"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";

interface MonitoringData {
  timestamp: string;
  id: number;
  duration: number;
}

interface Props {
  board: string;
  port: string;
}

export default function EnhancedMonitoringDashboard({ board, port }: Props) {
  const [data, setData] = useState<MonitoringData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [threshold, setThreshold] = useState<number>(5);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://q4api.keke.ceo/v1/monitoring?board=${board}&port=${port}&skip=0&limit=1000`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch monitoring data");
      }
      const jsonData: MonitoringData[] = await response.json();
      setData(
        jsonData.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    } catch (err) {
      setError("Failed to fetch monitoring data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [board, port]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((item) => {
    if (timeRange === "all") return true;
    const itemDate = new Date(item.timestamp);
    const oldestDate = new Date(data[0].timestamp);
    const timeDiff = itemDate.getTime() - oldestDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    switch (timeRange) {
      case "1d":
        return daysDiff <= 1;
      case "7d":
        return daysDiff <= 7;
      case "30d":
        return daysDiff <= 30;
      default:
        return true;
    }
  });

  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), "dd/MM/yyyy HH:mm");
  };

  const stats = {
    avg:
      filteredData.reduce((sum, item) => sum + item.duration, 0) /
      filteredData.length,
    min: Math.min(...filteredData.map((item) => item.duration)),
    max: Math.max(...filteredData.map((item) => item.duration)),
    outOfThreshold: filteredData.filter((item) => item.duration > threshold)
      .length,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const isOverThreshold = dataPoint.duration > threshold;
      return (
        <div
          className={`bg-white p-2 border ${
            isOverThreshold ? "border-red-500" : "border-green-500"
          } rounded shadow`}
        >
          <p className="font-bold">
            {format(new Date(label), "dd/MM/yyyy HH:mm:ss")}
          </p>
          <p className={isOverThreshold ? "text-red-500" : "text-green-500"}>
            Duration: {dataPoint.duration.toFixed(2)}s
            {isOverThreshold ? " (Over Threshold)" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Monitoring - Board {board}, Port {port}
          </span>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Data</SelectItem>
                <SelectItem value="1d">Last day</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchData} disabled={isLoading}>
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.avg.toFixed(2)}s</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Minimum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.min.toFixed(2)}s</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Maximum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.max.toFixed(2)}s</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Out of Threshold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.outOfThreshold}</p>
            </CardContent>
          </Card>
        </div>
        {isLoading && filteredData.length === 0 ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={filteredData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxis}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={threshold}
                stroke="red"
                strokeDasharray="3 3"
                label={`Threshold: ${threshold}s`}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                name="Duration"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="mt-4 space-y-2">
          <Label htmlFor="threshold">
            Threshold: {threshold.toFixed(2)} seconds
          </Label>
          <Slider
            id="threshold"
            min={0}
            max={Math.max(10, stats.max)}
            step={0.1}
            value={[threshold]}
            onValueChange={(value) => setThreshold(value[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
}

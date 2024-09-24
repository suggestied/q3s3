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
  ReferenceArea,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

interface MonitoringData {
  timestamp: string;
  id: number;
  duration: number;
}

interface Props {
  board: string;
  port: string;
}

export default function Component({ board, port }: Props) {
  const [data, setData] = useState<MonitoringData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [zoomLeft, setZoomLeft] = useState<number | null>(null);
  const [zoomRight, setZoomRight] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);

  const fetchData = useCallback(
    async (reset: boolean = false) => {
      setIsLoading(true);
      setError(null);
      try {
        const skipValue = reset ? 0 : skip;
        const response = await fetch(
          `https://q4api.keke.ceo/v1/monitoring?board=${board}&port=${port}&skip=${skipValue}&limit=100`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch monitoring data");
        }
        const jsonData: MonitoringData[] = await response.json();
        setData((prevData) => (reset ? jsonData : [...prevData, ...jsonData]));
        setSkip((prevSkip) => (reset ? 100 : prevSkip + 100));
        setHasMore(jsonData.length === 100);
        if (reset) {
          setDateRange([
            jsonData[0]?.timestamp,
            jsonData[jsonData.length - 1]?.timestamp,
          ]);
        }
      } catch (err) {
        setError("Failed to fetch monitoring data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [board, port, skip]
  );

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  const handleZoom = () => {
    if (zoomLeft !== null && zoomRight !== null) {
      const filteredData = data.filter(
        (_, index) => index >= zoomLeft && index <= zoomRight
      );
      setData(filteredData);
      setDateRange([
        filteredData[0]?.timestamp,
        filteredData[filteredData.length - 1]?.timestamp,
      ]);
      setZoomLeft(null);
      setZoomRight(null);
    }
  };

  const resetZoom = () => {
    fetchData(true);
  };

  const formatXAxis = (tickItem: string) => {
    return new Date(tickItem).toLocaleTimeString();
  };

  const calculateStats = () => {
    if (data.length === 0) return { avg: 0, min: 0, max: 0 };
    const durations = data.map((d) => d.duration);
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    return { avg: avg.toFixed(2), min: min.toFixed(2), max: max.toFixed(2) };
  };

  const stats = calculateStats();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Monitoring Data - Board {board}, Port {port}
          </span>
          <Button onClick={() => fetchData(true)} disabled={isLoading}>
            {isLoading ? "Loading..." : "Refresh Data"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Label>Date Range: </Label>
          <span>
            {new Date(dateRange[0]).toLocaleString()} -{" "}
            {new Date(dateRange[1]).toLocaleString()}
          </span>
        </div>
        <div className="mb-4">
          <Label>Stats: </Label>
          <span>
            Avg: {stats.avg}s, Min: {stats.min}s, Max: {stats.max}s
          </span>
        </div>
        {isLoading && data.length === 0 ? (
          <div className="space-y-2">
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                onMouseDown={(e) => setZoomLeft(e?.activeTooltipIndex ?? null)}
                onMouseMove={(e) =>
                  zoomLeft !== null &&
                  setZoomRight(e?.activeTooltipIndex ?? null)
                }
                onMouseUp={handleZoom}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                  formatter={(value) => [`${value} seconds`, "Duration"]}
                />
                <Line
                  type="monotone"
                  dataKey="duration"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
                {zoomLeft !== null && zoomRight !== null && (
                  <ReferenceArea
                    x1={data[zoomLeft]?.timestamp}
                    x2={data[zoomRight]?.timestamp}
                    strokeOpacity={0.3}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-between">
              <Button onClick={resetZoom}>Reset Zoom</Button>
              {hasMore && (
                <Button onClick={() => fetchData(false)} disabled={isLoading}>
                  Load More
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

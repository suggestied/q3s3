"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import {
  AlertTriangle,
  CheckCircle,
  DownloadCloud,
  RefreshCw,
  Settings,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MonitoringData {
  timestamp: string;
  codes: number[];
  duration: number;
  machine: number;
  mold: number;
}

interface Props {
  board: string;
  port: string;
}

interface ApiResponse {
  board: string;
  port: string;
  usage: MonitoringData[];
}

export default function EnhancedMonitoringDashboard({ board, port }: Props) {
  const [data, setData] = useState<MonitoringData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [maintenanceThreshold, setMaintenanceThreshold] = useState<number>(10);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(60);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [chartKey, setChartKey] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://q4api.keke.ceo/EfTest/monitor/${board}/${port}?skip=0&limit=100&filterStart=2020-01-01%2000%3A00%3A00&filterEnd=2025-01-01%2000%3A00%3A00`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = (await response.json()) as ApiResponse;

      setData(
        jsonData.usage.sort(
          (a: MonitoringData, b: MonitoringData) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
      setChartKey((prevKey) => prevKey + 1);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        `Failed to fetch monitoring data: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }, [board, port]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (autoRefresh) {
      intervalId = setInterval(fetchData, refreshInterval * 1000);
    }
    return () => clearInterval(intervalId);
  }, [autoRefresh, fetchData, refreshInterval]);

  const filteredData = useMemo(() => {
    const now = new Date();
    return data.filter((item) => {
      if (timeRange === "all") return true;
      const itemDate = new Date(item.timestamp);
      const timeDiff = now.getTime() - itemDate.getTime();
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
  }, [data, timeRange]);

  const formatXAxis = (tickItem: string) => {
    return format(new Date(tickItem), "dd/MM/yyyy HH:mm");
  };

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        avg: 0,
        min: 0,
        max: 0,
        maintenanceNeeded: 0,
        totalReadings: 0,
      };
    }
    return {
      avg:
        filteredData.reduce((sum, item) => sum + item.duration, 0) /
        filteredData.length,
      min: Math.min(...filteredData.map((item) => item.duration)),
      max: Math.max(...filteredData.map((item) => item.duration)),
      maintenanceNeeded: filteredData.filter(
        (item) => item.duration > maintenanceThreshold
      ).length,
      totalReadings: filteredData.length,
    };
  }, [filteredData, maintenanceThreshold]);

  const maintenanceStatus =
    stats.maintenanceNeeded > 0 ? "needed" : "not needed";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const needsMaintenance = dataPoint.duration > maintenanceThreshold;
      return (
        <div
          className={`bg-white p-2 border ${
            needsMaintenance ? "border-red-500" : "border-green-500"
          } rounded shadow`}
        >
          <p className="font-bold">
            {format(new Date(label), "dd/MM/yyyy HH:mm:ss")}
          </p>
          <p className={needsMaintenance ? "text-red-500" : "text-green-500"}>
            Duration: {dataPoint.duration.toFixed(2)}s
            {needsMaintenance ? " (Maintenance Needed)" : ""}
          </p>
          <p>Codes: {dataPoint.codes.join(", ")}</p>
        </div>
      );
    }
    return null;
  };

  // function to set the refresh interval
  const handleRefreshInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if its > 0
    if (Number(e.target.value) > 0)
    setRefreshInterval(Number(e.target.value));
  };

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Timestamp,Duration,Machine,Mold,Codes\n" +
      filteredData
        .map(
          (row) =>
            `${row.timestamp},${row.duration},${row.machine},${
              row.mold
            },${row.codes.join("|")}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `monitoring_data_${board}_${port}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2">
          <div className="w-full">
            Monitoring - Board {board}, Port {port}
          </div>

          <div>
            <Collapsible
              open={isSettingsOpen}
              onOpenChange={setIsSettingsOpen}
              className="space-y-2"
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Toggle settings</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 absolute z-50">
                <Card className="w-full flex flex-col gap-4 p-4">
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    <Label htmlFor="maintenanceThreshold" className="text-xs">
                      Maintenance Threshold: {maintenanceThreshold.toFixed(2)}{" "}
                      seconds
                    </Label>
                    <Slider
                      id="maintenanceThreshold"
                      min={0}
                      max={Math.max(15, stats.max)}
                      step={0.1}
                      value={[maintenanceThreshold]}
                      onValueChange={(value) =>
                        setMaintenanceThreshold(value[0])
                      }
                    />
                  </div>
                  <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    <Label htmlFor="refreshInterval" className="text-xs">
                      Refresh Interval (seconds)
                    </Label>
                    <Input
                      id="refreshInterval"
                      type="number"
                      min={1}
                      value={refreshInterval}
                      onChange={handleRefreshInterval}
                    />
                  </div>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="flex w-min items-center space-x-2">
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
              <RefreshCw className="mr-2 h-4 w-4" />
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
            <Button onClick={() => setAutoRefresh(!autoRefresh)}>
              {autoRefresh ? "Disable Auto-refresh" : "Enable Auto-refresh"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!error && (
          <Alert
            className={
              maintenanceStatus === "needed"
                ? "bg-red-100 mb-4"
                : "bg-green-100 mb-4"
            }
          >
            <AlertTriangle
              className={
                maintenanceStatus === "needed"
                  ? "h-4 w-4 text-red-500"
                  : "hidden"
              }
            />
            <CheckCircle
              className={
                maintenanceStatus === "not needed"
                  ? "h-4 w-4 text-green-500"
                  : "hidden"
              }
            />
            <AlertTitle>Maintenance Status</AlertTitle>
            <AlertDescription>
              {maintenanceStatus === "needed"
                ? `Maintenance is needed. ${stats.maintenanceNeeded} readings exceeded the maintenance threshold.`
                : "No maintenance is currently needed."}
            </AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="chart" className="mb-4">
          <TabsList>
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            {isLoading ? (
              <Skeleton className="h-[400px] w-full" />
            ) : filteredData.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No data available for the selected time range.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={400} key={chartKey}>
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
                    y={maintenanceThreshold}
                    stroke="red"
                    strokeDasharray="3 3"
                    label={`Maintenance Threshold: ${maintenanceThreshold}s`}
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
                  <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          <TabsContent value="stats">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  <CardTitle className="text-sm">Maintenance Needed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {stats.maintenanceNeeded}
                  </p>
                  <Progress
                    value={
                      (stats.maintenanceNeeded / stats.totalReadings) * 100
                    }
                    className="mt-2"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Readings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.totalReadings}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4">
          <Button
            onClick={handleExportData}
            disabled={filteredData.length === 0}
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

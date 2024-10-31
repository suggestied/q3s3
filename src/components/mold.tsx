"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Mold } from "@/types";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface MoldComponentProps {
  mold: Mold;
}

export function MoldComponent({ mold }: MoldComponentProps) {
  const calculateHealth = () => {
    const random = Math.floor(Math.random() * 100);
    return random > 50;
  };

  const health = calculateHealth();

  const getHealthColor = (active: boolean, type: string) => {
    switch (type) {
      case "bg":
        return active ? "bg-green-500" : "bg-red-500";
      case "border":
        return active ? "border-green-500" : "border-red-500";
      case "text":
        return active ? "text-green-500" : "text-red-500";
      default:
        return "";
    }
  };

  const circleConfig = {
    visitors: {
      label: "Visitors",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Generate some random data for the charts
  const chartData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        date: `2021-08-${i + 1}`,
        duration: Math.floor(Math.random() * 100),
        visitors: Math.floor(Math.random() * 1000),
      });
    }
    return data;
  }, []);

  const totalVisitors = chartData.reduce((sum, item) => sum + item.visitors, 0);

  const circleData = [{ visitors: totalVisitors }];

  return (
    <div className="bg-white rounded-lg overflow-hidden relative">
      <Link
        href={`/machines/${mold.id}/boards`}
        className="relative z-20 w-full h-full"
      >
        <Card
          className={`border-2 ${getHealthColor(
            health,
            "border"
          )} bg-opacity-20 relative z-10`}
        >
          <CardHeader>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-col">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {mold.name || "N/A"}
                </CardTitle>
              </div>

              <ChartContainer config={circleConfig} className="w-24 h-24">
                <RadialBarChart
                  data={circleData}
                  startAngle={0}
                  endAngle={health ? 360 : 0}
                  innerRadius={40}
                  outerRadius={50}
                >
                  <PolarGrid gridType="circle" radialLines={false} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <RadialBar
                    dataKey="visitors"
                    cornerRadius={10}
                    fill="var(--color-visitors)"
                    background
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-lg font-bold"
                  >
                    Active
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </div>
          </CardHeader>
        </Card>
      </Link>

      {/* Background Chart */}
      <div className="absolute top-0 left-0 w-full h-full transform scale-105">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="duration"
              stroke={
                health ? "rgba(52, 211, 153, 0.5)" : "rgba(239, 68, 68, 0.5)"
              }
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
              name="Duration"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

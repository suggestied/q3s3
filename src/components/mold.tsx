"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mold } from "@/types";
import Link from "next/link";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";

interface MoldComponentProps {
  mold: Mold;
}

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

export function MoldComponent({ mold }: MoldComponentProps) {
  const health = mold.health === 1;

  

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
          )} bg-opacity-20 relative z-10 overflow-hidden`}
        >
          <div className="absolute top-0 -right-0 p-2">
            <CircleComponent health={health} />
          </div>

          <CardHeader className="bg-gradient-to-r from-white/80 from-25% via-transparent to-transparent">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {mold.name || "N/A"}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>

      {/* Background Chart */}
      <div className="absolute bottom-0 left-0 w-full h-full transform scale-105">
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
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


// Circle component, health as prop
function CircleComponent(
    { health }: { health: boolean }
    ) {
    return (
      <div>
        {health ? (
          <div className="relative h-4 w-4">
            <div
              className={`w-4 h-4 rounded-full absolute ${getHealthColor(
                health,
                "bg"
              )}`}
            />

            <div
              className={`w-4 h-4 rounded-full absolute animate-ping ${getHealthColor(
                health,
                "bg"
              )}`}
            />
          </div>
        ) : (
          <div
            className={`w-4 h-4 rounded-full ${getHealthColor(health, "bg")}`}
          />
        )}
      </div>
    );
    }

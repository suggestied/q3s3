"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mold } from "@/types";
import Link from "next/link";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { BatteryLow, Check, Clock, X } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface MoldComponentProps {
  mold: Mold;
}

const getHealthColor = (active: boolean, type: string, isOffline?: boolean) => {

    if (isOffline) {
        switch (type) {
            case "bg":
                return "bg-grey-500";
            case "border":
                return "border-gray-500";
            case "text":
                return "text-gray-500";
            default:
                return "";
        }
    }


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
            "border",
            mold.isOffline
          )} bg-opacity-20 relative z-10 overflow-hidden`}
        >
          <div className="absolute top-0 -right-0 p-2">
            <CircleComponent health={health} isOffline={mold.isOffline} />
          </div>

          <CardHeader className="bg-gradient-to-b from-white/80 from-25% via-transparent to-transparent">
            <div className="flex flex-wrap justify-between items-center ">
              <div className="flex flex-col items-start">
                <CardTitle
                  className={
                    "text-2xl font-bold " +
                    getHealthColor(health, "text", mold.isOffline)
                  }
                >
                  {mold.name || "N/A"}
                </CardTitle>
                <span className="text-sm text-gray-500">Machine 1</span>

                <span className="text-sm text-gray-500 flex text-center items-center gap-1">
                  <Clock className="w-6 h-6" />
                  {
                    mold.isOffline ? (
                      <span>Offline</span>
                    ) : (
                      <span>24h</span>
                    )
                  }
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-gradient-to-t from-white/80 from-25% via-transparent to-transparent">
            {/* Shots, avg duration */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Shots</span>
                <span className="text-lg font-bold text-gray-800">
                  {
                    mold.isOffline ? (
                      <Skeleton className="w-16 h-6" />
                    ) : (
                      mold.shots24h
                    )
                  }
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Avg. Duration</span>
                <span className="text-lg font-bold text-gray-800">
                    {
                        mold.isOffline ? (
                        <Skeleton className="w-16 h-6" />
                        ) : (
                        mold.avgShotDuration24h
                        )
                    }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Background Chart */}
      {!mold.isOffline && (
        <div className="absolute bottom-0 left-0 w-full h-3/6 transform scale-105">
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
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// Circle component, health as prop
function CircleComponent({
  health,
  isOffline = false,
}: {
  health: boolean;
  isOffline?: boolean;
}) {
  return (
    <div>
      {!isOffline ? (
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

              <Check className="w-4 h-4 absolute text-white" />
            </div>
          ) : (
            <div className="relative h-4 w-4">
              <div
                className={`w-4 h-4 absolute rounded-full ${getHealthColor(
                  health,
                  "bg"
                )}`}
              />

              <X className="w-4 h-4 absolute text-white" />
            </div>
          )}
        </div>
      ) : (
        <BatteryLow className="w-4 h-4 text-gray-500" /> 
      )}
    </div>
  );
}

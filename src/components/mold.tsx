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
import { CircleCheck, CircleX } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { CircleProgressComponent } from "./circle-progress";

interface MoldComponentProps {
  mold: Mold;
}

const getHealthColor = (health: number, type: string) => {

  const needsRepair = health === 0;

  switch (type) {
    case "bg":
      return needsRepair ? "bg-red-600" : "bg-[#19bb00]";
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
    <div className={`w-56 h-44 shadow-sm rounded-lg overflow-hidden p-5 flex flex-col justify-between text-white ${getHealthColor(mold.health, 'bg')}`}>

      <div className="flex flex-col">

        <div className="flex justify-between items-center">

          <span className="text-3xl font-bold">
            {mold.name}
          </span>

          { mold.health === 0 ?
            <CircleX size={28} /> :
            <CircleCheck size={28} />
          }

        </div>

        <span className="text-xs font-medium opacity-60">
          {mold.machine.name}
        </span>

      </div>

      <div className="flex justify-between items-center">

        <div className="flex flex-col gap-1">

          <div className="flex flex-col">

            <span className="text-xs font-medium opacity-60">
              Shots
            </span>

            <span className="text-md font-bold leading-none">
              {mold.shots24h}
            </span>

          </div>

          <div className="flex flex-col">

            <span className="text-xs font-medium opacity-60">
              Avg
            </span>

            <span className="text-md font-bold leading-none">
              {mold.avgShotDuration24h}s
            </span>

          </div>

        </div>

        <CircleProgressComponent percentage={mold.health === 0 ? 29 : 92} />

      </div>
      
    </div>
  );
}

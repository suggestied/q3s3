"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine } from "@/types";
import { Progress } from "@/components/ui/progress";


interface MachineComponentProps {
  machine: Machine;
}

export function MachineComponent({ machine }: MachineComponentProps) {

  const calculateHealth = () => {
    const health = Math.floor(Math.random() * 100);
    return health;
  };

  const health = calculateHealth();

  const getHealthColor = (health: number, type: string) => {
    // return the class based of the type
    // bg, border, text
    switch (type) {
      case "bg":
        if (health > 90) {
          return "bg-green-500";
        } else if (health > 70) {
          return "bg-yellow-500";
        } else {
          return "bg-red-500";
        }
      case "border":
        if (health > 90) {
          return "border-green-500";
        } else if (health > 70) {
          return "border-yellow-500";
        } else {
          return "border-red-500";
        }
      case "text":
        if (health > 90) {
          return "text-green-500";
        } else if (health > 70) {
          return "text-yellow-500";
        } else {
          return "text-red-500";
        }
    }
  };


  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Card
        className={`
    border-2 ${getHealthColor(health, "border")} ${getHealthColor(health, "bg")} bg-opacity-20
    `}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              {machine.name || "N/A"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={health} />

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-600">Health</div>
            <div
              className={`text-sm font-bold ${getHealthColor(health, "text")}`}
            >
              {health}%
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}

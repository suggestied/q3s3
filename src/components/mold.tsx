"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";

interface MachineComponentProps {
  machine: Machine;
}

export function MachineComponent({ machine }: MachineComponentProps) {
  const calculateHealth = () => {
    // return bool or true
    const random = Math.floor(Math.random() * 100);
    return random > 50 ? true : false;
  };

 
  const health = calculateHealth();

  const getHealthColor = (active: boolean, type: string) => {
    // return the class based of the type
    // bg, border, text
    switch (type) {
      case "bg":
        if (active) {
          return "bg-green-500";
        } else {
          return "bg-red-500";
        }
      case "border":
        if (active) {
          return "border-green-500";
        } else {
          return "border-red-500";
        }
      case "text":
        if (active) {
          return "text-green-500";
        } else {
          return "text-red-500";
        }
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Link href={`/machines/${machine.id}/boards`}>
        <Card
          className={`
    border-2 ${getHealthColor(health, "border")} border-2 bg-opacity-20
    `}
        >
          <CardHeader>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-col">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {machine.name || "N/A"}
                </CardTitle>
                <div className="text-sm text-gray-500">
                    N/A
                </div>
              </div>

              <Button
                className={
                  "text-sm font-semibold " + getHealthColor(health, "bg")
                }
                onClick={() => {
                  console.log("clicked");
                }}
              >
                {health ? "Active" : "Inactive"}
              </Button>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}

"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine, Mold } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { MoldComponent } from "./mold";


interface MachineComponentProps {
  machine: Machine;
  withMold?: Mold;
}

export function MachineComponent({ machine, withMold }: MachineComponentProps) {
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
    <Link href={`/machines/${machine.id}/boards`} className="w-full h-full">
      <Card
        className={`
    border-2 ${getHealthColor(
      health,
      "border"
    )} border-opacity-40 border-2 bg-opacity-100 shadow h-full
    `}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex flex-col mr-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                {machine.name || "N/A"}
              </CardTitle>
              <ul className="text-sm text-gray-500">
                <li>
                  <span className="font-bold">Board:</span> 10
                </li>
                <li>
                  <span className="font-bold">Port:</span> 32
                </li>
              </ul>
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
        {withMold && (
          <div className="p-4">
            <h1 className="text-lg font-semibold">Mold</h1>
            <MoldComponent mold={withMold} />
          </div>
        )}
      </Card>
    </Link>
  );
}

"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine, Mold } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";


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
      case "status":
        if (active) {
          return "text-green-300";
        } else {
          return "text-red-300";
        }
    }
  };

  return (
    <div className="">

    </div>
  );
}

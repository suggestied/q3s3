"use client";

import { Machine, Mold } from "@/types";
import {CircleCheck, Clock, Unplug } from "lucide-react";


interface MachineComponentProps {
  machine: Machine;
  withMold?: Mold;
}

export function MachineComponent({ machine, withMold }: MachineComponentProps) {

  const getHealthColor = (active: boolean, type: string) => {
    // return the class based of the type
    // bg, border, text
    switch (type) {
      case "bg":
        if (active) {
          return "bg-green-500";
        } else {
          return "bg-gray-500";
        }
      case "border":
        if (active) {
          return "border-green-500";
        } else {
          return "border-gray-500";
        }
      case "status":
        if (active) {
          return "bg-green-800";
        } else {
          return "bg-gray-800";
        }
    }
  };

  return (
    <div className={`w-56 h-44 shadow-sm rounded-lg overflow-hidden flex justify-between text-white ${getHealthColor(!withMold?.isOffline, 'border')}`}>

      <div className={`flex flex-col w-full p-5 justify-between rounded-lg ${getHealthColor(!withMold?.isOffline, 'bg')}`}>

        <div className="flex gap-5 items-center">

          <span className="text-3xl font-bold">
            {machine.name}
          </span>

          <div className="flex gap-1">
            <Clock />
            <span>
              24h
            </span>
          </div>

        </div>

        {/* <span className="text-xs font-medium opacity-60">
          {withMold?.name}
        </span> */}

        <div className="flex flex-row justify-between">

          <div className="flex flex-col text-center">

            <span className="text-md font-bold">
              {withMold?.shots24h}
            </span>

            <span className="text-xs">
              Shots
            </span>

          </div>

          <div className="flex flex-col text-center">

            <span className="text-md font-bold">
              {withMold?.avgShotDuration24h}s
            </span>

            <span className="text-xs">
              Per shot
            </span>

          </div>

        </div>

        <div className={`w-full h-10 rounded-md flex p-5 gap-5 items-center ${getHealthColor(!withMold?.isOffline, "status")}`}>

          {
            withMold?.isOffline ?
              <Unplug /> :
              <CircleCheck />
          }
          <span>
            {
              withMold?.isOffline ?
                'Inactive' :
                'Active'
            }
          </span>

        </div>

      </div>

      <div className="flex w-full justify-between items-center">

        

      </div>

    </div>
  );
}

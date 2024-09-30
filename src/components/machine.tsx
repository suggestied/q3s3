"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine } from "@/types";
import {
  Activity,
  CogIcon,
  BoxIcon,
  EyeIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface MachineComponentProps {
  machine: Machine;
}

export function MachineComponent({ machine }: MachineComponentProps) {

  const calculateHealth = () => {
    const health = 100;
    return health;
  };

  const health = calculateHealth();

  const getHealthColor = (health: number) => {
    if (health > 70) return "text-green-600";
    if (health > 40) return "text-yellow-600";
    return "text-red-600";
  };


  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg bg-white border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-gray-800">
            {machine.name || "N/A"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Activity className={`w-5 h-5 ${getHealthColor(health)}`} />
          <span className="font-medium text-gray-700">Machine Health:</span>
          <Progress value={health} className="w-1/2" />
          <span className={`text-sm font-medium ${getHealthColor(health)}`}>
            {health}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                >
                  <CogIcon className="w-4 h-4 mr-2" />
                  Maintenance
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Schedule maintenance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/machines/${machine.id}/boards`}>
                  <Button
                    variant="outline"
                    className="w-full bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200"
                  >
                    <BoxIcon className="w-4 h-4 mr-2" />
                    All Molds
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View machine schedule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="col-span-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default" className="w-full ">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View more
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View usage statistics</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* {machine.keuringsplichtig > 0 && (
          <div className="mt-4 flex items-center text-yellow-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Inspection Required</span>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}

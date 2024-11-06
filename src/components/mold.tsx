"use client";

import { useState, useEffect } from "react";
import { Mold } from "@/types";
import { CircleProgressComponent } from "./circle-progress";
import { Skeleton } from "./ui/skeleton"; // Assuming you have a skeleton component

interface MoldComponentProps {
  mold: Mold;
}

const getHealthColor = (health: number) => {
  if (health <= 70) return "bg-red-600";
  if (health > 70) return "bg-[#19bb00]";
};


export function MoldComponent({ mold }: MoldComponentProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for skeleton to be shown
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton layout while loading
    return (
        <div className="w-56 h-44 shadow-sm rounded-lg overflow-hidden p-5 flex flex-col justify-between text-white bg-gray-300">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-2/3 bg-gray-500 rounded" /> {/* Name placeholder */}
            <Skeleton className="h-4 w-1/2 bg-gray-500 rounded" /> {/* Machine name placeholder */}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-1/4 bg-gray-500 rounded" /> {/* Shots label placeholder */}
              <Skeleton className="h-5 w-1/2 bg-gray-500 rounded" /> {/* Shots value placeholder */}
              <Skeleton className="h-4 w-1/4 bg-gray-500 rounded" /> {/* Avg label placeholder */}
              <Skeleton className="h-5 w-1/2 bg-gray-500 rounded" /> {/* Avg value placeholder */}
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-gray-500" /> {/* Circle progress placeholder */}
          </div>
        </div>
    );
  }

  return (
      <div
          className={`w-56 shadow-sm rounded-lg overflow-hidden p-4 flex flex-col justify-between text-white ${getHealthColor(mold.health)}`}
          style={{height: '180px'}}
      >
          <div className="flex flex-col mb-2">
              <span className="text-lg font-bold">{mold.name} - </span>
              <span
                  className="text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis"
                  style={{maxWidth: '220px'}} // Adjust width as needed
              >
            {mold.description}
        </span>
          </div>
          <div className="flex items-center justify-between mt-3">
        <span
            className={`text-sm font-bold px-2 py-1 rounded ${
                mold.health <= 70 ? 'bg-red-500 bg-opacity-80 border border-red-700' : 'bg-green-400 bg-opacity-80 border border-green-500'
            }`}
        >
            {mold.health <= 70 ? 'Maintenance Required' : 'No Maintenance Needed'}
        </span>
              <CircleProgressComponent percentage={mold.health}/>
          </div>
      </div>


  );
}

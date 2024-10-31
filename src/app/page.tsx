"use client";

import { useState, useEffect } from "react";
import { MachineComponent } from "@/components/machine";

import { Machine } from "@/types";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          skip: "0",
          limit: "100"
        });

        const response = await fetch(
          `https://${
            process.env.NEXT_PUBLIC_API_URL
          }/EfTest/machine/list?${params.toString()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMachines(data);

        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);


const moldRed = {
  name: "Test Mold",
  id: 1,
  health: 0,
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      
      {machines.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {machines.map((machine) => (
            <MachineComponent key={machine.id} machine={machine}
            withMold={moldRed}
            />
          ))}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-center text-muted-foreground">
              No machines found.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

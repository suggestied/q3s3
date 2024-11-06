"use client"
import { useEffect, useState } from "react";
import { MoldComponent } from "@/components/mold";
import { Skeleton } from "@/components/ui/skeleton"; // Zorg ervoor dat dit component bestaat in ShadCN

// Definieer een type voor de machine
type Machine = {
  id: number;
  name: string;
};

// Definieer een type voor de mold-objecten
type Mold = {
  id: number;
  name: string;
  description: string;
  health: number;
  shots24h: number;
  isOffline: boolean;
  avgShotDuration24h: number;
  machine: Machine;
};

export default function Page() {
  const [molds, setMolds] = useState<Mold[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Functie om data op te halen van de API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://localhost:44371/mold/list?skip=0&limit=30");
        const data = await response.json();

        // Verwerk de ontvangen data
        const updatedMolds: Mold[] = data.map((mold: { id: number; naam: string; omschrijving: string; current_machine_id: number; current_machine_name: string; }) => ({          id: mold.id,
          name: mold.naam,
          description: mold.omschrijving,
          health: Math.floor(Math.random() * 101),
          machine: {
            id: mold.current_machine_id,
            name: mold.current_machine_name,
          },
        }));

        setMolds(updatedMolds);
      } catch (error) {
        console.error("Fout bij het ophalen van molds:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Molds</h1>
        <div className="w-fit flex flex-wrap gap-8 mb-20">
          {isLoading ? (
              // Toon skeletons zolang data wordt geladen
              Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-40 rounded-md" />
              ))
          ) : (
              // Toon de werkelijke MoldComponent zodra de data is geladen
              molds.map((mold) => (
                  <MoldComponent key={mold.id} mold={mold} />
              ))
          )}
        </div>
      </div>
  );
}

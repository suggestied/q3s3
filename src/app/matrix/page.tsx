// app/matrix/page.tsx
"use client";

import { useState, useEffect } from "react";
import MatrixComponent from "@/components/matrix";
import { Machine, ProductionData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search } from "lucide-react";

// Dummy data for demonstration purposes
const dummyMachines: Machine[] = [
  {
    id: 1,
    object: "M",
    naam: "Matrix A",
    omschrijving: "High-precision injection molding matrix",
    boom_volgorde: 1,
    stamkaart: "Matrix details...",
    treeviewtype_id: 1,
    serienummer: "MTX001",
    bouwjaar: "2021",
    actief: 1,
    wijzigactief: 1622505600, // June 1, 2021
    vrijgegeven: 1,
    installatiedatum: 1609459200, // January 1, 2021
    garantietot: 1672444800, // December 31, 2022
    aanschafwaarde: 50000.0,
    afschrijving: 10000,
    jaarafschrijving: 5000,
    afschrijvingeen: 5,
    budgetvorig: 5000.0,
    budgetnu: 6000.0,
    melden: 1,
    correctief: 1,
    werkopdracht: 1,
    fabrikanten_id: 1,
    leverancieren_id: 1,
    locaties_id: 1,
    kostenplaats_id: 1,
    parent: 0,
    new_id: 1,
    old_datum: "2021-01-01",
  },
  // Add more dummy machines as needed
];

const dummyProductionData: ProductionData[] = [
  {
    id: 1,
    start_date: "2023-06-01",
    start_time: "08:00:00",
    end_date: "2023-06-01",
    end_time: "16:00:00",
    amount: 1000,
    name: "Product A",
    description: "Plastic components for automotive industry",
    port: 1,
    board: 1,
    treeview_id: 1,
    treeview2_id: 1,
  },
  // Add more dummy production data as needed
];

export default function MatrixPage() {
  const [selectedMatrix, setSelectedMatrix] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMachines, setFilteredMachines] = useState(dummyMachines);

  useEffect(() => {
    const filtered = dummyMachines.filter(
      (machine) =>
        machine.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        machine.serienummer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMachines(filtered);
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-8">

      <h1 className="text-3xl font-bold mb-6">Matrices / Matrijzen</h1>

      {!selectedMatrix && (
        <>
          <div className="flex items-center space-x-2 mb-4">
            <Label htmlFor="search" className="sr-only">
              Zoek matrices
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="Zoek op naam of serienummer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMachines.map((machine) => (
              <MatrixComponent
                key={machine.id}
                machine={machine}
                productionData={dummyProductionData}
                />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

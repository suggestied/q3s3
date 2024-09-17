// app/matrix/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MatrixComponent from "@/components/matrix";
import { Machine, ProductionData } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// In a real application, these would be API calls
async function fetchMatrix(id: string): Promise<Machine> {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const matrix: Machine = {
    id: parseInt(id),
    object: "M",
    naam: `Matrix ${id}`,
    omschrijving: `High-precision injection molding matrix ${id}`,
    boom_volgorde: 1,
    stamkaart: "Matrix details...",
    treeviewtype_id: 1,
    serienummer: `MTX00${id}`,
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
  };
  return matrix;
}

async function fetchProductionData(id: string): Promise<ProductionData[]> {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
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
      treeview_id: parseInt(id),
      treeview2_id: 1,
    },
    {
      id: 2,
      start_date: "2023-06-02",
      start_time: "09:00:00",
      end_date: "2023-06-02",
      end_time: "17:00:00",
      amount: 1200,
      name: "Product B",
      description: "Plastic components for consumer electronics",
      port: 1,
      board: 1,
      treeview_id: parseInt(id),
      treeview2_id: 1,
    },
  ];
}

export default function MatrixPage() {
  const params = useParams();

  const [matrix, setMatrix] = useState<Machine | null>(null);
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [matrixData, prodData] = await Promise.all([
          fetchMatrix(params.id as string),
          fetchProductionData(params.id as string),
        ]);
        setMatrix(matrixData);
        setProductionData(prodData);
      } catch (err) {
        setError("Er is een fout opgetreden bij het laden van de gegevens.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[250px] h-[20px] mt-4" />
            <Skeleton className="w-full h-[300px] mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!matrix) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Matrix niet gevonden.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">

      <h1 className="text-3xl font-bold mb-6">{matrix.naam}</h1>

      <MatrixComponent machine={matrix} productionData={productionData} />
    </div>
  );
}

// app/machines/[id]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Machine } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const dummyMachines: Machine[] = [
  {
    id: 1,
    object: "M",
    naam: "CNC Machine 1",
    omschrijving: "High-precision CNC milling machine",
    boom_volgorde: 1,
    stamkaart: "Machine details...",
    treeviewtype_id: 1,
    serienummer: "CNC001",
    bouwjaar: "2020",
    actief: 1,
    wijzigactief: 1,
    vrijgegeven: 1,
    installatiedatum: 1577836800,
    garantietot: 1672444800,
    aanschafwaarde: 150000.0,
    afschrijving: 30000,
    jaarafschrijving: 15000,
    afschrijvingeen: 5,
    budgetvorig: 10000.0,
    budgetnu: 12000.0,
    melden: 1,
    correctief: 1,
    werkopdracht: 1,
    fabrikanten_id: 1,
    leverancieren_id: 1,
    locaties_id: 1,
    kostenplaats_id: 1,
    parent: 0,
    new_id: 1,
    old_datum: "2020-01-01",
  },
  {
    id: 2,
    object: "M",
    naam: "Injection Molding Machine",
    omschrijving: "High-capacity injection molding machine",
    boom_volgorde: 2,
    stamkaart: "Machine details...",
    treeviewtype_id: 1,
    serienummer: "INJ001",
    bouwjaar: "2021",
    actief: 1,
    wijzigactief: 1,
    vrijgegeven: 1,
    installatiedatum: 1609459200,
    garantietot: 1704067200,
    aanschafwaarde: 200000.0,
    afschrijving: 40000,
    jaarafschrijving: 20000,
    afschrijvingeen: 5,
    budgetvorig: 15000.0,
    budgetnu: 18000.0,
    melden: 1,
    correctief: 1,
    werkopdracht: 1,
    fabrikanten_id: 2,
    leverancieren_id: 2,
    locaties_id: 2,
    kostenplaats_id: 2,
    parent: 0,
    new_id: 2,
    old_datum: "2021-01-01",
  },
];

export default function MachinePage() {
  const params = useParams();
  const [machine, setMachine] = useState<Machine | null>(null);

  useEffect(() => {
    const id = parseInt(params.id as string, 10);
    const foundMachine = dummyMachines.find((m) => m.id === id);
    if (foundMachine) {
      setMachine(foundMachine);
    } else {
      notFound();
    }
  }, [params.id]);

  if (!machine) {
    return <div>Loading...</div>;
  }

  const isWarrantyExpired = Date.now() > machine.garantietot * 1000;

  return (
    <div className="container mx-auto py-8">

      <h1 className="text-3xl font-bold mb-6">{machine.naam}</h1>

      {isWarrantyExpired && (
        <div>
            <Alert variant="destructive" className="mb-6 bg-white">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Garantie verlopen</AlertTitle>
          <AlertDescription>
            De garantie voor deze machine is verlopen. Overweeg een
            onderhoudscontract af te sluiten.
          </AlertDescription>
        </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="maintenance">Onderhoud</TabsTrigger>
          <TabsTrigger value="history">Geschiedenis</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Machine Details</CardTitle>
              <CardDescription>
                Gedetailleerde informatie over de machine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Object Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {machine.object}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Serienummer
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {machine.serienummer}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Bouwjaar
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {machine.bouwjaar}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Installatiedatum
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {new Date(
                      machine.installatiedatum * 1000
                    ).toLocaleDateString()}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Garantie tot
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {new Date(machine.garantietot * 1000).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Onderhoud</CardTitle>
              <CardDescription>
                Onderhoudsgeschiedenis en geplande onderhoudsbeurten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Hier komt de onderhoudsgeschiedenis en geplande
                onderhoudsbeurten.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Geschiedenis</CardTitle>
              <CardDescription>
                Historische gegevens en gebeurtenissen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Hier komt de geschiedenis van de machine, inclusief belangrijke
                gebeurtenissen en wijzigingen.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

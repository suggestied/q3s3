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
    object: "Y",
    naam: "MMS",
    omschrijving: "MachineMonitoring",
    boom_volgorde: 0,
    stamkaart: "",
    treeviewtype_id: 0,
    serienummer: "",
    bouwjaar: "",
    actief: 1,
    wijzigactief: 0,
    vrijgegeven: 0,
    installatiedatum: 0,
    garantietot: 0,
    aanschafwaarde: 0,
    afschrijving: 0,
    jaarafschrijving: 0,
    afschrijvingeen: 0,
    budgetvorig: 0,
    budgetnu: 0,
    melden: 1,
    correctief: false,
    werkopdracht: false,
    fabrikanten_id: 0,
    leverancieren_id: 0,
    locaties_id: 0,
    kostenplaats_id: 0,
    parent: 0,
    new_id: 0,
    old_datum: "0001-01-01T00:00:00",
    treeviewtype: "",
    keuringsinstantie_id: 0,
    rie_nr: 0,
    onderhoud: 0,
    onderhoudstemplate: false,
    treeviewsoort_id: 0,
    show_visual: false,
    gecodeerd: "",
    eigenaar_id: 0,
    keuringsplichtig: 0,
    laatstgeteld: "0001-01-01T00:00:00",
    onderhoudsbedrijf_id: 0,
    stamkaart_old: "",
    objecttemplate_id: 5,
    koppelrelatie_id: 0,
    nlsfb2_id: 0,
    vastgoed_aantal: 0,
    vastgoed_eenheden_id: 0,
    koppelpersoon_id: 0,
    koppelrelatie2_id: 0,
    koppelpersoon2_id: 0,
    medewerker_id: 0,
    omschrijving_id: 0,
    opgenomen_in_begroting: 0,
    opgenomen_in_begroting_datum: "0001-01-01T00:00:00",
    uitleen_magazijn_id: 0,
    uitleen_treeviewsoort_id: 0,
    is_uitgeleend: 0,
    uitleen_status: 0,
    uitleenbaar: 0,
    barcode: "ABC-123",
    aangemaakt_op: "0001-01-01T00:00:00",
    aangemaakt_door: "",
    nonactief_id: 0,
    dragernr: "",
    stamkaarten_id: 0,
    maat: "",
    deliveryaddress_number: 0,
    deliveryaddress_name: "",
    kastnr: 0,
    vak: 0,
    datum_inbehandeling: "0001-01-01T00:00:00",
    datum_laatste_wasbeurt: "0001-01-01T00:00:00",
    kenteken: "",
    datum_uitleen: "0001-01-01T00:00:00",
    geplande_datum_ontvangst: "0001-01-01T00:00:00",
    datum_laatste_uitscan: "0001-01-01T00:00:00",
    datum_aflevering: "0001-01-01T00:00:00",
    laatste_tellerstand: 0,
    laatste_beurt_datum: "0001-01-01T00:00:00",
    tellerstand_opgenomen: false,
    geaccepteerd: false,
    sweep_api: false,
    laatste_beurt: 0,
    laatste_servicebeurt_id: 0,
    hoofdprocessen_id: 0,
    processtappen_id: 0,
    machine_monitoringen_timeout_sec: 30,
    toegang_type_id: 0,
    extern_toegangsbeleid: false,
    machine_monitoring_streef_cyclus_tijd: 0,
    adres: "",
    postcode: "",
    plaats: "0",
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

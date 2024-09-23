// app/matrix/page.tsx
"use client";

import { useState, useEffect } from "react";
import MatrixComponent from "@/components/matrix";
import { Machine, ProductionData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

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
    correctief: true,
    werkopdracht: true,
    fabrikanten_id: 1,
    leverancieren_id: 1,
    locaties_id: 1,
    kostenplaats_id: 1,
    parent: 0,
    new_id: 1,
    old_datum: "2021-01-01",
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
    laatstgeteld: "",
    onderhoudsbedrijf_id: 0,
    stamkaart_old: "",
    objecttemplate_id: 0,
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
    opgenomen_in_begroting_datum: "",
    uitleen_magazijn_id: 0,
    uitleen_treeviewsoort_id: 0,
    is_uitgeleend: 0,
    uitleen_status: 0,
    uitleenbaar: 0,
    barcode: "",
    aangemaakt_op: "",
    aangemaakt_door: "",
    nonactief_id: 0,
    dragernr: "",
    stamkaarten_id: 0,
    maat: "",
    deliveryaddress_number: 0,
    deliveryaddress_name: "",
    kastnr: 0,
    vak: 0,
    datum_inbehandeling: "",
    datum_laatste_wasbeurt: "",
    kenteken: "",
    datum_uitleen: "",
    geplande_datum_ontvangst: "",
    datum_laatste_uitscan: "",
    datum_aflevering: "",
    laatste_tellerstand: 0,
    laatste_beurt_datum: "",
    tellerstand_opgenomen: false,
    geaccepteerd: false,
    sweep_api: false,
    laatste_beurt: 0,
    laatste_servicebeurt_id: 0,
    hoofdprocessen_id: 0,
    processtappen_id: 0,
    machine_monitoringen_timeout_sec: 0,
    toegang_type_id: 0,
    extern_toegangsbeleid: false,
    machine_monitoring_streef_cyclus_tijd: 0,
    adres: "",
    postcode: "",
    plaats: ""
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

      <h1 className="text-3xl font-bold mb-6">Matrices</h1>

      {(
        <>
          <div className="flex items-center space-x-2 mb-4">
            <Label htmlFor="search" className="sr-only">
              Search matrices
            </Label>
            <Input
              id="search"
              type="search"
              placeholder="Search matrices..."
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

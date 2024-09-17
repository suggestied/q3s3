// app/machines/machines.tsx
"use client";

import { MachineComponent } from "@/components/machine";
import { Machine } from "@/types";

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

export default function Page() {

    return (
        <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {dummyMachines.map((machine) => (
            <MachineComponent key={machine.id} machine={machine} />
            ))}
        </div>
        </div>
    );
  
}
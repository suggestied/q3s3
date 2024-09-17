// app/types/types.ts

export interface Machine {
  id: number;
  object: string;
  naam: string;
  omschrijving: string;
  boom_volgorde: number;
  stamkaart: string;
  treeviewtype_id: number;
  serienummer: string;
  bouwjaar: string;
  actief: number;
  wijzigactief: number;
  vrijgegeven: number;
  installatiedatum: number;
  garantietot: number;
  aanschafwaarde: number;
  afschrijving: number;
  jaarafschrijving: number;
  afschrijvingeen: number;
  budgetvorig: number;
  budgetnu: number;
  melden: number;
  correctief: number;
  werkopdracht: number;
  fabrikanten_id: number;
  leverancieren_id: number;
  locaties_id: number;
  kostenplaats_id: number;
  parent: number;
  new_id: number;
  old_datum: string;
}

export interface Tellerstand {
  id: number;
  waarde: number;
  totaal: number;
  datum: number;
  tellerbasis_id: number;
  treeview_id: number;
}

export interface Tellerbasis {
  id: number;
  naam: string;
  omschrijving: string;
  optie: number;
  actief: number;
  afkorting: string;
  max_waarde: number;
}

export interface ProductionData {
  id: number;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  amount: number;
  name: string;
  description: string;
  port: number;
  board: number;
  treeview_id: number;
  treeview2_id: number;
}

export interface MonitoringData {
  id: number;
  board: number;
  port: number;
  com: number;
  code: number;
  code2: number;
  timestamp: string;
  datum: string;
  mac_address: string;
  shot_time: number;
  previous_shot_id: number;
}

export interface MachineMonitoringPoort {
  id: number;
  board: number;
  port: number;
  name: string;
  volgorde: number;
  visible: number;
}

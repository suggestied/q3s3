// app/types/types.ts

export interface Machine {
  id: number;
  name: string;
}

// Mold
export interface Mold {
  id: number;
  name: string;
  health: number;
  machine: Machine;

  shots24h: number;
  avgShotDuration24h: number;
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

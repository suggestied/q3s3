export interface LocationStats {
  id: string;
  name: string;
  machines: number;
  efficiency: number;
  uptime: number;
  alerts: number;
}

export interface Machine {
  id: string;
  naam: string;
  type: string;
  status: 'Actief' | 'Inactief' | 'In Onderhoud' | 'Storing';
  location: string;
  efficiency: number;
  currentMatrijsId?: string;
}

export interface Matrijs {
  id: string;
  naam: string;
  aantalHandelingen: number;
  maxHandelingen: number;
  laatstGebruikt: string;
  gezondheid: number;
  status: 'Beschikbaar' | 'In Gebruik' | 'Onderhoud Nodig' | 'In Onderhoud';
  machineId?: string;
  location?: string;
}

export interface Planning {
  id: string;
  matrijsId: string;
  datum: string;
  type: 'Preventief' | 'Correctief';
  status: 'Gepland' | 'In Uitvoering' | 'Voltooid';
  beschrijving: string;
  checklistItems: string[];
  maintenanceType?: string;
  technicianId?: string;
  groupId?: string;
}

export interface Notification {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface MachineStats {
  id: string;
  name: string;
  total: number;
  active: number;
  maintenance: number;
  efficiency: number;
  alerts: number;
}

export interface MoldStats {
  id: string;
  name: string;
  total: number;
  active: number;
  maintenance: number;
  health: number;
  alerts: number;
}
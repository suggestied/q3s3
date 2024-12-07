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

export interface Mechanic {
    id: string;
    name: string;
    specialization: string;
}

export interface Maintenance {
    id: number;
    planned_date: Date
    mold_id: number,
    maintenance_type: "Preventative" | "Corrective",
    description: string,
    assigned_to: number,
    status: "Planned" | "Busy" | "Finished"
    maintenance_action: string
}

export interface MaintenanceFull {
    mechanic_name: string;
    mechanic_id: number;
    maintenance_type: string;
    description: string;
    mold_name: string;
    mold_id: number;
    mold_description: string;
    id: number;
    planned_date: string;
    maintenance_action: string;
    assigned_to: number;
    status: string;
    mechanic_specialization: string
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

export interface Mold {
    id: number,
    name: string,
    board: number,
    port: number,
    description: string,
    current_machine_id: number,
    current_machine_name: string,
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
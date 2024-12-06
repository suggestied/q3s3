import { 
  MACHINE_TYPES, 
  LOCATIONS, 
  MOLD_TYPES,
  TECHNICIANS
} from './constants';
import { format, addDays } from 'date-fns';
import type { 
  Machine, 
  Matrijs, 
  Planning,
  LocationStats,
  MachineStats,
  MoldStats,
  Notification
} from '../types';

// Helper functions
const generateId = (prefix: string, num: number): string => 
  `${prefix}${num.toString().padStart(3, '0')}`;

const randomFromArray = <T>(arr: T[]): T => 
  arr[Math.floor(Math.random() * arr.length)];

// Generate machines for each hall
const generateMachines = (): Machine[] => {
  const machines: Machine[] = [];
  let count = 0;

  Object.entries(LOCATIONS).forEach(([hall, config]) => {
    for (let i = 0; i < config.machineCount; i++) {
      count++;
      const type = randomFromArray(config.types);
      const status = Math.random() > 0.8 
        ? Math.random() > 0.5 ? 'In Onderhoud' : 'Storing'
        : 'Actief';
      
      machines.push({
        id: `${hall}-M${String(i + 1).padStart(2, '0')}`,
        naam: `Machine ${hall}-${String(i + 1).padStart(2, '0')}`,
        type,
        status,
        location: hall,
        efficiency: Math.floor(Math.random() * 20 + 80)
      });
    }
  });

  return machines;
};

// Generate matrijzen with realistic numbers per hall
const generateMatrijzen = (machines: Machine[]): Matrijs[] => {
  const matrijzen: Matrijs[] = [];
  let count = 0;

  machines.forEach((machine) => {
    if (Math.random() > 0.3) {
      count++;
      const maxHandelingen = MOLD_TYPES.Middel.maxHandelingen;
      const aantalHandelingen = Math.floor(Math.random() * maxHandelingen);
      const gezondheid = Math.max(0, Math.min(100, Math.round(100 * (1 - aantalHandelingen / maxHandelingen))));
      
      let status: Matrijs['status'];
      if (gezondheid > 80) status = 'Beschikbaar';
      else if (gezondheid > 50) status = 'In Gebruik';
      else if (gezondheid > 20) status = 'Onderhoud Nodig';
      else status = 'In Onderhoud';

      matrijzen.push({
        id: generateId('MT', count),
        naam: `Matrijs ${machine.location}-${String(count).padStart(2, '0')}`,
        aantalHandelingen,
        maxHandelingen,
        laatstGebruikt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        gezondheid,
        status,
        machineId: machine.id,
        location: machine.location
      });
    }
  });

  return matrijzen;
};

const generateLocationStats = (): LocationStats[] => {
  return Object.entries(LOCATIONS).map(([name, config], index) => ({
    id: `L${index + 1}`,
    name,
    machines: config.machineCount,
    efficiency: Math.floor(Math.random() * 15 + 85),
    uptime: Math.floor(Math.random() * 10 + 90),
    alerts: Math.floor(Math.random() * 4)
  }));
};

const generateMachineStats = (): MachineStats[] => {
  return Object.keys(MACHINE_TYPES).map((type, index) => ({
    id: `MS${index + 1}`,
    name: `${type} Machines`,
    total: 45,
    active: 38,
    maintenance: 4,
    efficiency: Math.floor(Math.random() * 10 + 85),
    alerts: Math.floor(Math.random() * 3)
  }));
};

const generateMoldStats = (): MoldStats[] => {
  return Object.entries(MOLD_TYPES).map(([type, config], index) => ({
    id: `MD${index + 1}`,
    name: `${type} Matrijzen`,
    total: type === 'Klein' ? 150 : type === 'Middel' ? 100 : 50,
    active: Math.floor(Math.random() * 40 + 60),
    maintenance: Math.floor(Math.random() * 10 + 5),
    health: Math.floor(Math.random() * 15 + 80),
    alerts: Math.floor(Math.random() * 5)
  }));
};

const generateNotifications = (): Notification[] => {
  return [
    {
      id: 'N001',
      type: 'warning',
      message: 'Matrijs MT103 nadert onderhoudslimiet',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'N002',
      type: 'error',
      message: 'Kritieke slijtage gedetecteerd in Matrijs MT205',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'N003',
      type: 'info',
      message: 'Preventief onderhoud gepland voor Matrijs MT301',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};

const generateInitialPlanning = (matrijzen: Matrijs[]) => {
  const planning: Planning[] = [];
  let count = 0;
  
  // Generate some grouped maintenance tasks
  const maintenanceTypes = ['Ring Vervanging', 'Oppervlakte Behandeling', 'Kalibratie', 'Reiniging', 'Inspectie'];
  
  // Create 3 groups of 3 tasks each
  for (let i = 0; i < 3; i++) {
    const date = addDays(new Date(), Math.floor(Math.random() * 14));
    const maintenanceType = maintenanceTypes[Math.floor(Math.random() * maintenanceTypes.length)];
    const groupId = `G${i + 1}`;
    const technician = randomFromArray(TECHNICIANS);
    
    // Create 2-3 related tasks for each group
    const numTasks = Math.floor(Math.random() * 2) + 2;
    for (let j = 0; j < numTasks; j++) {
      count++;
      const matrijs = randomFromArray(matrijzen);
      planning.push({
        id: generateId('P', count),
        mold_id: matrijs.id,
        datum: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss'),
        type: 'Preventief',
        status: 'Gepland',
        beschrijving: `${maintenanceType} voor ${matrijs.naam}`,
        checklistItems: [],
        groupId,
        maintenanceType,
        technicianId: technician.id
      });
    }
  }
  
  // Add some individual tasks
  for (let i = 0; i < 10; i++) {
    count++;
    const date = addDays(new Date(), Math.floor(Math.random() * 14));
    date.setHours(8 + Math.floor(Math.random() * 8)); // Between 8:00 and 16:00
    const matrijs = randomFromArray(matrijzen);
    
    planning.push({
      id: generateId('P', count),
      mold_id: matrijs.id,
      datum: date.toISOString(),
      type: Math.random() > 0.7 ? 'Correctief' : 'Preventief',
      status: ['Gepland', 'In Uitvoering', 'Voltooid'][Math.floor(Math.random() * 3)],
      beschrijving: `${randomFromArray(maintenanceTypes)} voor ${matrijs.naam}`,
      checklistItems: [],
      maintenanceType: randomFromArray(maintenanceTypes),
      technicianId: randomFromArray(TECHNICIANS).id
    });
  }

  return planning;
};

export function generateMockData() {
  const machines = generateMachines();
  const matrijzen = generateMatrijzen(machines);
  
  return {
    machines,
    matrijzen,
    planning: generateInitialPlanning(matrijzen),
    locationStats: generateLocationStats(),
    machineStats: generateMachineStats(),
    moldStats: generateMoldStats(),
    notifications: generateNotifications()
  };
}
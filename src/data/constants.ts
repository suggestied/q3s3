// Machine Types with their characteristics
export const MACHINE_TYPES = {
  Hydraulisch: {
    targetShotDuration: 5.5,  // seconds
    shotDurationVariation: 0.3,
    baseEfficiency: 92,
    maintenanceInterval: 168, // hours (1 week)
    maintenanceTypes: [
      'Ring Vervanging',
      'Olie Verversen',
      'Filter Vervangen',
      'Koelvloeistof Vervangen'
    ]
  },
  Elektrisch: {
    targetShotDuration: 4.2,
    shotDurationVariation: 0.2,
    baseEfficiency: 95,
    maintenanceInterval: 336, // hours (2 weeks)
    maintenanceTypes: [
      'Software Update',
      'Sensor Kalibratie',
      'Algemene Inspectie'
    ]
  },
  Hybride: {
    targetShotDuration: 4.8,
    shotDurationVariation: 0.25,
    baseEfficiency: 94,
    maintenanceInterval: 240, // hours (10 days)
    maintenanceTypes: [
      'Ring Vervanging',
      'Olie Verversen',
      'Software Update',
      'Sensor Kalibratie'
    ]
  }
} as const;

// Location configurations
export const LOCATIONS = {
  'Hal A': {
    machineCount: 15,
    types: ['Hydraulisch', 'Elektrisch'],
    shiftHours: { start: 6, end: 22 },
    targetOEE: 88
  },
  'Hal B': {
    machineCount: 20,
    types: ['Elektrisch', 'Hybride'],
    shiftHours: { start: 0, end: 24 }, // 24/7 operation
    targetOEE: 92
  },
  'Hal C': {
    machineCount: 12,
    types: ['Hydraulisch', 'Hybride'],
    shiftHours: { start: 6, end: 22 },
    targetOEE: 85
  }
} as const;

// Mold configurations
export const MOLD_TYPES = {
  Klein: {
    maxHandelingen: 8000,
    maintenanceInterval: 2000,
    warningThreshold: 0.8, // 80% of max handelingen
    criticalThreshold: 0.9 // 90% of max handelingen
  },
  Middel: {
    maxHandelingen: 12000,
    maintenanceInterval: 3000,
    warningThreshold: 0.75,
    criticalThreshold: 0.85
  },
  Groot: {
    maxHandelingen: 15000,
    maintenanceInterval: 4000,
    warningThreshold: 0.7,
    criticalThreshold: 0.8
  }
} as const;

// Maintenance schedules
export const MAINTENANCE_SCHEDULES = {
  'Ring Vervanging': {
    duration: 4, // hours
    interval: 2160, // 90 days
    priority: 'high',
    requiredParts: ['Hydraulische Ring', 'Afdichtingen']
  },
  'Olie Verversen': {
    duration: 2,
    interval: 720, // 30 days
    priority: 'medium',
    requiredParts: ['Hydraulische Olie', 'Filter']
  },
  'Filter Vervangen': {
    duration: 1,
    interval: 168, // 7 days
    priority: 'low',
    requiredParts: ['Filter']
  },
  'Software Update': {
    duration: 3,
    interval: 2160, // 90 days
    priority: 'medium',
    requiredParts: []
  },
  'Sensor Kalibratie': {
    duration: 2,
    interval: 720, // 30 days
    priority: 'high',
    requiredParts: ['Kalibratie Kit']
  },
  'Koelvloeistof Vervangen': {
    duration: 2,
    interval: 2160, // 90 days
    priority: 'medium',
    requiredParts: ['Koelvloeistof']
  },
  'Algemene Inspectie': {
    duration: 1,
    interval: 168, // 7 days
    priority: 'low',
    requiredParts: []
  }
} as const;

// Parts inventory
export const PARTS_INVENTORY = {
  'Hydraulische Ring': {
    minStock: 5,
    currentStock: 8,
    reorderPoint: 6,
    reorderQuantity: 5,
    leadTime: 14 // days
  },
  'Afdichtingen': {
    minStock: 10,
    currentStock: 15,
    reorderPoint: 12,
    reorderQuantity: 10,
    leadTime: 7
  },
  'Hydraulische Olie': {
    minStock: 3,
    currentStock: 5,
    reorderPoint: 4,
    reorderQuantity: 3,
    leadTime: 5
  },
  'Filter': {
    minStock: 20,
    currentStock: 25,
    reorderPoint: 22,
    reorderQuantity: 15,
    leadTime: 3
  },
  'Kalibratie Kit': {
    minStock: 2,
    currentStock: 3,
    reorderPoint: 2,
    reorderQuantity: 2,
    leadTime: 10
  },
  'Koelvloeistof': {
    minStock: 5,
    currentStock: 8,
    reorderPoint: 6,
    reorderQuantity: 5,
    leadTime: 5
  }
} as const;

// Technicians
export const TECHNICIANS = [
  {
    id: 'T001',
    name: 'Jan de Vries',
    specialization: ['Hydraulisch'],
    efficiency: 0.95,
    availability: 0.9
  },
  {
    id: 'T002',
    name: 'Piet Bakker',
    specialization: ['Elektrisch'],
    efficiency: 0.92,
    availability: 0.85
  },
  {
    id: 'T003',
    name: 'Klaas Smit',
    specialization: ['Hydraulisch', 'Hybride'],
    efficiency: 0.88,
    availability: 0.95
  },
  {
    id: 'T004',
    name: 'Dirk van Dijk',
    specialization: ['Elektrisch', 'Hybride'],
    efficiency: 0.90,
    availability: 0.88
  }
] as const;
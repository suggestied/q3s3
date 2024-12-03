import React from 'react';
import { WrenchIcon, AlertCircle } from 'lucide-react';
import type { Planning } from '@/types';

interface PlanningTypeSelectorProps {
  selectedType: string;
  maintenanceType: string;
  onTypeChange: (type: Planning['type']) => void;
  onMaintenanceTypeChange: (type: string) => void;
  disabled?: boolean;
}

export default function PlanningTypeSelector({
  selectedType,
  maintenanceType,
  onTypeChange,
  onMaintenanceTypeChange,
  disabled
}: PlanningTypeSelectorProps) {
  const maintenanceTypes = [
    'Ring Vervanging',
    'Oppervlakte Behandeling',
    'Kalibratie',
    'Reiniging',
    'Inspectie'
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {['Preventief', 'Correctief'].map((type) => (
          <label
            key={type}
            className={`
              flex items-center p-3 rounded-lg cursor-pointer border transition-colors
              ${selectedType === type 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'border-gray-200 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input
              type="radio"
              name="type"
              value={type}
              checked={selectedType === type}
              onChange={(e) => onTypeChange(e.target.value as Planning['type'])}
              className="sr-only"
              disabled={disabled}
            />
            {type === 'Preventief' ? (
              <WrenchIcon className={`h-4 w-4 mr-2 ${selectedType === type ? 'text-blue-500' : 'text-gray-400'}`} />
            ) : (
              <AlertCircle className={`h-4 w-4 mr-2 ${selectedType === type ? 'text-blue-500' : 'text-gray-400'}`} />
            )}
            {type}
          </label>
        ))}
      </div>

      <select
        value={maintenanceType}
        onChange={(e) => onMaintenanceTypeChange(e.target.value)}
        className="mt-1"
        required
        disabled={disabled}
      >
        <option value="">Selecteer soort onderhoud</option>
        {maintenanceTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}
import React from 'react';
import { TECHNICIANS } from '@/data/constants';

interface PlanningTechnicianSelectorProps {
  selectedTechnicianId: string;
  onTechnicianChange: (id: string) => void;
}

export default function PlanningTechnicianSelector({
  selectedTechnicianId,
  onTechnicianChange
}: PlanningTechnicianSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Toegewezen aan</label>
      <select
        value={selectedTechnicianId}
        onChange={(e) => onTechnicianChange(e.target.value)}
        className="mt-1"
        required
      >
        <option value="">Selecteer monteur</option>
        {TECHNICIANS.map(tech => (
          <option key={tech.id} value={tech.id}>
            {tech.name} ({tech.specialization.join(', ')})
          </option>
        ))}
      </select>
      {selectedTechnicianId && (
        <div className="mt-2">
          <div className="text-xs text-gray-500">Beschikbaarheid</div>
          <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ 
                width: `${TECHNICIANS.find(t => t.id === selectedTechnicianId)?.availability ?? 0 * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import type { Machine, Matrijs } from '@/types';
import MachineCard from './MachineCard';

interface FactoryGridProps {
  machines: Machine[];
  matrijzen: Matrijs[];
}

export default function FactoryGrid({ machines, matrijzen }: FactoryGridProps) {
  // Only show machines that are active or have a mold installed
  const activeMachines = machines.filter(machine => 
    machine.status === 'Actief' || machine.currentMatrijsId
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 min-h-0 p-2">
        {activeMachines.map((machine) => {
          const matrijs = matrijzen.find(m => m.machineId === machine.id);
          return (
            <MachineCard 
              key={machine.id} 
              machine={machine}
              matrijs={matrijs}
            />
          );
        })}
      </div>
    </div>
  );
}
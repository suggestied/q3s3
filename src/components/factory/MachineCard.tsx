import React from 'react';
import type { Machine, Matrijs } from '@/types';

interface MachineCardProps {
  machine: Machine;
  matrijs?: Matrijs;
}

export default function MachineCard({ machine, matrijs }: MachineCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actief':
        return 'bg-green-500';
      case 'In Onderhoud':
        return 'bg-yellow-500';
      case 'Storing':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Actief':
        return 'bg-green-900/50 text-green-300 border border-green-700';
      case 'In Onderhoud':
        return 'bg-yellow-900/50 text-yellow-300 border border-yellow-700';
      case 'Storing':
        return 'bg-red-900/50 text-red-300 border border-red-700';
      default:
        return 'bg-gray-900/50 text-gray-300 border border-gray-700';
    }
  };

  const getHealthColor = (health: number) => {
    if (health > 70) return 'bg-green-500';
    if (health > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between hover:bg-gray-750 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)}`} />
          <span className={`text-sm px-2.5 py-1 rounded-full ${getStatusBadgeStyle(machine.status)}`}>
            {machine.status}
          </span>
        </div>
        <h3 className="text-lg font-medium mb-2">{machine.naam}</h3>
        <div className="text-sm text-gray-400">
          Efficiency: {machine.efficiency}%
        </div>
      </div>

      {matrijs && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Current Mold</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeStyle(matrijs.status)}`}>
              {matrijs.status}
            </span>
          </div>
          <div className="text-sm font-medium mb-2">{matrijs.naam}</div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Health</span>
            <span className={`font-medium ${
              matrijs.gezondheid > 70 ? 'text-green-400' :
              matrijs.gezondheid > 30 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {matrijs.gezondheid}%
            </span>
          </div>
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${getHealthColor(matrijs.gezondheid)}`}
              style={{ width: `${matrijs.gezondheid}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
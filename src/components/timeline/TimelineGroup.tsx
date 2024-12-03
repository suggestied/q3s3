import React from 'react';
import TimelineRow from './TimelineRow';
import type { Machine } from '../../types';

interface TimelineGroupProps {
  group: string;
  machines: Machine[];
  expandedMachines: string[];
  onToggleExpand: (id: string) => void;
  timelineData: Record<string, any[]>;
  targetEfficiency: number;
}

export default function TimelineGroup({
  group,
  machines,
  expandedMachines,
  onToggleExpand,
  timelineData,
  targetEfficiency
}: TimelineGroupProps) {
  return (
    <div className="space-y-2">
      <div className="bg-gray-100 px-4 py-2 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900">{group}</h3>
      </div>
      {machines.map((machine) => (
        <TimelineRow
          key={machine.id}
          machine={machine}
          isExpanded={expandedMachines.includes(machine.id)}
          onToggle={() => onToggleExpand(machine.id)}
          data={timelineData[machine.id]}
          targetEfficiency={targetEfficiency}
        />
      ))}
    </div>
  );
}
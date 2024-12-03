import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TimelineHeader from './timeline/TimelineHeader';
import TimelineGroup from './timeline/TimelineGroup';
import TimelineLegend from './timeline/TimelineLegend';
import { generateTimelineData } from '../utils/timelineData';

export default function MachineTimeline() {
  const { machines } = useData();
  const [expandedMachines, setExpandedMachines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [groupBy, setGroupBy] = useState('status');

  const toggleMachineExpand = (machineId: string) => {
    setExpandedMachines(prev =>
      prev.includes(machineId)
        ? prev.filter(id => id !== machineId)
        : [...prev, machineId]
    );
  };

  const filteredMachines = machines.filter(machine =>
    machine.naam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupMachines = (machines: typeof filteredMachines) => {
    return machines.reduce((acc, machine) => {
      let key = '';
      switch (groupBy) {
        case 'status':
          key = machine.status;
          break;
        case 'location':
          key = machine.location;
          break;
        case 'type':
          key = machine.type;
          break;
        case 'efficiency':
          key = machine.efficiency >= 90 ? 'Hoge Efficiency (90%+)' :
                machine.efficiency >= 80 ? 'Gemiddelde Efficiency (80-89%)' :
                'Lage Efficiency (<80%)';
          break;
        default:
          key = machine.status;
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(machine);
      return acc;
    }, {} as Record<string, typeof machines>);
  };

  const groupedMachines = groupMachines(filteredMachines);
  const timelineData = generateTimelineData(filteredMachines);

  return (
    <div className="h-full flex flex-col">
      <TimelineHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
      />

      <TimelineLegend />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto p-4">
          <div className="space-y-4">
            {Object.entries(groupedMachines).map(([group, groupMachines]) => (
              <TimelineGroup
                key={group}
                group={group}
                machines={groupMachines}
                expandedMachines={expandedMachines}
                onToggleExpand={toggleMachineExpand}
                timelineData={timelineData}
                targetEfficiency={85}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
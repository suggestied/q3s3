import React from 'react';
import { Users } from 'lucide-react';
import type { Planning } from '@/types';
import MaintenanceTask from '../MaintenanceTask';

interface GroupedTasksProps {
  tasks: Planning[];
  onTaskClick: (task: Planning) => void;
  matrijzen: any[];
}

export default function GroupedTasks({ tasks, onTaskClick, matrijzen }: GroupedTasksProps) {
  if (tasks.length === 0) return null;

  const isGrouped = tasks.length > 1;
  const maintenanceType = tasks[0].maintenanceType;

  return (
    <div className={`
      ${isGrouped 
        ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100 overflow-hidden' 
        : ''}
    `}>
      {isGrouped && (
        <div className="px-2 py-1 bg-blue-100/50 text-blue-700 text-xs font-medium flex items-center">
          <Users className="h-3 w-3 mr-1" />
          {maintenanceType}
        </div>
      )}
      {tasks.map((task) => {
        const matrijs = matrijzen.find(m => m.id === task.matrijsId);
        return (
          <MaintenanceTask
            key={task.id}
            task={task}
            matrijs={matrijs}
            onClick={() => onTaskClick(task)}
            isGrouped={isGrouped}
          />
        );
      })}
    </div>
  );
}
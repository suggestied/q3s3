import React from 'react';
import { useDrop } from 'react-dnd';
import { format, isSameDay } from 'date-fns';
import { Users } from 'lucide-react';
import type { Planning } from '../types';
import MaintenanceTask from './MaintenanceTask';
import { useData } from '../context/DataContext';

interface CalendarDayProps {
  date: Date;
  tasks: Planning[];
  onTaskClick: (task: Planning) => void;
  getGroupedTasks: (tasks: Planning[]) => Planning[][];
}

export default function CalendarDay({ date, tasks, onTaskClick, getGroupedTasks }: CalendarDayProps) {
  const { matrijzen, updatePlanning } = useData();
  const isToday = isSameDay(date, new Date());
  const groupedTasks = getGroupedTasks(tasks);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'maintenance',
    drop: (item: { task: Planning }) => {
      const updatedTask = {
        ...item.task,
        datum: format(date, 'yyyy-MM-dd') + 'T' + format(new Date(item.task.datum), 'HH:mm:ss')
      };
      updatePlanning(updatedTask);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`
        min-h-[12rem] px-2 transition-colors relative border-b border-gray-200 last:border-b-0
        ${isToday ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}
        ${isOver ? 'bg-blue-100/50' : ''}
      `}
    >
      <div className="h-full p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="grid gap-2">
          {groupedTasks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
              Geen taken gepland
            </div>
          ) : (
            groupedTasks.map((group, groupIndex) => (
              <div 
                key={groupIndex}
                className={`
                  ${group.length > 1 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100' 
                    : ''}
                `}
              >
                {group.length > 1 && (
                  <div className="px-2 py-1 bg-blue-100/50 border-b border-blue-100 text-blue-700 text-xs font-medium flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {group[0].maintenanceType}
                    <span className="ml-auto text-blue-600">{group.length} taken</span>
                  </div>
                )}
                <div className={`
                  grid gap-1
                  ${group.length > 1 ? 'p-1 grid-cols-1' : ''}
                `}>
                  {group.map((task) => {
                    const matrijs = matrijzen.find(m => m.id === task.matrijsId);
                    return (
                      <MaintenanceTask
                        key={task.id}
                        task={task}
                        matrijs={matrijs}
                        onClick={() => onTaskClick(task)}
                        isGrouped={group.length > 1}
                      />
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
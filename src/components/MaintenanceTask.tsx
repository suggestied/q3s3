import React from 'react';
import { useDrag } from 'react-dnd';
import { Wrench, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Planning } from '../types';

interface MaintenanceTaskProps {
  task: Planning;
  matrijs: any;
  onClick: () => void;
  isGrouped?: boolean;
}

export default function MaintenanceTask({ task, matrijs, onClick, isGrouped }: MaintenanceTaskProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'maintenance',
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`
        text-left p-2 rounded-lg text-sm cursor-move
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isGrouped 
          ? 'hover:bg-blue-100/50 bg-white border border-blue-100' 
          : 'bg-white shadow-sm hover:shadow-md border border-gray-200 transition-all duration-200'
        }
      `}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {task.type === 'Preventief' ? (
            <Wrench className="h-3 w-3 text-blue-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
          )}
          <span className="truncate font-medium">
            {matrijs?.naam}
          </span>
        </div>
        <span className={`flex-none px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
          task.status === 'Gepland' ? 'bg-yellow-100 text-yellow-800' :
          task.status === 'In Uitvoering' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {format(new Date(task.datum), 'HH:mm')}
        </span>
      </div>
      {!isGrouped && (
        <div className="mt-1 text-xs text-gray-500 truncate">
          {task.beschrijving}
        </div>
      )}
    </div>
  );
}
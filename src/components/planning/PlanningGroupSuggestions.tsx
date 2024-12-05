import React, { useState, useMemo } from 'react';
import { useData } from '@/context/DataContext';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Calendar, ChevronRight, Users, Filter } from 'lucide-react';

export default function PlanningGroupSuggestions() {
  const { planning } = useData();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<'day' | 'week'>('day');

  // Find similar tasks that could be grouped based on time range
  const similarTasks = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { locale: nl });
    const weekEnd = endOfWeek(now, { locale: nl });

    return planning.filter(task => {
      const taskDate = new Date(task.datum);
      if (task.groupId) return false;

      if (timeRange === 'day') {
        return Math.abs(taskDate.getTime() - now.getTime()) < 24 * 60 * 60 * 1000;
      } else {
        return taskDate >= weekStart && taskDate <= weekEnd;
      }
    }).sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  }, [planning, timeRange]);

  if (similarTasks.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          Geen vergelijkbare onderhoudstaken gevonden binnen {timeRange === 'day' ? '24 uur' : 'deze week'}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100">
      <div className="p-4 border-b border-blue-100 bg-blue-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-blue-900">
              Vergelijkbare taken
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'day' | 'week')}
              className="text-sm border border-blue-200 rounded-lg bg-blue-50 px-2 py-1"
            >
              <option value="day">24 uur</option>
              <option value="week">Deze week</option>
            </select>
            <span className="text-sm text-blue-700 bg-blue-200 px-2 py-1 rounded-full w-52">
              {selectedTasks.length} geselecteerd
            </span>
          </div>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Deze taken kunnen worden samengevoegd met de nieuwe planning
        </p>
      </div>

      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {similarTasks.map(task => {
          const isSelected = selectedTasks.includes(task.id);
          const taskDate = new Date(task.datum);
          
          return (
            <label
              key={task.id}
              className={`
                flex items-start p-3 rounded-lg cursor-pointer border transition-all
                ${isSelected 
                  ? 'bg-blue-100 border-blue-300 shadow-sm' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500"
                checked={isSelected}
                onChange={() => setSelectedTasks(prev => 
                  prev.includes(task.id)
                    ? prev.filter(id => id !== task.id)
                    : [...prev, task.id]
                )}
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {task.beschrijving}
                  </p>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {format(taskDate, 'EEEE dd MMM yyyy HH:mm', { locale: nl })}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {selectedTasks.length > 0 && (
        <div className="p-4 bg-blue-100/50 border-t border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-700">
              <Users className="h-4 w-4 mr-1.5" />
              Taken worden samengevoegd bij inplannen
            </div>
            <div className="text-sm text-blue-600">
              {selectedTasks.length} taken geselecteerd
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
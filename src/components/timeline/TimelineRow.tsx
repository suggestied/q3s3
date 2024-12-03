import React, { useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import TimelineChart from './TimelineChart';
import type { Machine } from '../../types';

interface TimelineRowProps {
  machine: Machine;
  isExpanded: boolean;
  onToggle: () => void;
  data: any[];
  targetEfficiency: number;
  style?: React.CSSProperties;
}

const TimelineRow = React.memo(({ 
  machine, 
  isExpanded, 
  onToggle,
  data,
  targetEfficiency,
  style
}: TimelineRowProps) => {
  const averageEfficiency = useMemo(() => 
    Math.round(data.reduce((acc, d) => acc + d.efficiency, 0) / data.length),
    [data]
  );

  return (
    <div style={style} className="px-4 py-2">
      <div className="relative bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="flex items-center h-16">
          <button
            onClick={onToggle}
            className="w-48 flex items-center text-left px-4"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
            )}
            <div className="flex items-center space-x-3">
              <StatusIndicator 
                status={machine.status} 
                efficiency={averageEfficiency}
                target={targetEfficiency}
              />
              <span className="text-sm font-medium text-gray-900 truncate">
                {machine.naam}
              </span>
            </div>
          </button>

          <div className="flex-1 h-16">
            <TimelineChart data={data} targetEfficiency={targetEfficiency} />
          </div>
        </div>

        {isExpanded && (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Gemiddelde efficiency:</span>
                <span className={`ml-2 font-medium ${averageEfficiency >= targetEfficiency ? 'text-green-600' : 'text-gray-900'}`}>
                  {averageEfficiency}%
                </span>
              </div>
              <div>
                <span className="text-gray-500">Target:</span>
                <span className="ml-2 font-medium">{targetEfficiency}%</span>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 font-medium">{machine.type}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

TimelineRow.displayName = 'TimelineRow';

export default TimelineRow;
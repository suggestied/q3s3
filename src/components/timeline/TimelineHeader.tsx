import React from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { DayPicker } from 'react-day-picker';

interface TimelineHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  groupBy: string;
  onGroupByChange: (value: string) => void;
}

export default function TimelineHeader({
  selectedDate,
  onDateChange,
  searchTerm,
  onSearchChange,
  groupBy,
  onGroupByChange
}: TimelineHeaderProps) {
  return (
    <div className="flex-none px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Machine Timeline</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-10 flex items-center gap-2 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Calendar className="h-4 w-4" />
                {format(selectedDate, 'd MMMM yyyy', { locale: nl })}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && onDateChange(date)}
                className="border rounded-md bg-white p-3"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={groupBy}
              onChange={(e) => onGroupByChange(e.target.value)}
              className="border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="status">Groepeer op Status</option>
              <option value="location">Groepeer op Locatie</option>
              <option value="type">Groepeer op Type</option>
              <option value="efficiency">Groepeer op Efficiency</option>
            </select>
          </div>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Zoek machines..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
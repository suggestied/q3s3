import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface PlanningDateTimePickerProps {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function PlanningDateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange
}: PlanningDateTimePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Datum</label>
        <div className="mt-1 relative">
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="pl-9"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tijd</label>
        <div className="mt-1 relative">
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="pl-9"
            required
          />
        </div>
      </div>
    </div>
  );
}
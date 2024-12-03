import { startOfDay } from 'date-fns';
import type { Machine } from '../types';

// Seeded random for consistent generation
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export function generateTimelineData(machines: Machine[]) {
  const data: Record<string, any[]> = {};
  const seed = startOfDay(new Date()).getTime();
  
  machines.forEach((machine, index) => {
    data[machine.id] = Array.from({ length: 24 }, (_, hour) => {
      const isWorkHour = hour >= 6 && hour <= 22;
      const baseEfficiency = isWorkHour ? 85 : 30;
      const variation = seededRandom(seed + index + hour) * 20 - 10;
      const efficiency = Math.max(0, Math.min(100, baseEfficiency + variation));
      
      return {
        hour,
        efficiency: Math.round(efficiency),
        shotsPerHour: efficiency > 0 ? Math.floor(efficiency * 5) : 0
      };
    });
  });

  return data;
}
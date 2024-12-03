import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockData } from '../data/mockDataGenerator';
import type { 
  Machine, 
  Matrijs, 
  Planning,
  LocationStats,
  MachineStats,
  MoldStats,
  Notification
} from '../types';

interface DataContextType {
  machines: Machine[];
  matrijzen: Matrijs[];
  planning: Planning[];
  locationStats: LocationStats[];
  machineStats: MachineStats[];
  moldStats: MoldStats[];
  notifications: Notification[];
  refreshData: () => void;
  updateMachineStatus: (machineId: string, status: Machine['status']) => void;
  updateMatrijsStatus: (matrijsId: string, status: Matrijs['status']) => void;
  updatePlanning: (updatedTask: Planning) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(() => generateMockData());

  const refreshData = () => {
    setData(generateMockData());
  };

  const updateMachineStatus = (machineId: string, status: Machine['status']) => {
    setData(prev => ({
      ...prev,
      machines: prev.machines.map(machine =>
        machine.id === machineId ? { ...machine, status } : machine
      )
    }));
  };

  const updateMatrijsStatus = (matrijsId: string, status: Matrijs['status']) => {
    setData(prev => ({
      ...prev,
      matrijzen: prev.matrijzen.map(matrijs =>
        matrijs.id === matrijsId ? { ...matrijs, status } : matrijs
      )
    }));
  };

  const updatePlanning = (updatedTask: Planning) => {
    setData(prev => ({
      ...prev,
      planning: prev.planning.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{
      ...data,
      refreshData,
      updateMachineStatus,
      updateMatrijsStatus,
      updatePlanning
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
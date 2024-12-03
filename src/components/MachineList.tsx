import React, { useState } from 'react';
import { Power, AlertTriangle, Wrench, Clock, WrenchIcon, ChevronRight } from 'lucide-react';
import type { Machine, Matrijs } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MachineListProps {
  onMachineClick: (machineId: string) => void;
}

const mockMachines: Machine[] = [
  {
    id: 'M001',
    naam: 'Spuitgietmachine 1',
    type: 'Hydraulisch',
    status: 'Actief',
    location: 'Hal A',
    efficiency: 95.5
  },
  {
    id: 'M002',
    naam: 'Spuitgietmachine 2',
    type: 'Elektrisch',
    status: 'Storing',
    location: 'Hal A',
    efficiency: 82.3
  }
];

const mockMatrijzen: Record<string, Matrijs[]> = {
  'M001': [
    {
      id: 'MT001',
      naam: 'Matrijs A-123',
      aantalHandelingen: 4500,
      maxHandelingen: 10000,
      laatstGebruikt: '2024-03-15T10:30:00',
      gezondheid: 85,
      status: 'In Gebruik'
    },
    {
      id: 'MT002',
      naam: 'Matrijs B-456',
      aantalHandelingen: 8500,
      maxHandelingen: 10000,
      laatstGebruikt: '2024-03-15T09:00:00',
      gezondheid: 45,
      status: 'Onderhoud Nodig'
    }
  ],
  'M002': [
    {
      id: 'MT003',
      naam: 'Matrijs C-789',
      aantalHandelingen: 2000,
      maxHandelingen: 10000,
      laatstGebruikt: '2024-03-15T08:30:00',
      gezondheid: 95,
      status: 'Beschikbaar'
    }
  ]
};

const statusIcons = {
  Actief: <Power className="h-5 w-5 text-green-500" />,
  Inactief: <Clock className="h-5 w-5 text-gray-500" />,
  'In Onderhoud': <Wrench className="h-5 w-5 text-blue-500" />,
  Storing: <AlertTriangle className="h-5 w-5 text-red-500" />
};

const matrijsStatusColors = {
  'Beschikbaar': 'bg-green-100 text-green-800',
  'In Gebruik': 'bg-blue-100 text-blue-800',
  'Onderhoud Nodig': 'bg-red-100 text-red-800',
  'In Onderhoud': 'bg-yellow-100 text-yellow-800'
};

export default function MachineList({ onMachineClick }: MachineListProps) {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMachineClick = (machine: Machine) => {
    onMachineClick(machine.id);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Machines</h2>
          <div className="flex space-x-2">
            <span className="text-sm text-gray-500">Totale Uptime:</span>
            <span className="text-sm font-medium text-green-600">88.9%</span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockMachines.map((machine) => (
            <button
              key={machine.id}
              onClick={() => handleMachineClick(machine)}
              className="w-full px-6 py-3 flex items-center hover:bg-gray-50 text-left"
            >
              <div className="flex-shrink-0">{statusIcons[machine.status]}</div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{machine.naam}</h3>
                    <p className="text-sm text-gray-500">{machine.type}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900">Efficiency</p>
                      <p className="text-sm font-medium text-green-600">{machine.efficiency}%</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <WrenchIcon className="h-5 w-5" />
              Geïnstalleerde Matrijzen - {selectedMachine?.naam}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedMachine && mockMatrijzen[selectedMachine.id]?.map((matrijs) => (
              <div key={matrijs.id} className="mb-4 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{matrijs.naam}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${matrijsStatusColors[matrijs.status]}`}>
                    {matrijs.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Handelingen</p>
                    <p className="text-sm font-medium">
                      {matrijs.aantalHandelingen.toLocaleString()} / {matrijs.maxHandelingen.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gezondheid</p>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            matrijs.gezondheid > 70 ? 'bg-green-500' :
                            matrijs.gezondheid > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${matrijs.gezondheid}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">{matrijs.gezondheid}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Laatst gebruikt</p>
                  <p className="text-sm font-medium">
                    {new Date(matrijs.laatstGebruikt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
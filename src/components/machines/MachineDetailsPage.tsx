import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Activity, WrenchIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useData } from '@/context/DataContext';
import MachineEfficiencyChart from './MachineEfficiencyChart';
import MachineMaintenanceHistory from './MachineMaintenanceHistory';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MachineDetailsPage() {
  const { machineId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { matrijzen, planning } = useData();

  const isModal = Boolean(location.state?.background);

  const machine = {
    id: machineId,
    naam: `Machine ${machineId}`,
    type: 'Hydraulisch',
    status: 'Actief',
    location: 'Hal A',
    efficiency: 92
  };

  const currentMatrijs = matrijzen.find(m => m.machineId === machineId);
  const maintenanceHistory = planning.filter(p => p.matrijsId === currentMatrijs?.id);

  const handleClose = () => {
    navigate(location.state?.background?.pathname || '/');
  };

  const content = (
    <div className="bg-white rounded-lg shadow-sm">
      {!isModal && (
        <div className="px-6 py-4 border-b border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar overzicht
          </button>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Machine Status */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{machine.naam}</h1>
            <p className="text-sm text-gray-500">Type: {machine.type}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            machine.status === 'Actief' ? 'bg-green-100 text-green-800' :
            machine.status === 'In Onderhoud' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {machine.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Activity className="h-4 w-4" />
              <span>Efficiency</span>
            </div>
            <div className="text-2xl font-bold">
              {machine.efficiency}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  machine.efficiency >= 90 ? 'bg-green-500' :
                  machine.efficiency >= 70 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${machine.efficiency}%` }}
              />
            </div>
          </div>

          {currentMatrijs && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <WrenchIcon className="h-4 w-4" />
                <span>Current Mold</span>
              </div>
              <div className="text-lg font-medium">{currentMatrijs.naam}</div>
              <div className="mt-2 flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      currentMatrijs.gezondheid > 70 ? 'bg-green-500' :
                      currentMatrijs.gezondheid > 30 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${currentMatrijs.gezondheid}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">
                  {currentMatrijs.gezondheid}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Efficiency Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Over Time</h2>
          <div className="h-64">
            <MachineEfficiencyChart machineId={machineId || ''} />
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h2>
          <MachineMaintenanceHistory maintenances={maintenanceHistory} />
        </div>

        {/* Warnings */}
        {machine.efficiency < 70 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">
                Machine efficiency is below target. Maintenance check recommended.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{machine.naam}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
}
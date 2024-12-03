import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Activity, WrenchIcon, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useData } from '@/context/DataContext';
import MoldUsageChart from './MoldUsageChart';
import MoldMaintenanceHistory from './MoldMaintenanceHistory';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MoldDetailsPage() {
  const { moldId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { matrijzen, planning } = useData();

  const isModal = Boolean(location.state?.background);
  const matrijs = matrijzen.find(m => m.id === moldId);
  const maintenanceHistory = planning.filter(p => p.matrijsId === moldId);

  const handleClose = () => {
    navigate(location.state?.background?.pathname || '/');
  };

  if (!matrijs) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Matrijs niet gevonden</p>
      </div>
    );
  }

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
        {/* Mold Status */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{matrijs.naam}</h1>
            <p className="text-sm text-gray-500">
              Laatste gebruik: {new Date(matrijs.laatstGebruikt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            matrijs.status === 'Beschikbaar' ? 'bg-green-100 text-green-800' :
            matrijs.status === 'In Gebruik' ? 'bg-blue-100 text-blue-800' :
            matrijs.status === 'Onderhoud Nodig' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {matrijs.status}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Activity className="h-4 w-4" />
              <span>Handelingen</span>
            </div>
            <div className="text-2xl font-bold">
              {matrijs.aantalHandelingen.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal ml-1">
                / {matrijs.maxHandelingen.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  matrijs.aantalHandelingen / matrijs.maxHandelingen > 0.9 ? 'bg-red-500' :
                  matrijs.aantalHandelingen / matrijs.maxHandelingen > 0.7 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${(matrijs.aantalHandelingen / matrijs.maxHandelingen) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <WrenchIcon className="h-4 w-4" />
              <span>Gezondheid</span>
            </div>
            <div className="text-2xl font-bold">
              {matrijs.gezondheid}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  matrijs.gezondheid > 70 ? 'bg-green-500' :
                  matrijs.gezondheid > 30 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${matrijs.gezondheid}%` }}
              />
            </div>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gebruik per Week</h2>
          <div className="h-64">
            <MoldUsageChart moldId={moldId || ''} />
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Onderhoudsgeschiedenis</h2>
          <MoldMaintenanceHistory maintenances={maintenanceHistory} />
        </div>

        {/* Warnings */}
        {matrijs.gezondheid < 30 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">
                Kritieke slijtage gedetecteerd. Direct onderhoud vereist.
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
            <DialogTitle>{matrijs.naam}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
}
import React, { useState } from 'react';
import { Activity, AlertTriangle, Clock, WrenchIcon, Calendar, Users, ArrowLeft } from 'lucide-react';
import type { Matrijs, Planning } from '../types';
import MatrijsUsageChart from './MatrijsUsageChart';
import { useData } from '../context/DataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MatrijsPageProps {
  matrijs: Matrijs;
  onBack: () => void;
}

// Mock weekly data - in production this would come from your data source
const mockWeeklyData = [
  { week: 'Week 1', handelingen: 450 },
  { week: 'Week 2', handelingen: 380 },
  { week: 'Week 3', handelingen: 520 },
  { week: 'Week 4', handelingen: 490 }
];

export default function MatrijsPage({ matrijs, onBack }: MatrijsPageProps) {
  const { planning } = useData();
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    date: '',
    description: '',
    type: 'preventief'
  });

  const healthPercentage = (matrijs.aantalHandelingen / matrijs.maxHandelingen) * 100;
  const isWarning = healthPercentage > 70;
  const isCritical = healthPercentage > 90;

  const matrijsPlanning = planning.filter(p => p.itemId === matrijs.id);

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically add the maintenance to your planning
    console.log('Planning maintenance:', {
      matrijsId: matrijs.id,
      ...newMaintenance
    });
    setIsMaintenanceDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar overzicht
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{matrijs.naam}</h1>
            <p className="text-sm text-gray-500">
              Laatste gebruik: {new Date(matrijs.laatstGebruikt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isCritical ? 'bg-red-100 text-red-800' :
            isWarning ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
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
                  isCritical ? 'bg-red-500' :
                  isWarning ? 'bg-yellow-500' :
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
          <MatrijsUsageChart matrijs={matrijs} weeklyData={mockWeeklyData} />
        </div>

        {/* Maintenance Planning */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Onderhoud</h2>
            <button
              onClick={() => setIsMaintenanceDialogOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Plan Onderhoud
            </button>
          </div>

          <div className="space-y-4">
            {matrijsPlanning.length === 0 ? (
              <p className="text-sm text-gray-500">Geen onderhoud gepland</p>
            ) : (
              matrijsPlanning.map((maintenance, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{maintenance.beschrijving}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        maintenance.status === 'Gepland' ? 'bg-yellow-100 text-yellow-800' :
                        maintenance.status === 'In Uitvoering' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {maintenance.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {new Date(maintenance.datum).toLocaleDateString()}
                    </div>
                    {maintenance.technicianId && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{maintenance.technicianId}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Warnings */}
        {isWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-700">
                Deze matrijs nadert de onderhoudsgrens. Plan preventief onderhoud in.
              </p>
            </div>
          </div>
        )}

        {isCritical && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">
                Kritieke limiet bereikt! Direct onderhoud vereist.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Maintenance Planning Dialog */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Plan Onderhoud</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleMaintenanceSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Datum</label>
              <input
                type="date"
                value={newMaintenance.date}
                onChange={(e) => setNewMaintenance(prev => ({ ...prev, date: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={newMaintenance.type}
                onChange={(e) => setNewMaintenance(prev => ({ ...prev, type: e.target.value }))}
                className="mt-1"
                required
              >
                <option value="preventief">Preventief</option>
                <option value="correctief">Correctief</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Beschrijving</label>
              <textarea
                value={newMaintenance.description}
                onChange={(e) => setNewMaintenance(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1"
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsMaintenanceDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Plan Onderhoud
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
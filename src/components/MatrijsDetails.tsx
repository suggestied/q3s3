import React from 'react';
import { Activity, AlertTriangle, Clock, WrenchIcon, History, ArrowRight } from 'lucide-react';
import type { Matrijs } from '../types';
import MatrijsUsageChart from './MatrijsUsageChart';

interface MatrijsDetailsProps {
  matrijs: Matrijs;
  onClose: () => void;
}

// Mock machine usage history
const mockMachineHistory = [
  {
    machineId: 'M001',
    machineName: 'Spuitgietmachine A101',
    startDate: '2024-03-15T08:00:00',
    endDate: '2024-03-15T16:00:00',
    handelingen: 450,
    efficiency: 95
  },
  {
    machineId: 'M002',
    machineName: 'Spuitgietmachine B205',
    startDate: '2024-03-14T12:00:00',
    endDate: '2024-03-14T20:00:00',
    handelingen: 380,
    efficiency: 92
  },
  {
    machineId: 'M003',
    machineName: 'Spuitgietmachine C103',
    startDate: '2024-03-13T07:00:00',
    endDate: '2024-03-13T15:00:00',
    handelingen: 420,
    efficiency: 88
  }
];

// Mock weekly data
const mockWeeklyData = [
  { week: 'Week 1', handelingen: 450 },
  { week: 'Week 2', handelingen: 380 },
  { week: 'Week 3', handelingen: 520 },
  { week: 'Week 4', handelingen: 490 }
];

export default function MatrijsDetails({ matrijs, onClose }: MatrijsDetailsProps) {
  const healthPercentage = (matrijs.aantalHandelingen / matrijs.maxHandelingen) * 100;
  const isWarning = healthPercentage > 70;
  const isCritical = healthPercentage > 90;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{matrijs.naam}</h3>
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

      <div className="grid grid-cols-2 gap-4">
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

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Gebruik per Week</h4>
        <MatrijsUsageChart matrijs={matrijs} weeklyData={mockWeeklyData} />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <History className="h-5 w-5 text-gray-400" />
          <h4 className="text-sm font-medium text-gray-900">Machine Gebruik Historie</h4>
        </div>
        <div className="space-y-4">
          {mockMachineHistory.map((usage, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{usage.machineName}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(usage.startDate).toLocaleTimeString()} 
                      <ArrowRight className="inline h-4 w-4 mx-1" />
                      {new Date(usage.endDate).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {usage.handelingen} handelingen
                  </div>
                  <div className="text-sm text-gray-500">
                    {usage.efficiency}% efficiency
                  </div>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${usage.efficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
  );
}
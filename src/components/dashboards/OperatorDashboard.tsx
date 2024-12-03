import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Activity } from 'lucide-react';

export default function OperatorDashboard() {
  return (
    <div className="space-y-6">
      {/* Active Machine Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Huidige Machine Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">Machine A101</span>
            </div>
            <div className="mt-2">
              <div className="text-sm text-green-600">Productie loopt optimaal</div>
              <div className="text-xs text-green-500 mt-1">95% efficiency</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-yellow-700 font-medium">Machine B205</span>
            </div>
            <div className="mt-2">
              <div className="text-sm text-yellow-600">Onderhoud gepland</div>
              <div className="text-xs text-yellow-500 mt-1">Over 2 uur</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Checks */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Kwaliteitscontroles</h2>
        <div className="space-y-4">
          {[
            { id: 1, machine: 'A101', check: 'Visuele inspectie', status: 'success', time: '09:00' },
            { id: 2, machine: 'B205', check: 'Maatvoering', status: 'pending', time: '10:30' }
          ].map(check => (
            <div key={check.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {check.status === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                )}
                <div>
                  <div className="font-medium">Machine {check.machine}</div>
                  <div className="text-sm text-gray-500">{check.check}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{check.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Targets */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Productiedoelen</h2>
        <div className="space-y-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Dagdoel
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  85%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div className="w-[85%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
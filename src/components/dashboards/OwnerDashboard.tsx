import React from 'react';
import { TrendingUp, PieChart, BarChart2, AlertTriangle } from 'lucide-react';

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">KPI Overzicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'OEE', value: '87%', trend: '+2.5%', color: 'green' },
            { label: 'Uptime', value: '94%', trend: '+1.2%', color: 'blue' },
            { label: 'Kwaliteit', value: '99.2%', trend: '-0.3%', color: 'yellow' },
            { label: 'Output', value: '12.5K', trend: '+5.1%', color: 'green' }
          ].map((kpi, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">{kpi.label}</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className={`ml-2 text-sm ${
                  kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.trend}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Kostenanalyse</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Onderhoudskosten</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preventief</span>
                <span className="font-medium">€12,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Correctief</span>
                <span className="font-medium">€8,750</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Productiekosten</span>
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Materiaal</span>
                <span className="font-medium">€45,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Arbeid</span>
                <span className="font-medium">€32,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efficiency Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Efficiëntie per Afdeling</h2>
        <div className="space-y-4">
          {[
            { department: 'Hal A', efficiency: 92, trend: '+1.2%' },
            { department: 'Hal B', efficiency: 88, trend: '-0.5%' },
            { department: 'Hal C', efficiency: 95, trend: '+2.1%' }
          ].map((dept, index) => (
            <div key={index} className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {dept.department}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold inline-block ${
                    dept.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {dept.trend}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${dept.efficiency}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { WrenchIcon, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function TechnicianDashboard() {
  return (
    <div className="space-y-6">
      {/* Maintenance Schedule */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Onderhoudsplanning Vandaag</h2>
        <div className="space-y-4">
          {[
            { 
              id: 1, 
              machine: 'A101', 
              type: 'Preventief', 
              task: 'Olie verversen',
              status: 'pending',
              time: '10:30',
              priority: 'high'
            },
            { 
              id: 2, 
              machine: 'B205', 
              type: 'Correctief', 
              task: 'Lager vervangen',
              status: 'in-progress',
              time: '14:00',
              priority: 'medium'
            }
          ].map(task => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <WrenchIcon className={`h-5 w-5 mr-3 ${
                  task.priority === 'high' ? 'text-red-500' :
                  task.priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                <div>
                  <div className="font-medium">Machine {task.machine}</div>
                  <div className="text-sm text-gray-500">{task.task}</div>
                  <div className="text-xs text-gray-400 mt-1">{task.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{task.time}</div>
                <div className={`text-xs ${
                  task.status === 'pending' ? 'text-yellow-500' :
                  task.status === 'in-progress' ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {task.status === 'pending' ? 'Gepland' :
                   task.status === 'in-progress' ? 'In uitvoering' : 'Voltooid'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parts Inventory */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Onderdelen Voorraad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 1, name: 'Hydraulische olie', stock: 5, minimum: 3 },
            { id: 2, name: 'Lagers type A', stock: 2, minimum: 4 },
            { id: 3, name: 'Filters', stock: 8, minimum: 5 }
          ].map(part => (
            <div key={part.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{part.name}</span>
                {part.stock < part.minimum ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="mt-2 text-sm">
                <span className={part.stock < part.minimum ? 'text-red-600' : 'text-green-600'}>
                  {part.stock} stuks
                </span>
                <span className="text-gray-500"> / minimum {part.minimum}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
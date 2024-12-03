import React from 'react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { WrenchIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Planning } from '@/types';

interface MoldMaintenanceHistoryProps {
  maintenances: Planning[];
}

export default function MoldMaintenanceHistory({ maintenances }: MoldMaintenanceHistoryProps) {
  const getStatusIcon = (status: Planning['status']) => {
    switch (status) {
      case 'Voltooid':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'In Uitvoering':
        return <WrenchIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusStyle = (status: Planning['status']) => {
    switch (status) {
      case 'Voltooid':
        return 'bg-green-100 text-green-800';
      case 'In Uitvoering':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      {maintenances.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <WrenchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Geen onderhoudsgeschiedenis beschikbaar</p>
        </div>
      ) : (
        maintenances.map((maintenance) => (
          <div
            key={maintenance.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(maintenance.status)}
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {maintenance.beschrijving}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {format(new Date(maintenance.datum), 'dd MMM yyyy HH:mm', { locale: nl })}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(maintenance.status)}`}>
                {maintenance.status}
              </span>
            </div>
            {maintenance.technicianId && (
              <div className="mt-2 text-sm text-gray-500">
                Monteur: {maintenance.technicianId}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
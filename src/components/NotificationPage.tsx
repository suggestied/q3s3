import React from 'react';
import { AlertTriangle, Bell, Clock, ArrowLeft, WrenchIcon, Activity } from 'lucide-react';
import type { Notification } from '../types';
import { useData } from '../context/DataContext';

interface NotificationPageProps {
  notification: Notification;
  onBack: () => void;
  onAction?: (action: string) => void;
}

export default function NotificationPage({ notification, onBack, onAction }: NotificationPageProps) {
  const { machines, matrijzen } = useData();

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-blue-500" />;
    }
  };

  const getNotificationColor = () => {
    switch (notification.type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getRelatedData = () => {
    // Extract IDs from notification message (this is a simplified example)
    const machineMatch = notification.message.match(/Machine ([A-Z]\d+)/);
    const machineId = machineMatch?.[1];
    const machine = machines.find(m => m.id === machineId);

    const matrijsMatch = notification.message.match(/Matrijs ([A-Z]\d+)/);
    const matrijsId = matrijsMatch?.[1];
    const matrijs = matrijzen.find(m => m.id === matrijsId);

    return { machine, matrijs };
  };

  const { machine, matrijs } = getRelatedData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
        {/* Notification Header */}
        <div className={`p-4 rounded-lg border ${getNotificationColor()}`}>
          <div className="flex items-start space-x-4">
            {getNotificationIcon()}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {notification.message}
              </h2>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(notification.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Related Machine Info */}
        {machine && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Gerelateerde Machine
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Machine</p>
                <p className="text-sm font-medium">{machine.naam}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium">{machine.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-sm font-medium">{machine.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Efficiency</p>
                <p className="text-sm font-medium">{machine.efficiency}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Related Matrijs Info */}
        {matrijs && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
              <WrenchIcon className="h-4 w-4 mr-2" />
              Gerelateerde Matrijs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Matrijs</p>
                <p className="text-sm font-medium">{matrijs.naam}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium">{matrijs.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Handelingen</p>
                <p className="text-sm font-medium">
                  {matrijs.aantalHandelingen} / {matrijs.maxHandelingen}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gezondheid</p>
                <p className="text-sm font-medium">{matrijs.gezondheid}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {notification.type === 'warning' && (
            <button
              onClick={() => onAction?.('plan_maintenance')}
              className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              Plan Onderhoud
            </button>
          )}
          {notification.type === 'error' && (
            <button
              onClick={() => onAction?.('create_incident')}
              className="flex-1 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              Maak Incident Aan
            </button>
          )}
          <button
            onClick={() => onAction?.('mark_read')}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Markeer als Gelezen
          </button>
        </div>
      </div>
    </div>
  );
}
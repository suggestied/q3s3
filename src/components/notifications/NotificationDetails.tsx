import React from 'react';
import { AlertTriangle, Bell, Clock, WrenchIcon, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useData } from '@/context/DataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PlanningDialog from '../planning/PlanningDialog';

interface NotificationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  notification: any;
  onPlanMaintenance: () => void;
}

export default function NotificationDetails({
  isOpen,
  onClose,
  notification,
  onPlanMaintenance
}: NotificationDetailsProps) {
  const { matrijzen, updatePlanning } = useData();
  const [isPlanningOpen, setIsPlanningOpen] = React.useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getRelatedData = () => {
    const matrijsMatch = notification.message.match(/Matrijs ([A-Z]\d+)/);
    const matrijsId = matrijsMatch?.[1];
    const matrijs = matrijzen.find(m => m.id === matrijsId);

    return { matrijs };
  };

  const { matrijs } = getRelatedData();

  const handlePlanMaintenance = () => {
    setIsPlanningOpen(true);
  };

  const handleSubmitPlan = (planningData: any) => {
    if (matrijs) {
      const newPlanning = {
        ...planningData,
        id: `P${Date.now()}`,
        matrijsId: matrijs.id,
        status: 'Gepland'
      };

      updatePlanning(newPlanning);
      setIsPlanningOpen(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Melding Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Notification Header */}
            <div className={`p-4 rounded-lg border ${getNotificationStyle(notification.type)}`}>
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(notification.timestamp), 'dd MMM yyyy HH:mm', { locale: nl })}
                  </p>
                </div>
              </div>
            </div>

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
                    <div className="flex items-center">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
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
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {(notification.type === 'warning' || notification.type === 'error') && (
                <button
                  onClick={handlePlanMaintenance}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Plan Onderhoud
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sluiten
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Planning Dialog */}
      <PlanningDialog
        isOpen={isPlanningOpen}
        onClose={() => setIsPlanningOpen(false)}
        onSubmit={handleSubmitPlan}
        title="Onderhoud Inplannen"
        initialValues={{
          matrijsId: matrijs?.id,
          type: notification.type === 'error' ? 'Correctief' : 'Preventief',
          beschrijving: notification.message
        }}
      />
    </>
  );
}
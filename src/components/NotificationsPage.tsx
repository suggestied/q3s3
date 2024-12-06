import { useState, useMemo } from 'react';
import { AlertTriangle, Bell, Clock, CheckCircle2, Filter, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import PlanningDialog from './planning/PlanningDialog';
import NotificationDetails from './notifications/NotificationDetails';

type FilterType = 'all' | 'unread' | 'warning' | 'error' | 'info';

export default function NotificationsPage() {
  const { notifications, matrijzen, planning, updatePlanning } = useData();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(notification => {
        if (filterType === 'all') return true;
        if (filterType === 'unread') return !notification.read;
        return notification.type === filterType;
      })
      .filter(notification =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [notifications, filterType, searchTerm]);

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setIsDetailsOpen(true);
  };

  const handlePlanMaintenance = () => {
    setIsPlanningOpen(true);
    setIsDetailsOpen(false);
  };

  const handleSubmitPlan = (planningData: any) => {
    if (selectedNotification) {
      // Extract machine or mold ID from notification message
      const matrijsMatch = selectedNotification.message.match(/Matrijs ([A-Z]\d+)/);
      const matrijsId = matrijsMatch?.[1];

      if (matrijsId) {
        const newPlanning = {
          ...planningData,
          id: `P${Date.now()}`,
          matrijsId,
          status: 'Gepland'
        };

        updatePlanning(newPlanning);
        setIsPlanningOpen(false);
      }
    }
  };

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
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header with filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Meldingen</h2>
          <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
            {notifications.filter(n => !n.read).length} ongelezen
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Zoek in meldingen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="border border-gray-300 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle meldingen</option>
              <option value="unread">Ongelezen</option>
              <option value="warning">Waarschuwingen</option>
              <option value="error">Fouten</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications list */}
      <div className="divide-y divide-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Geen meldingen gevonden</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50/50' : ''
              } ${getNotificationStyle(notification.type)}`}
            >
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    notification.read ? 'text-gray-600' : 'text-gray-900'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(notification.timestamp), 'dd MMM yyyy HH:mm', { locale: nl })}
                  </div>
                </div>
                {notification.read && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                )}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Details Dialog */}
      {selectedNotification && (
        <NotificationDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          notification={selectedNotification}
          onPlanMaintenance={handlePlanMaintenance}
        />
      )}

      {/* Planning Dialog */}
      <PlanningDialog
        isOpen={isPlanningOpen}
        onClose={() => setIsPlanningOpen(false)}
        onSubmit={handleSubmitPlan}
        title="Onderhoud Inplannen"
      />
    </div>
  );
}
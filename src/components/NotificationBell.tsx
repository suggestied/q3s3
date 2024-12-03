import React from 'react';
import { Bell } from 'lucide-react';
import NotificationPage from './NotificationPage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Notification {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationBellProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationBell({ 
  notifications, 
  onNotificationClick, 
  onMarkAsRead 
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState<Notification | null>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleBack = () => {
    setSelectedNotification(null);
  };

  const handleAction = (action: string) => {
    if (selectedNotification) {
      if (action === 'mark_read') {
        onMarkAsRead(selectedNotification.id);
        setSelectedNotification(null);
        setIsOpen(false);
      } else {
        onNotificationClick(selectedNotification);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedNotification ? 'Notificatie Details' : 'Notificaties'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNotification ? (
            <NotificationPage
              notification={selectedNotification}
              onBack={handleBack}
              onAction={handleAction}
            />
          ) : (
            <div className="mt-4 space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  Geen notificaties
                </p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-colors
                      ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}
                      ${notification.type === 'error' ? 'border-l-4 border-red-500' :
                        notification.type === 'warning' ? 'border-l-4 border-yellow-500' :
                        'border-l-4 border-blue-500'}
                    `}
                  >
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
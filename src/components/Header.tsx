import React from 'react';
import { Activity, Settings, Bell, User } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Header() {
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-secondary text-white border-b border-gray-700">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Q3 Maintenance</h1>
              <p className="text-xs text-gray-400">Efficiënt onderhoud, maximale controle</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-secondary-light transition-colors relative">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <button className="p-2 rounded-lg hover:bg-secondary-light transition-colors">
              <Settings className="h-6 w-6" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary-light transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
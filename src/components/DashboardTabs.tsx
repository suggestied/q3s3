import React from 'react';
import { BarChart2, Activity, WrenchIcon, CheckSquare, Bell, Maximize2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import NotificationBell from './NotificationBell';

interface DashboardTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  onOverviewClick: () => void;
}

const tabs = [
  { id: 'timeline', name: 'Tijdlijn', icon: BarChart2 },
  { id: 'monitoring', name: 'Live Monitoring', icon: Activity },
  { id: 'maintenance', name: 'Onderhoud', icon: WrenchIcon },
  { id: 'checklists', name: 'Checklists', icon: CheckSquare },
];

export default function DashboardTabs({ selectedTab, onTabChange, onOverviewClick }: DashboardTabsProps) {
  const { notifications } = useData();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  group inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`
                  h-5 w-5 mr-2
                  ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                `} />
                {tab.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={onOverviewClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            title="Open Fabriek Overview"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
          <NotificationBell 
            notifications={notifications}
            onNotificationClick={(notification) => {
              console.log('Notification clicked:', notification);
            }}
            onMarkAsRead={(id) => {
              console.log('Mark as read:', id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
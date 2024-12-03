import React from 'react';
import { 
  BarChart2, 
  Activity, 
  WrenchIcon,
  Settings, 
  ChevronLeft,
  ChevronRight,
  Users,
  Bell,
  Maximize2
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedTab: string;
  onTabChange: (tab: string) => void;
  onOverviewClick: () => void;
}

export default function Sidebar({ 
  isOpen, 
  onToggle, 
  selectedTab, 
  onTabChange,
  onOverviewClick 
}: SidebarProps) {
  const { notifications } = useData();
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const menuItems = [
    { 
      id: 'timeline', 
      label: 'Tijdlijn', 
      icon: BarChart2,
      badge: null 
    },
    { 
      id: 'monitoring', 
      label: 'Live Monitoring', 
      icon: Activity,
      badge: { count: 54, color: 'bg-primary/10 text-primary' }
    },
    { 
      id: 'maintenance', 
      label: 'Onderhoud', 
      icon: WrenchIcon,
      badge: { count: 7, color: 'bg-yellow-100 text-yellow-800' }
    },
    { 
      id: 'notifications', 
      label: 'Meldingen', 
      icon: Bell,
      badge: unreadNotifications ? { 
        count: unreadNotifications, 
        color: 'bg-red-100 text-red-800' 
      } : null
    }
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Instellingen', icon: Settings },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'overview', label: 'Fabriek Overview', icon: Maximize2, onClick: onOverviewClick }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 lg:hidden z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
        transition-all duration-200 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <div className={`flex items-center ${!isOpen && 'justify-center w-full'}`}>
              <Activity className="h-6 w-6 text-primary flex-shrink-0" />
              {isOpen && <span className="ml-2 font-semibold text-gray-900">Q3</span>}
            </div>
            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-gray-100 lg:block hidden"
            >
              {isOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  relative w-full flex items-center px-3 py-2 rounded-lg text-sm
                  hover:bg-gray-100 transition-colors
                  ${item.id === selectedTab ? 'bg-primary/10 text-primary' : 'text-gray-700'}
                  ${!isOpen ? 'justify-center' : ''}
                `}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className={`
                  h-5 w-5 flex-shrink-0
                  ${item.id === selectedTab ? 'text-primary' : 'text-gray-400'}
                `} />
                {isOpen && (
                  <>
                    <span className="ml-3 flex-1 whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${item.badge.color}`}>
                        {item.badge.count}
                      </span>
                    )}
                  </>
                )}
                {!isOpen && item.badge && (
                  <span className={`
                    absolute top-0 right-0 -mr-1 -mt-1 px-1.5 py-0.5 text-xs rounded-full
                    ${item.badge.color}
                  `}>
                    {item.badge.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="p-2 border-t border-gray-200">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`
                  w-full flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 
                  hover:bg-gray-100 transition-colors
                  ${!isOpen ? 'justify-center' : ''}
                `}
                title={!isOpen ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
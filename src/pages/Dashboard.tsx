import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MachineTimeline from '../components/MachineTimeline';
import MachineList from '../components/MachineList';
import MatrijsList from '../components/MatrijsList';
import PlanningCalendar from '../components/PlanningCalendar';
import FactoryOverview from '../components/FactoryOverview';
import NotificationsPage from '../components/NotificationsPage';

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('timeline');
  const [isOverview, setIsOverview] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMachineClick = (machineId: string) => {
    navigate(`/machine/${machineId}`, {
      state: { background: location }
    });
  };

  const content = isOverview ? (
    <FactoryOverview onExit={() => setIsOverview(false)} />
  ) : (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onOverviewClick={() => setIsOverview(true)}
      />

      <div className={`flex-1 flex flex-col transition-all duration-200 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <main className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div className="h-full">
            {selectedTab === 'timeline' && (
                <div className="h-full overflow-auto">
                <MachineTimeline />
              </div>
            )}
            {selectedTab === 'monitoring' && (
              <div className="h-full overflow-auto">
                <div className="space-y-6 p-6">
                  <MachineList onMachineClick={handleMachineClick} />
                  <MatrijsList />
                </div>
              </div>
            )}
            {selectedTab === 'maintenance' && (
              <div className="h-full overflow-auto">
                <PlanningCalendar />
              </div>
            )}
            {selectedTab === 'notifications' && (
              <div className="h-full overflow-auto">
                <NotificationsPage />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

  return content;
}
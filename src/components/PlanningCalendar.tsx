import React, { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, eachDayOfInterval } from 'date-fns';
import { nl } from 'date-fns/locale';
import type { Planning } from '../types';
import { useData } from '../context/DataContext';
import MaintenanceDetails from './MaintenanceDetails';
import CalendarDay from './CalendarDay';
import PlanningDialog from './planning/PlanningDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CalendarHeader from './planning/CalendarHeader';
import WeekHeader from './planning/WeekHeader';

export default function PlanningCalendar() {
  const { planning, updatePlanning } = useData();
  const [isNewPlanningOpen, setIsNewPlanningOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Planning | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: nl }));

  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: addDays(currentWeek, 6)
  });

  const handleNewPlanning = (planningData: Partial<Planning> & { selectedTasks?: string[] }) => {
    const { selectedTasks, ...mainPlanning } = planningData;
    const newPlanning: Planning = {
      id: `P${Date.now()}`,
      type: mainPlanning.type || 'Preventief',
      matrijsId: mainPlanning.matrijsId || '',
      beschrijving: mainPlanning.beschrijving || '',
      datum: mainPlanning.datum || new Date().toISOString(),
      status: 'Gepland',
      checklistItems: [],
      maintenanceType: mainPlanning.maintenanceType,
      technicianId: mainPlanning.technicianId,
      groupId: mainPlanning.groupId
    };

    updatePlanning(newPlanning);

    if (selectedTasks && selectedTasks.length > 0) {
      selectedTasks.forEach(taskId => {
        const task = planning.find(p => p.id === taskId);
        if (task) {
          updatePlanning({
            ...task,
            groupId: newPlanning.groupId,
            datum: newPlanning.datum
          });
        }
      });
    }

    setIsNewPlanningOpen(false);
  };

  const handleMaintenanceClick = (maintenance: Planning) => {
    setSelectedMaintenance(maintenance);
    setIsDetailsDialogOpen(true);
  };

  const getGroupedTasks = (tasks: Planning[]) => {
    const groups = tasks.reduce((acc, task) => {
      if (task.groupId) {
        if (!acc[task.groupId]) acc[task.groupId] = [];
        acc[task.groupId].push(task);
      } else {
        acc[task.id] = [task];
      }
      return acc;
    }, {} as Record<string, Planning[]>);

    return Object.values(groups);
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <CalendarHeader
        currentDate={currentWeek}
        onPrevious={() => setCurrentWeek(subWeeks(currentWeek, 1))}
        onNext={() => setCurrentWeek(addWeeks(currentWeek, 1))}
        onNewPlanning={() => setIsNewPlanningOpen(true)}
      />

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-[auto_1fr]">
          <WeekHeader days={weekDays} />

          <div className="overflow-y-auto">
            <div className="grid grid-rows-7 h-full">
              {weekDays.map((day) => {
                const dayTasks = planning.filter(task => 
                  format(new Date(task.datum), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );

                return (
                  <CalendarDay
                    key={day.toString()}
                    date={day}
                    tasks={dayTasks}
                    onTaskClick={handleMaintenanceClick}
                    getGroupedTasks={getGroupedTasks}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <PlanningDialog
        isOpen={isNewPlanningOpen}
        onClose={() => setIsNewPlanningOpen(false)}
        onSubmit={handleNewPlanning}
        title="Nieuwe Planning"
      />

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Onderhoudsdetails</DialogTitle>
          </DialogHeader>
          {selectedMaintenance && (
            <MaintenanceDetails maintenance={selectedMaintenance} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
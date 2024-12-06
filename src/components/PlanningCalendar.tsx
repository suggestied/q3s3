import {ChevronRight, ChevronLeft, Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {addDays} from "date-fns";
import {Maintenance} from "../types";
import {getDayName} from "../lib/utils.ts";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover.tsx";
import {Dialog, DialogContent, DialogTrigger} from "./ui/dialog.tsx";
import {Input} from "./ui/input.tsx";
import CreatePlanDialog from "./planning/CreatePlanDialog.tsx";

interface WeekDay {
  dayDate: Date,
  maintenancePlans: Maintenance[]
}

export default function PlanningCalendar() {
  function addWeek(){
    setCurrentDate(addDays(currentDate, 7));
  }

  function removeWeek(){
    setCurrentDate(addDays(currentDate, -7));
  }
  
  function getCurrentDateStartingMonday(){
    let date = new Date(Date.now())
    const difference = date.getDay() - 1
    date = addDays(date, -difference)
    return date
  }

  const [currentDate, setCurrentDate] = useState(getCurrentDateStartingMonday);
  const [weekDays, setWeekDays] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDaysTemp = []
    for (let i = 0; i < 7; i++){
      weekDaysTemp.push({
        dayDate: addDays(currentDate, i),
        maintenancePlans: i == 3 ? [
          {
            id: 1,
            planned_date: addDays(currentDate, i),
            mold_id: 217,
            maintenance_type: "Preventative" as Maintenance["maintenance_type"],
            description: "Routine",
            assigned_to: 2,
            status: "Planned" as Maintenance["status"],
            maintenance_action: "Poetsen"
          }
        ] : []
      });
    }
    setWeekDays(weekDaysTemp);
  }, [currentDate]);
  
  return (
  <div className={"w-full h-full"}>
    <div className="flex gap-2 w-full bg-white px-6 py-4 rounded text-md font-medium border-b items-center">
      <span className="block mr-3">Onderhoudsplanning</span>
      <div className="flex gap-2 text-sm items-center mr-auto">
        <button onClick={removeWeek}><ChevronLeft /></button>
        <span className="block w-24 text-center">{new Intl.DateTimeFormat("nl", {dateStyle: "medium"}).format(currentDate)}</span>
        <button onClick={addWeek}><ChevronRight/></button>
      </div>

      <CreatePlanDialog/>
    </div>

    <div className={"flex flex-col"}>
      {weekDays.map((weekDay) => (
          <div key={weekDay.dayDate.getTime()} className="flex w-full">
            <div className="w-44 aspect-square bg-white p-5 flex flex-col border-b border-r">
              <span className={"block flex-grow mb-auto " + weekDay.dayDate.toTimeString() == (new Date(Date.now())).toTimeString() ? "bg-zinc-900" : ""}>{weekDay.dayDate.getDate()}</span>
              <div className="block">
                              <span
                                  className="block">{getDayName(weekDay.dayDate)}</span>
                <span
                    className="block">{new Intl.DateTimeFormat("nl", {dateStyle: "medium"}).format(weekDay.dayDate)}</span>
              </div>
            </div>
            <div className={"flex flex-grow bg-white border-b p-5 flex-col"}>
              <div className={"w-full h-full flex items-center align-center justify-center " + (weekDay.maintenancePlans.length == 0 ? "" : "hidden")}>
                <span className={"block text-sm text-neutral-400"}>Er is vandaag niks gepland.</span>
              </div>
              {weekDay.maintenancePlans.map((maintenancePlan) => (
                  <div className="block rounded bg-green-500 p-3 text-neutral-50">
                    <span className="block">{maintenancePlan.description}</span>
                  </div>
              ))}
            </div>
          </div>
      ))}
    </div>
  </div>
  );
}
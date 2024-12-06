import React, { useState } from 'react';
import { Clock, WrenchIcon, User, AlertTriangle, Edit2, Save, X, Users, Calendar, ChevronRight } from 'lucide-react';
import type { Planning } from '../types';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface MaintenanceDetailsProps {
  maintenance: Planning;
}

export default function MaintenanceDetails({ maintenance }: MaintenanceDetailsProps) {
  const { planning, matrijzen, updatePlanning } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMaintenance, setEditedMaintenance] = useState(maintenance);
  const [showGrouping, setShowGrouping] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Get group information if task is part of a group
  const groupTasks = maintenance.groupId 
    ? planning.filter(task => task.groupId === maintenance.groupId)
    : [];

  // Find similar maintenance tasks that could be grouped
  const similarTasks = planning.filter(task => 
    task.id !== maintenance.id && 
    task.maintenanceType === maintenance.maintenanceType &&
    task.type === maintenance.type &&
    !task.groupId &&
    Math.abs(new Date(task.datum).getTime() - new Date(maintenance.datum).getTime()) < 24 * 60 * 60 * 1000
  );

  const handleSave = () => {
    updatePlanning(editedMaintenance);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMaintenance(maintenance);
    setIsEditing(false);
  };

  const handleCreateGroup = () => {
    if (selectedTaskIds.length === 0) return;

    const groupId = `G${Date.now()}`;
    
    // Update the current maintenance task
    updatePlanning({ ...maintenance, groupId });

    // Update all selected tasks
    selectedTaskIds.forEach(taskId => {
      const task = planning.find(t => t.id === taskId);
      if (task) {
        updatePlanning({
          ...task,
          groupId,
          datum: maintenance.datum
        });
      }
    });

    setShowGrouping(false);
    setSelectedTaskIds([]);
  };

  const handleRemoveFromGroup = () => {
    if (!maintenance.groupId) return;
    updatePlanning({ ...maintenance, groupId: undefined });
  };

  const matrijs = matrijzen.find(m => m.id === maintenance.mold_id);

  return (
    <div className="space-y-6">
      {/* Header with Edit/Save buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">
            {maintenance.type === 'Preventief' ? 'Preventief Onderhoud' : 'Correctief Onderhoud'}
          </h3>
          {matrijs && (
            <p className="text-sm text-gray-500 mt-1">
              {matrijs.naam}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-1.5" />
                Opslaan
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-1.5" />
                Annuleren
              </button>
            </>
          ) : (
            <>
              {!maintenance.groupId && (
                <button
                  onClick={() => setShowGrouping(true)}
                  className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Users className="h-4 w-4 mr-1.5" />
                  Groeperen
                </button>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-1.5" />
                Bewerken
              </button>
            </>
          )}
        </div>
      </div>

      {/* Group Information */}
      {maintenance.groupId && groupTasks.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100 overflow-hidden">
          <div className="p-4 border-b border-blue-100 bg-blue-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">
                  Gegroepeerd Onderhoud
                </h3>
              </div>
              <button
                onClick={handleRemoveFromGroup}
                className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {groupTasks.length} taken gepland voor {format(new Date(maintenance.datum), 'HH:mm', { locale: nl })}
            </p>
          </div>

          <div className="p-4 space-y-3">
            {groupTasks.map(task => {
              const taskMatrijs = matrijzen.find(m => m.id === task.mold_id);
              const isCurrentTask = task.id === maintenance.id;
              
              return (
                <div
                  key={task.id}
                  className={`
                    p-3 rounded-lg border transition-colors
                    ${isCurrentTask 
                      ? 'bg-blue-100 border-blue-300' 
                      : 'bg-white border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.type === 'Preventief' ? (
                        <WrenchIcon className="h-4 w-4 text-blue-500 mr-2" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                      )}
                      <span className="font-medium">{taskMatrijs?.naam}</span>
                    </div>
                    {isCurrentTask && (
                      <span className="text-xs text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
                        Huidige Taak
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {task.beschrijving}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grouping Interface */}
      {showGrouping && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100">
          <div className="p-4 border-b border-blue-100 bg-blue-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">
                  Vergelijkbare taken
                </h3>
              </div>
              <span className="text-sm text-blue-700 bg-blue-200 px-2 py-1 rounded-full">
                {selectedTaskIds.length} geselecteerd
              </span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Deze taken kunnen worden samengevoegd met de huidige planning
            </p>
          </div>

          <div className="p-4">
            {similarTasks.length === 0 ? (
              <div className="text-center py-6">
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Geen vergelijkbare onderhoudstaken gevonden binnen 24 uur.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {similarTasks.map(task => {
                  const taskMatrijs = matrijzen.find(m => m.id === task.mold_id);
                  const isSelected = selectedTaskIds.includes(task.id);
                  
                  return (
                    <label
                      key={task.id}
                      className={`
                        flex items-start p-3 rounded-lg cursor-pointer border transition-all
                        ${isSelected 
                          ? 'bg-blue-100 border-blue-300 shadow-sm' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500"
                        checked={isSelected}
                        onChange={() => setSelectedTaskIds(prev => 
                          prev.includes(task.id)
                            ? prev.filter(id => id !== task.id)
                            : [...prev, task.id]
                        )}
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {taskMatrijs?.naam}
                          </p>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {task.beschrijving}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {format(new Date(task.datum), 'dd MMM yyyy HH:mm', { locale: nl })}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-blue-100 bg-blue-50 flex justify-end gap-3">
            <button
              onClick={() => setShowGrouping(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuleren
            </button>
            <button
              onClick={handleCreateGroup}
              disabled={selectedTaskIds.length === 0}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${selectedTaskIds.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Groeperen ({selectedTaskIds.length})
            </button>
          </div>
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Planning Details */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Planning</h3>
          </div>
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Datum</label>
                <input
                  type="date"
                  value={editedMaintenance.datum.split('T')[0]}
                  onChange={(e) => setEditedMaintenance(prev => ({
                    ...prev,
                    datum: `${e.target.value}T${prev.datum.split('T')[1] || '00:00'}`
                  }))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Tijd</label>
                <input
                  type="time"
                  value={editedMaintenance.datum.split('T')[1]?.slice(0, 5) || '00:00'}
                  onChange={(e) => setEditedMaintenance(prev => ({
                    ...prev,
                    datum: `${prev.datum.split('T')[0]}T${e.target.value}`
                  }))}
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {format(new Date(maintenance.datum), 'EEEE d MMMM yyyy HH:mm', { locale: nl })}
            </p>
          )}
        </div>

        {/* Type Details */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <WrenchIcon className="h-5 w-5 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-900">Type</h3>
          </div>
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Onderhoudstype</label>
                <select
                  value={editedMaintenance.type}
                  onChange={(e) => setEditedMaintenance(prev => ({
                    ...prev,
                    type: e.target.value as Planning['type']
                  }))}
                  className="mt-1"
                >
                  <option value="Preventief">Preventief</option>
                  <option value="Correctief">Correctief</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Status</label>
                <select
                  value={editedMaintenance.status}
                  onChange={(e) => setEditedMaintenance(prev => ({
                    ...prev,
                    status: e.target.value as Planning['status']
                  }))}
                  className="mt-1"
                >
                  <option value="Gepland">Gepland</option>
                  <option value="In Uitvoering">In Uitvoering</option>
                  <option value="Voltooid">Voltooid</option>
                </select>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                {maintenance.type} - {maintenance.maintenanceType || 'Algemeen'}
              </p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                maintenance.status === 'Gepland' ? 'bg-yellow-100 text-yellow-800' :
                maintenance.status === 'In Uitvoering' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {maintenance.status}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Assigned Technician */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <User className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">Toegewezen aan</h3>
        </div>
        {isEditing ? (
          <select
            value={editedMaintenance.technicianId || ''}
            onChange={(e) => setEditedMaintenance(prev => ({
              ...prev,
              technicianId: e.target.value
            }))}
            className="mt-1"
          >
            <option value="">Selecteer monteur</option>
            <option value="T001">Jan de Vries</option>
            <option value="T002">Piet Bakker</option>
            <option value="T003">Klaas Smit</option>
          </select>
        ) : (
          <p className="text-sm text-gray-600">
            {maintenance.technicianId || 'Niet toegewezen'}
          </p>
        )}
      </div>

      {/* Warning for Corrective Maintenance */}
      {maintenance.type === 'Correctief' && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Correctief Onderhoud</h3>
              <p className="text-sm text-red-700 mt-1">
                Dit onderhoud is ingepland vanwege een storing of defect.
                Prioriteit vereist om productieverlies te minimaliseren.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
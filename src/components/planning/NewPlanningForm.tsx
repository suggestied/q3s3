import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, WrenchIcon, AlertCircle, Users } from 'lucide-react';
import type { Planning } from '@/types';
import { useData } from '@/context/DataContext';
import { nl } from 'date-fns/locale';
import PlanningFormSection from './PlanningFormSection';
import PlanningTypeSelector from './PlanningTypeSelector';
import PlanningDateTimePicker from './PlanningDateTimePicker';
import PlanningTechnicianSelector from './PlanningTechnicianSelector';

interface NewPlanningFormProps {
  onSubmit: (planning: Partial<Planning> & { selectedTasks?: string[] }) => void;
  onCancel: () => void;
  initialValues?: Partial<Planning>;
}

export default function NewPlanningForm({ onSubmit, onCancel, initialValues }: NewPlanningFormProps) {
  const { matrijzen } = useData();
  const [formData, setFormData] = useState({
    type: initialValues?.type || 'Preventief',
    matrijsId: initialValues?.matrijsId || '',
    maintenanceType: initialValues?.maintenanceType || '',
    technicianId: initialValues?.technicianId || '',
    datum: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    beschrijving: initialValues?.beschrijving || '',
    status: 'Gepland' as const,
    duration: '2'
  });

  const selectedMatrijs = matrijzen.find(m => m.id === formData.matrijsId);
  const matrijsHealth = selectedMatrijs?.gezondheid || 0;
  const matrijsUsage = selectedMatrijs 
    ? (selectedMatrijs.aantalHandelingen / selectedMatrijs.maxHandelingen) * 100 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      datum: `${formData.datum}T${formData.time}:00`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PlanningFormSection title="Planning Details">
        <PlanningDateTimePicker
          date={formData.datum}
          time={formData.time}
          onDateChange={(date) => setFormData(prev => ({ ...prev, datum: date }))}
          onTimeChange={(time) => setFormData(prev => ({ ...prev, time }))}
        />
      </PlanningFormSection>

      <PlanningFormSection title="Matrijs Selectie">
        <select
          value={formData.matrijsId}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            matrijsId: e.target.value,
            maintenanceType: '' // Reset maintenance type when matrijs changes
          }))}
          className="mt-1"
          required
        >
          <option value="">Selecteer matrijs</option>
          {matrijzen.map(matrijs => (
            <option key={matrijs.id} value={matrijs.id}>
              {matrijs.naam} ({Math.round((matrijs.aantalHandelingen / matrijs.maxHandelingen) * 100)}% gebruikt)
            </option>
          ))}
        </select>

        {selectedMatrijs && (
          <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-500 mb-1">Gezondheid</div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      matrijsHealth > 70 ? 'bg-green-500' :
                      matrijsHealth > 30 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${matrijsHealth}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{matrijsHealth}%</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Gebruik</div>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      matrijsUsage > 90 ? 'bg-red-500' :
                      matrijsUsage > 70 ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${matrijsUsage}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">{Math.round(matrijsUsage)}%</span>
              </div>
            </div>
          </div>
        )}
      </PlanningFormSection>

      <PlanningFormSection title="Onderhoudstype">
        <PlanningTypeSelector
          selectedType={formData.type}
          maintenanceType={formData.maintenanceType}
          onTypeChange={(type) => setFormData(prev => ({ ...prev, type }))}
          onMaintenanceTypeChange={(type) => setFormData(prev => ({ ...prev, maintenanceType: type }))}
          disabled={!formData.matrijsId}
        />
      </PlanningFormSection>

      <PlanningFormSection title="Beschrijving">
        <textarea
          value={formData.beschrijving}
          onChange={(e) => setFormData(prev => ({ ...prev, beschrijving: e.target.value }))}
          className="mt-1"
          rows={3}
          required
          placeholder="Beschrijf het onderhoud dat uitgevoerd moet worden..."
        />
      </PlanningFormSection>

      <PlanningFormSection title="Toewijzing">
        <PlanningTechnicianSelector
          selectedTechnicianId={formData.technicianId}
          onTechnicianChange={(id) => setFormData(prev => ({ ...prev, technicianId: id }))}
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Geschatte Duur (uren)</label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="mt-1"
            required
          />
        </div>
      </PlanningFormSection>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuleren
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Inplannen
        </button>
      </div>
    </form>
  );
}
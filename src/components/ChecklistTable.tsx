import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Clock, Plus, Edit2, Trash2, MessageSquare, WrenchIcon, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChecklistTable() {
  const { checklists, updateChecklist, addChecklist, deleteChecklist } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    taak: '',
    frequentie: 'Dagelijks',
    verantwoordelijke: '',
    smsNotification: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateChecklist(editingItem, {
        ...formData,
        status: 'Open',
        laatstUitgevoerd: new Date().toISOString()
      });
    } else {
      addChecklist({
        ...formData,
        status: 'Open',
        laatstUitgevoerd: new Date().toISOString()
      });
    }

    if (formData.smsNotification) {
      // Simulate SMS notification
      console.log(`SMS notification set for task: ${formData.taak}`);
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      taak: '',
      frequentie: 'Dagelijks',
      verantwoordelijke: '',
      smsNotification: false
    });
  };

  const handleEdit = (id: string) => {
    const item = checklists.find(c => c.id === id);
    if (item) {
      setFormData({
        taak: item.taak,
        frequentie: item.frequentie,
        verantwoordelijke: item.verantwoordelijke,
        smsNotification: false
      });
      setEditingItem(id);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
      deleteChecklist(id);
    }
  };

  const statusIcons = {
    Voltooid: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    Overdue: <AlertCircle className="h-5 w-5 text-red-500" />,
    Open: <Clock className="h-5 w-5 text-yellow-500" />
  };

  const statusColors = {
    Voltooid: 'bg-green-100 text-green-800',
    Overdue: 'bg-red-100 text-red-800',
    Open: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Checklist Overzicht</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Taak
          </button>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequentie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laatste Uitvoering</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verantwoordelijke</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SMS</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checklists.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                      {statusIcons[item.status]}
                      <span className="ml-1">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.taak}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.frequentie}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.laatstUitgevoerd).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.verantwoordelijke}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <MessageSquare className={`h-5 w-5 ${
                      item.smsNotification ? 'text-blue-500' : 'text-gray-300'
                    }`} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Taak Bewerken' : 'Nieuwe Taak Toevoegen'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Taak</label>
              <input
                type="text"
                value={formData.taak}
                onChange={(e) => setFormData(prev => ({ ...prev, taak: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequentie</label>
              <select
                value={formData.frequentie}
                onChange={(e) => setFormData(prev => ({ ...prev, frequentie: e.target.value }))}
                className="mt-1"
                required
              >
                <option value="Dagelijks">Dagelijks</option>
                <option value="Wekelijks">Wekelijks</option>
                <option value="Maandelijks">Maandelijks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Verantwoordelijke</label>
              <input
                type="text"
                value={formData.verantwoordelijke}
                onChange={(e) => setFormData(prev => ({ ...prev, verantwoordelijke: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotification"
                checked={formData.smsNotification}
                onChange={(e) => setFormData(prev => ({ ...prev, smsNotification: e.target.checked }))}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="smsNotification" className="ml-2 text-sm text-gray-700">
                SMS notificatie versturen
              </label>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="btn-secondary"
              >
                Annuleren
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {editingItem ? 'Opslaan' : 'Toevoegen'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
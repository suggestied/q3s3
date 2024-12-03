import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircleDot, AlertCircle, Wrench, CheckCircle, History, ChevronDown, ChevronUp } from 'lucide-react';
import type { Matrijs } from '../types';
import { calculateHealth, determineStatus } from '../utils/metrics';
import MatrijsDetails from './MatrijsDetails';
import { useData } from '../context/DataContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MatrijsList() {
  const { matrijzen } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMatrijs, setSelectedMatrijs] = useState<Matrijs | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Matrijs['status'] | 'all'>('all');

  const statusIcons = {
    'Beschikbaar': <CheckCircle className="h-5 w-5 text-green-500" />,
    'In Gebruik': <CircleDot className="h-5 w-5 text-blue-500" />,
    'Onderhoud Nodig': <AlertCircle className="h-5 w-5 text-red-500" />,
    'In Onderhoud': <Wrench className="h-5 w-5 text-yellow-500" />
  };

  const statusColors = {
    'Beschikbaar': 'bg-green-100 text-green-800',
    'In Gebruik': 'bg-blue-100 text-blue-800',
    'Onderhoud Nodig': 'bg-red-100 text-red-800',
    'In Onderhoud': 'bg-yellow-100 text-yellow-800'
  };

  const handleMatrijsClick = (matrijs: Matrijs) => {
    navigate(`/mold/${matrijs.id}`, {
      state: { background: location }
    });
  };

  const filteredMatrijzen = matrijzen.filter(matrijs => {
    const matchesSearch = matrijs.naam.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || matrijs.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-lg font-semibold text-gray-900">Matrijzen</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Zoeken..."
              className="px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Matrijs['status'] | 'all')}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">Alle statussen</option>
              <option value="Beschikbaar">Beschikbaar</option>
              <option value="In Gebruik">In Gebruik</option>
              <option value="Onderhoud Nodig">Onderhoud Nodig</option>
              <option value="In Onderhoud">In Onderhoud</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handelingen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gezondheid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laatste Gebruik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Historie</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMatrijzen.map((matrijs) => (
                <tr key={matrijs.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleMatrijsClick(matrijs)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {statusIcons[matrijs.status]}
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[matrijs.status]}`}>
                        {matrijs.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{matrijs.naam}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {matrijs.aantalHandelingen.toLocaleString()} / {matrijs.maxHandelingen.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((matrijs.aantalHandelingen / matrijs.maxHandelingen) * 100)}% gebruikt
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            matrijs.gezondheid > 70 ? 'bg-green-500' :
                            matrijs.gezondheid > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${matrijs.gezondheid}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{matrijs.gezondheid}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(matrijs.laatstGebruikt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <History className="h-5 w-5 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Matrijs Details</DialogTitle>
          </DialogHeader>
          {selectedMatrijs && (
            <MatrijsDetails matrijs={selectedMatrijs} onClose={() => setDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
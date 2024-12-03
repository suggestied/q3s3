import React from 'react';
import { UserCircle2, WrenchIcon, Building } from 'lucide-react';
import type { UserRole } from '@/types/roles';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const roles: Array<{ id: UserRole; label: string; icon: React.ElementType }> = [
    { id: 'operator', label: 'Operator', icon: UserCircle2 },
    { id: 'technician', label: 'Monteur', icon: WrenchIcon },
    { id: 'owner', label: 'Eigenaar', icon: Building }
  ];

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 rounded-lg">
      {roles.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onRoleChange(id)}
          className={`
            flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentRole === id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
}
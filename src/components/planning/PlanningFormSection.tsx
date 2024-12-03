import React from 'react';

interface PlanningFormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function PlanningFormSection({ title, children }: PlanningFormSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
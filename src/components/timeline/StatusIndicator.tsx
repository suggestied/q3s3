import React from 'react';

interface StatusIndicatorProps {
  status: string;
  efficiency: number;
  target: number;
}

export default function StatusIndicator({ status, efficiency, target }: StatusIndicatorProps) {
  const getStatusStyle = () => {
    if (status === 'In Onderhoud') return 'bg-blue-500 border-blue-600';
    if (status === 'Storing') return 'bg-red-500 border-red-600';
    if (status === 'Inactief') return 'bg-gray-500 border-gray-600';
    
    // Active status - compare with target
    return efficiency >= target 
      ? 'bg-green-500 border-green-600'
      : 'bg-yellow-500 border-yellow-600';
  };

  return (
    <div className={`w-3 h-3 rounded-full border ${getStatusStyle()}`} />
  );
}
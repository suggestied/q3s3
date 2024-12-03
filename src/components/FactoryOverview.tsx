import React, { useState, useEffect, useMemo } from 'react';
import { Activity, X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { orderBy } from 'lodash';
import FactoryGrid from './factory/FactoryGrid';
import FactoryStats from './factory/FactoryStats';
import FactoryHeader from './factory/FactoryHeader';
import type { Machine } from '@/types';

interface FactoryOverviewProps {
  onExit: () => void;
}

export default function FactoryOverview({ onExit }: FactoryOverviewProps) {
  const { locationStats, matrijzen } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle through locations unless paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentLocationIndex(prev => (prev + 1) % locationStats.length);
      setProgress(0);
    }, 15000); // Switch every 15 seconds

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 150);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [locationStats.length, isPaused]);

  const currentLocation = locationStats[currentLocationIndex];

  // Generate mock machines for the current location
  const machines = useMemo(() => {
    if (!currentLocation) return [];

    return Array.from({ length: currentLocation.machines }, (_, i): Machine => ({
      id: `${currentLocation.name}-M${String(i + 1).padStart(2, '0')}`,
      naam: `Machine ${currentLocation.name}-${String(i + 1).padStart(2, '0')}`,
      type: Math.random() > 0.5 ? 'Hydraulisch' : 'Elektrisch',
      status: Math.random() > 0.2 ? 'Actief' : Math.random() > 0.5 ? 'In Onderhoud' : 'Storing',
      location: currentLocation.name,
      efficiency: Math.floor(Math.random() * 20 + 80),
      currentMatrijsId: Math.random() > 0.3 ? `MT${String(i + 1).padStart(3, '0')}` : undefined
    }));
  }, [currentLocation]);

  const locationMatrijzen = useMemo(() => 
    matrijzen.filter(m => m.location === currentLocation?.name),
    [matrijzen, currentLocation]
  );

  const stats = useMemo(() => ({
    active: machines.filter(m => m.status === 'Actief').length,
    maintenance: machines.filter(m => m.status === 'In Onderhoud').length,
    errors: machines.filter(m => m.status === 'Storing').length,
    efficiency: currentLocation?.efficiency || 0,
    uptime: currentLocation?.uptime || 0,
    total: machines.length
  }), [machines, currentLocation]);

  const handlePrevLocation = () => {
    setCurrentLocationIndex(prev => 
      prev === 0 ? locationStats.length - 1 : prev - 1
    );
    setProgress(0);
  };

  const handleNextLocation = () => {
    setCurrentLocationIndex(prev => 
      (prev + 1) % locationStats.length
    );
    setProgress(0);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50">
      <div className="h-screen flex flex-col">
        <FactoryHeader
          currentTime={currentTime}
          isPaused={isPaused}
          onPauseToggle={() => setIsPaused(!isPaused)}
          onPrevious={handlePrevLocation}
          onNext={handleNextLocation}
          progress={progress}
          onExit={onExit}
        />

        <div className="flex-1 overflow-hidden p-6">
          <div className="max-w-[1920px] mx-auto h-full flex flex-col">
            <FactoryStats
              locationName={currentLocation?.name}
              stats={stats}
            />

            <FactoryGrid 
              machines={machines}
              matrijzen={locationMatrijzen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
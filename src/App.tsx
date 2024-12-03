import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Dashboard from './pages/Dashboard';
import MachineDetailsPage from './components/machines/MachineDetailsPage';
import MoldDetailsPage from './components/molds/MoldDetailsPage';

export default function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <DataProvider>
      <Routes location={background || location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/machine/:machineId" element={<MachineDetailsPage />} />
        <Route path="/mold/:moldId" element={<MoldDetailsPage />} />
      </Routes>

      {/* Show details as a modal when navigated from dashboard */}
      {background && (
        <Routes>
          <Route path="/machine/:machineId" element={<MachineDetailsPage />} />
          <Route path="/mold/:moldId" element={<MoldDetailsPage />} />
        </Routes>
      )}
    </DataProvider>
  );
}
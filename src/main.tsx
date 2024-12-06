import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  </StrictMode>
);
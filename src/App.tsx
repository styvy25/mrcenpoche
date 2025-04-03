
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import MainLayout from './components/layout/MainLayout';
import AppInitializer from "./components/AppInitializer";
import PoliticalMapPage from './pages/PoliticalMapPage';
import NotFound from './pages/NotFound';
import MeetingsPage from './pages/MeetingsPage';

function App() {
  const { user } = useAuth();
  
  return (
    <>
      <AppInitializer />
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout><div>Page d'accueil</div></MainLayout>} />
            <Route path="/political-map" element={<MainLayout><PoliticalMapPage /></MainLayout>} />
            <Route path="/meetings" element={<MainLayout><MeetingsPage /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

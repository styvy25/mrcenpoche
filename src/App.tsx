import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Button } from "@/components/ui/button"
import { ModeToggle } from './components/layout/ModeToggle';
import AuthRoutes from './components/auth/AuthRoutes';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import MeetingsPage from './pages/MeetingsPage';
import NewsPage from './pages/NewsPage';
import SettingsPage from './pages/SettingsPage';
import AssistantPage from './pages/AssistantPage';
import { navigationItems } from './components/layout/navigation/navigationData';
import { getIsActive } from './components/layout/navigation/navigationData';
import { ScrollToTop } from './components/utils/ScrollToTop';
import PoliticalMapPage from './pages/PoliticalMapPage';
import AppInitializer from "./components/AppInitializer";

function App() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();
  
  return (
    <>
      <AppInitializer />
      <div className="app">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/quiz" element={<MainLayout><QuizPage /></MainLayout>} />
            <Route path="/meetings" element={<MainLayout><MeetingsPage /></MainLayout>} />
            <Route path="/news" element={<MainLayout><NewsPage /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
            <Route path="/assistant" element={<MainLayout><AssistantPage /></MainLayout>} />
            <Route path="/political-map" element={<PoliticalMapPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

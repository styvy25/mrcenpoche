
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/components/auth/AuthContext';
import HomePage from './pages/HomePage';
import Index from './pages/Index';
import AssistantPage from './pages/AssistantPage';
import Chat237Page from './pages/Chat237Page';
import DocumentsPage from './pages/DocumentsPage';
import YouTubeAnalyzerPage from './pages/YouTubeAnalyzerPage';
import YouTubeDownloadPage from './pages/YouTubeDownloadPage';
import ForumPage from './pages/ForumPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import QuizPage from './pages/QuizPage';
import ModulesPage from './pages/ModulesPage';
import NotificationsPage from './pages/NotificationsPage';
import { AppProvider } from '@/context/AppContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Toaster } from '@/components/ui/toaster';
import NotFound from './pages/NotFound';
import MobileNotificationDock from '@/components/notifications/MobileNotificationDock';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/index" element={<Index />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/chat-237" element={<Chat237Page />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/youtube-analyzer" element={<YouTubeAnalyzerPage />} />
              <Route path="/youtube-download" element={<YouTubeDownloadPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileNotificationDock />
            <Toaster />
          </Router>
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

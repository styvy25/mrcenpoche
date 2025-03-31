
import React from 'react';
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
import GlowMenuDemoPage from './pages/GlowMenuDemo';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import NotFound from './pages/NotFound';
import { ThemeProvider } from '@/components/ui/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <AuthProvider>
        <AppProvider>
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
              <Route path="/glow-menu" element={<GlowMenuDemoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssistantPage from './pages/AssistantPage';
import DocumentsPage from './pages/DocumentsPage';
import QuizPage from './pages/QuizPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import './App.css';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './components/auth/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import SettingsPage from './pages/SettingsPage';
import { ThemeProvider } from './components/ui/theme-provider';
import YouTubeAnalyzerPage from './pages/YouTubeAnalyzerPage';
import YoutubeAnalysisPage from './pages/YoutubeAnalysisPage';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/youtube-analyzer" element={<YouTubeAnalyzerPage />} />
              <Route path="/youtube-analysis" element={<YoutubeAnalysisPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssistantPage from './pages/AssistantPage';
import DocumentsPage from './pages/DocumentsPage';
import NewsPage from './pages/NewsPage';
import QuizPage from './pages/QuizPage';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import PaymentPage from './pages/PaymentPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import './App.css';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './components/auth/AuthContext';
import { TourProvider } from './components/tour/TourContext';
import TourPopup from './components/tour/TourPopup';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <TourProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <TourPopup />
            <Toaster />
          </BrowserRouter>
        </TourProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;

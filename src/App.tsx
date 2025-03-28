
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

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;

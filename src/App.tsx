
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssistantPage from './pages/AssistantPage';
import DocumentsPage from './pages/DocumentsPage';
import PaymentPage from './pages/PaymentPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import './App.css';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './components/auth/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import ChatButton from './components/chat/ChatButton';

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <ChatButton />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;

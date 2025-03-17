
import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SettingsPage from './pages/SettingsPage';
import AIChat from './components/assistant/AIChat';
import DocumentsPage from './pages/DocumentsPage';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PaymentPage from './pages/PaymentPage';
import { useApiKeys } from './hooks/useApiKeys';
import { AuthProvider } from './components/auth/AuthContext';
import ApplicationStatus from './components/layout/ApplicationStatus';
import { TourProvider } from './components/tour/TourContext';
import TourPopup from './components/tour/TourPopup';
import { SEOProvider } from './hooks/useSEO';
import PremiumDialog from './components/payment/PremiumDialog';

// Initialize Stripe with publishable key
const stripePromise = loadStripe('pk_live_51LbC9oD4KuGwNujPaVxoQmCdJ6OUD9poBfhMKpPtxRUkwSUEzxBzeRCb2qbYwVlJtH38UcgGXq3bcrFvl4ePqq5A00s1R2XQIF');

interface AppContextProps {
  isApiKeySet: boolean;
  setIsApiKeySet: React.Dispatch<React.SetStateAction<boolean>>;
  isPremium: boolean;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean>>;
  showPremiumDialog: boolean;
  setShowPremiumDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  isApiKeySet: false,
  setIsApiKeySet: () => {},
  isPremium: false,
  setIsPremium: () => {},
  showPremiumDialog: false,
  setShowPremiumDialog: () => {}
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState<boolean>(false);
  const { keyStatus, loadKeys } = useApiKeys();
  
  // Update API key status when keyStatus changes
  useEffect(() => {
    const hasAnyKey = keyStatus.perplexity || keyStatus.youtube || keyStatus.stripe;
    setIsApiKeySet(hasAnyKey);
    
    // Set document title with custom domain
    document.title = "MRC en Poche | mrcenpoche.xyz";
    
    // Check premium status from local storage
    const storedPremiumStatus = localStorage.getItem('premium_status');
    if (storedPremiumStatus === 'true') {
      setIsPremium(true);
    }
  }, [keyStatus]);
  
  // Reload API keys on window focus (useful for multiple tabs)
  useEffect(() => {
    const handleFocus = () => {
      loadKeys();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadKeys]);

  return (
    <AuthProvider>
      <AppContext.Provider value={{ 
        isApiKeySet, 
        setIsApiKeySet, 
        isPremium, 
        setIsPremium,
        showPremiumDialog,
        setShowPremiumDialog
      }}>
        <Elements stripe={stripePromise}>
          <Router>
            <SEOProvider>
              <TourProvider>
                <ApplicationStatus />
                <TourPopup />
                <PremiumDialog />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/chat" element={<AIChat />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TourProvider>
            </SEOProvider>
          </Router>
        </Elements>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default App;

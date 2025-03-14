
import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SettingsPage from './pages/SettingsPage';
import AIChat from './components/assistant/AIChat';
import ModulePage from './pages/ModulesPage';
import QuizPage from "./pages/QuizPage";
import MatchGame from "./components/quiz/matches/MatchGame";
import MatchResults from "./components/quiz/matches/MatchResults";
import NewsPage from "./pages/NewsPage";
import Index from './pages/Index';
import PaymentPage from './pages/PaymentPage';
import DocumentsPage from './pages/DocumentsPage';
import NotFound from './pages/NotFound';
import { useApiKeys } from './hooks/useApiKeys';
import { AuthProvider } from './components/auth/AuthContext';
import ApplicationStatus from './components/layout/ApplicationStatus';
import { TourProvider } from './components/tour/TourContext';
import TourPopup from './components/tour/TourPopup';
import { SEOProvider } from './hooks/useSEO';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_placeholder');

interface AppContextProps {
  isApiKeySet: boolean;
  setIsApiKeySet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  isApiKeySet: false,
  setIsApiKeySet: () => {},
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const { keyStatus, loadKeys } = useApiKeys();
  
  // Update API key status when keyStatus changes
  useEffect(() => {
    const hasAnyKey = keyStatus.perplexity || keyStatus.youtube || keyStatus.stripe;
    setIsApiKeySet(hasAnyKey);
    
    // Set document title with custom domain
    document.title = "MRC en Poche | mrcenpoche.xyz";
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
      <AppContext.Provider value={{ isApiKeySet, setIsApiKeySet }}>
        <Elements stripe={stripePromise}>
          <Router>
            <SEOProvider>
              <TourProvider>
                <ApplicationStatus />
                <TourPopup />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/chat" element={<AIChat />} />
                  <Route path="/modules" element={<ModulePage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/quiz-match/:matchId" element={<MatchGame />} />
                  <Route path="/quiz-match/:matchId/results" element={<MatchResults />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/news" element={<NewsPage />} />
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

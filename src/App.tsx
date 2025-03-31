
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
import Index from './pages/Index';
import PaymentPage from './pages/PaymentPage';
import { useApiKeys } from './hooks/useApiKeys';
import { createCheckoutSession, SUBSCRIPTION_PLANS } from './services/paymentService';

// Initialize Stripe with a defined test key (actual key will be used in production)
const stripePromise = loadStripe('pk_test_51OwnO5KsLcDuIw418sLRNrUEyO0mKVDN0zWlwfgcl7qFmUF2cE3tZq6hnD6DQOPHrDqMu9FZtUv6OW2sTsCWfGmt00WYw7d0m5');

interface AppContextProps {
  isApiKeySet: boolean;
  setIsApiKeySet: React.Dispatch<React.SetStateAction<boolean>>;
  createPremiumCheckout: (priceId?: string) => Promise<void>;
}

const AppContext = createContext<AppContextProps>({
  isApiKeySet: false,
  setIsApiKeySet: () => {},
  createPremiumCheckout: async () => {},
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const { keyStatus, loadKeys } = useApiKeys();
  
  // Mettre à jour le statut des clés API lorsque keyStatus change
  useEffect(() => {
    const hasAnyKey = keyStatus.perplexity || keyStatus.youtube || keyStatus.stripe;
    setIsApiKeySet(hasAnyKey);
  }, [keyStatus]);
  
  // Recharger les clés API au focus de la fenêtre (utile pour les multiples onglets)
  useEffect(() => {
    const handleFocus = () => {
      loadKeys();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadKeys]);

  // Helper function to create premium checkout
  const createPremiumCheckout = async (priceId?: string) => {
    try {
      // Use the provided priceId or default to premium plan
      const premiumPriceId = priceId || SUBSCRIPTION_PLANS.find(plan => plan.planType === 'premium')?.priceId;
      
      if (premiumPriceId) {
        await createCheckoutSession(premiumPriceId);
      }
    } catch (error) {
      console.error('Error creating premium checkout:', error);
    }
  };

  return (
    <div>
      <AppContext.Provider value={{ isApiKeySet, setIsApiKeySet, createPremiumCheckout }}>
        <Elements stripe={stripePromise}>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/modules" element={<ModulePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz-match/:matchId" element={<MatchGame />} />
              <Route path="/quiz-match/:matchId/results" element={<MatchResults />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Router>
        </Elements>
      </AppContext.Provider>
    </div>
  );
}

export default App;

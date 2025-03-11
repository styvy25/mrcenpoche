
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

// Initialize Stripe (utilisez une clé de test pour le développement)
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

  return (
    <div>
      <AppContext.Provider value={{ isApiKeySet, setIsApiKeySet }}>
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

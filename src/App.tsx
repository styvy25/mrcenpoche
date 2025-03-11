
import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import AIChat from './components/assistant/AIChat';
import ModulePage from './pages/ModulesPage';
import QuizPage from "./pages/QuizPage";
import MatchGame from "./components/quiz/matches/MatchGame";
import MatchResults from "./components/quiz/matches/MatchResults";
import Index from './pages/Index';

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
  
  // Vérifie l'existence de clés API au chargement et lors des mises à jour du localStorage
  useEffect(() => {
    const checkApiKeys = () => {
      try {
        const savedKeys = localStorage.getItem("api_keys");
        if (savedKeys) {
          const keys = JSON.parse(savedKeys);
          // Une application fonctionnelle si au moins une clé est définie
          const hasAnyKey = Boolean(keys.perplexity || keys.youtube || keys.stripe);
          setIsApiKeySet(hasAnyKey);
        } else {
          setIsApiKeySet(false);
        }
      } catch (error) {
        console.error("Error checking API keys:", error);
        setIsApiKeySet(false);
      }
    };
    
    // Vérifier au chargement initial
    checkApiKeys();
    
    // Écouter les changements dans le localStorage (utile pour les multiples onglets)
    window.addEventListener('storage', checkApiKeys);
    
    // Vérifier à nouveau quand la fenêtre reprend le focus
    window.addEventListener('focus', checkApiKeys);
    
    return () => {
      window.removeEventListener('storage', checkApiKeys);
      window.removeEventListener('focus', checkApiKeys);
    };
  }, []);

  return (
    <div>
      <AppContext.Provider value={{ isApiKeySet, setIsApiKeySet }}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/modules" element={<ModulePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz-match/:matchId" element={<MatchGame />} />
            <Route path="/quiz-match/:matchId/results" element={<MatchResults />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

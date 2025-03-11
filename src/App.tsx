import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import AIChat from './components/assistant/AIChat';
import ModulePage from './pages/ModulePage';
import QuizPage from "./pages/QuizPage";
import MatchGame from "./components/quiz/matches/MatchGame";
import MatchResults from "./components/quiz/matches/MatchResults";

interface AppContextProps {
  isApiKeySet: boolean;
  setIsApiKeySet: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps>({
  isApiKeySet: false,
  setIsApiKeySet: () => {},
});

function App() {
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(() => {
    try {
      const savedKeys = localStorage.getItem("api_keys");
      if (savedKeys) {
        const keys = JSON.parse(savedKeys);
        return Boolean(keys.perplexity);
      }
      return false;
    } catch (error) {
      console.error("Error checking API keys:", error);
      return false;
    }
  });

  return (
    <div>
      <AppContext.Provider value={{ isApiKeySet, setIsApiKeySet }}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/modules" />} />
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

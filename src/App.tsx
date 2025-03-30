import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModulesPage from './pages/ModulesPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import YouTubeAnalyzerPage from './pages/YouTubeAnalyzerPage';
import YoutubeAnalysisPage from './pages/YoutubeAnalysisPage';
import YouTubeDownloaderPage from './pages/YouTubeDownloaderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModulesPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/youtube-analyzer" element={<YouTubeAnalyzerPage />} />
        <Route path="/youtube-analysis" element={<YoutubeAnalysisPage />} />
        <Route path="/youtube-downloader" element={<YouTubeDownloaderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

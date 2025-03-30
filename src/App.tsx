
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Index from './pages/Index';
import AssistantPage from './pages/AssistantPage';
import Chat237Page from './pages/Chat237Page';
import DocumentsPage from './pages/DocumentsPage';
import YouTubeAnalyzerPage from './pages/YouTubeAnalyzerPage';
import YouTubeDownloadPage from './pages/YouTubeDownloadPage';
import ForumPage from './pages/ForumPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<Index />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/chat-237" element={<Chat237Page />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/youtube-analyzer" element={<YouTubeAnalyzerPage />} />
        <Route path="/youtube-download" element={<YouTubeDownloadPage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </Router>
  );
}

export default App;

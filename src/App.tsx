
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import { PointsProvider } from './contexts/PointsContext';
import { SubscriptionProvider } from './hooks/useSubscription';
import ImmersiveTrainingPage from './pages/ImmersiveTrainingPage';
import VirtualMeetingsPage from './pages/VirtualMeetingsPage';
import DocumentsPage from './pages/DocumentsPage';
import ConfigurationPage from './pages/ConfigurationPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PointsProvider>
          <SubscriptionProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/modules/training" element={<ImmersiveTrainingPage />} />
              <Route path="/modules/reunions" element={<VirtualMeetingsPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/configuration" element={<ConfigurationPage />} />
            </Routes>
          </SubscriptionProvider>
        </PointsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

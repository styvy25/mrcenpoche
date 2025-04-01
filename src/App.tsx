
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './components/auth/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ModulesPage from './pages/ModulesPage';
import ModuleQuizPage from './pages/ModuleQuizPage';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import TrainingPage from './pages/TrainingPage';
import QuizPage from './pages/QuizPage';

// Import Index as HomePage
import Index from './pages/Index';

const LazyTrainingModulePage = lazy(() => import("./pages/TrainingModulePage"));

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <Index />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <ModulesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/quiz"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <ModuleQuizPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/quiz/:moduleId"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <ModuleQuizPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <AssistantPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <MainLayout>
                <AssistantPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/training" 
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
                <LazyTrainingModulePage />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:moduleId"
          element={
            <ProtectedRoute isLoggedIn={isAuthenticated}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ModuleQuizPage from './pages/ModuleQuizPage';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LazyTrainingModulePage = lazy(() => import("./pages/TrainingModulePage"));

function App() {
  const { isLoggedIn, isLoading } = useAuth();

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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <ModulesPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/quiz"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <ModuleQuizPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/modules/quiz/:moduleId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <ModuleQuizPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <AssistantPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <PricingPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/training" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /></div>}>
            <LazyTrainingModulePage />
          </Suspense>
        } />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </Router>
  );
}

export default App;

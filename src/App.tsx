import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AssistantPage from './pages/AssistantPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';
import StreamingPage from './pages/StreamingPage';
import PricingPage from './pages/PricingPage';
import YoutubeAnalysisPage from './pages/YoutubeAnalysisPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './hooks/useAuth';
import DocumentsPageRoute from './pages/DocumentsPage';
import DashboardPage from './pages/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/assistant',
    element: <AssistantPage />,
  },
  {
    path: '/documents',
    element: <DocumentsPageRoute />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/streaming',
    element: <StreamingPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/youtube-analysis',
    element: <YoutubeAnalysisPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

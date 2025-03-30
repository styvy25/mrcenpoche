
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index';
import AssistantPage from './pages/AssistantPage';
import SettingsPage from './pages/SettingsPage';
import YoutubeAnalysisPage from './pages/YoutubeAnalysisPage';
import DocumentsPageRoute from './pages/DocumentsPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './components/auth/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
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
    path: '/youtube-analysis',
    element: <YoutubeAnalysisPage />,
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

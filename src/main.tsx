
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './components/auth/AuthContext.tsx'

// Make sure we're mounting the app correctly
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

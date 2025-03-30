
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/base.css'
import './styles/animations.css'
import './styles/mobile.css'
import './styles/theme.css'
import './styles/prose.css'
import './quiz.css'

// Make sure we're mounting the app correctly
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);

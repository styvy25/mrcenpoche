
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we're mounting the app correctly
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Fix for mobile viewport height issues
const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Initialize and add event listeners
updateViewportHeight();
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', () => {
  // Small delay to ensure correct height after orientation change
  setTimeout(updateViewportHeight, 100);
});

createRoot(rootElement).render(<App />);

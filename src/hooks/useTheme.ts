
import { useState, useEffect } from 'react';

interface UseThemeReturn {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<string>(() => {
    // Vérifier si un thème est stocké dans localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Vérifier la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Retourner le thème sauvegardé ou la préférence système
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  // Appliquer le thème au document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Supprimer les classes de thème existantes
    root.classList.remove('light', 'dark');
    
    // Ajouter la nouvelle classe de thème
    root.classList.add(theme);
    
    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme };
};

export default useTheme;

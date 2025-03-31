
import { useState, useEffect } from 'react';

export interface ScreenSizeReturn {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export const useScreenSize = (): ScreenSizeReturn => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Fonction de gestionnaire pour mettre à jour la taille de la fenêtre
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('resize', handleResize);
    
    // Appeler une fois pour définir la taille initiale
    handleResize();
    
    // Nettoyer l'écouteur d'événement lors du démontage
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < 640,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024 && windowSize.width < 1280,
    isLargeDesktop: windowSize.width >= 1280
  };
};

export default useScreenSize;

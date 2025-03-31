
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Fonction pour mettre à jour l'état en fonction de la requête média
    const updateMatches = () => {
      setMatches(media.matches);
      
      // Mettre à jour les états pour les appareils courants
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
      setIsTablet(window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches);
      setIsDesktop(window.matchMedia('(min-width: 1025px)').matches);
    };
    
    // Définir l'état initial
    updateMatches();
    
    // Ajouter un écouteur d'événements pour les changements
    const listener = () => updateMatches();
    media.addEventListener('change', listener);
    
    // Nettoyer
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return { matches, isMobile, isTablet, isDesktop };
}

export default useMediaQuery;

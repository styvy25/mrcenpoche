
import { useState, useEffect } from 'react';
import { useApiKeys } from './useApiKeys';

export function useApplicationStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { keyStatus } = useApiKeys();
  
  // Détecter l'état de la connexion internet
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Vérifier si au moins une clé API est configurée
  const isApiKeySet = keyStatus.perplexity || keyStatus.youtube || keyStatus.stripe;
  
  return {
    isOnline,
    isApiKeySet,
    apiKeyStatus: keyStatus
  };
}

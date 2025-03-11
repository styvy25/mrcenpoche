
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from '@/App';

export function useApplicationStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isApiKeySet } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (online) {
        toast({
          title: "Connexion rétablie",
          description: "Vous êtes de nouveau connecté à Internet.",
          variant: "default",
        });
      } else {
        toast({
          title: "Mode hors-ligne activé",
          description: "L'application fonctionne désormais en mode hors-ligne avec des fonctionnalités limitées.",
          variant: "destructive",
        });
      }
    };
    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [toast]);

  return { 
    isOnline,
    isApiKeySet,
    isAppFunctional: isOnline || isApiKeySet
  };
}

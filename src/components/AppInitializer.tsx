
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initializeApiKeys } from "@/services/apiKeysService";
import { useOfflineMode } from "@/components/assistant/hooks/useOfflineMode";

const AppInitializer = () => {
  const { toast } = useToast();
  const { isOnline } = useOfflineMode();

  // Initialisation des clés API et autres ressources au démarrage
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialiser les clés API
        await initializeApiKeys();
        
        if (!isOnline) {
          toast({
            title: "Mode hors-ligne",
            description: "L'application fonctionne en mode hors-ligne avec des fonctionnalités limitées",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Erreur d'initialisation:", error);
      }
    };

    initialize();
  }, [toast, isOnline]);

  // Composant invisible, utilisé uniquement pour l'initialisation
  return null;
};

export default AppInitializer;

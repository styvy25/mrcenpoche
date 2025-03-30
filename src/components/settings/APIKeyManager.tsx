
import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import APIKeyManagerHeader from "./APIKeyManagerHeader";
import APIKeysList from "./APIKeysList";
import APIKeyActions from "./APIKeyActions";
import { useApiKeys } from "@/hooks/useApiKeys";

const APIKeyManager = () => {
  const { keys, keyStatus, isTesting, updateKey, saveKeys } = useApiKeys();
  const { toast } = useToast();

  const handleSaveKeys = async () => {
    const result = await saveKeys();
    
    if (result.success && result.activeServices.length > 0) {
      toast({
        title: "Configuration réussie",
        description: `Les services suivants sont actifs: ${result.activeServices.join(', ')}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Configuration incomplète",
        description: "Aucune clé API valide n'a été fournie ou les tests ont échoué",
        variant: "destructive",
      });
    }
  };

  const handleRefreshCache = async () => {
    if (!keys.youtube) return;
    
    try {
      const result = await refreshYouTubeCache(keys.youtube);
      if (result) {
        toast({
          title: "Cache rafraîchi",
          description: "Le cache YouTube a été rafraîchi avec succès",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error refreshing cache:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du rafraîchissement du cache",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <APIKeyManagerHeader />
      <APIKeysList
        perplexityKey={keys.perplexity}
        youtubeKey={keys.youtube}
        stripeKey={keys.stripe}
        keyStatus={keyStatus}
        onPerplexityKeyChange={(value) => updateKey("perplexity", value)}
        onYoutubeKeyChange={(value) => updateKey("youtube", value)}
        onStripeKeyChange={(value) => updateKey("stripe", value)}
      />
      <CardFooter>
        <APIKeyActions
          onSave={handleSaveKeys}
          onRefreshCache={handleRefreshCache}
          isYoutubeKeyValid={keyStatus.youtube}
          isTesting={isTesting}
        />
      </CardFooter>
    </Card>
  );
};

export default APIKeyManager;

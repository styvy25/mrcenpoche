
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";
import { testPerplexityApiKey } from "../assistant/services/perplexityChat";
import { refreshYouTubeCache } from "../assistant/services/youtubeService";
import APIKeyInput from "./APIKeyInput";
import APIKeyActions from "./APIKeyActions";
import OfflineFeaturesCard from "./OfflineFeaturesCard";

interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
}

const APIKeyManager = () => {
  const [perplexityKey, setPerplexityKey] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [keyStatus, setKeyStatus] = useState<ApiKeyStatus>({
    perplexity: false,
    youtube: false
  });
  const { toast } = useToast();

  // Load saved API keys on component mount
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem("api_keys");
      if (savedKeys) {
        const keys = JSON.parse(savedKeys);
        if (keys.perplexity) {
          setPerplexityKey(keys.perplexity);
          setKeyStatus(prev => ({ ...prev, perplexity: true }));
        }
        if (keys.youtube) {
          setYoutubeKey(keys.youtube);
          setKeyStatus(prev => ({ ...prev, youtube: true }));
        }
      }
    } catch (error) {
      console.error("Error loading API keys:", error);
    }
  }, []);

  const saveKeys = () => {
    try {
      // Store both keys
      const keys = {
        perplexity: perplexityKey,
        youtube: youtubeKey
      };
      
      localStorage.setItem("api_keys", JSON.stringify(keys));
      
      toast({
        title: "Clés API enregistrées",
        description: "Vos clés API ont été enregistrées avec succès",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error saving API keys:", error);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des clés API",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleSaveKeys = async () => {
    setIsTesting(true);
    
    try {
      // Test Perplexity API key if provided
      let perplexityStatus = false;
      if (perplexityKey) {
        perplexityStatus = await testPerplexityApiKey(perplexityKey);
      }
      
      // We don't have a test for YouTube yet, so we'll assume it's valid if provided
      const youtubeStatus = youtubeKey.trim().length > 0;
      
      // Update status
      setKeyStatus({
        perplexity: perplexityStatus,
        youtube: youtubeStatus
      });
      
      // Save the keys regardless of test result
      saveKeys();
      
      // Try to refresh YouTube cache if key is provided
      if (youtubeStatus) {
        refreshYouTubeCache(youtubeKey);
      }
      
      // Show appropriate toast based on test results
      if (perplexityStatus || youtubeStatus) {
        toast({
          title: "Configuration réussie",
          description: `Les services suivants sont actifs: ${perplexityStatus ? 'Perplexity' : ''}${perplexityStatus && youtubeStatus ? ', ' : ''}${youtubeStatus ? 'YouTube' : ''}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Configuration incomplète",
          description: "Aucune clé API valide n'a été fournie ou les tests ont échoué",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing API keys:", error);
      toast({
        title: "Erreur de test",
        description: "Une erreur est survenue lors du test des clés API",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const refreshCache = async () => {
    setIsTesting(true);
    
    try {
      if (youtubeKey) {
        const refreshed = await refreshYouTubeCache(youtubeKey);
        if (refreshed) {
          toast({
            title: "Cache rafraîchi",
            description: "Le cache YouTube a été rafraîchi avec succès",
            variant: "default",
          });
        }
      }
    } catch (error) {
      console.error("Error refreshing cache:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du rafraîchissement du cache",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-mrc-blue" />
          Gestionnaire de clés API
        </CardTitle>
        <CardDescription>
          Configurez vos clés API pour activer les fonctionnalités en ligne de MRC en Poche
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <APIKeyInput
          id="perplexity-key"
          label="Clé API Perplexity"
          value={perplexityKey}
          onChange={setPerplexityKey}
          isValid={keyStatus.perplexity}
          placeholder="Clé API Perplexity pour l'assistant IA"
          infoText="Utilisée pour l'assistant IA et la génération de contenu. Obtenir une clé sur"
          linkText="perplexity.ai/settings/api"
          linkUrl="https://www.perplexity.ai/settings/api"
        />
        
        <APIKeyInput
          id="youtube-key"
          label="Clé API YouTube"
          value={youtubeKey}
          onChange={setYoutubeKey}
          isValid={keyStatus.youtube}
          placeholder="Clé API YouTube pour les vidéos"
          infoText="Utilisée pour les vidéos et formations. Obtenir une clé sur"
          linkText="console.cloud.google.com"
          linkUrl="https://console.cloud.google.com/apis/credentials"
        />
      </CardContent>
      <CardFooter>
        <APIKeyActions
          onSave={handleSaveKeys}
          onRefreshCache={refreshCache}
          isYoutubeKeyValid={keyStatus.youtube}
          isTesting={isTesting}
        />
      </CardFooter>
    </Card>
  );
};

export default APIKeyManager;

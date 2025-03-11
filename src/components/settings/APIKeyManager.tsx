
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Key, Eye, EyeOff, RefreshCcw, CheckCircle, XCircle } from "lucide-react";
import { testPerplexityApiKey } from "../assistant/services/perplexityChat";
import { refreshYouTubeCache } from "../assistant/services/youtubeService";

interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
}

const APIKeyManager = () => {
  const [perplexityKey, setPerplexityKey] = useState("");
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [showYoutubeKey, setShowYoutubeKey] = useState(false);
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="perplexity-key" className="text-sm font-medium">
              Clé API Perplexity
            </label>
            {keyStatus.perplexity ? (
              <span className="text-xs flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connecté
              </span>
            ) : (
              <span className="text-xs flex items-center text-gray-400">
                <XCircle className="h-3 w-3 mr-1" />
                Non configuré
              </span>
            )}
          </div>
          
          <div className="relative">
            <Input
              id="perplexity-key"
              type={showPerplexityKey ? "text" : "password"}
              value={perplexityKey}
              onChange={(e) => setPerplexityKey(e.target.value)}
              placeholder="Clé API Perplexity pour l'assistant IA"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowPerplexityKey(!showPerplexityKey)}
            >
              {showPerplexityKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Utilisée pour l'assistant IA et la génération de contenu. Obtenir une clé sur{" "}
            <a 
              href="https://www.perplexity.ai/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-mrc-blue hover:underline"
            >
              perplexity.ai/settings/api
            </a>
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="youtube-key" className="text-sm font-medium">
              Clé API YouTube
            </label>
            {keyStatus.youtube ? (
              <span className="text-xs flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connecté
              </span>
            ) : (
              <span className="text-xs flex items-center text-gray-400">
                <XCircle className="h-3 w-3 mr-1" />
                Non configuré
              </span>
            )}
          </div>
          
          <div className="relative">
            <Input
              id="youtube-key"
              type={showYoutubeKey ? "text" : "password"}
              value={youtubeKey}
              onChange={(e) => setYoutubeKey(e.target.value)}
              placeholder="Clé API YouTube pour les vidéos"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowYoutubeKey(!showYoutubeKey)}
            >
              {showYoutubeKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Utilisée pour les vidéos et formations. Obtenir une clé sur{" "}
            <a 
              href="https://console.cloud.google.com/apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-mrc-blue hover:underline"
            >
              console.cloud.google.com
            </a>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          variant="outline" 
          onClick={refreshCache}
          disabled={isTesting || !keyStatus.youtube}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Rafraîchir le cache
        </Button>
        
        <Button 
          onClick={handleSaveKeys}
          disabled={isTesting}
          className="flex items-center gap-2"
        >
          {isTesting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></span>
              Test en cours...
            </>
          ) : (
            <>
              <Key className="h-4 w-4" />
              Enregistrer et tester
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIKeyManager;

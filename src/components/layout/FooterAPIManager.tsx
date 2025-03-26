
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Key, ExternalLink } from "lucide-react";
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { persistApiKeys, loadApiKeys } from "@/hooks/api-keys/storage";
import { useApiKeys } from "@/hooks/useApiKeys";

const FooterAPIManager = () => {
  const { keys, keyStatus, updateKey, saveKeys } = useApiKeys();
  const [isEditing, setIsEditing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Chargement des clés API au montage du composant
  useEffect(() => {
    // Les clés sont déjà chargées par le hook useApiKeys
  }, []);

  const handleSaveKey = async () => {
    if (!keys.perplexity.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une clé API valide",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    try {
      const result = await saveKeys();

      if (result.success) {
        toast({
          title: "Clé API sauvegardée",
          description: "Votre clé API a été configurée avec succès.",
          variant: "default",
        });
        
        setIsEditing(false);
      } else {
        toast({
          title: "Erreur lors de la vérification",
          description: "La clé API fournie n'a pas pu être validée.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing API key:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification de la clé API.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isEditing ? (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">API Perplexity:</span>
            {keys.perplexity ? (
              <Badge variant={keyStatus.perplexity ? "default" : "outline"} className="ml-2">
                {keyStatus.perplexity ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Connecté</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-red-500" />
                    <span>Non vérifié</span>
                  </div>
                )}
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 text-orange-500">Non configuré</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="https://www.perplexity.ai/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center"
            >
              Obtenir une clé <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            <Button size="sm" variant="ghost" onClick={toggleEdit}>
              {keys.perplexity ? "Modifier" : "Configurer"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Entrez votre clé API Perplexity"
              value={keys.perplexity}
              onChange={(e) => updateKey("perplexity", e.target.value)}
              className="flex-1"
            />
            <Button 
              size="sm" 
              disabled={isTesting} 
              onClick={handleSaveKey}
            >
              {isTesting ? "Vérification..." : "Enregistrer"}
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={toggleEdit}
            >
              Annuler
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Votre clé sera stockée de façon permanente et sécurisée pour le domaine mrcenpoche.xyz.
          </p>
        </div>
      )}
    </div>
  );
};

export default FooterAPIManager;

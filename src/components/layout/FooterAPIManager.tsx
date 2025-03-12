
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Key } from "lucide-react";
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityChat";
import { persistApiKeys, loadApiKeys } from "@/hooks/api-keys/storage";

const FooterAPIManager = () => {
  const [apiKey, setApiKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Load the API key on component mount
  useEffect(() => {
    const loadKey = async () => {
      const keys = await loadApiKeys();
      if (keys && keys.perplexity) {
        setApiKey(keys.perplexity);
        setIsKeyValid(true);
      }
    };
    
    loadKey();
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une clé API valide",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    try {
      const isValid = await testPerplexityApiKey(apiKey);
      setIsKeyValid(isValid);

      if (isValid) {
        // Save using the persistApiKeys function for reliable storage
        await persistApiKeys({
          perplexity: apiKey,
          youtube: "",
          stripe: ""
        });

        toast({
          title: "Clé API sauvegardée",
          description: "Votre clé API Perplexity a été configurée avec succès.",
          variant: "default",
        });
        
        setIsEditing(false);
      } else {
        toast({
          title: "Clé API invalide",
          description: "La clé API fournie n'est pas valide ou ne peut pas être vérifiée.",
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
            {apiKey ? (
              <Badge variant={isKeyValid ? "default" : "outline"} className="ml-2">
                {isKeyValid ? (
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
          <Button size="sm" variant="ghost" onClick={toggleEdit}>
            {apiKey ? "Modifier" : "Configurer"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Entrez votre clé API Perplexity"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
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
            Votre clé sera stockée de façon permanente et sécurisée.
          </p>
        </div>
      )}
    </div>
  );
};

export default FooterAPIManager;

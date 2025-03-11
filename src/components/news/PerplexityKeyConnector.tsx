
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Key, Check } from "lucide-react";

interface PerplexityKeyConnectorProps {
  onKeySubmitted: () => void;
}

const PerplexityKeyConnector: React.FC<PerplexityKeyConnectorProps> = ({ onKeySubmitted }) => {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Clé API requise",
        description: "Veuillez entrer une clé API Perplexity valide",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store the API key in localStorage
      const savedKeys = localStorage.getItem("api_keys");
      const keys = savedKeys ? JSON.parse(savedKeys) : {};
      
      localStorage.setItem("api_keys", JSON.stringify({
        ...keys,
        perplexity: apiKey
      }));
      
      toast({
        title: "Connexion réussie",
        description: "Votre clé API Perplexity a été enregistrée avec succès",
      });
      
      // Notify parent component
      onKeySubmitted();
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la clé API",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-mrc-blue/20">
      <CardHeader>
        <CardTitle className="text-mrc-blue">Connexion à Perplexity API</CardTitle>
        <CardDescription>
          Pour générer des éditoriaux avec l'IA, connectez votre clé API Perplexity
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Entrez votre clé API Perplexity"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
              
              <p className="text-xs text-gray-500">
                Vous pouvez obtenir une clé API sur{" "}
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
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-mrc-blue hover:bg-mrc-blue/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Connexion en cours...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Connecter l'API
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PerplexityKeyConnector;

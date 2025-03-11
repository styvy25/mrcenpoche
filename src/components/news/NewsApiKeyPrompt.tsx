
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Key } from "lucide-react";

interface NewsApiKeyPromptProps {
  onApiKeySubmit: () => void;
}

const NewsApiKeyPrompt: React.FC<NewsApiKeyPromptProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState("");
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
    
    // Save the API key
    try {
      const savedKeys = localStorage.getItem("api_keys");
      const keys = savedKeys ? JSON.parse(savedKeys) : {};
      
      localStorage.setItem("api_keys", JSON.stringify({
        ...keys,
        perplexity: apiKey
      }));
      
      toast({
        title: "Clé API enregistrée",
        description: "Votre clé API Perplexity a été enregistrée avec succès",
      });
      
      onApiKeySubmit();
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la clé API",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Clé API requise</CardTitle>
        <CardDescription>
          Pour générer les éditoriaux, une clé API Perplexity est nécessaire
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                Clé API Perplexity
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Entrez votre clé API Perplexity"
                className="w-full"
              />
            </div>
            
            <div className="text-sm text-gray-500 bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
              <p>
                Vous pouvez obtenir une clé API sur{" "}
                <a 
                  href="https://www.perplexity.ai/settings/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  perplexity.ai/settings/api
                </a>
              </p>
              <p className="mt-1">
                Cette clé est stockée localement dans votre navigateur et n'est jamais partagée.
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">
            <Key className="mr-2 h-4 w-4" />
            Enregistrer la clé API
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewsApiKeyPrompt;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { EyeIcon, EyeOffIcon, KeyIcon } from 'lucide-react';

const PerplexityAPIKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load API key from localStorage if it exists
    const savedKey = localStorage.getItem('perplexity_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save API key to localStorage
      localStorage.setItem('perplexity_api_key', apiKey);
      
      toast({
        title: "Clé API enregistrée",
        description: "Votre clé API Perplexity a été enregistrée avec succès.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement de la clé API.",
        variant: "destructive"
      });
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuration de l'API Perplexity</CardTitle>
        <CardDescription>
          Entrez votre clé API Perplexity pour activer les fonctionnalités d'IA avancées.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Entrez votre clé API Perplexity"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={toggleShowKey}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showKey ? 
                  <EyeOffIcon className="h-5 w-5" /> : 
                  <EyeIcon className="h-5 w-5" />
                }
              </button>
            </div>
            <div className="text-sm text-gray-500">
              <p>Pour obtenir une clé API:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Visitez <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">perplexity.ai</a></li>
                <li>Créez un compte ou connectez-vous</li>
                <li>Accédez aux paramètres de votre compte</li>
                <li>Générez une nouvelle clé API</li>
              </ol>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => setApiKey('')}>
            Effacer
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-blue-600">
            {isLoading ? "Enregistrement..." : "Enregistrer"} 
            <KeyIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PerplexityAPIKeyForm;

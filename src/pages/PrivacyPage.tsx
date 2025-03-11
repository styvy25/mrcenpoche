
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import LoadingIndicator from '@/components/assistant/LoadingIndicator';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityService';

const PrivacyPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setIsLoading(true);
        const prompt = `Génère une politique de confidentialité complète pour une plateforme éducative politique nommée "MRC LearnScape" qui fournit des cours, des quiz et des informations sur le Mouvement pour la Renaissance du Cameroun (MRC).
        Cette politique doit inclure:
        1. Les types de données collectées
        2. L'utilisation des données personnelles
        3. Le stockage et la sécurité des données
        4. Les droits des utilisateurs concernant leurs données
        5. L'utilisation des cookies et technologies similaires
        6. Le partage des données avec des tiers
        
        Formatte le contenu en HTML avec des balises h2, p, ul, li, etc. pour une bonne lisibilité.`;
        
        // Retrieve API key from local storage
        const apiKey = localStorage.getItem('perplexity_api_key');
        
        if (!apiKey) {
          setError("Clé API Perplexity manquante. Veuillez configurer votre clé API dans les paramètres.");
          setIsLoading(false);
          return;
        }
        
        const response = await getPerplexityResponse(apiKey, prompt);
        setContent(response);
      } catch (err) {
        console.error("Erreur lors de la récupération de la politique de confidentialité:", err);
        setError("Une erreur s'est produite lors du chargement de la politique de confidentialité.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-mrc-blue mb-6">Politique de confidentialité</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingIndicator />
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 border border-red-300 rounded-md">
                {error}
              </div>
            ) : (
              <div className="prose prose-blue max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;

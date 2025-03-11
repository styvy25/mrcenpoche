
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityService';
import { Loader2 } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        // Hardcoded API key for demo purposes - in production use environment variables or Supabase edge functions
        const apiKey = ""; // You'll need to add your Perplexity API key here
        const prompt = "Rédige une politique de confidentialité complète pour une plateforme d'apprentissage en ligne appelée MRC LearnScape, dédiée à la formation politique des militants du Mouvement pour la Renaissance du Cameroun (MRC). Inclus des sections sur les données collectées, leur utilisation, les droits des utilisateurs selon le RGPD, et les mesures de sécurité. Formate le texte en markdown.";
        
        const response = await getPerplexityResponse(apiKey, prompt);
        setContent(response);
      } catch (error) {
        console.error("Failed to fetch privacy policy:", error);
        setContent("Une erreur s'est produite lors du chargement de la politique de confidentialité. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrivacyPolicy();
  }, []);
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-mrc-blue">Politique de Confidentialité</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-mrc-blue" />
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;

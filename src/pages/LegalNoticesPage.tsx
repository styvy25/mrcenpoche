
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityService';
import { Loader2 } from 'lucide-react';

const LegalNoticesPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchLegalNotices = async () => {
      try {
        const prompt = "Rédige les mentions légales complètes pour une plateforme d'apprentissage en ligne appelée MRC LearnScape, dédiée à la formation politique des militants du Mouvement pour la Renaissance du Cameroun (MRC). Inclus des informations sur l'éditeur du site (styvysam1@yahoo.fr, +49 155 66334864), l'hébergement, la propriété intellectuelle, et les dispositions légales applicables au Cameroun. Formate le texte en markdown.";
        
        const response = await getPerplexityResponse("", prompt);
        setContent(response);
      } catch (error) {
        console.error("Failed to fetch legal notices:", error);
        setContent("Une erreur s'est produite lors du chargement des mentions légales. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLegalNotices();
  }, []);
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-mrc-blue">Mentions Légales</h1>
        
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

export default LegalNoticesPage;

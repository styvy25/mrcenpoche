
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import YouTubeAnalyzer from '@/components/youtube/YouTubeAnalyzer';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, YoutubeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YouTubeAnalyzerPage = () => {
  const { canUseFeature } = usePlanLimits();
  const navigate = useNavigate();
  
  const canAnalyzeYoutube = canUseFeature('youtubeAnalysis');
  
  const handleUpgrade = () => {
    navigate('/payment');
  };
  
  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <YoutubeIcon className="h-7 w-7 text-red-500" />
          Analyse de vidéos MRC
        </h1>
        <p className="text-muted-foreground mb-8">
          Analysez les vidéos du MRC pour en extraire les points clés et générer des rapports PDF détaillés
        </p>
        
        {canAnalyzeYoutube ? (
          <YouTubeAnalyzer />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalité Premium</CardTitle>
              <CardDescription>
                L'analyse de vidéos YouTube est une fonctionnalité réservée aux utilisateurs Premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Passez à la version premium pour accéder à l'analyse détaillée des vidéos YouTube du MRC
                et générer des rapports PDF pédagogiques.
              </p>
              <Button onClick={handleUpgrade}>
                <CreditCard className="mr-2 h-4 w-4" />
                Passer à Premium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default YouTubeAnalyzerPage;


import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoTab from '@/components/youtube/tabs/VideoTab';
import AnalysisTab from '@/components/youtube/tabs/AnalysisTab';
import { useYouTubeAnalyzerState } from '@/components/youtube/hooks/useYouTubeAnalyzer';
import { usePlanLimits, Feature } from '@/hooks/usePlanLimits';
import AuthenticationNotice from '@/components/documents/AuthenticationNotice';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import { useAuth } from '@/hooks/useAuth';

const YouTubeAnalyzerPage = () => {
  const { isAuthenticated } = useAuth();
  const { hasReachedLimit } = usePlanLimits();
  const limitReached = hasReachedLimit(Feature.YOUTUBE_ANALYSIS);
  
  const {
    videoUrl,
    videoTitle,
    videoDescription,
    analysis,
    isLoading,
    isVideoLoading,
    error,
    activeTab,
    setActiveTab,
    videoId,
    remainingAnalyses,
    hasLimit,
    handleValidateUrl,
    handleAnalyzeVideo
  } = useYouTubeAnalyzerState();

  // Si l'utilisateur n'est pas authentifié, on affiche une notice
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold mb-6">Analyseur de vidéos YouTube</h1>
          <AuthenticationNotice 
            title="Analyseur de vidéos YouTube" 
            description="Connectez-vous pour analyser des vidéos YouTube et générer des résumés détaillés."
          />
        </div>
      </MainLayout>
    );
  }

  // Si l'utilisateur a atteint sa limite d'analyses
  if (limitReached) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold mb-6">Analyseur de vidéos YouTube</h1>
          <PremiumUpsell 
            title="Limite d'analyses atteinte" 
            description="Vous avez atteint votre limite d'analyses vidéo. Passez à Premium pour des analyses illimitées."
            feature="youtube"
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Analyseur de vidéos YouTube</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="video">Vidéo</TabsTrigger>
            <TabsTrigger value="analysis" disabled={!analysis}>Analyse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="space-y-4">
            <VideoTab
              videoTitle={videoTitle}
              videoDescription={videoDescription}
              error={error}
              videoUrl={videoUrl}
              isVideoLoading={isVideoLoading}
              isLoading={isLoading}
              hasLimit={hasLimit}
              remainingAnalyses={remainingAnalyses}
              handleValidateUrl={handleValidateUrl}
              handleAnalyzeVideo={handleAnalyzeVideo}
            />
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-4">
            <AnalysisTab 
              analysis={analysis} 
              videoId={videoId} 
              videoTitle={videoTitle} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default YouTubeAnalyzerPage;

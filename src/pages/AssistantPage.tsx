
import React, { useState, useEffect, lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Lazy load AIChat component for better initial page load
const AIChat = lazy(() => import('@/components/assistant/AIChat'));

// Define Feature type to fix TS errors
enum Feature {
  CHAT = "chat",
  OFFLINE_MODE = "offlineMode",
  PDF_EXPORT = "pdfExport",
  YOUTUBE_ANALYSIS = "youtubeAnalysis",
  MAX_CHATS = "maxChats"
}

const AssistantPage = () => {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(true);
  const { 
    hasReachedLimit, 
    getRemainingUsage, 
    hasChatLimit,
    canUseFeature,
    incrementChatMessages
  } = usePlanLimits();
  const navigate = useNavigate();
  
  const hasLimit = hasChatLimit();
  const chatLimitReached = hasReachedLimit(Feature.MAX_CHATS);
  const remainingChats = getRemainingUsage(Feature.MAX_CHATS);
  const offlineMode = canUseFeature(Feature.OFFLINE_MODE);
  
  const handleUpgrade = () => {
    navigate('/payment');
  };

  // Preload necessary assets and data
  useEffect(() => {
    // Preload chat messages
    try {
      const savedMessages = localStorage.getItem('mrc_chat_messages');
      if (!savedMessages) {
        // If no messages, prepare initial state
        const initialMessage = {
          id: 'welcome',
          content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
          sender: 'assistant',
          timestamp: new Date(),
          text: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?"
        };
        localStorage.setItem('mrc_chat_messages', JSON.stringify([initialMessage]));
      }
    } catch (error) {
      console.error('Error preloading chat data:', error);
    }
  }, []);
  
  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Assistant MRC</h1>
        <p className="text-muted-foreground mb-8">
          Posez vos questions sur le MRC, la politique camerounaise et le processus électoral
        </p>
        
        {hasLimit && !chatLimitReached && showUpgradePrompt && (
          <Card className="mb-6 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="font-medium">Il vous reste {remainingChats} discussions</p>
                  <p className="text-sm text-muted-foreground">Passez à la version premium pour des conversations illimitées</p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" onClick={() => setShowUpgradePrompt(false)}>
                    Ignorer
                  </Button>
                  <Button variant="default" size="sm" onClick={handleUpgrade}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Débloquer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {chatLimitReached ? (
          <Card>
            <CardHeader>
              <CardTitle>Limite de discussions atteinte</CardTitle>
              <CardDescription>
                Vous avez atteint votre limite de discussions gratuites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Pour continuer à utiliser l'assistant, passez à la version premium pour obtenir des discussions illimitées
                et d'autres fonctionnalités exclusives.
              </p>
              <Button onClick={handleUpgrade}>
                <CreditCard className="mr-2 h-4 w-4" />
                Passer à Premium
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Suspense fallback={
            <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4">Chargement de l'assistant...</p>
              </div>
            </div>
          }>
            <AIChat offlineMode={offlineMode} />
          </Suspense>
        )}
      </div>
    </MainLayout>
  );
};

export default AssistantPage;

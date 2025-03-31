
import React, { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import MainLayout from '@/components/layout/MainLayout';
import AIChat from '@/components/assistant/AIChat';
import { Button } from '@/components/ui/button';
import { CreditCard, Info, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { useNavigate } from 'react-router-dom';

const AssistantPage = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  const navigate = useNavigate();
  const { 
    hasReachedLimit, 
    getRemainingUsage, 
    userPlan, 
    hasChatLimit 
  } = usePlanLimits();
  
  const chatLimitReached = hasReachedLimit('aiChat');
  const remainingChats = getRemainingUsage('aiChat');

  useEffect(() => {
    setPageTitle("Assistant IA - MRC en Poche");
    setPageDescription("Conversez avec notre assistant IA spécialisé sur le MRC et la politique camerounaise.");
  }, [setPageTitle, setPageDescription]);

  const handleUpgrade = () => {
    navigate('/payment');
  };

  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Assistant MRC</h1>
        <p className="text-muted-foreground mb-6">
          Posez toutes vos questions sur le MRC et recevez des réponses précises et détaillées
        </p>
        
        {userPlan === 'free' && hasChatLimit() && (
          <Alert 
            variant={chatLimitReached ? "destructive" : "default"}
            className="mb-6"
          >
            <AlertTitle className="flex items-center gap-2">
              {chatLimitReached ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  Limite atteinte
                </>
              ) : (
                <>
                  <Info className="h-4 w-4" />
                  Plan gratuit
                </>
              )}
            </AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              {chatLimitReached ? (
                <p>Vous avez atteint votre limite de conversations pour le plan gratuit.</p>
              ) : (
                <p>Il vous reste {remainingChats} conversations dans votre plan gratuit.</p>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleUpgrade}
                className="self-start mt-1"
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Passer au premium
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {chatLimitReached ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-4">Limite de conversations atteinte</h2>
            <p className="mb-6">
              Vous avez utilisé toutes vos conversations disponibles dans votre plan actuel.
              Passez au premium pour des conversations illimitées avec l'assistant.
            </p>
            <Button onClick={handleUpgrade}>
              <CreditCard className="mr-2 h-4 w-4" />
              Passer au premium
            </Button>
          </div>
        ) : (
          <AIChat />
        )}
      </div>
    </MainLayout>
  );
};

export default AssistantPage;

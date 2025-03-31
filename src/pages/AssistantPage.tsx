
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AIChat from '@/components/assistant/AIChat';
import { usePlanLimits, Feature } from '@/hooks/usePlanLimits';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssistantPage = () => {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(true);
  const { 
    hasReachedLimit, 
    getRemainingUsage, 
    hasChatLimit,
    canUseFeature 
  } = usePlanLimits();
  const navigate = useNavigate();
  
  const hasLimit = hasChatLimit();
  const chatLimitReached = hasReachedLimit('maxChats');
  const remainingChats = getRemainingUsage('maxChats');
  const offlineMode = canUseFeature('offlineMode' as Feature);
  
  const handleUpgrade = () => {
    navigate('/payment');
  };
  
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
          <AIChat offlineMode={offlineMode} />
        )}
      </div>
    </MainLayout>
  );
};

export default AssistantPage;

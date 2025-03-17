
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from '@/App';
import { useUsageLimits } from '@/hooks/useUsageLimits';

const PremiumBanner: React.FC = () => {
  const { setShowPremiumDialog } = useAppContext();
  const { pdfRemaining } = useUsageLimits();

  return (
    <Card className="w-full border-2 border-yellow-300/30 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 mb-5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
          Mode limité
        </CardTitle>
        <CardDescription>
          Vous disposez de {pdfRemaining} génération{pdfRemaining !== 1 ? 's' : ''} de PDF restante{pdfRemaining !== 1 ? 's' : ''} ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground">
          Passez à la version Premium pour un accès illimité aux documents, générations de PDF sans limite et bien plus.
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90"
          onClick={() => setShowPremiumDialog(true)}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Passer à Premium
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumBanner;

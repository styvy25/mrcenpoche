
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";

interface PremiumUpsellProps {
  title?: string;
  description?: string;
  featureType?: 'pdf' | 'youtube' | 'chat' | 'quiz';
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({
  title = "Passez à Premium",
  description = "Débloquez toutes les fonctionnalités et accédez à un contenu exclusif.",
  featureType = 'pdf'
}) => {
  const getFeatureMessage = () => {
    switch (featureType) {
      case 'pdf':
        return "Générez des PDF illimités";
      case 'youtube':
        return "Analysez des vidéos YouTube sans limite";
      case 'chat':
        return "Conversations illimitées avec l'assistant IA";
      case 'quiz':
        return "Accédez à tous les quiz et défis";
      default:
        return "Débloquez des fonctionnalités premium";
    }
  };

  return (
    <Card className="border-amber-500/20 bg-amber-50/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-600 flex items-center text-lg gap-2">
          <Crown className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{getFeatureMessage()} et bien plus encore avec l'abonnement premium.</p>
        <Button className="bg-amber-600 hover:bg-amber-700">
          Passer à Premium <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumUpsell;

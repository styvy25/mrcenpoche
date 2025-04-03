
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, AlertCircle } from "lucide-react";

interface PremiumUpsellProps {
  title: string;
  description: string;
  featureList?: string[];
  showAlert?: boolean;
  alertMessage?: string;
  ctaText?: string;
  price?: string;
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({
  title,
  description,
  featureList = [],
  showAlert = false,
  alertMessage = "Cette fonctionnalité nécessite un abonnement Premium",
  ctaText = "Passer à Premium",
  price = "5 000 FCFA/mois"
}) => {
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    navigate('/payment');
  };

  return (
    <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-md">
      {showAlert && (
        <div className="bg-amber-100 p-2 px-4 flex items-center gap-2 text-amber-700 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{alertMessage}</span>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2 text-amber-700">
              <Crown className="h-5 w-5 text-amber-500" />
              {title}
            </CardTitle>
            <CardDescription className="text-amber-700/80 mt-1">
              {description}
            </CardDescription>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-amber-700">{price}</div>
            <div className="text-xs text-amber-600">Annulez à tout moment</div>
          </div>
        </div>
      </CardHeader>
      
      {featureList.length > 0 && (
        <CardContent className="pb-2">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {featureList.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      <CardFooter className="pt-2">
        <Button 
          onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          <Crown className="h-4 w-4 mr-2" />
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumUpsell;

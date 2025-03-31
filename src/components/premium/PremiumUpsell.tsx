
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PremiumUpsellProps {
  title: string;
  description: string;
  buttonText?: string;
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({
  title,
  description,
  buttonText = "Passer à Premium"
}) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/payment');
  };

  return (
    <Card className="w-full border-2 border-yellow-400 bg-gradient-to-br from-amber-50 to-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl text-amber-800">
          <Crown className="h-5 w-5 text-yellow-500" />
          {title}
        </CardTitle>
        <CardDescription className="text-amber-700">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Accès à toutes les fonctionnalités premium</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Génération illimitée de documents</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Support prioritaire</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          <Crown className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumUpsell;


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface PremiumUpsellProps {
  title: string;
  description: string;
  buttonText?: string;
  feature?: string;
  variant?: 'default' | 'minimal' | 'inline';
  className?: string;
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({
  title,
  description,
  buttonText = "Passer à Premium",
  feature,
  variant = 'default',
  className = ""
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers notre plateforme de paiement sécurisée.",
      });
      
      navigate('/payment');
    } catch (error) {
      console.error('Error navigating to premium checkout:', error);
      navigate('/payment');
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg ${className}`}>
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <p className="text-sm font-medium text-amber-800">{description}</p>
        </div>
        <Button size="sm" onClick={handleUpgrade} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
          {buttonText}
        </Button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="text-sm text-amber-800">{description}</span>
        <Button size="sm" variant="outline" onClick={handleUpgrade} className="h-7 px-2 border-amber-300 text-amber-700 hover:bg-amber-50">
          <Crown className="h-3 w-3 mr-1 text-yellow-500" />
          {buttonText}
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <Card className={`w-full border-2 border-yellow-400 bg-gradient-to-br from-amber-50 to-yellow-50 ${className}`}>
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
          {feature && (
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>{feature}</span>
            </div>
          )}
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

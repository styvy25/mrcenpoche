
import React from 'react';
import { Crown, Star, Zap, Award, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PremiumQuizFeaturesProps {
  className?: string;
  variant?: 'default' | 'compact' | 'sidebar';
}

const PremiumQuizFeatures: React.FC<PremiumQuizFeaturesProps> = ({
  className = "",
  variant = 'default'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Redirection vers le paiement",
      description: "Vous allez être redirigé vers notre plateforme de paiement sécurisée.",
    });
    navigate('/payment');
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Crown className="h-4 w-4 text-yellow-500" />
          <h3 className="text-sm font-medium text-amber-800">Débloquez Quiz Premium</h3>
        </div>
        <div className="text-xs text-amber-700 mb-3">
          Accédez aux challenges avancés, tournois et badges exclusifs
        </div>
        <Button 
          size="sm" 
          onClick={handleUpgrade} 
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          Améliorer
        </Button>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-yellow-500" />
          <h3 className="font-medium text-amber-800">Quiz Premium</h3>
        </div>
        <ul className="space-y-2 mb-3">
          <li className="flex items-center gap-2 text-xs text-amber-700">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>Accès illimité aux quiz</span>
          </li>
          <li className="flex items-center gap-2 text-xs text-amber-700">
            <Zap className="h-3 w-3 text-yellow-500" />
            <span>Statistiques détaillées</span>
          </li>
        </ul>
        <Button 
          size="sm" 
          onClick={handleUpgrade} 
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          Débloquer
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
          Quiz & Challenges Premium
        </CardTitle>
        <CardDescription className="text-amber-700">
          Améliorez votre expérience d'apprentissage avec nos fonctionnalités quiz premium
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Accès illimité aux quiz de tous niveaux</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Challenges quotidiens exclusifs</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>Badges et certificats premium</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <BarChart className="h-4 w-4 text-yellow-500" />
              <span>Statistiques détaillées de progression</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Quiz personnalisés thématiques</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Tournois et compétitions entre membres</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          <Crown className="mr-2 h-4 w-4" />
          Débloquer toutes les fonctionnalités
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumQuizFeatures;


import React from 'react';
import { Crown, Lock, Star, Trophy, Sparkles, Users, BarChart3, Signal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface QuizPremiumFeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
  comingSoon?: boolean;
}

const QuizPremiumFeatureCard: React.FC<QuizPremiumFeatureCardProps> = ({
  title,
  icon,
  description,
  isPremium,
  comingSoon = false
}) => {
  return (
    <Card className={`relative overflow-hidden transition-all ${
      isPremium 
        ? 'border-amber-300 bg-gradient-to-br from-amber-50/50 to-yellow-50/50' 
        : 'border bg-gray-50/50'
    }`}>
      <CardHeader className="pb-1 pt-4">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
          {comingSoon ? (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
              À venir
            </Badge>
          ) : isPremium ? (
            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300">
              <Crown className="h-3 w-3 mr-1" /> Premium
            </Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-4 text-sm text-gray-600">
        {description}
        
        {isPremium && !comingSoon && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white/10 p-3 rounded-full">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const QuizPremiumFeatures: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-mrc-blue flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <span>Fonctionnalités Premium</span>
        </h2>
        <Button 
          onClick={() => navigate('/payment')}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
        >
          <Crown className="h-4 w-4 mr-2" />
          <span>Passer Premium</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuizPremiumFeatureCard
          title="Tournois Hebdomadaires"
          icon={<Trophy className="h-4 w-4 text-yellow-500" />}
          description="Participez à des compétitions hebdomadaires entre militants et gagnez des points de prestige."
          isPremium={true}
        />
        
        <QuizPremiumFeatureCard
          title="Quiz Personnalisés"
          icon={<Star className="h-4 w-4 text-indigo-500" />}
          description="Créez vos propres quiz et partagez-les avec d'autres militants du parti."
          isPremium={true}
        />
        
        <QuizPremiumFeatureCard
          title="Badges Exclusifs"
          icon={<Crown className="h-4 w-4 text-amber-500" />}
          description="Débloquez des badges et récompenses exclusives pour mettre en valeur votre expertise."
          isPremium={true}
        />
        
        <QuizPremiumFeatureCard
          title="Quiz Multi-joueurs"
          icon={<Users className="h-4 w-4 text-green-500" />}
          description="Affrontez vos amis en temps réel dans des quiz compétitifs."
          isPremium={true}
          comingSoon={true}
        />
        
        <QuizPremiumFeatureCard
          title="Statistiques Avancées"
          icon={<BarChart3 className="h-4 w-4 text-blue-500" />}
          description="Suivez votre progression avec des analyses détaillées de vos performances."
          isPremium={true}
        />
        
        <QuizPremiumFeatureCard
          title="Mode Hors-ligne"
          icon={<Signal className="h-4 w-4 text-purple-500" />}
          description="Accédez aux quiz même sans connexion internet et synchronisez plus tard."
          isPremium={true}
          comingSoon={true}
        />
      </div>
    </div>
  );
};

export default QuizPremiumFeatures;

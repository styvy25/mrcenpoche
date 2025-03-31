
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, Lock, Star, Award, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StripeButton from '@/components/payment/StripeButton';
import { useSubscription } from '@/hooks/useSubscription';

interface PremiumQuizFeaturesProps {
  variant?: 'full' | 'compact';
  className?: string;
}

const PremiumQuizFeatures: React.FC<PremiumQuizFeaturesProps> = ({ 
  variant = 'full',
  className = ''
}) => {
  const navigate = useNavigate();
  const { isPremium } = useSubscription();
  
  const features = [
    { 
      icon: <Trophy />, 
      title: "Mode Compétition", 
      description: "Affrontez d'autres membres dans des tournois quotidiens" 
    },
    { 
      icon: <Award />, 
      title: "Badges exclusifs", 
      description: "Débloquez des insignes uniques pour votre profil" 
    },
    { 
      icon: <Star />, 
      title: "Questions avancées", 
      description: "Accédez à plus de 500 questions de difficulté supérieure" 
    },
    { 
      icon: <Zap />, 
      title: "Mode expert", 
      description: "Testez vos connaissances avec des limites de temps strictes" 
    }
  ];
  
  if (variant === 'compact') {
    return (
      <Card className={`border-amber-300 bg-amber-50 dark:bg-amber-950/20 ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <span>Fonctionnalités Quiz Premium</span>
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-400">
            Débloquez toutes les fonctionnalités avec un abonnement Premium
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1">
            {features.slice(0, 2).map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature.title}</span>
              </motion.li>
            ))}
            <li className="text-amber-600 dark:text-amber-300 text-sm mt-2">
              + {features.length - 2} autres fonctionnalités
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          {isPremium ? (
            <div className="w-full text-center text-sm text-amber-700 dark:text-amber-300">
              <Crown className="inline-block h-4 w-4 mr-1" />
              Vous profitez déjà des avantages Premium
            </div>
          ) : (
            <StripeButton 
              priceId="price_1Owng6KsLcDuIw41ZukrPl1s"
              className="w-full"
              variant="default"
            >
              Débloquer toutes les fonctionnalités
            </StripeButton>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  // Full variant
  return (
    <Card className={`border-yellow-400 relative overflow-hidden ${className}`}>
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl z-0" />
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl z-0" />
      
      <CardHeader>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-yellow-500" />
            Quiz Premium
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Passez votre expérience de quiz au niveau supérieur avec nos fonctionnalités exclusives.
          </CardDescription>
        </motion.div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-4 rounded-lg border ${
                isPremium 
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-900/20 dark:to-yellow-900/30 dark:border-amber-800/30' 
                  : 'bg-gray-100/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
              }`}
            >
              <div className="flex gap-3 items-start">
                <div className={`p-2 rounded-full ${
                  isPremium 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300' 
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {isPremium ? feature.icon : <Lock size={16} />}
                </div>
                <div>
                  <h3 className={`font-medium ${
                    isPremium ? 'text-amber-800 dark:text-amber-300' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    isPremium ? 'text-amber-700 dark:text-amber-400' : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-4">
        {isPremium ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-800/30"
          >
            <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="font-medium text-green-800 dark:text-green-400">Vous avez déjà accès à toutes les fonctionnalités premium</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md"
          >
            <StripeButton 
              priceId="price_1Owng6KsLcDuIw41ZukrPl1s"
              className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-yellow-500"
              variant="default"
            >
              Débloquer toutes les fonctionnalités premium
            </StripeButton>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              À partir de 9,99€ par mois, annulation possible à tout moment
            </p>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PremiumQuizFeatures;

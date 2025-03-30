
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Users } from 'lucide-react';
import { usePlanLimits, PlanType } from '@/hooks/usePlanLimits';

const PricingSection = () => {
  const { userPlan, updateUserPlan } = usePlanLimits();
  const [isYearly, setIsYearly] = useState(true);
  
  const handleSelectPlan = (plan: PlanType) => {
    updateUserPlan(plan);
  };
  
  const discountPercentage = 20;
  const monthlyPricePremium = 1000;
  const yearlyPricePremium = (monthlyPricePremium * 12) * ((100 - discountPercentage) / 100);
  const monthlyPriceGroup = 5000;
  const yearlyPriceGroup = (monthlyPriceGroup * 12) * ((100 - discountPercentage) / 100);
  
  const premiumPrice = isYearly ? yearlyPricePremium : monthlyPricePremium;
  const groupPrice = isYearly ? yearlyPriceGroup : monthlyPriceGroup;
  
  return (
    <section className="py-12 md:py-24" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tarifs simples et transparents
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-6">
            <span className={!isYearly ? "font-bold" : "text-muted-foreground"}>Mensuel</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary"
            >
              <span
                className={`${
                  isYearly ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span className={isYearly ? "font-bold" : "text-muted-foreground"}>Annuel</span>
            <span className="ml-2 rounded-full bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 dark:bg-green-900 dark:text-green-100">
              -{discountPercentage}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Free Plan */}
          <Card className={`${userPlan === 'free' ? 'border-primary' : ''} flex flex-col`}>
            <CardHeader>
              <CardTitle>Gratuit</CardTitle>
              <CardDescription>Fonctionnalités essentielles pour démarrer</CardDescription>
              <div className="mt-4 text-4xl font-bold">0 FCFA</div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>10 conversations avec l'assistant</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>3 documents générés</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>5 quiz politiques</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Modules de base</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={userPlan === 'free' ? 'outline' : 'default'} 
                className="w-full"
                onClick={() => handleSelectPlan('free')}
                disabled={userPlan === 'free'}
              >
                {userPlan === 'free' ? 'Plan actuel' : 'Choisir ce plan'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className={`${userPlan === 'premium' ? 'border-primary' : ''} flex flex-col relative`}>
            {/* Popular badge */}
            <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
              Populaire
            </div>
            
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>Toutes les fonctionnalités pour les militants</CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold">{premiumPrice.toLocaleString()} FCFA</div>
                <p className="text-sm text-muted-foreground">
                  {isYearly ? 'par an' : 'par mois'}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Conversations illimitées avec l'assistant</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Documents illimités</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Tous les modules de formation</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Statistiques électorales avancées</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Fonctionnement hors connexion</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Exportation PDF</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={userPlan === 'premium' ? 'outline' : 'default'} 
                className="w-full"
                onClick={() => handleSelectPlan('premium')}
                disabled={userPlan === 'premium'}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {userPlan === 'premium' ? 'Plan actuel' : 'Choisir ce plan'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Group Plan */}
          <Card className={`${userPlan === 'group' ? 'border-primary' : ''} flex flex-col`}>
            <CardHeader>
              <CardTitle>Groupe</CardTitle>
              <CardDescription>Pour les comités MRC et les groupes</CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold">{groupPrice.toLocaleString()} FCFA</div>
                <p className="text-sm text-muted-foreground">
                  {isYearly ? 'par an' : 'par mois'}
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Toutes les fonctionnalités Premium</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Jusqu'à 10 utilisateurs</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Administration centralisée</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Formation collective</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Analyse de données électorales</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={userPlan === 'group' ? 'outline' : 'default'} 
                className="w-full"
                onClick={() => handleSelectPlan('group')}
                disabled={userPlan === 'group'}
              >
                <Users className="mr-2 h-4 w-4" />
                {userPlan === 'group' ? 'Plan actuel' : 'Choisir ce plan'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

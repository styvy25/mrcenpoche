
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, ScrollText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthContext';
import StripeButton from '@/components/payment/StripeButton';
import { usePlanLimits } from '@/hooks/usePlanLimits';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { userPlan } = usePlanLimits();

  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-mrc-blue" />,
      title: "Assistant IA",
      description: "Posez toutes vos questions à notre assistant spécialisé",
      link: "/assistant",
      color: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      icon: <FileText className="h-10 w-10 text-mrc-green" />,
      title: "Documents",
      description: "Générez des documents et procédures légales",
      link: "/documents",
      color: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      icon: <ScrollText className="h-10 w-10 text-mrc-red" />,
      title: "Quiz",
      description: "Testez vos connaissances et progressez",
      link: "/quiz",
      color: "from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20"
    }
  ];

  return (
    <MainLayout>
      <div className="py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Bienvenue sur MRC en Poche
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Votre assistant personnel pour tout ce qui concerne le MRC et les actualités du Cameroun
          </p>
          
          {(!isAuthenticated || userPlan !== 'premium') && (
            <div className="flex justify-center">
              <StripeButton 
                variant="gradient" 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {userPlan === 'premium' ? 'Gérer mon abonnement' : 'Passer à Premium'}
              </StripeButton>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${feature.color}`}>
                <div className="flex justify-center">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <CardTitle className="text-xl text-center mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-center">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate(feature.link)}
                >
                  Accéder <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!isAuthenticated && (
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">Vous n'avez pas encore de compte ?</h2>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              S'inscrire gratuitement
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Package, CreditCard, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserLevel } from '@/components/gamification/UserLevel';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { SubscriptionPlan } from '@/services/paymentService';

interface PaymentStatusProps {
  success?: boolean;
  canceled?: boolean;
  loading: boolean;
  subscription: any;
  currentPlan: SubscriptionPlan | null;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  success,
  canceled,
  loading,
  subscription,
  currentPlan
}) => {
  const navigate = useNavigate();

  if (success) {
    return (
      <Card className="border-green-100 bg-green-50 dark:bg-green-900/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>Paiement réussi</CardTitle>
          </div>
          <CardDescription>
            Votre abonnement premium est maintenant actif
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Vous avez désormais accès à toutes les fonctionnalités premium de la plateforme. 
            Votre abonnement sera automatiquement renouvelé à la fin de la période.
          </p>
          
          <div className="mt-6 space-y-2">
            <UserLevel showCard={false} />
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-mrc-blue mb-2" />
              <h3 className="font-medium">Modules Premium</h3>
              <p className="text-sm text-center text-gray-500">Accès à tous les modules de formation</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <CreditCard className="h-8 w-8 text-mrc-green mb-2" />
              <h3 className="font-medium">Facture</h3>
              <p className="text-sm text-center text-gray-500">Envoyée à votre adresse email</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate('/')} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
          <Button onClick={() => navigate('/modules')} className="w-full sm:w-auto">
            Découvrir les modules
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    );
  } 
  
  if (canceled) {
    return (
      <Card className="border-amber-100 bg-amber-50 dark:bg-amber-900/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-500/20">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>Paiement annulé</CardTitle>
          </div>
          <CardDescription>
            Votre opération de paiement a été annulée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Si vous avez rencontré des difficultés lors du processus de paiement, 
            n'hésitez pas à contacter notre support ou à essayer à nouveau avec un moyen 
            de paiement différent.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => navigate('/')} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
          <Button onClick={() => navigate('/#pricing')}>
            Voir les forfaits
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Default subscription status display
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut de l'abonnement</CardTitle>
        <CardDescription>
          Informations sur votre abonnement actuel
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-4 items-center justify-center py-8">
            <Clock className="h-8 w-8 text-mrc-blue animate-pulse" />
            <p>Chargement de votre abonnement...</p>
          </div>
        ) : subscription ? (
          <>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{currentPlan?.name || 'Gratuit'}</h3>
                <Badge 
                  variant={subscription.status === 'active' ? 'default' : 'outline'}
                  className={subscription.status === 'active' ? 'bg-green-500' : ''}
                >
                  {subscription.status === 'active' ? 'Actif' : 
                   subscription.status === 'trialing' ? 'Période d\'essai' : 
                   subscription.status === 'canceled' ? 'Annulé' : 
                   subscription.status}
                </Badge>
              </div>
              
              {subscription.currentPeriodEnd && (
                <p className="text-sm text-gray-500">
                  Renouvellement le {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <UserLevel showCard={false} />
            
            <div className="mt-8">
              <h3 className="font-medium mb-2">Fonctionnalités incluses</h3>
              <ul className="space-y-2">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p>Aucun abonnement actif trouvé.</p>
            <Button onClick={() => navigate('/#pricing')} className="mt-4">
              Voir les options d'abonnement
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => navigate('/')} variant="outline">
          Retour à l'accueil
        </Button>
        {subscription?.stripeSubscriptionId && (
          <Button onClick={() => navigate('/settings')}>
            Gérer l'abonnement
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentStatus;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Receipt, ArrowRight, Check, Lock, AlertTriangle } from 'lucide-react';

interface PaymentStatusProps {
  status: 'processing' | 'success' | 'error';
  progress: number;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, progress }) => {
  const navigate = useNavigate();
  
  const securityFeatures = [
    { icon: <Lock className="h-4 w-4" />, text: "Paiement sécurisé SSL" },
    { icon: <Check className="h-4 w-4" />, text: "Données cryptées" },
    { icon: <Lock className="h-4 w-4" />, text: "Aucune information bancaire stockée" },
  ];

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mrc-blue mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Traitement en cours...</h2>
        <p className="text-gray-600 max-w-md mx-auto text-center">
          Nous traitons votre paiement en toute sécurité. Veuillez patienter quelques instants sans fermer cette page.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {securityFeatures.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="py-1 px-2 flex items-center gap-1 bg-gray-50">
              {feature.icon}
              <span>{feature.text}</span>
            </Badge>
          ))}
        </div>
      </div>
    );
  }
  
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-3 max-w-md mx-auto">
            Merci pour votre achat. Vous avez maintenant accès à tout le contenu premium de MRC en Poche.
          </p>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Un reçu a été envoyé à votre adresse email.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button onClick={() => navigate('/')} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Accueil
          </Button>
          <Button onClick={() => navigate('/modules')} variant="gradient">
            Accéder aux modules <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  
  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Erreur de paiement</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Une erreur est survenue lors du traitement de votre paiement. 
            Veuillez réessayer ou contacter notre service client.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={() => navigate('/settings')}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Vérifier vos paramètres
          </Button>
          <Button onClick={() => navigate('/')}>
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default PaymentStatus;

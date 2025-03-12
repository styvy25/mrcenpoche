
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePaymentStatus = (sessionId: string | null) => {
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Progress bar simulation
    if (paymentStatus === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (paymentStatus === 'success' || paymentStatus === 'error') {
      setProgress(100);
    }
  }, [paymentStatus]);
  
  useEffect(() => {
    // Payment verification simulation
    const checkPaymentStatus = async () => {
      try {
        // In a real app, you'd verify with your Stripe API here
        // This is a simulation for demo purposes
        setTimeout(() => {
          if (Math.random() > 0.2) { // 80% success chance for demo
            setPaymentStatus('success');
            toast({
              title: "Paiement confirmé",
              description: "Votre paiement a été traité avec succès",
            });
          } else {
            setPaymentStatus('error');
            toast({
              title: "Erreur de paiement",
              description: "Une erreur est survenue lors du traitement de votre paiement",
              variant: "destructive",
            });
          }
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de la vérification du paiement:", error);
        setPaymentStatus('error');
        toast({
          title: "Erreur de paiement",
          description: "Une erreur est survenue lors du traitement de votre paiement",
          variant: "destructive",
        });
      }
    };

    if (sessionId) {
      checkPaymentStatus();
    } else {
      setPaymentStatus('error');
      toast({
        title: "Session invalide",
        description: "Aucune session de paiement n'a été trouvée",
        variant: "destructive",
      });
    }
  }, [sessionId, toast]);

  return {
    paymentStatus,
    progress
  };
};


import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePaymentStatus = (sessionId: string | null) => {
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('error');
  const [progress, setProgress] = useState(100);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set error status since payments are disabled
    setPaymentStatus('error');
    
    toast({
      title: "Paiement désactivé",
      description: "Les paiements sont temporairement désactivés. Veuillez réessayer plus tard.",
      variant: "destructive",
    });

  }, [sessionId, toast]);

  return {
    paymentStatus,
    progress
  };
};

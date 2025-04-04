
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Calendar, User, Lock } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const StripePaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = "EUR",
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Format expiry date with slash
    if (name === 'cardExpiry') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      setCardDetails(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${amount} ${currency} a été traité avec succès.`
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du traitement de votre paiement.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
        <CardTitle>Paiement Sécurisé</CardTitle>
        <CardDescription>
          Montant à payer: {amount} {currency}
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? 'p-4' : 'p-6'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Nom sur la carte</Label>
            <div className="relative">
              <Input
                id="cardName"
                name="cardName"
                placeholder="Jean Dupont"
                value={cardDetails.cardName}
                onChange={handleChange}
                className="pl-10"
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Numéro de carte</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                className="pl-10"
                maxLength={19}
                required
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Date d'expiration</Label>
              <div className="relative">
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/AA"
                  value={cardDetails.cardExpiry}
                  onChange={handleChange}
                  className="pl-10"
                  maxLength={5}
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC</Label>
              <div className="relative">
                <Input
                  id="cardCvc"
                  name="cardCvc"
                  placeholder="123"
                  value={cardDetails.cardCvc}
                  onChange={handleChange}
                  className="pl-10"
                  maxLength={3}
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className={`flex justify-between ${isMobile ? 'p-4' : 'p-6'}`}>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-mrc-blue hover:bg-blue-700">
          {isLoading ? "Traitement..." : "Payer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripePaymentForm;

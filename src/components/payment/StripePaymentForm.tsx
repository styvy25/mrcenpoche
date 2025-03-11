
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Calendar, User, Lock } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      <CardHeader>
        <CardTitle>Paiement Sécurisé</CardTitle>
        <CardDescription>
          Montant à payer: {amount} {currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Traitement..." : "Payer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripePaymentForm;
